import { Badge, badgeVariants } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getInitials } from "@/lib/utils";
import { createColumnHelper } from "@tanstack/react-table";
import { CopyIcon, PhoneIcon } from "lucide-react";
import { formatPhoneNumberIntl } from "react-phone-number-input";
import { toast } from "sonner";
import { useCopyToClipboard } from "usehooks-ts";
import { ContactsTableProps } from ".";
import Link from "next/link";
import Image from "next/image";

const helper = createColumnHelper<ContactsTableProps>();

const EmailCell = ({ email }: { email: string }) => {
  const [, copy] = useCopyToClipboard();

  const onCopy = () => {
    copy(email);
    toast.success("Email copied to clipboard");
  };

  return (
    <div className="flex items-center gap-2">
      {email}
      <Button
        size="icon"
        variant="outline"
        onClick={onCopy}
        className="size-6 [&_svg]:size-3"
      >
        <CopyIcon />
      </Button>
    </div>
  );
};

export const columns = [
  helper.accessor("name", {
    id: "name",
    header: "Name",
    enableHiding: false,
    cell: (info) => (
      <div className="flex items-center gap-3">
        <div className="size-10 p-0.5 rounded-full border border-dashed bg-background flex items-center justify-center uppercase leading-none font-medium text-sm shadow">
          {info.row.original.avatarSrc ? (
            <>
              <Image
                src={info.row.original.avatarSrc}
                alt={info.getValue()}
                width={40}
                height={40}
                className="rounded-full object-cover size-full"
                unoptimized
              />
            </>
          ) : (
            getInitials(info.getValue())
          )}
        </div>
        <div>
          <p className="text-sm font-medium">{info.getValue()}</p>
          <p className="text-sm text-muted-foreground">
            {info.row.original.position}
          </p>
        </div>
      </div>
    ),
  }),
  helper.accessor("email", {
    id: "email",
    header: "Email",
    cell: (info) => <EmailCell email={info.getValue()} />,
    enableHiding: false,
  }),
  helper.accessor("phone", {
    id: "phone",
    header: "Phone",
    enableHiding: false,
    cell: (info) => {
      const phoneNumber = info.getValue();
      return (
        <>
          {phoneNumber ? (
            <Badge variant="secondary">
              <PhoneIcon className="size-3 mr-2" />
              {formatPhoneNumberIntl(phoneNumber) || phoneNumber}
            </Badge>
          ) : (
            <>-</>
          )}
        </>
      );
    },
  }),
  helper.accessor("clientName", {
    id: "company",
    header: "Company",
    enableHiding: false,
    cell: (info) => {
      const phoneNumber = info.getValue();
      return (
        <>
          {phoneNumber ? (
            // <Badge variant="secondary">
            //   <PhoneIcon className="size-3 mr-2" />
            //   {formatPhoneNumberIntl(phoneNumber)}
            // </Badge>
            <Link
              href={`/clients/${info.row.original.clientId}`}
              className={badgeVariants({
                variant: "secondary",
              })}
            >
              {phoneNumber}
            </Link>
          ) : (
            <>-</>
          )}
        </>
      );
    },
  }),
];
