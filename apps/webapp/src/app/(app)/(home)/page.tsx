import SidebarNavbar from "@/components/global/sidebar/sidebar-navbar";
import { ChartTest } from "./_components/chart";
import { getTasksStats, getTimeTrackingStats } from "./actions";
import { TimeChart } from "./_components/time-chart";

export default async function Home() {
  const data = await getTasksStats();
  const time = await getTimeTrackingStats();
  return (
    <>
      <SidebarNavbar
        items={[
          {
            label: "Home",
          },
        ]}
      />
      <div className="flex w-full gap-6">
        <TimeChart data={time || []} />
        <ChartTest
          completed={data?.completed || 0}
          inProgress={data?.inProgress || 0}
          todo={data?.todo || 0}
        />
      </div>
    </>
  );
}
