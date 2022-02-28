import React, { useEffect, useState } from "react";
import FilterBox from "./FilterBox/FilterBox";
import TableUsers from "./tableusers/TableUsers";
import HeaderUsers from "./headerUsers/HeaderUsers";
import { useDispatch, useSelector } from "react-redux";
import { usersList_v1_select_actions } from "../../../boot/api/usersList/users_v1_list/action";
// import {seprateNumberFromComma} from "../../../Containers/Common/method/seprateNumberFromComma" 

let initState = {
  first_name: "",
  last_name: "",
  national_id: "",
  available_bonus: "",
  ref_code: "",
  phone: "",
  email: "",
  category: "",
  introducing_branch_id: "",
  branch_city:"",
  branch_province : ""
};

let flag = false;
// let flagRefresh = false;

const UsersList = () => {
  //state

  const [flagFilter, setFlagFilter] = useState(false);
  const [stateFilter, setStateFilter] = useState(initState);
  const [pageTab1, setPageTab1] = useState(1);
  const [sort, setSort] = useState({});

  let { id, ...sortRes } = sort;

  // let flagRefresh = false;

  // hooks
  const data = useSelector((state) => state.usersList_v1_list_Reducer);
  const dispatch = useDispatch();
  let size = data.size;
  useEffect(() => {
    apiUsersListSelect();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  //functions
  const handleRefresh = () => {
    setStateFilter(initState);

    if (pageTab1 !== 1) {
      setSort({});
      setPageTab1(1);
    } else {
      setSort({});
    }
  };

  const apiUsersListSelect = () => {
    let obj = {};

    Object.keys(stateFilter).forEach((element) => {
      if (stateFilter[element]) {
        obj[element] = stateFilter[element];
      }
    });

    dispatch(usersList_v1_select_actions(size, pageTab1, obj, sortRes));
  };

  const handleChangeFilter = (data, type) => {
    setStateFilter((prev) => ({
      ...prev,
      [type]: data,
    }));
  };

  const handelSubmitFilter = () => {
    if (pageTab1 !== 1) {
      setPageTab1(1);
    } else {
      apiUsersListSelect();
    }
  };

  useEffect(() => {
    if (flag) apiUsersListSelect();

    flag = true;
  }, [sort]); //eslint-disable-line react-hooks/exhaustive-deps

  const handleNull = (key) => {
    if (key === null || key === "" || key === "null") {
      return "_";
    } else {
      return key;
    }
  };

  
  return (
    <>
      <HeaderUsers
        handleRefresh={handleRefresh}
        setFlagFilter={setFlagFilter}
        stateFilter={stateFilter}
      // setFlagContent={() => flagContent === "CONTENT" ? setFlagContent("CATEGORY") : setFlagContent("CONTENT")}
      />
      <FilterBox
        flagFilter={flagFilter}
        stateFilter={stateFilter}
        handleChangeFilter={handleChangeFilter}
        handelSubmitFilter={handelSubmitFilter}
      />
      {/*<Table flagFilter={flagFilter} />*/}
      {
        <TableUsers
          flagFilter={flagFilter}
          data={data}
          apiUsersListSelect={apiUsersListSelect}
          handleNull={handleNull}
          pageTab1={pageTab1}
          setPageTab1={setPageTab1}
          sort={sort}
          setSort={setSort}
        />
      }
    </>
  );
};

export default UsersList;
