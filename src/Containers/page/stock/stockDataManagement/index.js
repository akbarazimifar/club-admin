import React, { useEffect, useState } from "react";
import FilterBox from "./FilterBox/FilterBox";
import TableUsers from "./tableusers/TableUsers";
import HeaderUsers from "./headerUsers/HeaderUsers";
import { useDispatch, useSelector } from "react-redux";
import { management_data_stock_actions } from "../../../../boot/api/stock/mangement_data_stock/stock_v1_select/action";


let initState = {
  "18_char_persian_symbol": "",
  "30_char_persian_symbol": "",
  "flow": "",
  "total_value": "",
  "last_price": "",
  "close_price": "",
};
let flag = false;

const ManagementDataStock = () => {

  const [flagFilter, setFlagFilter] = useState(false);
  const [stateFilter, setStateFilter] = useState(initState);
  const [pageTab1, setPageTab1] = useState(1);
  const [sort, setSort] = useState({});
  let { id, ...sortRes } = sort;
  const data = useSelector((state) => state.management_data_stock_Reducer);
  const dispatch = useDispatch();
  let size = data.size;

  useEffect(() => {
    apiManagmentDataStockSelect();
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


  const apiManagmentDataStockSelect = () => {
    let obj = {};

    Object.keys(stateFilter).forEach((element) => {
      if (stateFilter[element]) {
        obj[element] = stateFilter[element];
      }
    });

    dispatch(management_data_stock_actions(size, pageTab1, obj, sortRes));
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
      apiManagmentDataStockSelect();
    }
  };

  useEffect(() => {
    if (flag) apiManagmentDataStockSelect();
    flag = true;
  }, [sort]); //eslint-disable-line react-hooks/exhaustive-deps


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
          apiUsersListSelect={apiManagmentDataStockSelect}
          pageTab1={pageTab1}
          setPageTab1={setPageTab1}
          sort={sort}
          setSort={setSort}
        />
      }
    </>
  );
};

export default ManagementDataStock;