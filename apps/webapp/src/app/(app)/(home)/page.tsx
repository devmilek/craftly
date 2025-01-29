import SidebarNavbar from "@/components/global/sidebar/sidebar-navbar";
import { ChartTest } from "./_components/chart";

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
      <ChartTest />
    </>
  );
}
