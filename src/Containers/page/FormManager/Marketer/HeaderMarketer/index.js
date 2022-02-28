import React from "react";
import Styles from "../../../Posts/Header/index.module.scss";
import FilterListIcon from "@material-ui/icons/FilterList";
import RefreshIcon from "@material-ui/icons/Refresh";

const HeaderUsers = ({ handleRefresh, setFlagFilter }) => {
  return (
    <>
      <div className={Styles["header"]}>
        <div></div>
        <div className={Styles["icon"]}>
          <FilterListIcon
            onClick={() =>
              // alert("در این ورژن در دسترس نیست")
              setFlagFilter((prev) => !prev)
            }
            // color="disabled"
          />

          <RefreshIcon
            onClick={() => handleRefresh()}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
    </>
  );
};

export default HeaderUsers;
