import SidebarNavbar from "@/components/global/sidebar/sidebar-navbar";
import React from "react";
import Header from "./_components/header";
import ContactsView from "./_components/contacts-view";

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
      <ContactsView />
    </>
  );
};

export default ContactsPage;
