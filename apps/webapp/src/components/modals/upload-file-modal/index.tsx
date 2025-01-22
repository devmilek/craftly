"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modals-store";
import { cn, formatBytes } from "@/lib/utils";
import { File, UploadCloud } from "lucide-react";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const UploadFileModal = () => {
  const { isOpen, onClose } = useModal("upload-file");
  const [files, setFiles] = useState<File[]>([]);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload file</DialogTitle>
          <DialogDescription>
            Drag and drop your files here or click to browse
          </DialogDescription>
        </DialogHeader>
        <div
          {...getRootProps()}
          className={cn(
            "border border-dashed p-4 text-center rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors",
            {
              "border-primary": isDragActive,
            }
          )}
        >
          <input {...getInputProps()} />
          <div className="rounded-lg p-2 border shadow bg-background mb-4">
            <UploadCloud className="size-5" />
          </div>
          <p className="font-medium mb-1">Upload files</p>
          <p className="text-muted-foreground text-sm">
            {isDragActive
              ? "Drop the files here ..."
              : "Drag 'n' drop some files here, or click to select files"}
          </p>
        </div>
        <div className="grid gap-2">
          <FileItem fileName="file1.jpg" size={1024} progress={50} />
          <FileItem fileName="file2.jpg" size={1024} progress={100} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

const FileItem = ({
  fileName,
  size,
  progress,
}: {
  fileName: string;
  size: number;
  progress: number;
}) => {
  return (
    <div className="border rounded-lg p-4 relative">
      <div className="relative z-10 flex items-center gap-2">
        <FileIcon extenstion="jpg" />
        <div>
          <p className="text-sm font-medium">{fileName}</p>
          <p className="text-sm text-muted-foreground">
            {formatBytes(size)} - {progress}% uploaded
          </p>
        </div>
      </div>
      <div
        className="bg-accent/50 h-full top-0 absolute left-0"
        style={{
          width: `${progress}%`,
        }}
      />
    </div>
  );
};

const FileIcon = ({ extenstion }: { extenstion: string }) => {
  return (
    <div className="relative w-max pl-1">
      <div className="bg-primary text-primary-foreground text-[10px] py-0.5 px-1 font-medium rounded-lg absolute translate-y-1/2 top-0 left-0">
        {extenstion.toUpperCase()}
      </div>
      <File className="size-10" strokeWidth={".8px"} />
    </div>
  );
};

export default UploadFileModal;
