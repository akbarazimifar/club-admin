import React, { useEffect, useState } from "react";
import FilterBox from "./FilterBox/FilterBox";
import TableUsers from "./tableusers/TableUsers";
import HeaderUsers from "./header/Header";
import { useSelector, useDispatch } from "react-redux";
import { GIFTCASHAGGREGATED_V1_EMPTY, GIFTCASHAGGREGATED_V1_SELECT_FILTER } from "../../../../../boot/api/typeActions";



let flag = false;


const UsersList = ({ apiSelectGiftAggregated, flagFilter, setFlagFilter, state, setState, pageTab1, setPageTab1, sort, setSort, initState }) => {

  const dispatch = useDispatch()

  const data = useSelector((state) => state.giftCashAggregated_v1_select_reducer);

  const [stateFilter, setstateFilter] = useState({
    member_first_name: "",
    member_last_name: "",
    member_national_id: "",
    min_sum_bonus: "",
    max_sum_bonus: "",
    min_sum_amount: "",
    max_sum_amount: "",
    member_account_code: "",
  })


  useEffect(() => {

    return () => {
      dispatch({ type: GIFTCASHAGGREGATED_V1_EMPTY })

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

  // const handelSubmitFilter = () => {
  //   if (pageTab1 !== 1) {
  //     setPageTab1(1);
  //   } else {
  //     apiSelectGiftAggregated();
  //   }
  // };

  const handelFilterReducer = () => {

    let obj = {};

    Object.keys(stateFilter).forEach((element) => {
      if (stateFilter[element]) {
        obj[element] = stateFilter[element];
      }
    });

    let selected = []

    let filter = {
      "member_first_name": item => item.body['member_first_name'].includes(obj['member_first_name']),
      "member_last_name": item => item.body['member_last_name'].includes(obj['member_last_name']),
      "member_national_id": item => item.body['member_national_id'] === obj['member_national_id'],
      "member_account_code": item => item.body['member_account_code'] === obj['member_account_code'],
      "min_sum_bonus": item => item.body['sum_bonus'] >= obj['min_sum_bonus'],
      "max_sum_bonus": item => item.body['sum_bonus'] <= obj['max_sum_bonus'],
      "sum_bonus": item => item.body['sum_bonus'] <= obj['max_sum_bonus'] && item.body['sum_bonus'] >= obj['min_sum_bonus'],
      "min_sum_amount": item => item.body['sum_amount'] >= obj['min_sum_amount'],
      "max_sum_amount": item => item.body['sum_amount'] <= obj['max_sum_amount'],
      "sum_amount": item => item.body['sum_amount'] <= obj['max_sum_amount'] && item.body['sum_amount'] >= obj['min_sum_amount'],
    }

    if (obj['member_first_name'])
      selected.push(filter['member_first_name'])

    if (obj['member_last_name'])
      selected.push(filter['member_last_name'])

    if (obj['member_national_id'])
      selected.push(filter['member_national_id'])

    if (obj['member_account_code'])
      selected.push(filter['member_account_code'])

    if (obj['min_sum_bonus'] && !obj['max_sum_bonus'])
      selected.push(filter['min_sum_bonus'])

    if (!obj['min_sum_bonus'] && obj['max_sum_bonus'])
      selected.push(filter['max_sum_bonus'])

    if (obj['min_sum_bonus'] && obj['max_sum_bonus'])
      selected.push(filter['sum_bonus'])

    if (obj['min_sum_amount'] && !obj['max_sum_amount'])
      selected.push(filter['min_sum_amount'])

    if (!obj['min_sum_amount'] && obj['max_sum_amount'])
      selected.push(filter['max_sum_amount'])

    if (obj['min_sum_amount'] && obj['max_sum_amount'])
      selected.push(filter['sum_amount'])

    let result = data.data.filter(item => selected.every(f => f(item)));

    if (selected.length > 0) {
      if (result.length > 0) {
        dispatch({ type: GIFTCASHAGGREGATED_V1_SELECT_FILTER, payload: result })
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
