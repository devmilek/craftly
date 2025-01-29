import { createAuthClient } from "better-auth/react";
import {
  organizationClient,
  twoFactorClient,
  passkeyClient,
} from "better-auth/client/plugins";

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
  changeEmail,
  linkSocial,
  unlinkAccount,
  useActiveOrganization,
  twoFactor,
  passkey,
} = createAuthClient({
  baseURL: "http://localhost:3003", // the base url of your auth server
  plugins: [organizationClient(), twoFactorClient(), passkeyClient()],
});
