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
  updateUser,
  deleteUser,
  linkSocial,
  unlinkAccount,
  useActiveOrganization,
  twoFactor,
  passkey,
} = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
  plugins: [organizationClient(), twoFactorClient(), passkeyClient()],
});
