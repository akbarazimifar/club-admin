import React, { useEffect, useState } from "react";
import FilterBox from "./FilterBox/FilterBox";
import TableUsers from "./tableusers/TableUsers";
import HeaderUsers from "./header/Header";
import { useSelector, useDispatch } from "react-redux";
import { GIFTAGGREGATED_V1_EMPTY, GIFTAGGREGATED_V1_SELECT_FILTER } from "../../../../../boot/api/typeActions";



let flag = false;


const UsersList = ({ apiSelectGiftAggregated, flagFilter, setFlagFilter, state, setState, pageTab1, setPageTab1, sort, setSort, initState }) => {

  const dispatch = useDispatch()

  const data = useSelector((state) => state.giftAggregated_v1_select_reducer);

  const [stateFilter, setstateFilter] = useState({
    "کد ملی": '',
    'نام و نام خانوادگی': '',
    "کد تفصیلی": '',
    "وضعیت": '',
    "کوچکترین مجموع امتیاز": '',
    "بزرگترین مجموع امتیاز": ''
  })


  useEffect(() => {

    return () => {
      dispatch({ type: GIFTAGGREGATED_V1_EMPTY })

    }
  }, [])//eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {

    if (flag) apiSelectGiftAggregated();

    flag = true;

  }, [sort]); //eslint-disable-line react-hooks/exhaustive-deps

  const handleRefresh = () => {
    setState(prev => prev);

    if (pageTab1 !== 1) {
      setSort({});
      setPageTab1(1);
    } else {
      setSort({});
    }
  };

  const handleChangeFilter = (data, type) => {
    setstateFilter((prev) => ({
      ...prev,
      [type]: data,
    }));

  };

  const handelSubmitFilter = () => {
    if (pageTab1 !== 1) {
      setPageTab1(1);
    } else {
      apiSelectGiftAggregated();
    }
  };

  const handelFilterReducer = () => {

    let obj = {};

    Object.keys(stateFilter).forEach((element) => {
      if (stateFilter[element]) {
        obj[element] = stateFilter[element];
      }
    });

    let selected = []

    let filter = {
      "نام و نام خانوادگی": item => item.body['نام و نام خانوادگی'] === obj['نام و نام خانوادگی'],
      "کد ملی": item => item.body['کد ملی'] === obj['کد ملی'],
      "کد تفصیلی": item => item.body['کد تفصیلی'] === obj['کد تفصیلی'],
      "وضعیت": item => item.body['وضعیت'] === obj['وضعیت'],
      "کوچکترین مجموع امتیاز": item => item.body['مجموع امتیاز'] >= obj['کوچکترین مجموع امتیاز'],
      "بزرگترین مجموع امتیاز": item => item.body['مجموع امتیاز'] <= obj['بزرگترین مجموع امتیاز'],
      "مجموع امتیاز": item => item.body['مجموع امتیاز'] <= obj['بزرگترین مجموع امتیاز'] && item.body['مجموع امتیاز'] >= obj['کوچکترین مجموع امتیاز'],
    }

    if (obj['نام و نام خانوادگی'])
      selected.push(filter['نام و نام خانوادگی'])

    if (obj['کد ملی'])
      selected.push(filter['کد ملی'])

    if (obj['وضعیت'])
      selected.push(filter['وضعیت'])

    if (obj['کد تفصیلی'])
      selected.push(filter['کد تفصیلی'])

    if (obj['کوچکترین مجموع امتیاز'] && !obj['بزرگترین مجموع امتیاز'])
      selected.push(filter['کوچکترین مجموع امتیاز'])

    if (!obj['کوچکترین مجموع امتیاز'] && obj['بزرگترین مجموع امتیاز'])
      selected.push(filter['بزرگترین مجموع امتیاز'])

    if (obj['کوچکترین مجموع امتیاز'] && obj['بزرگترین مجموع امتیاز'])
      selected.push(filter['مجموع امتیاز'])

    let result = data.data.filter(item => selected.every(f => f(item)));


    if (selected.length > 0) {

      if (result.length > 0) {
        dispatch({ type: GIFTAGGREGATED_V1_SELECT_FILTER, payload: result })
      } else {
        dispatch({ type: "ALERT", payload: { status: true, textAlert: `داده ای یافت نشد`, typeAlert: "warning" } })
      }

    } else {
      apiSelectGiftAggregated()
    }

  }

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
        state={state}
      />
      <FilterBox
        flagFilter={flagFilter}
        stateFilter={stateFilter}
        handleChangeFilter={handleChangeFilter}
        handelFilterReducer={handelFilterReducer}
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
        />
      }
    </>
  );
};

export default UsersList;
