import * as React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: LucideIcon;
  endAdornment?: React.ReactNode;
}

const InputWithAdornments = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, startIcon, endAdornment, ...props }, ref) => {
    const StartIcon = startIcon;
    const EndAdornment = endAdornment;

    return (
      <div className={cn("relative inline-block h-9 w-full", className)}>
        {StartIcon && (
          <span className="absolute left-3 top-1/2 flex -translate-y-1/2 text-muted-foreground">
            <StartIcon className="size-4 flex-shrink-0" />
          </span>
        )}
        <input
          ref={ref}
          type={type}
          {...props}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 px-10",
            {
              "pl-4": !StartIcon,
              "pr-4": !EndAdornment,
            }
          )}
        />
        {EndAdornment && (
          <span className="absolute left-auto right-3 top-1/2 flex -translate-y-1/2 text-muted-foreground">
            {EndAdornment}
          </span>
        )}
      </div>
    );
  }
);
InputWithAdornments.displayName = "InputWithAdornments";

export { InputWithAdornments };
