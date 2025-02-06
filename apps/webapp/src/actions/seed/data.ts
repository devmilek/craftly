"use server";

import { getCurrentSession } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import {
  contacts as dbContacts,
  clients as dbClients,
  projects as dbProjects,
  tasks as dbTasks,
  subtasks as dbSubtasks,
  projectStatus,
  taskStatus,
  taskPriority,
  members,
  invoices,
  InvoiceInsert,
  ExpenseInsert,
  TaskInsert,
  SubtaskInsert,
} from "@/lib/db/schemas";
import {
  TimeTrackingInsert,
  timeTrackings,
} from "@/lib/db/schemas/time-trackings";
import { faker } from "@faker-js/faker";
import axios from "axios";
import { v4 } from "uuid";
import { serverAvatarUpload } from "../storage";
import { and, eq } from "drizzle-orm";
import { projectsData, tasksData } from "./rawData";

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
    subtasks: { min: 1, max: 7 },
    timeTracking: { min: 1, max: 3 },
    invoices: { min: 5, max: 10 },
    expenses: { min: 5, max: 10 },
  };

  const localTasksData = tasksData;
  let localTasksIndex = 0;

  const localProjectsData = projectsData;
  let localProjectsIndex = 0;

  // Prepare batch arrays
  const clientsBatch = [];
  const contactsBatch = [];
  const projectsBatch = [];
  const tasksBatch: TaskInsert[] = [];
  const subtasksBatch: SubtaskInsert[] = [];
  const timeTrackingsBatch: TimeTrackingInsert[] = [];
  const invoicesBatch: InvoiceInsert[] = [];
  const expensesBatch: ExpenseInsert[] = [];

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
        name: localProjectsData[localProjectsIndex % localProjectsData.length],
        description: faker.commerce.productDescription(),
        clientId,
        organizationId,
        status: faker.helpers.arrayElement(projectStatus),
        dueDate: faker.date.soon({
          days: 30,
        }),
        id: projectId,
      });

      localProjectsIndex++;

      const invoicesCount = faker.number.int(config.invoices);
      for (let k = 0; k < invoicesCount; k++) {
        const invoiceId = v4();
        invoicesBatch.push({
          organizationId,
          projectId,
          amount: faker.finance.amount(),
          dueDate: faker.date.between({
            from: faker.date.recent({ days: 30 }),
            to: faker.date.soon({ days: 30 }),
          }),
          id: invoiceId,
          name: faker.commerce.productName(),
          paid: faker.datatype.boolean(),
        });
      }

      const expensesCount = faker.number.int(config.expenses);
      for (let k = 0; k < expensesCount; k++) {
        expensesBatch.push({
          amount: faker.finance.amount(),
          name: faker.commerce.productName(),
          reimbursable: faker.datatype.boolean(),
          reimbursed: faker.datatype.boolean(),
          id: v4(),
        });
      }

      const taskCount = faker.number.int(config.tasks);
      for (let k = 0; k < taskCount; k++) {
        const taskId = v4();
        tasksBatch.push({
          name: localTasksData[localTasksIndex % localTasksData.length],
          description: faker.commerce.productDescription(),
          organizationId,
          dueDate: faker.date.soon({
            days: 5,
          }),
          status: faker.helpers.arrayElement(taskStatus),
          priority: faker.helpers.arrayElement(taskPriority),
          projectId,
          id: taskId,
          assigneeId: member?.userId,
        });

        localTasksIndex++;

        if (faker.datatype.boolean()) {
          const subtasksCount = faker.number.int(config.subtasks);
          for (let l = 0; l < subtasksCount; l++) {
            subtasksBatch.push({
              name: faker.commerce.productName(),
              taskId,
              id: v4(),
              completed: faker.datatype.boolean()
                ? faker.date.recent({ days: 5 })
                : null,
            });
          }
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
            //billable rate null or random
            billableRate: faker.datatype.boolean()
              ? faker.finance.amount({
                  max: 100,
                  min: 10,
                })
              : null,
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
  await db.insert(dbSubtasks).values(subtasksBatch);
  await db.insert(timeTrackings).values(timeTrackingsBatch);
  await db.insert(invoices).values(invoicesBatch);
};
