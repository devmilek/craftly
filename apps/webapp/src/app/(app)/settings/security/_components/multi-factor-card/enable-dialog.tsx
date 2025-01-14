"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CodeForm } from "./code-form";
import PasswordForm from "./password-form";

const EnableDialog = () => {
  const [open, setOpen] = React.useState(false);
  const [totpUri, setTotpUri] = React.useState<string | null>(null);
  const [recoveryCodes, setRecoveryCodes] = React.useState<string[]>([]);
  const [showRecoveryCodes, setShowRecoveryCodes] = React.useState(false);

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(val) => {
          setOpen(val);
          setTotpUri(null);
          setRecoveryCodes([]);
        }}
      >
        <DialogTrigger asChild>
          <Button size="sm" variant="outline">
            Enable
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enable Authenticator app</DialogTitle>
            <DialogDescription>
              Using an authenticator app like{" "}
              <strong>Google Authenticator</strong>,{" "}
              <strong>Microsoft Authenticator</strong> or{" "}
              <strong>1Password</strong> scan this QR code. It will generate a 6
              digit code for you to enter below.
            </DialogDescription>
          </DialogHeader>
          {totpUri ? (
            <CodeForm
              totpUri={totpUri}
              onSuccess={() => {
                setTotpUri(null);
                setOpen(false);
                setShowRecoveryCodes(true);
              }}
            />
          ) : (
            <PasswordForm
              setData={(totpUri, recoveryCodes) => {
                setTotpUri(totpUri);
                setRecoveryCodes(recoveryCodes);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
      <RecoveryCodesDialog
        recoveryCodes={recoveryCodes}
        isOpen={showRecoveryCodes}
        onClose={() => setShowRecoveryCodes(false)}
      />
    </>
  );
};

const RecoveryCodesDialog = ({
  recoveryCodes,
  isOpen,
  onClose,
}: {
  recoveryCodes: string[];
  isOpen: boolean;
  onClose: () => void;
}) => {
  const onDownload = () => {
    // Create content with one code per line
    const content = recoveryCodes.join("\n");

    // Create blob
    const blob = new Blob([content], { type: "text/plain" });

    // Create download link
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "recovery-codes.txt";

    // Trigger download
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Recovery codes</DialogTitle>
          <DialogDescription>
            These codes can be used to access your account if you lose your
            authenticator app.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2 grid-cols-2 text-center pb-4">
          {recoveryCodes.map((code, index) => (
            <code key={index}>{code}</code>
          ))}
        </div>
        <DialogFooter>
          <Button onClick={onClose} variant="outline">
            Close
          </Button>
          <Button onClick={onDownload}>Download</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EnableDialog;
