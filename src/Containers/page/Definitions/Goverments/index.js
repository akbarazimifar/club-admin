import React, { useState, useEffect } from "react";
import Header from "./Header";
import FilterItems from "./FilterItems";
import Tables from "./Tables/Tables";
import { useSelector, useDispatch } from "react-redux";
import { pishkhan_v1_actions } from "../../../../boot/api/Definitions/pishkhan/pishkhan_v1_select/action";
import { distinctMethod } from "./../../../Common/method/distinctMethod";



let flag = false
export default function Index() {
  const [flagFilter, setFlagFilter] = useState(false);
  const dataReducer = useSelector((state) => state.pishkhan_v1_select_Reducer);
  const [provinceName, setProvinceName] = useState([]);
  const [pagination, setPagination] = useState(1);
  const [stateInput, setStateInput] = useState("");
  const [sort, setSort] = useState({});
  const dispatch = useDispatch();
  const [state, setState] = useState(null);
  const [stateFilter, setstateFilter] = useState({
    ProvinceName: "",
  });

  const apiCallSelect = (ref) => {
    let obj = {};
    Object.keys(stateFilter).forEach((element) => {
      if (stateFilter[element]) {
        obj[element] = stateFilter[element];
      }
    });


    let { size } = dataReducer;
    let { id, ...sortRes } = sort;


 
      dispatch(pishkhan_v1_actions(sortRes,size, pagination, obj));
  };

 

  const handleRefresh = () => {
    let ref = true;
    setPagination(1);
  setstateFilter({})
    setStateInput("");
    setSort({})
    // apiCallSelect(ref);
  };

  useEffect(() => {
    apiCallSelect();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (dataReducer.data.response) {
      setProvinceName(
        distinctMethod(dataReducer.data.response.data.results, [
          "body",
          "ProvinceName",
        ])
      );
    }
  }, [dataReducer]);

  useEffect(() => {
    if (dataReducer.data.response)
      setState(dataReducer.data.response.data.results);
  }, [dataReducer.data.response]);

  useEffect(() => {
    if (flag) apiCallSelect();

    flag = true;
  }, [sort]);

  const handleSubmitFilter = () => {
   setPagination(1)
    apiCallSelect();
  };

  return (
    <div>
      <Header
        handelShowFilterItems={() => setFlagFilter(!flagFilter)}
        handleRefresh={handleRefresh}
        state={state}
        stateFilter={stateFilter}
      />

      <FilterItems
        flagFilter={flagFilter}
        provinceName={provinceName}
        // changeFilter={(data) => handleFilterData(data)}
        handleSubmitFilter={handleSubmitFilter}
        setstateFilter={setstateFilter}
        stateFilter={stateFilter}
        setStateInput={setStateInput}
        stateInput={stateInput}
      />
      {state && (
        <Tables
          flagFilter={flagFilter}
          data={state}
          apiCallSelect={apiCallSelect}
          setPagination={setPagination}
          pagination={pagination}
          dataReducer={dataReducer}
          sort={sort}
          setSort={setSort}
        />
      )}
    </div>
  );
}
