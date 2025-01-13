import React from "react";

const ClientDetailsScreen = async ({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) => {
  const clientId = (await params).clientId;

  return (
    <div>
      <div>ClientDetailsScreen</div>
      <div>{clientId}</div>
    </div>
  );
};

export default ClientDetailsScreen;
