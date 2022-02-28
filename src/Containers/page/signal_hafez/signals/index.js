import React, { useEffect, useState } from "react";
import Table from "./table/Table";
import Header from "./header/Header";
import FilterBox from "./FilterBox/FilterBox";
import { useDispatch, useSelector } from "react-redux";
import { signal_v1_select_actions } from "../../../../boot/api/signalHafez/signals/action";
import { signal_v1_deactive_actions } from "../../../../boot/api/signalHafez/signals/deactive/action";
import { signal_v1_active_actions } from "../../../../boot/api/signalHafez/signals/active/action";
import { signal_v1_insert_actions } from "../../../../boot/api/signalHafez/signals/insert/action";
import { signal_v1_edit_actions } from "../../../../boot/api/signalHafez/signals/edit/action";

let
  initState = {
    title: "",
    is_active: "",
    insert_date_time_from: "",
    insert_date_time_to: "",
  };

export default function Index() {
  const dispatch = useDispatch();
  const [sort, setSort] = useState({});
  const [pageTab1, setPageTab1] = useState(1);
  const [flagFilter, setFlagFilter] = useState(false);
  const [stateFilter, setStateFilter] = useState(initState);
  const [flagApi, setflagApi] = useState(false)
  let { id, ...sortRes } = sort;

  const dataReducer = useSelector((state) => state.signal_hafez_v1_select_Reducer);

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
    dispatch(signal_v1_select_actions(data));
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
  }, [sort, flagApi]); //eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmitInsert = (data) => {
    let dataForSelect = getDataForApi()
    try {
      let document = data.document.substr(data.document.indexOf(',') + 1)
      let res = { ...data, document }
      dispatch(signal_v1_insert_actions(res, dataForSelect))
    } catch {
      alert("در بارگیری فایل مشکلی به وجود آمده")
    }
  }

  const handleSubmitEdit = (data) => {
    let dataForSelect = getDataForApi()
    let { is_active, ...otherData } = data
    dispatch(signal_v1_edit_actions(otherData, dataForSelect))
  }

  const handleOkAlertActive = (id) => {
    let dataForSelect = getDataForApi()
    let data = { _id: id }
    dispatch(signal_v1_active_actions(data, dataForSelect))
  }

  const handleOkAlertDeactive = (id) => {
    let dataForSelect = getDataForApi()
    let data = { _id: id }
    dispatch(signal_v1_deactive_actions(data, dataForSelect))
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
          setflagApi={setflagApi}
          handleNull={handleNull}
          pageTab1={pageTab1}
          setPageTab1={setPageTab1}
          sort={sort}
          setSort={setSort}
          handleOkAlertActive={handleOkAlertActive}
          handleOkAlertDeactive={handleOkAlertDeactive}
          handleSubmitEdit={handleSubmitEdit}
        />
      }
    </>
  );
};


