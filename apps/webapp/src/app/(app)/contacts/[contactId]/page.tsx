import React from "react";

const ContactDetailsScreen = async ({
  params,
}: {
  params: Promise<{ contactId: string }>;
}) => {
  const contactId = (await params).contactId;

  return (
    <div>
      <div>ClientDetailsScreen</div>
      <div>{contactId}</div>
    </div>
  );
};

export default ContactDetailsScreen;
