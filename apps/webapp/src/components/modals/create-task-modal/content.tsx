import { Button } from "@/components/ui/button";
import React from "react";

const Content = () => {
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
      </div>
      <div className="bg-accent border-t px-6 py-3 flex justify-between">
        <div></div>
        <div className="flex gap-2">
          <Button variant="ghost">Cancel</Button>
          <Button>Save</Button>
        </div>
      </div>
    </div>
  );
};

export default Content;
