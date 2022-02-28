import React, { useState } from "react";

import FilterItems from "./FilterItems";
import Header from "./Header";
import Tables from "./Tables/index";


export default function Index({
  data,
  apiCallClubMember,
  national_id,
  setNational_id,
  stateReducerClubMember,
  stateReducerSummaries,
 
}) {
  const [flagFilter, setflagFilter] = useState(false);
  const [totall, settotall] = useState();

  const handleFilter = () => {
    apiCallClubMember(national_id);
  };

  return (
    <div>
      <Header
        handelShowFilterItems={() => setflagFilter((prev) => !prev)}
        apiCallClubMember={apiCallClubMember}
        national_id={national_id}
        setNational_id={setNational_id}
        stateReducerClubMember={stateReducerClubMember}
        totall={totall}
        
      />
      <FilterItems flagFilter={flagFilter} handleFilter={handleFilter} />
      <Tables
        settotall={settotall}
        flagFilter={flagFilter}
        data={data}
        stateReducerSummaries={stateReducerSummaries}
      />
    </div>
  );
}
