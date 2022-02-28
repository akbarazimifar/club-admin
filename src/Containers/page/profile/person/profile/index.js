import React from "react";
import Header from "./Header";
import Content from "./content";

export default function index({
  data,
  apiUpdateRoll,
  apiselectProfile,
  apiUpdatePassword,
  apiUpdateActivation,
  national_id,
  member_id,
}) {
  return (
    <div>
      <Header apiselectProfile={apiselectProfile} national_id={national_id} />

      <Content
        data={data}
        apiUpdateRoll={apiUpdateRoll}
        apiUpdatePassword={apiUpdatePassword}
        apiUpdateActivation={apiUpdateActivation}
        member_id={member_id}
      />
    </div>
  );
}
