"use client";

import React, { useCallback, useEffect, useState } from "react";
import { ImageIcon, Loader2Icon, TrashIcon } from "lucide-react";
import { cn, formatBytes, getInitials } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { ALLOWED_AVATAR_TYPES, MAX_AVATAR_SIZE } from "@/config";
import { toast } from "sonner";

const AvatarPicker = ({
  fallback,
  value,
  onValueChange,
  className,
}: {
  fallback: string;
  value?: File | null;
  onValueChange: (value: File | null) => void;
  className?: string;
}) => {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setUploading(true);
      const file = acceptedFiles[0];
      if (!file) return;
      if (file.size > MAX_AVATAR_SIZE) {
        return toast.error(
          `Image size must be less than ${formatBytes(MAX_AVATAR_SIZE)}.`
        );
      }

      if (!ALLOWED_AVATAR_TYPES.includes(file.type)) {
        return toast.error(
          `Only the following image types are allowed: ${ALLOWED_AVATAR_TYPES.join(
            ", "
          )}.`
        );
      }

      setUploading(false);
      onValueChange(file);
    },
    [onValueChange]
  );

  const onRemove = async () => {
    if (!value) return;
    onValueChange(null);
  };

  useEffect(() => {
    if (value) {
      const objectUrl = URL.createObjectURL(value);
      setPreviewUrl(objectUrl);

      // Cleanup function to revoke the URL when component unmounts or file changes
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreviewUrl(null);
    }
  }, [value]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="relative w-max">
      <div
        {...getRootProps()}
        className={cn(
          "size-36 border border-dashed p-1 shadow hover:border-primary transition rounded-full cursor-pointer",
          {
            "border-primary": isDragActive,
          },
          className
        )}
      >
        <input {...getInputProps()} />
        {fallback && !value && (
          <div className="size-full bg-accent rounded-full leading-none flex items-center justify-center uppercase">
            <span>{getInitials(fallback)}</span>
          </div>
        )}
        {!fallback && !value && (
          <div className="size-full bg-accent rounded-full leading-none flex items-center justify-center uppercase">
            <ImageIcon className="size-4" />
          </div>
        )}
        {previewUrl && (
          <Image
            unoptimized
            src={previewUrl}
            alt="Avatar"
            height={200}
            width={200}
            className="size-full rounded-full object-cover"
          />
        )}
        {uploading && (
          <div className="size-full absolute inset-0 z-10 bg-accent/50 rounded-full leading-none flex items-center justify-center uppercase">
            <Loader2Icon className="size-4 animate-spin" />
          </div>
        )}
      </div>
      {value && (
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          disabled={uploading}
          variant="outline"
          size="icon"
          className="border-dashed rounded-full right-0 bottom-0 absolute hover:border-primary transition"
        >
          <TrashIcon />
        </Button>
      )}
    </div>
  );
};

export default AvatarPicker;
