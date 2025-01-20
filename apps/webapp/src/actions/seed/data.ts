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
  const contactsPerClient = 7;
  const projectsPerClient = 5;
  const tasksPerProject = {
    min: 4,
    max: 20,
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
      { length: contactsPerClient },
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

    // insert projects
    const projects: ProjectInsert[] = Array.from(
      { length: projectsPerClient },
      () => ({
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        clientId,
        organizationId,
        status: faker.helpers.arrayElement(projectStatus),
        dueDate: faker.date.soon(),
      })
    );

    await db.insert(dbProjects).values(projects);

    for (let i = 0; i < projectsPerClient; i++) {
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

      // insert tasks
      const tasks: TaskInsert[] = Array.from(
        { length: faker.number.int(tasksPerProject) },
        () => ({
          name: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          organizationId,
          dueDate: faker.date.soon(),
          status: faker.helpers.arrayElement(taskStatus),
          priority: faker.helpers.arrayElement(taskPriority),
          projectId,
        })
      );

      await db.insert(dbTasks).values(tasks);
    }
  }
};
