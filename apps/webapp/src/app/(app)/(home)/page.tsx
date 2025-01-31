import SidebarNavbar from "@/components/global/sidebar/sidebar-navbar";
import { ChartTest } from "./_components/chart";
import { db } from "@/lib/db";
import { taskAssignees, tasks } from "@/lib/db/schemas";
import { and, eq } from "drizzle-orm";
import { ensureSessionWithOrganization } from "@/lib/auth/utils";

export default async function Home() {
  const { user } = await ensureSessionWithOrganization();
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
