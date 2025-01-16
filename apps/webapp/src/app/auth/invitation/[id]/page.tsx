import { Icons } from "@/components/global/icons";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { AlertTriangle } from "lucide-react";
import { format } from "date-fns";
import InvitationButtons from "./_components/invitation-buttons";

export const metadata: Metadata = {
  title: "Join Organization",
};

const SignInPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  // const { user } = await getCurrentSession();

  try {
    const invitation = await auth.api.getInvitation({
      headers: await headers(),
      query: {
        id,
      },
    });

    return (
      <div className="max-w-md w-full shadow-lg bg-accent rounded-xl border overflow-hidden">
        <div className="px-10 py-8 bg-background rounded-xl border-b">
          <header className="text-center mb-6">
            <Icons.bigLogo className="w-36 mx-auto mb-6" />
            <h1 className="font-bold text-xl">Join the organization</h1>
            <p className="text-muted-foreground text-sm mt-1">
              <strong>{invitation.inviterEmail}</strong> has invited you to join{" "}
              <strong>{invitation.organizationName}</strong>
            </p>
          </header>
          <div className="bg-accent/20 p-4 rounded-lg space-y-2 mb-4">
            <p className="text-sm">
              <span className="text-muted-foreground">Role:</span>{" "}
              <span className="capitalize">{invitation.role}</span>
            </p>
            <p className="text-sm">
              <span className="text-muted-foreground">Email:</span>{" "}
              {invitation.email}
            </p>
            <p className="text-sm">
              <span className="text-muted-foreground">Expires:</span>{" "}
              {format(invitation.expiresAt, "PPP")}
            </p>
          </div>
          <InvitationButtons id={id} />
        </div>
        <div className="text-center py-4 text-sm text-muted-foreground">
          Don&apos;t want to join?{" "}
          <Link href="/" className="text-primary font-medium">
            Back to home
          </Link>
        </div>
      </div>
    );
  } catch (error) {
    console.error(error);
    return (
      <div className="max-w-md w-full shadow-lg bg-gray-50 rounded-xl border overflow-hidden">
        <div className="px-10 py-8 bg-white rounded-xl border-b">
          <header className="text-center mb-6 flex flex-col items-center">
            <AlertTriangle className="size-6 mx-auto mb-3" />
            <h1 className="font-bold text-xl">Invitation Error</h1>
            <p className="text-muted-foreground text-sm mt-1">
              You must be signed in with the same email address used in the
              invitation to continue.
            </p>
          </header>
        </div>
        <div className="text-center py-4 text-sm text-muted-foreground">
          Don’t have an account?{" "}
          <Link href="/auth/sign-up" className="text-primary font-medium">
            Sign up
          </Link>
        </div>
      </div>
    );
  }
};

export default SignInPage;
