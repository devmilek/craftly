import SidebarNavbar from "@/components/global/sidebar/sidebar-navbar";
import React from "react";
import Header from "./_components/header";

const ContactsPage = () => {
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
    </>
  );
};

export default ContactsPage;
