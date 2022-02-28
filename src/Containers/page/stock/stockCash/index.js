import React, { useState, useEffect } from "react";
import Header from "./Header";
import Table from "./table";
import Filter from "./filter";
import { useDispatch, useSelector } from "react-redux";
import { stockCash_select_action } from "../../../../boot/api/stock/stockCash/stockCash_select/action";

const StockCash = () => {

  const dispatch = useDispatch();

  const [sort, setSort] = useState({})
  const [pageTab1, setpageTab1] = useState(1);
  const [flagApi, setflagApi] = useState(false)
  const [stateFilter, setstateFilter] = useState({});
  const [flagFilter, setflagFilter] = useState(false);

  const stocCashSelect = useSelector((state) => state.stockCash_select_reducer);

  useEffect(() => {
    apiselect()
  }, [flagApi]);


  const apiselect = () => {
    let obj = {};
    let { size } = stocCashSelect
    let { id, ...sortRes } = sort


    Object.keys(stateFilter).forEach((element) => {
      if (stateFilter[element]) {
        obj[element] = stateFilter[element];
      }
    });

    dispatch(stockCash_select_action(sortRes, size, pageTab1, obj));
  };

  const handelSubmitFilter = () => {
    setpageTab1(1)
    setflagApi(prev => !prev)
  };

  const handleChangeFilter = (value, type) => {
    setstateFilter((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handelRefresh = () => {
    setSort({})
    setpageTab1(1)
    setstateFilter({})
    setflagFilter(false)
    setflagApi(prev => !prev)
  }

  return (
    <>
      <div>
        <Header 
         setflagFilter={setflagFilter}
         stateFilter={stateFilter} 
         handelRefresh={handelRefresh}
         setflagApi={setflagApi}
         setSort={setSort}
         setpageTab1={setpageTab1}
         setstateFilter={setstateFilter}
         />
        {flagFilter && (
          <Filter
            flagFilter={flagFilter}
            handleChangeFilter={handleChangeFilter}
            stateFilter={stateFilter}
            handelSubmitFilter={handelSubmitFilter}
          />
        )}
        <Table
          apiselect={apiselect}
          stocCashSelect={stocCashSelect}
          flagFilter={flagFilter}
          pageTab1={pageTab1}
          setpageTab1={setpageTab1}
          sort={sort}
          setSort={setSort}
          handelSubmitFilter={handelSubmitFilter}
          setflagApi={setflagApi}
        />
      </div>
    </>
  );
};

export default StockCash;
