import * as React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: LucideIcon;
}

const InputWithAdornments = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, startIcon, ...props }, ref) => {
    const StartIcon = startIcon;

    return (
      <div
        className={cn(
          "w-full flex rounded-md border bg-transparent shadow-sm border-input overflow-hidden h-9 relative focus-within:ring-1 focus-within:ring-ring",
          className
        )}
      >
        {StartIcon && (
          <div className="flex items-center justify-center h-9 w-10 flex-shrink-0 text-muted-foreground">
            <StartIcon className="size-4" />
          </div>
        )}
        <input
          ref={ref}
          type={type}
          {...props}
          className="w-full h-full bg-transparent py-1 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
        />
      </div>
    );
  }
);
InputWithAdornments.displayName = "InputWithAdornments";

export { InputWithAdornments };
