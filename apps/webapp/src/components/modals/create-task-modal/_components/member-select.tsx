import { MemberCombobox } from "@/components/comboboxes/member-combobox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn, getInitials } from "@/lib/utils";
import { UserIcon } from "lucide-react";
import React from "react";

const MemberSelect = ({
  value,
  onChange,
  disabled,
}: {
  value?: string | null;
  onChange: (client?: string | null) => void;
  disabled?: boolean;
}) => {
  return (
    <MemberCombobox
      modal
      value={value}
      onChange={onChange}
      renderChildren={(member) => {
        return (
          <Button
            disabled={disabled}
            size="sm"
            variant="outline"
            role="combobox"
            className={cn("", {
              "text-muted-foreground": !value,
            })}
          >
            {member && member.userImage ? (
              <Avatar className="size-5">
                {member.userImage && <AvatarImage src={member.userImage} />}
                <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
              </Avatar>
            ) : (
              <UserIcon />
            )}
            <span className="truncate">
              {member ? member.name : "Assignee"}
            </span>
          </Button>
        );
      }}
    />
  );
};

export default MemberSelect;
