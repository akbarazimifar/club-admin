import React, { useEffect, useState } from "react";
import FilterMarketer from "../Marketer/FilterMarketer";
import HeaderMarketer from "../Marketer/HeaderMarketer";
import TableMarketer from "../Marketer/TableMarketer";
import { useSelector, useDispatch } from "react-redux";
import { marketer_v1_select_actions } from './../../../../boot/api/Form Manager/Marketer/action';

let initState = {
  member_first_name: "",
  status: "",
  member_last_name: "",
  member_national_id: "",
};
let flag = false;

export default function Marketer() {
  const [flagFilter, setFlagFilter] = useState(false);
  const [stateFilter, setStateFilter] = useState(initState);
  const [pageTab1, setPageTab1] = useState(1);
  const [sort, setSort] = useState({});

  const allData = useSelector((state) => state.marketer_select);


  let size = allData?.size;

  let { id, ...sortRes } = sort;
  const dispatch = useDispatch();

  useEffect(() => {
    apimarketerSelect();
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

  const apimarketerSelect = (from) => {
    let obj = {};

    Object.keys(stateFilter).forEach((element) => {
      if (stateFilter[element]) {
        obj[element] = stateFilter[element];
      }
    });

    dispatch(marketer_v1_select_actions(size, pageTab1, obj, sortRes));
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
      apimarketerSelect();
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
      apimarketerSelect();
    }

    flag = true;
  }, [sort]);

  return (
    <div>
      <HeaderMarketer 
      handleRefresh={handleRefresh} 
      setFlagFilter={setFlagFilter} 
      />

      <FilterMarketer
        flagFilter={flagFilter}
        stateFilter={stateFilter}
        handleChangeFilter={handleChangeFilter}
        handelSubmitFilter={handelSubmitFilter}
      />

      <TableMarketer
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
