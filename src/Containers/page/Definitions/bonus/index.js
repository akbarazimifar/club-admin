import React, { useEffect, useState } from "react";
import Header from "./Header";
import FilterItems from "./FilterItems";
import Content from "./content";
import { bonus_v1_actions_select } from "./../../../../boot/api/Definitions/bonus/bonus_v1_select/action";
import { bonus_v1_actions_request } from "./../../../../boot/api/Definitions/bonus/bonus_v1_requests/action";
import { useDispatch, useSelector } from "react-redux";
import { handeFilterForDate } from "../../../Common/method/handeFilterForDate";

let flag = false;

export default React.memo(function Index() {
  const dispatch = useDispatch();
  const stateReducer = useSelector((state) => state.bonus_v1_select_Reducer);
  const requestReducer = useSelector((state) => state.bonus_request_v1_select_Reducer);
  const [flagFilter, setflagFilter] = useState(false);
  const [flagRefresh, setflagRefresh] = useState(false);
  const [sort, setSort] = React.useState({});
  const [pagination, setPagination] = React.useState(1);
  const [valueTab, setValueTab] = React.useState(0);

  const [stateFilter, setStateFilter] = useState({
    bonus_type: "",
    national_id: "",
    status: "",
    member_reserved_bonus: "",
    member_account_code: "",
    create_date_from: null,
    create_date_to: null,
    closing_date_from: null,
    closing_date_to: null,
    max_value: '',
    min_value: ''
  });

  useEffect(() => {
    if (flag) {
      if (valueTab === 1) {
        apiSubmitRequest(pagination);
      } else {
        apiSubmitSelect(pagination);
      }
    }
    flag = true
  }, [sort]);

  useEffect(() => {
    return function cleanup() {
      flag = false
    }
  }, [])

  useEffect(() => {
    if (flag) {
      apiSubmitSelect();
      apiSubmitRequest();
    }
  }, [flagRefresh]); //eslint-disable-line react-hooks/exhaustive-deps

  const handleChangeFilter = (data, type) => {
    setStateFilter((prev) => ({ ...prev, [type]: data }));
  };

  const apiSubmitSelect = () => {

    let obj = {};
    let { size } = stateReducer;
    let { id, ...sortRes } = sort;

    Object.keys(stateFilter).forEach((element) => {
      if (stateFilter[element]) {
        obj[element] = stateFilter[element];
      }
    });
    let setWithFilterData = handeFilterForDate(obj, ["create_date_from", "create_date_to", "closing_date_from", "closing_date_to"], ["create_date_to", "closing_date_to"])


    if (stateFilter.national_id) {
      dispatch(
        bonus_v1_actions_select(
          sortRes,
          size,
          pagination,
          setWithFilterData,
          "select_by_national_id"
        )
      );
    } else {
      dispatch(bonus_v1_actions_select(sortRes, size, pagination, setWithFilterData));
    }

  };

  const apiSubmitRequest = () => {
    let obj = {};
    let { id, ...sortRes } = sort;
    let { size } = requestReducer;

    Object.keys(stateFilter).forEach((element) => {
      if (stateFilter[element]) {
        obj[element] = stateFilter[element];
      }
    });

    let { national_id, member_reserved_bonus, member_account_code, ..._obj } = obj

    let setWithFilterData = handeFilterForDate(_obj, ["create_date_from", "create_date_to", "closing_date_from", "closing_date_to"], ["create_date_to", "closing_date_to"])
    if (stateFilter.national_id) {
      dispatch(
        bonus_v1_actions_request(
          sortRes,
          size,
          pagination,
          setWithFilterData,
          "select_bonus_requests_by_national_id"
        )
      );
    } else {
      dispatch(bonus_v1_actions_request(sortRes, size, pagination, setWithFilterData));
    }
  };

  /////////////////////////////////////////////////////////////////////////
  const handleRefresh = () => {
    setStateFilter({
      bonus_type: "",
      national_id: "",
      status: "",
      member_reserved_bonus: "",
      member_account_code: "",
      create_date_from: null,
      create_date_to: null,
      closing_date_from: null,
      closing_date_to: null,
      max_value: '',
      min_value: ''
    });
    setflagRefresh((prev) => !prev);
    setPagination(1);

    // setSort({})
  };
  ////////////////////////////////////////////////////////////////////////

  return (
    <div>
      <Header
        setflagFilter={setflagFilter}
        handleRefresh={handleRefresh}
        valueTab={valueTab}
        stateFilter={stateFilter}
      />

      <FilterItems
        flagFilter={flagFilter}
        handleChangeFilter={handleChangeFilter}
        stateFilter={stateFilter}
        valueTab={valueTab}
        apiSubmitSelect={() => {
          setPagination(1);
          apiSubmitSelect();
        }}
        apiSubmitRequest={() => {
          setPagination(1);
          apiSubmitRequest();
        }}
      />

      <Content
        flagFilter={flagFilter}
        data={stateReducer}
        requestReducer={requestReducer}
        apiSubmitSelect={apiSubmitSelect}
        apiSubmitRequest={apiSubmitRequest}
        valueTab={valueTab}
        setValueTab={setValueTab}
        sort={sort}
        setSort={setSort}
        pagination={pagination}
        setPagination={setPagination}
      />
    </div>
  );
}
)