import SidebarNavbar from "@/components/global/sidebar/sidebar-navbar";
import { Metadata } from "next";
import React from "react";
import Header from "./_components/header";
import ClientsFeed from "./_components/clients-feed";

export const metadata: Metadata = {
  title: "Clients",
};

const ClientsPage = async () => {
  return (
    <>
      <SidebarNavbar
        items={[
          {
            label: "Clients",
          },
        ]}
      />
      <div className="">
        <Header />
        <ClientsFeed />
      </div>
    </>
  );
};

export default ClientsPage;
