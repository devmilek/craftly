import { createAuthClient } from "better-auth/react";
import { organizationClient } from "better-auth/client/plugins";

export const {
  signIn,
  signUp,
  getSession,
  useSession,
  changePassword,
  listSessions,
  revokeSession,
  signOut,
  sendVerificationEmail,
  forgetPassword,
  resetPassword,
  organization,
  useActiveOrganization,
} = createAuthClient({
  baseURL: "http://localhost:3000", // the base url of your auth server
  plugins: [organizationClient()],
});
