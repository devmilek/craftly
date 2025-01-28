import "server-only";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { v4 as uuid, v4 } from "uuid";
import { MAX_AVATAR_SIZE } from "@/config";
import sharp from "sharp";
import { db } from "@/lib/db";
import { avatars } from "@/lib/db/schemas";

export const S3 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
  requestChecksumCalculation: "WHEN_REQUIRED",
});

export const generateR2Key = (
  filename: string,
  organizationId: string,
  type: "avatars" | "files"
) => {
  const id = uuid();
  const extension = filename.split(".").pop();

  return `org-${organizationId}/${type}/${id}.${extension}`;
};

export const serverAvatarUpload = async ({
  file,
  organizationId,
}: {
  file: File;
  organizationId: string;
}) => {
  if (!file) {
    return {
      success: false,
      error: "Missing required parameters",
    };
  }

  if (file.size > MAX_AVATAR_SIZE) {
    return {
      success: false,
      error: "File size is too large",
    };
  }

  // if (!ALLOWED_AVATAR_TYPES.includes(file.type)) {
  //   return {
  //     success: false,
  //     error: "Invalid file type",
  //   };
  // }

  try {
    // Convert image to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Process image with Sharp
    const optimizedImageBuffer = await sharp(buffer)
      .resize(256, 256, {
        fit: "cover",
        position: "center",
      })
      .webp({ quality: 80 })
      .toBuffer();

    // Convert back to File object for further processing
    const optimizedImage = new File(
      [optimizedImageBuffer],
      `${file.name.split(".")[0]}.webp`,
      { type: "image/webp" }
    );

    const r2Key = generateR2Key(optimizedImage.name, organizationId, "avatars");

    const arrayBuffer = await file.arrayBuffer();

    await S3.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: r2Key,
        Body: Buffer.from(arrayBuffer),
        ContentType: file.type,
        ChecksumAlgorithm: undefined,
      })
    );

    const src = `${process.env.NEXT_PUBLIC_R2_DOMAIN}/${r2Key}`;

    const fileId = v4();

    await db.insert(avatars).values({
      id: fileId,
      fileName: optimizedImage.name,
      r2Key: r2Key,
      organizationId,
      url: src,
      size: optimizedImage.size,
    });

    return {
      success: true,
      src: src,
      fileId: fileId,
    };
  } catch (error) {
    console.error("Image processing error:", error);
    return {
      success: false,
      error: "Failed to process image",
    };
  }
};
