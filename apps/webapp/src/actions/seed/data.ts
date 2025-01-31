"use server";

import { getCurrentSession } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import {
  contacts as dbContacts,
  clients as dbClients,
  projects as dbProjects,
  tasks as dbTasks,
  projectStatus,
  taskStatus,
  taskPriority,
  members,
  taskAssignees,
} from "@/lib/db/schemas";
import { timeTrackings } from "@/lib/db/schemas/time-trackings";
import { faker } from "@faker-js/faker";
import axios from "axios";
import { v4 } from "uuid";
import { serverAvatarUpload } from "../storage";
import { and, eq } from "drizzle-orm";

export const generateData = async () => {
  const { organizationId, session } = await getCurrentSession();

  if (!session?.userId || !organizationId) {
    throw new Error("Invalid session or organization");
  }

  const member = await db.query.members.findFirst({
    where: and(
      eq(members.userId, session.userId),
      eq(members.organizationId, organizationId)
    ),
  });

  const config = {
    clients: 10,
    contacts: { min: 5, max: 9 },
    projects: { min: 2, max: 7 },
    tasks: { min: 4, max: 20 },
    timeTracking: { min: 1, max: 3 },
  };

  // Prepare batch arrays
  const clientsBatch = [];
  const contactsBatch = [];
  const projectsBatch = [];
  const tasksBatch = [];
  const taskAssigneesBatch = [];
  const timeTrackingsBatch = [];

  // Pre-fetch some avatars to reuse
  const avatarCount = 10;
  const avatarUrls = await Promise.all(
    Array(avatarCount)
      .fill(0)
      .map(async () => {
        const avatarData = await axios.get("https://i.pravatar.cc/300", {
          responseType: "arraybuffer",
        });
        const { fileId } = await serverAvatarUpload({
          file: new File([Buffer.from(avatarData.data)], "avatar.jpeg"),
          organizationId,
        });
        return fileId;
      })
  );

  // Generate all data structures first
  for (let i = 0; i < config.clients; i++) {
    const clientId = v4();
    clientsBatch.push({
      name: faker.company.name(),
      organizationId,
      id: clientId,
    });

    const contactCount = faker.number.int(config.contacts);
    for (let j = 0; j < contactCount; j++) {
      contactsBatch.push({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        position: faker.person.jobTitle(),
        organizationId,
        clientId,
        id: v4(),
        avatarId: avatarUrls[j % avatarUrls.length],
      });
    }

    const projectCount = faker.number.int(config.projects);
    for (let j = 0; j < projectCount; j++) {
      const projectId = v4();
      projectsBatch.push({
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        clientId,
        organizationId,
        status: faker.helpers.arrayElement(projectStatus),
        dueDate: faker.date.soon(),
        id: projectId,
      });

      const taskCount = faker.number.int(config.tasks);
      for (let k = 0; k < taskCount; k++) {
        const taskId = v4();
        tasksBatch.push({
          name: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          organizationId,
          dueDate: faker.date.soon(),
          status: faker.helpers.arrayElement(taskStatus),
          priority: faker.helpers.arrayElement(taskPriority),
          projectId,
          id: taskId,
        });

        if (member) {
          taskAssigneesBatch.push({
            userId: member.userId,
            taskId,
          });
        }

        const timeTrackingCount = faker.number.int(config.timeTracking);
        for (let l = 0; l < timeTrackingCount; l++) {
          timeTrackingsBatch.push({
            userId: session.userId,
            organizationId,
            projectId,
            taskId,
            date: faker.date.recent({ days: 90 }),
            totalSeconds: faker.number.int({ min: 60 * 30, max: 60 * 60 * 8 }),
          });
        }
      }
    }
  }

  // Perform batch inserts
  await db.insert(dbClients).values(clientsBatch);
  await db.insert(dbContacts).values(contactsBatch);
  await db.insert(dbProjects).values(projectsBatch);
  await db.insert(dbTasks).values(tasksBatch);
  await db.insert(taskAssignees).values(taskAssigneesBatch);
  await db.insert(timeTrackings).values(timeTrackingsBatch);
};
