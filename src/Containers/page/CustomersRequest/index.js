import React, { useEffect, useState } from "react";
import FilterCustomer from "./FilterCustomer/index";
import TableCustomer from "./TableCustomer/index";
import HeaderCustomer from "./HeaderCustomer/index";
import { useDispatch, useSelector } from "react-redux";
import { customer_v1_select_actions } from "../../../boot/api/customersRequest/action";

let initState = {
  member_first_name: "",
  status: "",
  member_last_name: "",
  member_national_id: "",
};
let flag = false;

const UsersList = () => {
  //state

  const [flagFilter, setFlagFilter] = useState(false);
  const [stateFilter, setStateFilter] = useState(initState);
  const [pageTab1, setPageTab1] = useState(1);
  const [sort, setSort] = useState({});

  // hooks
  const allData = useSelector((state) => state.customer_select_reducer);
  // console.log("allldataaaaaa--->>>>>???", allData);

  let size = allData.size;

  let { id, ...sortRes } = sort;
  const dispatch = useDispatch();

  useEffect(() => {
    apiCostumerSelect();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  //functions
  const handleRefresh = () => {
    setStateFilter(initState);

    if (pageTab1 !== 1) {
      setSort({});
      setPageTab1(1);
    } else {
      setSort({});
    }
  };

  // const apiCustomerRequest = () => {
  //   let obj = {};
  //
  //   Object.keys(stateFilter).forEach((element) => {
  //     if (stateFilter[element]) {
  //       obj[element] = stateFilter[element];
  //     }
  //   });
  //
  //   dispatch(customer_v1_select_actions(size, pageTab1, obj, sortRes));
  // };

  // const apiCostumerSelect = (from) => {
  //   let obj = {};
  //
  //   Object.keys(stateFilter).forEach((element) => {
  //     if (stateFilter[element]) {
  //       obj[element] = stateFilter[element];
  //     }
  //   });
  //
  //   if (!Object.keys(obj).length) {
  //     if (!from) {
  //       dispatch(customer_v1_select_actions(size, null, null, sortRes));
  //       return;
  //     }
  //     dispatch(customer_v1_select_actions(size, from, null, sortRes));
  //   } else {
  //     if (!from) {
  //       dispatch(customer_v1_select_actions(size, null, obj, sortRes));
  //     } else {
  //       dispatch(customer_v1_select_actions(size, from, obj, sortRes));
  //     }
  //   }
  // };
  const apiCostumerSelect = (from) => {
    let obj = {};

    Object.keys(stateFilter).forEach((element) => {
      if (stateFilter[element]) {
        obj[element] = stateFilter[element];
      }
    });

    dispatch(customer_v1_select_actions(size, pageTab1, obj, sortRes));
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
      apiCostumerSelect();
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
    // flagRefresh = true;
    // if (flagRefresh) setSort({});
    if (flag) {
      apiCostumerSelect();
    }

    flag = true;
    // flagRefresh = false;
  }, [sort]); //eslint-disable-line  react-hooks/exhaustive-deps

  return (
    <>
      <HeaderCustomer
        handleRefresh={handleRefresh}
        setFlagFilter={setFlagFilter}
      />
      <FilterCustomer
        flagFilter={flagFilter}
        stateFilter={stateFilter}
        handleChangeFilter={handleChangeFilter}
        handelSubmitFilter={handelSubmitFilter}
      />
      {
        <TableCustomer
          flagFilter={flagFilter}
          data={allData}
          apiCostumerSelect={apiCostumerSelect}
          handleNull={handleNull}
          customerReducer={allData}
          pageTab1={pageTab1}
          setPageTab1={setPageTab1}
          setSort={setSort}
          sort={sort}
        />
      }
    </>
  );
};

export default UsersList;
