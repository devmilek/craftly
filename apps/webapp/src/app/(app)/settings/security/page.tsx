import SidebarNavbar from "@/components/global/sidebar/sidebar-navbar";
import { AnnotatedSection } from "@/components/ui/annotated";
import React from "react";
import ConnectedAccountsCard from "./_components/connected-accounts-card";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Separator } from "@/components/ui/separator";
import ChangePasswordForm from "@/components/forms/change-password-form";
import MultiFactorCard from "./_components/multi-factor-card";
import { getCurrentSession } from "@/lib/auth/utils";
import PasskeysCard from "./_components/passkeys-card";

const SecuritySettingsPage = async () => {
  const accounts = await auth.api.listUserAccounts({
    headers: await headers(),
  });

  const { user } = await getCurrentSession();

  const isPasswordSet = accounts.some(
    (account) => account.provider === "credential"
  );

  const passkeys = await auth.api.listPasskeys({
    headers: await headers(),
  });

  return (
    <>
      <SidebarNavbar
        items={[
          { label: "Settings", href: "/settings" },
          {
            label: "Security",
          },
        ]}
      />
      <div className="space-y-16 pb-16">
        <AnnotatedSection
          title="Change password"
          description="To make an update, enter your existing password followed by a new one. If you don't know your existing password, logout and use the forgot password link."
        >
          <ChangePasswordForm isPasswordSet={isPasswordSet} />
        </AnnotatedSection>
        <Separator />
        <AnnotatedSection
          title="Connected accounts"
          description="Sign up faster to your account by linking it to Google, Facebbok or Github."
        >
          <ConnectedAccountsCard accounts={accounts} />
        </AnnotatedSection>
        <Separator />
        <AnnotatedSection
          title="Multi-factor authentication"
          description="Add an extra layer of security to your login by requiring an additional factor."
        >
          <MultiFactorCard twoFactorEnabled={!!user?.twoFactorEnabled} />
        </AnnotatedSection>
        <Separator />
        <AnnotatedSection
          title="Passkeys"
          description="Use biometrics or device PIN to sign in without a password. Passkeys are more secure than passwords and protect against phishing attacks."
        >
          <PasskeysCard passkeys={passkeys} />
        </AnnotatedSection>
      </div>
    </>
  );
};

export default SecuritySettingsPage;
