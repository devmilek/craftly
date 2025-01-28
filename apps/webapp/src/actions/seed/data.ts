"use server";

import { getCurrentSession } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import {
  ContactInsert,
  contacts as dbContacts,
  clients as dbClients,
  projects as dbProjects,
  tasks as dbTasks,
  ProjectInsert,
  projectStatus,
  TaskInsert,
  taskStatus,
  taskPriority,
} from "@/lib/db/schemas";
import { timeTrackings } from "@/lib/db/schemas/time-trackings";
import { faker } from "@faker-js/faker";
import { v4 } from "uuid";

export const generateData = async () => {
  const { organizationId, session } = await getCurrentSession();

  if (!session) {
    throw new Error("No session found");
  }

  if (!organizationId) {
    throw new Error("No organizationId found");
  }

  const howManyClients = 10;
  const contactsPerClient = {
    min: 5,
    max: 9,
  };
  const projectsPerClient = {
    min: 2,
    max: 7,
  };
  const tasksPerProject = {
    min: 4,
    max: 20,
  };
  const timeTrackingsPerTask = {
    min: 1,
    max: 3,
  };

  for (let i = 0; i < howManyClients; i++) {
    const clientId = v4();

    await db.insert(dbClients).values({
      name: faker.company.name(),
      organizationId,
      id: clientId,
    });

    // insert contacts
    const contacts: ContactInsert[] = Array.from(
      { length: faker.number.int(contactsPerClient) },
      () => ({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        position: faker.person.jobTitle(),
        organizationId,
        clientId,
      })
    );

    await db.insert(dbContacts).values(contacts);

    for (let i = 0; i < faker.number.int(projectsPerClient); i++) {
      const projectId = v4();
      const project: ProjectInsert = {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        clientId,
        organizationId,
        status: faker.helpers.arrayElement(projectStatus),
        dueDate: faker.date.soon(),
        id: projectId,
      };

      await db.insert(dbProjects).values(project);

      for (let i = 0; i < faker.number.int(tasksPerProject); i++) {
        const taskId = v4();
        const task: TaskInsert = {
          name: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          organizationId,
          dueDate: faker.date.soon(),
          status: faker.helpers.arrayElement(taskStatus),
          priority: faker.helpers.arrayElement(taskPriority),
          projectId,
          id: taskId,
        };

        await db.insert(dbTasks).values(task);

        // insert time tracking

        for (let i = 0; i < faker.number.int(timeTrackingsPerTask); i++) {
          await db.insert(timeTrackings).values({
            userId: session.userId,
            organizationId,
            projectId,
            taskId,
            date: faker.date.recent(),
            totalSeconds: faker.number.int({ min: 60 * 30, max: 60 * 60 * 8 }),
          });
        }
      }
    }
  }
};
