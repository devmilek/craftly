import { ProjectsCombobox } from "@/components/comboboxes/project-combobox";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FolderIcon } from "lucide-react";
import React from "react";

const ProjectSelect = ({
  value,
  onChange,
  disabled,
}: {
  value: string | null;
  onChange: (client: string | null) => void;
  disabled?: boolean;
}) => {
  return (
    <ProjectsCombobox
      modal
      value={value}
      onChange={onChange}
      renderChildren={(project) => {
        return (
          <Button
            variant={"ghost"}
            role="combobox"
            className={cn("flex min-w-0 justify-start w-full max-w-[300px]", {
              "text-muted-foreground": !value,
            })}
            disabled={disabled}
          >
            <FolderIcon className="opacity-50" />
            <span className="truncate">
              {project ? project.name : "Select project..."}
            </span>
          </Button>
        );
      }}
    />
  );
};

export default ProjectSelect;
