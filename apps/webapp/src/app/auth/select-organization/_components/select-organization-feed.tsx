// "use client";

// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { organization } from "@/lib/auth/auth-client";
// import { ChevronRight } from "lucide-react";
// import { useRouter } from "next/navigation";
// import React from "react";
// import { toast } from "sonner";

// const SelectOrganizationFeed = ({ orgs }: { orgs: Organization[] }) => {
//   const { push } = useRouter();
//   const onClick = async (orgId: string) => {
//     const { error } = await organization.setActive({
//       organizationId: orgId,
//     });

//     if (error) {
//       console.error(error);
//       toast.error(error.message);
//       return;
//     }

//     push("/app");
//   };
//   return (
//     <div>
//       {orgs.map((org) => (
//         <div
//           key={org.id}
//           className="px-4 py-3 border rounded-xl hover:bg-accent transition-colors flex items-center gap-4 cursor-pointer"
//           onClick={() => onClick(org.id)}
//         >
//           <Avatar className="">
//             <AvatarFallback>{org.name[0]}</AvatarFallback>
//           </Avatar>
//           {org.name}
//           <ChevronRight className="ml-auto size-4" />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default SelectOrganizationFeed;
