"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Button } from "./button";
import { ImageIcon, TrashIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const AvatarUploader = ({
  rounded,
  fallback,
  src,
  className,
}: {
  rounded?: boolean;
  fallback: string;
  src?: string;
  className?: string;
}) => {
  // if have 2 words get the first letter of each word but if have 1 word get the first 2 letters
  const initials = fallback
    .trim()
    .split(" ")
    .slice(0, 2) // Take only the first two words
    .map((word, index, array) =>
      array.length === 1 ? word.slice(0, 2) : word[0]
    ) // If only one word, take first two letters, otherwise take first letter of each word
    .join("")
    .toUpperCase();
  return (
    <div className={cn("relative size-36", className)}>
      <Avatar className="size-full border border-dashed p-1 shadow cursor-pointer hover:border-primary transition">
        {src && <AvatarImage src={src} className="rounded-full" />}
        <AvatarFallback className="uppercase">
          {initials ? initials : <ImageIcon className="size-4" />}
        </AvatarFallback>
      </Avatar>
      {src && (
        <Button
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
