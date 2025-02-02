import React from "react";
import SidebarNavbar from "@/components/global/sidebar/sidebar-navbar";
import AvatarUploader from "@/components/ui/avatar-uploader";
import { ensureSessionWithOrganization } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schemas";
import { and, eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import ProjectStatusDropdown from "../../../../components/views/projects-view/project-status-dropdown";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import ProjectTabs from "./_components/project-tabs";

const ProjectDetailsLayout = async ({
  params,
  children,
}: {
  params: Promise<{ projectId: string }>;
  children: React.ReactNode;
}) => {
  const projectId = (await params).projectId;
  const { organizationId } = await ensureSessionWithOrganization();

  const project = await db.query.projects.findFirst({
    where: and(
      eq(projects.organizationId, organizationId),
      eq(projects.id, projectId)
    ),
  });

  if (!project) {
    notFound();
  }

  return (
    <>
      <SidebarNavbar
        items={[
          {
            label: "Projects",
            href: "/projects",
          },
          {
            label: project.name,
            href: `/projects/${projectId}`,
          },
        ]}
      />
      <header className="flex items-center justify-between pb-8">
        <div className="flex items-center gap-4">
          <AvatarUploader onValueChange={() => {}} fallback={project.name} className="size-24" />
          <h1 className="text-2xl font-semibold max-w-md">{project.name}</h1>
        </div>
        <div className="flex items-center gap-2">
          <ProjectStatusDropdown
            projectId={project.id}
            status={project.status}
          />
          <Button size="icon" variant="outline">
            <MoreHorizontal />
          </Button>
        </div>
      </header>
      <ProjectTabs />
      {children}
    </>
  );
};

export default ProjectDetailsLayout;
