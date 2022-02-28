import React, { useEffect, useState } from "react";
import Header from "./Header";
import Filter from "./Filter";
import Table from "./table";
import { useDispatch, useSelector } from "react-redux";
import { logInList_select_log } from "../../../boot/api/LogInlist/action";
import { dateMiladi } from "../../Common/method/date";

let initState = {
  member_first_name: "",
  member_last_name: "",
  member_national_id: "",
  member_phone: "",
  from_date: "",
  to_date: "",
  member_automation_id: "",
  member_bourse_code: "",
  member_username: "",
};

let flag = false;

const Index = () => {
  const [flagFilter, setFlagFilter] = useState(false);
  const [stateFilter, setStateFilter] = useState(initState);
  const [pageTab1, setPageTab1] = useState(1);
  const [sort, setSort] = useState({});


  const dispatch = useDispatch();

  const logInReducer = useSelector((state) => state.logInList_select_reducer);

  //   console.log("stateFilter",stateFilter.from_date)

  const size = logInReducer.size;

  const apiSelect = () => {

    let { id, ...sortRes } = sort;
    let obj = {};
    Object.keys(stateFilter).forEach((element) => {
      if (stateFilter[element]) {
        obj[element] = stateFilter[element];
      }
    });


    if (obj.from_date) {
      if (obj.from_date !== "") {
        obj.from_date = `${dateMiladi(obj.from_date)} ${"00:00:00.000000"}`;
      }
    }
    if (obj.to_date) {
      if (obj.to_date !== "") {
        obj.to_date = `${dateMiladi(obj.to_date)} ${"23:59:59.000000"}`;
      }
    }

    dispatch(logInList_select_log(size, pageTab1, obj,sortRes));
  };

  const handleChangeFilter = (data, type) => {
    setStateFilter((prev) => ({
      ...prev,
      [type]: data,
    }));
  };
  const handleRefresh = () => {
    setStateFilter(initState);
    setPageTab1(1);
    apiSelect();
  };

  const handelSubmitFilter = () => {
    apiSelect();
  };

  useEffect(() => {
    apiSelect();
  }, []);
  useEffect(() => {
    apiSelect();
  }, [pageTab1]);

  useEffect(() => {
    if (flag) {
        apiSelect();
    }
    flag = true
  }, [sort]);

  return (
    <>
      <Header setFlagFilter={setFlagFilter} handleRefresh={handleRefresh} />
      <Filter
        handelSubmitFilter={handelSubmitFilter}
        handleChangeFilter={handleChangeFilter}
        stateFilter={stateFilter}
        flagFilter={flagFilter}
      />
      <Table
        sort={sort}
        setSort={setSort}
        pageTab1={pageTab1}
        setPageTab1={setPageTab1}
        handleChangeFilter={handleChangeFilter}
        logInReducer={logInReducer}
        flagFilter={flagFilter}
      />
    </>
  );
};

export default Index;
