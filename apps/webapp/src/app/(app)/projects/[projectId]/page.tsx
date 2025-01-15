import { ensureSessionWithOrganization } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schemas";
import { and, eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import StatsCard from "@/components/cards/stats-card";

const statsCards = [
  {
    title: "Unassigned",
    header: "42 tasks",
    description: "+38% new tasks this week",
  },
  {
    title: "To Do",
    header: "58 tasks",
    description: "38 planned for this week",
  },
  {
    title: "In Progress",
    header: "12 tasks",
    description: "+38% increase in activity",
  },
  {
    title: "Overdue",
    header: "12 tasks",
    description: "Longest overdue: 12 days",
  },
  {
    title: "Completed",
    header: "12 tasks",
    description: "+78% increase in activity",
  },
];

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
        <header className="flex items-center justify-between pb-4">
          <h2 className="text-xl font-semibold">Tasks</h2>
          <Button variant="ghost">
            Create
            <PlusIcon />
          </Button>
        </header>
        <div className="grid grid-cols-5 gap-4">
          {statsCards.map((card, index) => (
            <StatsCard
              heading={card.header}
              title={card.title}
              description={card.description}
              key={index}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProjectDetailsScreen;
