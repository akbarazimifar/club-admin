import React, { useEffect, useState } from "react";
import HeaderWork from "../Work_with_us/HeaderWork/index";
import TableWork from "../Work_with_us/TableWork/index";
import FilterWork from "../Work_with_us/FilterWork/index";
import { useSelector, useDispatch } from "react-redux";
import { work_with_us_v1_select_actions } from "../../../../boot/api/FormManager/workWithUs/action";

let initState = {
  member_first_name: "",
  status: "",
  member_last_name: "",
  member_national_id: "",
};
let flag = false;

export default function Work_with_us() {
  const [flagFilter, setFlagFilter] = useState(false);
  const [stateFilter, setStateFilter] = useState(initState);
  const [pageTab1, setPageTab1] = useState(1);
  const [sort, setSort] = useState({});

  const allData = useSelector((state) => state.work_with_us_select);

  let size = allData.size;

  let { id, ...sortRes } = sort;
  const dispatch = useDispatch();

  useEffect(() => {
    apiworkwithusSelect();
  }, []);

  const handleRefresh = () => {
    setStateFilter(initState);

    if (pageTab1 !== 1) {
      setSort({});
      setPageTab1(1);
    } else {
      setSort({});
    }
  };

  useEffect(() => {
    if (flag) {
      apiworkwithusSelect(pageTab1);
    }
    flag = true;
  }, [pageTab1]);

  const apiworkwithusSelect = (from) => {
    let obj = {};

    Object.keys(stateFilter).forEach((element) => {
      if (stateFilter[element]) {
        obj[element] = stateFilter[element];
      }
    });

    dispatch(work_with_us_v1_select_actions(size, pageTab1, obj, sortRes));
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
      apiworkwithusSelect();
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
    if (flag) {
      apiworkwithusSelect();
    }

    flag = true;
  }, [sort]);

  return (
    <div>
      <HeaderWork 
      handleRefresh={handleRefresh} 
      setFlagFilter={setFlagFilter} 
      />

      <FilterWork
        flagFilter={flagFilter}
        stateFilter={stateFilter}
        handleChangeFilter={handleChangeFilter}
        handelSubmitFilter={handelSubmitFilter}
      />

      <TableWork
        flagFilter={flagFilter}
        data={allData}
        workwithusReducer={allData}
        handleNull={handleNull}
        pageTab1={pageTab1}
        setPageTab1={setPageTab1}
        setSort={setSort}
        sort={sort}
        size={size}
      />
    </div>
  );
}
