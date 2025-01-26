"use client";

import { completeUpload, getPresignedUrl } from "@/actions/storage/upload";
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
import axios from "axios";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FileUploadStatus {
  file: File;
  fileId: string;
  fileName: string;
  size: number;
  progress: number;
  presignedUrl: string;
  status: "pending" | "uploading" | "completed" | "error";
}

const UploadFileModal = () => {
  const { isOpen, onClose } = useModal("upload-file");
  const [files, setFiles] = useState<FileUploadStatus[]>([]);

  const uploadFileToCloudflare = async (file: FileUploadStatus) => {
    if (!file.presignedUrl) {
      const updatedFile = { ...file, status: "error" as const };
      return setFiles((prev) =>
        prev.map((f) => (f.fileName === file.fileName ? updatedFile : f))
      );
    }

    try {
      const updatedFile = { ...file, status: "uploading" as const };
      setFiles((prev) =>
        prev.map((f) => (f.fileName === file.fileName ? updatedFile : f))
      );

      await axios.put(file.presignedUrl, file.file, {
        headers: {
          "Content-Type": file.file.type,
        },
        onUploadProgress: async (progressEvent) => {
          const total = progressEvent.total ?? progressEvent.loaded;

          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / total
          );

          const progressFile: FileUploadStatus = {
            ...file,
            progress: percentCompleted,
            status: percentCompleted === 100 ? "completed" : "uploading",
          };

          if (percentCompleted === 100) {
            await completeUpload(file.fileId);
          }

          setFiles((prev) =>
            prev.map((f) => (f.fileName === file.fileName ? progressFile : f))
          );
        },
      });
    } catch (error) {
      console.error("Błąd przy uploading pliku", error);
      const errorFile = { ...file, status: "error" as const };
      setFiles((prev) =>
        prev.map((f) => (f.fileName === file.fileName ? errorFile : f))
      );
    }
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const newFiles: FileUploadStatus[] = await Promise.all(
      acceptedFiles.map(async (file) => {
        const { presignedUrl, error, fileId } = await getPresignedUrl({
          fileName: file.name,
          contentType: file.type,
          size: file.size,
        });

        if (error || !presignedUrl || !fileId) {
          toast.error("Upload failded", {
            description: error
              ? `${error} during uploading ${file.name}`
              : `Upload ${file.name} failed, please try again`,
          });
        }

        return {
          file,
          fileId: fileId,
          fileName: file.name,
          size: file.size,
          progress: 0,
          presignedUrl: presignedUrl,
          status: "pending",
        } as FileUploadStatus;
      })
    );

    // Update files state after all files are processed
    setFiles((prev) => [...prev, ...newFiles]);

    // Start uploading each file
    newFiles.forEach((fileStatus) => {
      uploadFileToCloudflare(fileStatus);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    maxFiles: 5,
  });
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
        <ScrollArea className="max-h-96">
          <div className="grid gap-2">
            {files.map((fileItem, index) => (
              <FileItem
                key={index}
                fileName={fileItem.fileName}
                size={fileItem.size}
                progress={fileItem.progress}
                status={fileItem.status}
              />
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

const FileItem = ({
  fileName,
  size,
  progress,
  status,
}: {
  fileName: string;
  size: number;
  progress: number;
  status: "pending" | "uploading" | "completed" | "error";
}) => {
  return (
    <div className="border rounded-lg p-4 relative">
      <div className="relative z-10 flex items-center gap-2">
        <FileIcon extenstion={fileName.split(".").pop() || "File"} />
        <div>
          <p className="text-sm font-medium">{fileName}</p>
          {status === "uploading" && (
            <>
              <p className="text-sm text-muted-foreground">
                {formatBytes(size)} - {progress}% uploaded {status}
              </p>
            </>
          )}
          {status === "error" && (
            <p className="text-sm text-destructive">
              Upload failed, please try again
            </p>
          )}
          {status === "completed" && (
            <p className="text-sm text-success-foreground">
              {formatBytes(size)} - Uploaded
            </p>
          )}
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
