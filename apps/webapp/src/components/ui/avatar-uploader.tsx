"use client";

import React, { useCallback, useState } from "react";
import { ImageIcon, Loader2Icon, TrashIcon } from "lucide-react";
import { cn, getInitials } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { useDropzone } from "react-dropzone";
import {
  completeUpload,
  deleteFile,
  getPresignedUrl,
} from "@/actions/storage/upload";
import { toast } from "sonner";
import Image from "next/image";

const AvatarUploader = ({
  fallback,
  value,
  onValueChange,
  className,
}: {
  fallback: string;
  value?: string | null;
  onValueChange?: (value: string | null) => void;
  className?: string;
}) => {
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setUploading(true);
      const file = acceptedFiles[0];

      if (!file) return;

      const { error, presignedUrl, fileId, src } = await getPresignedUrl({
        fileName: file.name,
        size: file.size,
      });

      if (error || !presignedUrl || !fileId || !src) {
        toast.error(error || "Error uploading file");
        setUploading(false);
        return;
      }

      // upload file
      const response = await fetch(presignedUrl, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });

      if (!response.ok) {
        console.error("Error uploading file", response.statusText);
        toast.error("Error uploading file");
        setUploading(false);
        return;
      }

      const { error: completeError } = await completeUpload(fileId);

      if (completeError) {
        toast.error(completeError);
        setUploading(false);
        return;
      }

      setUploading(false);
      toast.success("File uploaded successfully");
      if (onValueChange) onValueChange(src);
    },
    [onValueChange]
  );

  const onRemove = async () => {
    if (!value) return;
    setUploading(true);
    const { error } = await deleteFile(value);

    if (error) {
      toast.error(error);
      setUploading(false);
      return;
    }

    setUploading(false);
    if (onValueChange) onValueChange(null);
    toast.success("File deleted successfully");
  };

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
        {value && (
          <Image
            unoptimized
            src={value}
            alt="Avatar"
            height={200}
            width={200}
            className="size-full rounded-full"
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

export default AvatarUploader;
