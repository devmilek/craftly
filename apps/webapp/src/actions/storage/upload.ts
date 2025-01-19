"use server";

import { getCurrentSession } from "@/lib/auth/utils";
import { formatBytes } from "@/lib/utils";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuid } from "uuid";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3 } from ".";
import { db } from "@/lib/db";
import { files } from "@/lib/db/schemas";
import { and, eq } from "drizzle-orm";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
];

const generateR2Key = (filename: string, organizationId: string) => {
  const id = uuid();
  const extension = filename.split(".").pop();
  return `org-${organizationId}/public/${id}.${extension}`;
};

export const getPresignedUrl = async ({
  fileName,
  contentType,
  size,
}: {
  fileName: string;
  contentType: string;
  size: number;
}) => {
  const { session, organizationId } = await getCurrentSession();

  if (!session) {
    return {
      success: false,
      error: "Not authenticated",
    };
  }

  if (!organizationId) {
    return {
      success: false,
      error: "No active organization",
    };
  }

  if (!fileName || !contentType || !size) {
    return {
      success: false,
      error: "Missing required parameters",
    };
  }

  if (size > MAX_FILE_SIZE) {
    return {
      success: false,
      error: `File too large. Max size is ${formatBytes(MAX_FILE_SIZE)}`,
    };
  }

  if (!ALLOWED_TYPES.includes(contentType)) {
    return {
      success: false,
      error: "Invalid file type",
    };
  }

  const r2Key = generateR2Key(fileName, organizationId);

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: r2Key,
    ContentType: contentType,
  });

  const fileId = uuid();

  try {
    const presignedUrl = await getSignedUrl(S3, putObjectCommand, {
      expiresIn: 3600,
    });

    await db.insert(files).values({
      id: fileId,
      filename: fileName,
      mimeType: contentType,
      size,
      r2Key,
      r2Url: `${process.env.NEXT_PUBLIC_R2_DOMAIN}/${r2Key}`,
      uploadedBy: session.userId,
      organizationId,
    });

    return {
      success: true,
      presignedUrl,
      r2Key,
      fileId,
      src: `${process.env.NEXT_PUBLIC_R2_DOMAIN}/${r2Key}`,
    };
  } catch (error) {
    console.error("Error uploading file", error);
    return {
      success: false,
      error: "Error uploading file",
    };
  }
};

export const completeUpload = async (fileId: string) => {
  const { session, organizationId } = await getCurrentSession();

  if (!session) {
    return {
      success: false,
      error: "Not authenticated",
    };
  }

  if (!organizationId) {
    return {
      success: false,
      error: "No active organization",
    };
  }

  if (!fileId) {
    return {
      success: false,
      error: "Missing required parameters",
    };
  }

  const dbFile = await db.query.files.findFirst({
    where: and(
      eq(files.id, fileId),
      eq(files.organizationId, organizationId),
      eq(files.uploadedBy, session.userId)
    ),
  });

  if (!dbFile) {
    return {
      success: false,
      error: "File not found",
    };
  }

  try {
    await db.update(files).set({ status: "ready" }).where(eq(files.id, fileId));
  } catch (e) {
    console.error("Error completing upload", e);
    return {
      success: false,
      error: "Error completing upload",
    };
  }

  return {
    success: true,
  };
};

export const deleteFile = async (fileSrc: string) => {
  const { session, organizationId } = await getCurrentSession();

  if (!session) {
    return {
      success: false,
      error: "Not authenticated",
    };
  }

  if (!organizationId) {
    return {
      success: false,
      error: "No active organization",
    };
  }

  if (!fileSrc) {
    return {
      success: false,
      error: "Missing required parameters",
    };
  }

  const dbFile = await db.query.files.findFirst({
    where: and(
      eq(files.r2Url, fileSrc),
      eq(files.organizationId, organizationId)
    ),
  });

  if (!dbFile) {
    return {
      success: false,
      error: "File not found",
    };
  }

  // delete file from R2
  const deleteObjectCommand = new DeleteObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: dbFile.r2Key,
  });

  try {
    await S3.send(deleteObjectCommand);
  } catch (e) {
    console.error("Error deleting file from R2", e);
    return {
      success: false,
      error: "Error deleting file",
    };
  }

  try {
    await db.delete(files).where(eq(files.id, dbFile.id));
  } catch (e) {
    console.error("Error deleting file", e);
    return {
      success: false,
      error: "Error deleting file",
    };
  }

  return {
    success: true,
  };
};
