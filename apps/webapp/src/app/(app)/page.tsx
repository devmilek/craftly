import SidebarNavbar from "@/components/global/sidebar/sidebar-navbar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TimerIcon } from "lucide-react";

export default function Home() {
  return (
    <>
      <SidebarNavbar
        items={[
          {
            label: "Home",
          },
        ]}
      />
      <Popover>
        <PopoverTrigger asChild>
          <Button>Open Popover</Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0">
          <div className="p-4">
            <form className="grid gap-2">
              <div className="grid">
                <Label>Projects</Label>
                <Button className="w-full overflow-hidden">
                  <span className="truncate">
                    lorem ipsum dolor sit amet consectetur adipisicing elit sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua
                  </span>
                  <TimerIcon />
                </Button>
              </div>
            </form>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
