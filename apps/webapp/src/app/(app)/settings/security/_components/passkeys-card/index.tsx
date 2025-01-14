"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Passkey } from "better-auth/plugins/passkey";
import { cn } from "@/lib/utils";
import { KeyIcon } from "lucide-react";
import { passkey } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";

const PasskeysCard = ({ passkeys }: { passkeys: Passkey[] }) => {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const onRemove = async (id: string) => {
    const { error } = await passkey.deletePasskey({
      id,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Passkey removed successfully");
    router.refresh();
  };
  return (
    <div className="p-6">
      <header className="flex items-center justify-between">
        <h2 className="font-semibold">Your Passkeys</h2>
        <Button size="sm" variant="outline" onClick={() => setOpen(true)}>
          Add Passkeys
        </Button>
      </header>
      <div className="grid w-full">
        {passkeys.map((passkey, index) => (
          <div
            key={passkey.id}
            className={cn("py-5 flex gap-4 items-center", {
              "border-b": index !== passkeys.length - 1,
            })}
          >
            <KeyIcon className="size-4 flex-shrink-0" />
            <div className="w-full">
              <h4 className="text-sm font-semibold capitalize">
                {passkey.name}
              </h4>
              <p className="text-sm text-muted-foreground capitalize">
                {passkey.deviceType}
              </p>
            </div>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => onRemove(passkey.id)}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>
      <AddPasskeyModal open={open} setOpen={setOpen} />
    </div>
  );
};

const schema = z.object({
  name: z.string().min(1),
});

const AddPasskeyModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
    },
  });

  const onAdd = async (values: z.infer<typeof schema>) => {
    const res = await passkey.addPasskey({
      name: values.name,
    });

    if (res?.error) {
      toast.error(res.error.message);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Passkey</DialogTitle>
          <DialogDescription>
            Add a new passkey to your account. Passkeys are more secure than
            passwords and protect against phishing attacks.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onAdd)} className="grid gap-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button>Continue</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PasskeysCard;
