import React from "react";
import Styles from "../../Posts/Header/index.module.scss";
import FilterListIcon from "@material-ui/icons/FilterList";
import RefreshIcon from "@material-ui/icons/Refresh";

const Index = ({ handleRefresh, setFlagFilter }) => {
  return (
    <>
      <div className={Styles["header"]}>
        <div></div>

        <div className={Styles["icon"]}>
          <FilterListIcon onClick={() => setFlagFilter((prev) => !prev)} />

          <RefreshIcon
            onClick={() => handleRefresh()}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
    </>
  );
};

export default Index;
