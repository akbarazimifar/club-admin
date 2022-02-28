import React from "react";
import Styles from "../../../Posts/Header/index.module.scss";
import FilterListIcon from "@material-ui/icons/FilterList";
import RefreshIcon from "@material-ui/icons/Refresh";
import ButtonDetails from "../buttonDetails/ButtonDetails";

const HeaderUsers = ({ handleRefresh, setFlagFilter }) => {

  return (
    <>
      <div className={Styles["header"]}>
        <div>
          <ButtonDetails
            info={{
              title: "افزودن سهم جدید",
              className: "btnsBlue",
              modal: "ModalInsert",
            }}
          />
        </div>

        <div className={Styles["icon"]}>
          <FilterListIcon
            onClick={() =>

              setFlagFilter((prev) => !prev)
            }
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


