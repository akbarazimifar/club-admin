import React, { useEffect, useState } from "react";
import Filter from "./Filter";
import Table from "./table";
import Header from "./header";
import { useDispatch, useSelector } from "react-redux";
import { bonus_select_mangement_actions } from "../../../../boot/api/Definitions/bonus/bonus_v1_select_bonusMangement/action";
import { handeFilterForDate } from "../../../Common/method/handeFilterForDate";

let initState = {
  bonus_value: '',
  rial_equivalent: '',
  ratio: '',
  from_total_commission: '',
  to_total_commission: '',
  from_date_time: null,
  to_date_time: null

};

const UsersList = () => {

  const dispatch = useDispatch();

  const [flagFilter, setFlagFilter] = useState(false);
  const [stateFilter, setStateFilter] = useState(initState);
  const [pageTab1, setPageTab1] = useState(1);
  const [flagApi, setflagApi] = useState(false)
  const [sort, setSort] = useState({})

  const data = useSelector((state) => state.bonus_select_mengement_reducer);

  useEffect(() => {
    apiSelectdiscountCode(pageTab1)
  }, [flagApi])

  // useEffect(() => {
  //   if (flag)
  //     apiSelectdiscountCode(pageTab1)
  //   flag = true
  // }, [pageTab1, sort])//eslint-disable-line react-hooks/exhaustive-deps


  //functions
  const handleRefresh = () => {
    setFlagFilter(false)
    setPageTab1(1)
    setStateFilter(initState);
    setSort({})
    setflagApi(prev => !prev)
  };

  const apiSelectdiscountCode = (from, _obj) => {

    let obj = _obj ? _obj : {};
    let size = data.size;
    let { id, ...sortRes } = sort;

    if (!_obj)
      Object.keys(stateFilter).forEach((element) => {
        if (stateFilter[element]) {
          obj[element] = stateFilter[element];
        }
      });

    let setWithFilterData = handeFilterForDate(obj, ["from_date_time", "to_date_time"], ["to_date_time"])



    dispatch(bonus_select_mangement_actions(sortRes, size, pageTab1, setWithFilterData));

  };

  const handleChangeFilter = (data, type) => {
    setStateFilter((prev) => ({
      ...prev,
      [type]: data,
    }));

  };

  const handelSubmitFilter = () => {
    setPageTab1(1)
    setflagApi(prev => !prev)
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
        handleNull={handleNull}

      />
      <Filter
        flagFilter={flagFilter}
        stateFilter={stateFilter}
        handleChangeFilter={handleChangeFilter}
        handelSubmitFilter={handelSubmitFilter}
      />

      {
        <Table
          flagFilter={flagFilter}
          data={data}
          apiSelectdiscountCode={apiSelectdiscountCode}
          handleNull={handleNull}
          pageTab1={pageTab1}
          setPageTab1={setPageTab1}
          sort={sort}
          setSort={setSort}
          loading={data.loading}
          setflagApi={setflagApi}

        />
      }


    </>
  );
};

export default UsersList;