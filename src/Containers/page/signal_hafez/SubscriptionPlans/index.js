import React, { useEffect, useState } from "react";
import Table from "./table/Table";
import Header from "./header/Header";
import FilterBox from "./FilterBox/FilterBox";

import { useDispatch, useSelector } from "react-redux";
import { SubscriptionPlans_v1_select_actions } from "../../../../boot/api/signalHafez/SubscriptionPlans/action";
import { SubscriptionPlans_v1_insert_actions } from "../../../../boot/api/signalHafez/SubscriptionPlans/insert/action";
import { SubscriptionPlans_v1_edit_actions } from "../../../../boot/api/signalHafez/SubscriptionPlans/edit/action";
import { SubscriptionPlans_v1_deactive_actions } from "../../../../boot/api/signalHafez/SubscriptionPlans/deactive/action";
import { SubscriptionPlans_v1_active_actions } from "../../../../boot/api/signalHafez/SubscriptionPlans/active/action";


let
  initState = {
    duration: "",
    is_active: "",
    required_bonus: "",
    title: "",
  };

export default function Index() {
  const dispatch = useDispatch();
  const [sort, setSort] = useState({});
  const [pageTab1, setPageTab1] = useState(1);
  const [flagFilter, setFlagFilter] = useState(false);
  const [stateFilter, setStateFilter] = useState(initState);
  const [flagApi, setflagApi] = useState(false)
  let { id, ...sortRes } = sort;

  const dataReducer = useSelector((state) => state.subscription_signal_v1_select_Reducer);

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
    dispatch(SubscriptionPlans_v1_select_actions(data));
  };

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
  }, [flagApi]); //eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmitInsert = (data) => {
    let dataForSelect = getDataForApi()
    dispatch(SubscriptionPlans_v1_insert_actions(data, dataForSelect))
  }

  const handleSubmitEdit = (data) => {
    let dataForSelect = getDataForApi()
    dispatch(SubscriptionPlans_v1_edit_actions(data, dataForSelect))
  }

  const handleOkAlertActive = (id) => {
    let dataForSelect = getDataForApi()
    let data = { _id: id }
    dispatch(SubscriptionPlans_v1_active_actions(data, dataForSelect))
  }

  const handleOkAlertDeactive = (id) => {
    let dataForSelect = getDataForApi()
    let data = { _id: id }
    dispatch(SubscriptionPlans_v1_deactive_actions(data, dataForSelect))
  }

  return (
    <>
      <Header
        handleRefresh={handleRefresh}
        setFlagFilter={setFlagFilter}
        stateFilter={stateFilter}
        handleSubmitInsert={handleSubmitInsert}
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
          handleNull={handleNull}
          pageTab1={pageTab1}
          setPageTab1={setPageTab1}
          sort={sort}
          setSort={setSort}
          setflagApi={setflagApi}
          handleOkAlertActive={handleOkAlertActive}
          handleOkAlertDeactive={handleOkAlertDeactive}
          handleSubmitEdit={handleSubmitEdit}
        />
      }
    </>
  );
};


