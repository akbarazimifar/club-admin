import React, { useEffect, useState } from "react";
import FilterBox from "./FilterBox/FilterBox";
import TableUsers from "./tableusers/TableUsers";
import HeaderUsers from "./header/Header";
import { useDispatch, useSelector } from "react-redux";
import { bonus_aggregated_v1_actions_select } from "../../../../boot/api/Definitions/bonus/BonusAggregated_v1_select/action";
import { handeFilterForDate } from "../../../Common/method/handeFilterForDate";
// import {seprateNumberFromComma} from "../../../Containers/Common/method/seprateNumberFromComma" 

let initState = {
  is_removed: "",
  from_date_time: null,
  to_date_time: null,
};

let flag = false;
// let flagRefresh = false;

const UsersList = () => {
  //state

  const [flagApi, setflagApi] = useState(false)

  const [flagFilter, setFlagFilter] = useState(false);
  const [stateFilter, setStateFilter] = useState(initState);
  const [pageTab1, setPageTab1] = useState(1);
  const [sort, setSort] = useState({});

  let { id, ...sortRes } = sort;


  const data = useSelector((state) => state.bonus_aggregated_v1_select_Reducer);
  const dispatch = useDispatch();
  let size = data.size;


  const handleRefresh = () => {
    setStateFilter(initState);
    setPageTab1(1);
    setSort({});
    setflagApi(prev => !prev)
  };


  const apiSubmit = () => {
    let obj = {};

    Object.keys(stateFilter).forEach((element) => {
      if (stateFilter[element]) {
        obj[element] = stateFilter[element];
      }
    });
    let setWithFilterData = handeFilterForDate(obj, ["from_date_time", "to_date_time"], ["to_date_time"])


    dispatch(bonus_aggregated_v1_actions_select(sortRes, size, pageTab1, setWithFilterData));
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
    apiSubmit()
  }, [flagApi])


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
          handleNull={handleNull}
          pageTab1={pageTab1}
          setPageTab1={setPageTab1}
          sort={sort}
          setSort={setSort}
          setflagApi={setflagApi}
        />
      }
    </>
  );
};

export default UsersList;
