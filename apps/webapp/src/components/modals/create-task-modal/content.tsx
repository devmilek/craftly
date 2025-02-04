import { Button } from "@/components/ui/button";
import React from "react";
import { DateSelect } from "./_components/date-select";
import PrioritySelect from "./_components/priority-select";
import StatusSelect from "./_components/status-select";
import ProjectSelect from "./_components/project-select";
import { useModal } from "@/hooks/use-modals-store";

const Content = () => {
  const { onClose } = useModal("create-task");
  const [priority, setPriority] = React.useState<string | null>(null);
  const [status, setStatus] = React.useState<string | null>("todo");
  const [date, setDate] = React.useState<Date | null>(null);
  const [projectId, setProjectId] = React.useState<string | null>(null);
  return (
    <div className="rounded-xl border bg-background overflow-hidden">
      <div className="p-6">
        <input
          placeholder="Task Name"
          className="text-lg font-semibold focus-visible:outline-none w-full bg-background"
        />
        <textarea
          className="focus-visible:outline-none text-sm mt-2 w-full bg-background resize-none"
          placeholder="Description..."
          rows={5}
        />
        <div className="flex gap-2">
          <StatusSelect value={status} onChange={setStatus} />
          <DateSelect value={date} onChange={setDate} />
          <PrioritySelect value={priority} onChange={setPriority} />
        </div>
      </div>
      <div className="bg-accent/50 border-t px-6 py-3 pl-2 flex justify-between">
        <div>
          <ProjectSelect value={projectId} onChange={setProjectId} />
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button>Save</Button>
        </div>
      </div>
    </div>
  );
};

export default Content;
