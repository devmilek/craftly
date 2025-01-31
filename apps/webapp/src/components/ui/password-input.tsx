import React from "react";
import { InputWithAdornments } from "./input-with-adornments";
import { Button } from "./button";
import { EyeClosed, EyeIcon, LockIcon } from "lucide-react";

interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  disabled?: boolean;
}

const PasswordInput = ({ disabled, ...props }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <div>
      <InputWithAdornments
        type={showPassword ? "text" : "password"}
        disabled={disabled}
        {...props}
        startIcon={LockIcon}
        endAdornment={
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="-mr-2.5 h-8 w-8"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <EyeIcon className="h-4 w-4 shrink-0" />
            ) : (
              <EyeClosed className="h-4 w-4 shrink-0" />
            )}
          </Button>
        }
      />
    </div>
  );
};

export default PasswordInput;
