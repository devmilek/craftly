import { ensureSessionWithOrganization } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schemas";
import { and, eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import React from "react";
import RecentFiles from "./_components/recent-files";
import TimeTracking from "./_components/time-tracking";
import ProjectStats from "./_components/project-stats";

const ProjectDetailsScreen = async ({
  params,
}: {
  params: Promise<{ projectId: string }>;
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
    <div className="my-8">
      <section>
        <ProjectStats projectId={project.id} />
        <div className="flex gap-8 mt-8">
          <div className="w-full">
            <RecentFiles projectId={project.id} />
          </div>
          <div className="w-[600px]">
            <TimeTracking projectId={project.id} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetailsScreen;
