import { betterAuth } from "better-auth";
import { organization, twoFactor } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";
import { sendMail } from "../nodemailer";
import { passkey } from "better-auth/plugins/passkey";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
  }),
  appName: "Craftly",
  advanced: {
    cookiePrefix: "craftly",
  },
  plugins: [
    organization({
      sendInvitationEmail: async ({
        email,
        inviter,
        organization,
        role,
        id,
      }) => {
        await sendMail({
          to: email,
          subject: `You have been invited to join ${organization.name}`,
          text: `Hi there! ${inviter.user.name} has invited you to join ${organization.name} as a ${role}. Click the link to accept: http://localhost:3003/auth/accept-invitation/${id}`,
        });
      },
    }),
    twoFactor(),
    passkey({
      rpID: "localhost",
      rpName: "Craftly",
      origin: "http://localhost:3003",
    }),
  ],
  user: {
    changeEmail: {
      enabled: true,
      sendChangeEmailVerification: async ({ user, newEmail, url }) => {
        await sendMail({
          to: newEmail,
          subject: `Hi ${user.name}, please verify your new email address`,
          text: `Click the link to verify: ${url}`,
        });
      },
    },
  },
  account: {
    accountLinking: {
      enabled: true,
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await sendMail({
        to: user.email,
        subject: "Reset your password",
        text: `Click the link to reset your password: ${url}`,
      });
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await sendMail({
        to: user.email,
        subject: "Verify your email address",
        text: `Click the link to verify your email: ${url}`,
      });
    },
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
  },
  rateLimit: {
    enabled: true,
    customRules: {
      "/send-verification-email": {
        max: 1,
        window: 60,
      },
      "/forget-password": {
        max: 1,
        window: 120,
      },
    },
  },
  trustedOrigins: ["http://127.0.0.1:3003"]
});
