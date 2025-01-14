import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import React from "react";

interface PasswordRequirementProps {
  label: string;
  validator: (value: string) => boolean;
}

const passwordRequirements: PasswordRequirementProps[] = [
  {
    label: "Mix of uppercase & lowercase letters",
    validator: (value: string) => /^(?=.*[a-z])(?=.*[A-Z])/.test(value),
  },
  {
    label: "At least 8 characters long",
    validator: (value: string) => value.length >= 8,
  },
  {
    label: "Contains a number",
    validator: (value: string) => /\d/.test(value),
  },
];

const PasswordRequirements = ({ value }: { value: string }) => {
  return (
    <div className="space-y-2 mt-2">
      {passwordRequirements.map((requirement, index) => {
        const isValid = requirement.validator(value);

        return (
          <div key={index} className="flex items-center gap-2 text-sm">
            {isValid ? (
              <CheckIcon className={cn("size-2 rounded-full text-green-700")} />
            ) : (
              <div className="size-2 rounded-full bg-muted" />
            )}
            <p
              className={cn(
                "text-muted-foreground",
                isValid && "text-green-700"
              )}
            >
              {requirement.label}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default PasswordRequirements;
