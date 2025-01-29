import { memo } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { CalendarIcon, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import TimesList from "./times-list";
import { TimeTrackingDate } from "..";

const AccordionItem = memo(
  ({ item, projectId }: { item: TimeTrackingDate; projectId?: string }) => {
    const hours = item.totalSeconds / 60 / 60;
    const minutes = (hours - Math.floor(hours)) * 60;

    return (
      <Accordion.Item
        value={item.date.toString()}
        className="border border-dashed rounded-xl"
      >
        <Accordion.Trigger className="flex w-full items-center gap-4 px-5 py-3 rounded-xl data-[state=open]:border-b border-dashed">
          <div className="flex items-center gap-4 flex-1">
            <CalendarIcon className="size-4" />
            <span className="font-normal">{format(item.date, "PPPP")}</span>
          </div>
          <p className="font-semibold">
            {Math.floor(hours)}h {Math.round(minutes)}m
          </p>
          <ChevronRight className="size-4" />
        </Accordion.Trigger>
        <Accordion.Content className="px-6 pb-4 pt-6 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
          <TimesList date={item.date} projectId={projectId} />
        </Accordion.Content>
      </Accordion.Item>
    );
  }
);

AccordionItem.displayName = "AccordionItem";

export default AccordionItem;
