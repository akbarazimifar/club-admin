import React, { useEffect, useState } from "react";
import Filter from "./Filter";
import Table from "./table";
import Header from "./header";
import { useDispatch, useSelector } from "react-redux";
import { changeBroker_v1_select_actions } from "../../../../boot/api/stock/changeBroker/action";
import { summaries_v1_actions_select } from './../../../../boot/api/profile/summaries/action';


let initState = {
  isin: "",
  request_date: "",
  state: "",
  description: "",
  national_id:'',

};

let flag = false


const UsersList = () => {

  const dispatch = useDispatch();

  const [flagFilter, setFlagFilter] = useState(false);
  const [stateFilter, setStateFilter] = useState(initState);
  const [pageTab1, setPageTab1] = useState(1);
  const [sort, setSort] = useState({})


  const data = useSelector((state) => state.changeBroker_v1_select_Reducer);
  const Isin = useSelector((state) => state.stock_select_summaries_reducer).isinJson;


  const requestStatus = (key) => {
    switch (key) {
      case "-2":
        return "در انتظار انصراف";
      case "-1":
        return "در صف انتظار";
      case "1":
        return "در انتظار تایید پذیرش";
      case "2":
        return "در انتظار تایید معامله گر";
      case "3":
        return "در انتظار اقدام";
      case "4":
        return "اقدام شده";
      case "5":
        return "ابطال شده";
      default:
        return '-'

    }
  }


  useEffect(() => {

    apiSelectChangeBroker();
    if (Object.keys(Isin).length === 0) {
      dispatch(summaries_v1_actions_select())
    }

  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (flag)
      apiSelectChangeBroker(pageTab1)

    flag = true
  }, [pageTab1, sort])//eslint-disable-line react-hooks/exhaustive-deps


  //functions
  const handleRefresh = () => {
    setPageTab1(1)
    setStateFilter(initState);
    setSort({})
  };

  const apiSelectChangeBroker = (from) => {

    let obj = {};
    let size = data.size
    let { id, ...sortRes } = sort

    Object.keys(stateFilter).forEach((element) => {
      if (stateFilter[element]) {
        obj[element] = stateFilter[element];
      }
    });

    if (obj?.isin) {
      if (obj?.isin.short_name) {
        let { isin, ...restObj } = obj
        let data = {
          ...restObj,
          isin: isin.isin
        }
        dispatch(changeBroker_v1_select_actions(sortRes, size, from, data));
        return
      }
    }

    let { isin, ...restObj } = obj

    dispatch(changeBroker_v1_select_actions(sortRes, size, from, restObj));

  };


  const handleChangeFilter = (data, type) => {
    setStateFilter((prev) => ({
      ...prev,
      [type]: data,
    }));
  };

  const handelSubmitFilter = () => {
    apiSelectChangeBroker();
  };

  const handleNull = (key) => {
    if (key === null || key === "" || key === "null") {
      return "_";
    } else {
      return key;
    }
  };

  return (
    <>
      <Header
        handleRefresh={handleRefresh}
        setFlagFilter={setFlagFilter}
        stateFilter={stateFilter}
        requestStatus={requestStatus}
        Isin={Isin}

      // setFlagContent={() => flagContent === "CONTENT" ? setFlagContent("CATEGORY") : setFlagContent("CONTENT")}
      />
      <Filter
        flagFilter={flagFilter}
        stateFilter={stateFilter}
        handleChangeFilter={handleChangeFilter}
        handelSubmitFilter={handelSubmitFilter}
      />
      {/*<Table flagFilter={flagFilter} />*/}
      {
        <Table
          flagFilter={flagFilter}
          data={data}
          apiSelectChangeBroker={apiSelectChangeBroker}
          handleNull={handleNull}
          requestStatus={requestStatus}
          Isin={Isin}
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
