import React from "react";
import Styles from "./index.module.scss";

import LinearProgress from "./LinearProgress";
import Tables from "./Tables";

export default function Index({
  idCompetitions,
  reducerPerformanceById,
  apisperformanceSelectById,
  apiParticipationsByIdEmpty,
  apiParticipationsSelect,
  apiParticipationsEmpty,
  reducerParticipations,
  setPageTab2,
  pageTab2
}) {
  return (
    <div className={Styles["Separation"]}>
      <div className={Styles["gird1"]}>
        <LinearProgress
          idCompetitions={idCompetitions}
          reducerPerformanceById={reducerPerformanceById}
          apisperformanceSelectById={apisperformanceSelectById}
          apiParticipationsByIdEmpty={apiParticipationsByIdEmpty}
          apiParticipationsSelect={apiParticipationsSelect}
          apiParticipationsEmpty={apiParticipationsEmpty}
        />
      </div>
      <div className={Styles["gird"]}>
        <Tables
          setPageTab2={setPageTab2}
          pageTab2={pageTab2}
          reducerParticipations={reducerParticipations}
          apiParticipationsEmpty={apiParticipationsEmpty}
        />
      </div>
    </div>
  );
}
