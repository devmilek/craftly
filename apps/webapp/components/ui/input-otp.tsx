import React from "react";

export const InputOTP: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  children,
  ...props
}) => {
  return (
    <div className="input-otp" {...props}>
      {children}
    </div>
  );
};

export const InputOTPGroup: React.FC<React.HTMLProps<HTMLDivElement>> = ({
  children,
  ...props
}) => {
  return (
    <div className="input-otp-group" {...props}>
      {children}
    </div>
  );
};

export const InputOTPSlot: React.FC<{ index: number } & React.InputHTMLAttributes<HTMLInputElement>> = ({
  index,
  ...props
}) => {
  return (
    <input
      className="otp-slot"
      maxLength={1}
      {...props}
    />
  );
};

export const InputOTPSeparator: React.FC = () => {
  return <span className="otp-separator">-</span>;
};