"use server";

import { ALLOWED_AVATAR_TYPES, MAX_AVATAR_SIZE } from "@/config";
import { getCurrentSession } from "@/lib/auth/utils";
import sharp from "sharp";
import { generateR2Key, S3 } from ".";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { db } from "@/lib/db";
import { files } from "@/lib/db/schemas";

export const uploadAvatar = async (formData: FormData) => {
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

  const image = formData.get("image");

  if (!(image instanceof File)) {
    return {
      success: false,
      error: "Invalid file",
    };
  }

  if (!image) {
    return {
      success: false,
      error: "Missing required parameters",
    };
  }

  if (image.size > MAX_AVATAR_SIZE) {
    return {
      success: false,
      error: "File size is too large",
    };
  }

  if (!ALLOWED_AVATAR_TYPES.includes(image.type)) {
    return {
      success: false,
      error: "Invalid file type",
    };
  }

  try {
    // Convert image to buffer
    const buffer = Buffer.from(await image.arrayBuffer());

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
      `${image.name.split(".")[0]}.webp`,
      { type: "image/webp" }
    );

    const r2Key = generateR2Key(optimizedImage.name, organizationId, "avatars");

    await S3.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: r2Key,
        Body: optimizedImageBuffer,
        ContentType: "image/webp",
        CacheControl: "public, max-age=31536000",
      })
    );

    const src = `${process.env.NEXT_PUBLIC_R2_DOMAIN}/${r2Key}`;

    await db.insert(files).values({
      filename: optimizedImage.name,
      mimeType: "image/webp",
      r2Key: r2Key,
      organizationId,
      url: src,
      size: optimizedImage.size,
      status: "ready",
    });

    return {
      success: true,
      file: optimizedImage,
    };
  } catch (error) {
    console.error("Image processing error:", error);
    return {
      success: false,
      error: "Failed to process image",
    };
  }
};
