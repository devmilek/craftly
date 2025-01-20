import SidebarNavbar from "@/components/global/sidebar/sidebar-navbar";
import React from "react";
import Header from "./_components/header";
import DataTable from "./_components/data-table";
import TablePagination from "./_components/table-pagination";

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
      {/* <TablePagination itemsPerPage={10}  /> */}
    </>
  );
};

export default ContactsPage;
