import React, { useEffect, useState } from "react";
import Table from "./table/Table";
import Header from "./header/Header";
import FilterBox from "./FilterBox/FilterBox";

import { useDispatch, useSelector } from "react-redux";
import { giftCash_v1_select_actions } from "../../../../boot/api/Definitions/gift/giftCash_v1_select/action";


let
  flag = false,
  initState = {
    member_first_name: "",
    member_last_name: "",
    member_national_id: "",
    online_charge_name: "",
    online_charge_amount: "",
    online_charge_required_bonus: "",
    registration_date: "",
    status: "",
    from_date :"",
    to_date :""
  };



export default function Index() {

  



  const dispatch = useDispatch();

  const [sort, setSort] = useState({});
  const [pageTab1, setPageTab1] = useState(1);
  const [flagFilter, setFlagFilter] = useState(false);
  const [stateFilter, setStateFilter] = useState(initState);

  let { id, ...sortRes } = sort;

  const data = useSelector((state) => state.giftCash_v1_select_Reducer);
  let size = data.size;


  const handleRefresh = () => {

    setStateFilter(initState);

    if (pageTab1 !== 1) {
      setSort({});
      setPageTab1(1);
    } else {
      setSort({});
    }

  };

  const apiSubmitSelect = () => {

    let obj = {};

    Object.keys(stateFilter).forEach((element) => {
      if (stateFilter[element]) {
        obj[element] = stateFilter[element];
      }
    });
let data = {
  ...obj ,

}
    dispatch(giftCash_v1_select_actions(size, pageTab1, data, sortRes));

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
      apiSubmitSelect();
    }
  };

  const handleNull = (key) => {
    if (key === null || key === "" || key === "null") {
      return "_";
    } else {
      return key;
    }
  };

  useEffect(() => {
    apiSubmitSelect();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps


  useEffect(() => {
    if (flag) apiSubmitSelect();
    flag = true;
  }, [sort]); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Header
        handleRefresh={handleRefresh}
        setFlagFilter={setFlagFilter}
        stateFilter={stateFilter}
      />
      <FilterBox
        flagFilter={flagFilter}
        stateFilter={stateFilter}
        handleChangeFilter={handleChangeFilter}
        handelSubmitFilter={handelSubmitFilter}
      />
      {
        <Table
          flagFilter={flagFilter}
          data={data}
          apiSubmitSelect={apiSubmitSelect}
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


