import SidebarNavbar from "@/components/global/sidebar/sidebar-navbar";
import React from "react";
import Header from "./_components/header";
import DataTable from "./_components/data-table";

const ContactsPage = async () => {
  return (
    <>
      <SidebarNavbar
        items={[
          {
            label: "Contacts",
          },
        ]}
      />
      <Header />
      <DataTable />
    </>
  );
};

export default ContactsPage;
