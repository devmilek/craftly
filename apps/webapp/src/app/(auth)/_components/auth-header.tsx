import { Icons } from "@/components/global/icons";
import React from "react";

const AuthHeader = ({
  title,
  description,
  className,
  showLogo = true,
}: {
  title: string;
  description: string;
  className?: string;
  showLogo?: boolean;
}) => {
  return (
    <div className={className}>
      {showLogo && <Icons.logo className="mb-4 inline" />}
      <h1 className="text-xl font-bold">{title}</h1>
      <p className="text-sm text-muted-foreground mt-1 mb-4 text-pretty">
        {description}
      </p>
    </div>
  );
};

export default AuthHeader;
