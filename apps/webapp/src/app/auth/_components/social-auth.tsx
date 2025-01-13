"use client";

import React from "react";
import { signIn } from "@/lib/auth/auth-client";
import { Loader2 } from "lucide-react";
import { Icons } from "@/components/global/icons";
import { Button } from "@/components/ui/button";

const SocialAuth = () => {
  const [githubLoading, setGithubLoading] = React.useState(false);
  const [googleLoading, setGoogleLoading] = React.useState(false);
  const handleGitHubAuth = async () => {
    setGithubLoading(true);
    await signIn.social({
      provider: "github",
      callbackURL: "/app",
    });
    setGithubLoading(false);
  };

  const handleGoogleAuth = async () => {
    setGoogleLoading(true);
    await signIn.social({
      provider: "google",
      callbackURL: "/app",
    });
    setGoogleLoading(false);
  };
  return (
    <div className="grid grid-cols-2 gap-2">
      <Button
        variant="outline"
        onClick={handleGitHubAuth}
        disabled={githubLoading}
      >
        {githubLoading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <Icons.gitHub />
        )}
        <span>GitHub</span>
      </Button>
      <Button
        variant="outline"
        onClick={handleGoogleAuth}
        disabled={googleLoading}
      >
        {googleLoading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <Icons.google />
        )}
        <span>Google</span>
      </Button>
    </div>
  );
};

export default SocialAuth;
