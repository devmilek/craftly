import React from "react";

const AuthHeader = ({
  title,
  description,
  className,
}: {
  title: string;
  description: string;
  className?: string;
}) => {
  return (
    <div className={className}>
      <h1 className="text-xl font-bold mt-4">{title}</h1>
      <p className="text-sm text-muted-foreground mt-1 mb-4">{description}</p>
    </div>
  );
};

export default AuthHeader;
