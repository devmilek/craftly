import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-accent dark:bg-zinc-900">
      {children}
    </div>
  );
};

export default AuthLayout;
