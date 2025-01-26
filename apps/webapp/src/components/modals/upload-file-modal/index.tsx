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
import { queryClient } from "@/components/providers/query-provider";

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
  const { isOpen, onClose, data } = useModal("upload-file");
  const [file, setFile] = useState<FileUploadStatus>();

  const uploadFileToCloudflare = async (file: FileUploadStatus) => {
    if (!file.presignedUrl) {
      const updatedFile = { ...file, status: "error" as const };
      return setFile(updatedFile);
    }

    try {
      const updatedFile = { ...file, status: "uploading" as const };
      setFile(updatedFile);

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
          };

          setFile(progressFile);
        },
      });

      const completedFile = { ...file, status: "completed" as const };
      await completeUpload(file.fileId);
      queryClient.invalidateQueries({
        queryKey: ["files", data?.projectId],
      });
      setFile(completedFile);
      setFile(undefined);
      onClose();
      toast.success("File uploaded successfully");
    } catch (error) {
      console.error("Błąd przy uploading pliku", error);
      const errorFile = { ...file, status: "error" as const };
      setFile(errorFile);
    }
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const newFile = acceptedFiles[0];
      const { presignedUrl, error, fileId } = await getPresignedUrl({
        fileName: newFile.name,
        size: newFile.size,
        projectId: data?.projectId,
      });

      if (error || !presignedUrl || !fileId) {
        toast.error("Upload failded", {
          description: error
            ? `${error} during uploading ${newFile.name}`
            : `Upload ${newFile.name} failed, please try again`,
        });
        return;
      }

      const newFileItem: FileUploadStatus = {
        file: newFile,
        fileId: fileId,
        fileName: newFile.name,
        size: newFile.size,
        progress: 0,
        presignedUrl: presignedUrl,
        status: "pending",
      };

      setFile(newFileItem);
      uploadFileToCloudflare(newFileItem);
    },
    [data?.projectId]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    maxFiles: 1,
  });
  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        if (file?.status === "pending") return;
        setFile(undefined);
        onClose();
      }}
    >
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
        {file && (
          <FileItem
            fileName={file.fileName}
            size={file.size}
            progress={file.progress}
            status={file.status}
          />
        )}
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
