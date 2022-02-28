import React, { useEffect, useState } from "react";
import Table from "./table/Table";
import Header from "./header/Header";
import FilterBox from "./FilterBox/FilterBox";
import { useDispatch, useSelector } from "react-redux";
import { member_subscriptions_v1_select_actions } from "../../../../boot/api/signalHafez/memberSubscriptions/action";
import { subscription_v1_deactive_actions } from "../../../../boot/api/signalHafez/memberSubscriptions/deactive/action";

let
  initState = {
    subscription_title: "",
    member_national_id: "",
    member_first_name: "",
    member_last_name: "",
    start_date_from: "",
    start_date_to: "",
    end_date_from: "",
    end_date_to: "",
  };

export default function Index() {
  const dispatch = useDispatch();
  const [sort, setSort] = useState({});
  const [pageTab1, setPageTab1] = useState(1);
  const [flagFilter, setFlagFilter] = useState(false);
  const [stateFilter, setStateFilter] = useState(initState);
  const [flagApi, setflagApi] = useState(false)
  let { id, ...sortRes } = sort;

  const dataReducer = useSelector((state) => state.member_subscriptions_hafez_v1_select_Reducer);

  let size = dataReducer.size;


  const handleRefresh = () => {
    setStateFilter(initState);
    setSort({});
    setPageTab1(1);
    setflagApi(prev => !prev)
  };

  let getDataForApi = () => {
    let obj = {};

    Object.keys(stateFilter).forEach((element) => {
      if (stateFilter[element]) {
        obj[element] = stateFilter[element];
      }
    });

    return {
      data: obj,
      from: pageTab1,
      size: size,
      sort_by: sortRes
    }
  }

  const apiSubmitSelect = () => {
    let data = getDataForApi()
    dispatch(member_subscriptions_v1_select_actions(data));
  };

    const handleOkAlertDeactive = (id) => {
      let dataForSelect = getDataForApi()
      let data = { _id: id }
      dispatch(subscription_v1_deactive_actions(data, dataForSelect))
    }
  
  
  const handleChangeFilter = (data, type) => {
    setStateFilter((prev) => ({
      ...prev,
      [type]: data,
    }));
  };

  const handelSubmitFilter = () => {
    setPageTab1(1);
    setflagApi(prev => !prev)
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
  }, [sort, flagApi]); //eslint-disable-line react-hooks/exhaustive-deps


  return (
    <>
      <Header
        handleRefresh={handleRefresh}
        setFlagFilter={setFlagFilter}
        stateFilter={stateFilter}
        handleNull={handleNull}
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
          data={dataReducer}
          setflagApi={setflagApi}
          handleNull={handleNull}
          pageTab1={pageTab1}
          setPageTab1={setPageTab1}
          sort={sort}
          setSort={setSort}
          handleOkAlertDeactive={handleOkAlertDeactive}
        />
      }
    </>
  );
};


