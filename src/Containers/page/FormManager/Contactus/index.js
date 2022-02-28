import React, { useEffect, useState } from "react";
import HeaderContact from "../Contactus/HeaderContact/index";
import FilterContact from "../Contactus/FilterContact/index";
import TableContact from "../Contactus/TableContact/index";
import { useSelector, useDispatch } from "react-redux";
import { contactus_v1_select_actions } from './../../../../boot/api/Form Manager/Contactus/action';
import { contactus_select_reducer } from './../../../../boot/api/Form Manager/Contactus/reducer';

let initState = {
  sender_full_name: "",
  status: "",
  sender_phone: "",
  sender_email: "",
  title: "",
  submit_date_from: "",
  submit_date_to: ""
};
let flag = false;

export default function Marketer() {
  const [flagFilter, setFlagFilter] = useState(false);
  const [stateFilter, setStateFilter] = useState(initState);
  const [pageTab1, setPageTab1] = useState(1);
  const [sort, setSort] = useState({});

  const allData = useSelector((state) => state.contactus_select_reducer);

  let size = allData?.size;

  let { id, ...sortRes } = sort;
  const dispatch = useDispatch();

  useEffect(() => {
    apicontactusSelect();
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

  const apicontactusSelect = (from) => {
    let obj = {};

    Object.keys(stateFilter).forEach((element) => {
      if (stateFilter[element]) {
        obj[element] = stateFilter[element];
      }
    });

    dispatch(contactus_v1_select_actions(size, pageTab1, obj, sortRes));
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
      apicontactusSelect();
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
      apicontactusSelect();
    }

    flag = true;
  }, [sort]);

  return (
    <div>
      <HeaderContact
      handleRefresh={handleRefresh} 
      setFlagFilter={setFlagFilter} 
      />

      <FilterContact
        flagFilter={flagFilter}
        stateFilter={stateFilter}
        handleChangeFilter={handleChangeFilter}
        handelSubmitFilter={handelSubmitFilter}
      />

      <TableContact
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
