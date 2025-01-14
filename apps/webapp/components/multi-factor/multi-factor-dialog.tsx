import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import MultiFactorPasswordForm from "./multi-factor-password-form";
import MultiFactorCodeForm from "./multi-factor-code-form";

interface MultiFactorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  totpUri: string | null;
  code: string;
  setCode: (value: string) => void;
  loading: boolean;
  onVerify: () => void;
  onEnable: (password: string) => Promise<void>;
}

const MultiFactorDialog: React.FC<MultiFactorDialogProps> = ({
  open,
  onOpenChange,
  totpUri,
  code,
  setCode,
  loading,
  onVerify,
  onEnable,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enable Authenticator App</DialogTitle>
          <DialogDescription>
            Using an authenticator app, scan the QR code to generate a 6-digit
            code for verification.
          </DialogDescription>
        </DialogHeader>
        {totpUri ? (
          <MultiFactorCodeForm
            totpUri={totpUri}
            code={code}
            setCode={setCode}
            loading={loading}
            onVerify={onVerify}
          />
        ) : (
          <MultiFactorPasswordForm onEnable={onEnable} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MultiFactorDialog;