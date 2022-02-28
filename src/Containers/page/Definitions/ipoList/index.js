import React, { useState, useEffect } from "react";
import Header from "./Header";
import Tables from "./Tables/Tables";
import { useDispatch, useSelector } from "react-redux";
import Content from "./Header/Content";
import { ipoList_select_action } from "../../../../boot/api/Definitions/ipoLIst/action";
import FilterSortStock from "./FliterSortStock";
import FilterItems from "./FilterItems";

let flagForOne = false;
export default function Index() {
  const [flagFilter, setFlagFilter] = useState(false);
  const dispatch = useDispatch();
  const Reducer = useSelector((state) => state.select_ipo_list_reducer);
  const [state, setState] = useState([]);
  const [flag, setflag] = useState(false);
  const [valueIpo, setValueIpo] = useState(null);
  const [stateFilter, setStateFilter] = useState({
    member_national_id: "",
    member_bourse_account: "",
    state: "",
  });
  ///////////////////////////////pagination & sort///////////////////////////////
  const [pagination, setPagination] = React.useState(1);
  const [sort, setSort] = React.useState({});

  useEffect(() => {
    if (flagForOne) {
      apiCall();
    }

    flagForOne = true;
  }, [sort, pagination]);
  ////////////////////////////////////////////////////////////////////

  const apiCall = () => {
    let data = {};
    let { size } = Reducer;
    let { id, ...sortRes } = sort;
    let idIpo = valueIpo?.id;

    Object.keys(stateFilter)
      .filter((item) => stateFilter[item])
      .forEach((key) => {
        data[key] = stateFilter[key];
      });

    dispatch(ipoList_select_action(sortRes, size, idIpo, pagination, data));
  };

  const handleSubmit = () => {
    if (valueIpo === null || !valueIpo) {
      setflag(false);
    } else {
      apiCall();
      setflag(true);
    }
  };

  const hanldeRefresh = () => {
    setStateFilter({});
    setSort({});
    setPagination(1);
  };

  // const apiCall2 = (id, from) => {
  //   dispatch(ipoList_select_action(id, from, null));
  // };

  const handleChangeFilter = (data, type) => {
    setStateFilter((prev) => ({
      ...prev,
      [type]: data,
    }));
  };
  const handelSubmitFilter = () => {
    apiCall(valueIpo.id, 0);
  };

  const handleChange = (e, val) => {
    if (val?.body) {
      setValueIpo(val);
    }
  };

  const clickReturnHeader = () => {
    setflag(false);
    setStateFilter({});
    setSort({});
    setPagination(1);
  };

  useEffect(() => {
    if (valueIpo) {
      setState(Reducer.data);
    }
  }, [valueIpo]); // eslint-disable-line react-hooks/exhaustive-deps



  return (
    <div>
      {flag ? (
        <div>
          <Header
            handelShowFilterItems={() => setFlagFilter(!flagFilter)}
            clickReturn={clickReturnHeader}
            hanldeRefresh={hanldeRefresh}
            stateFilter={stateFilter}
            ipo_id={valueIpo}
          />
          <FilterItems
            flagFilter={flagFilter}
            stateFilter={stateFilter}
            handleChangeFilter={handleChangeFilter}
            handelSubmitFilter={handelSubmitFilter}
            handleChange={handleChange}
            valueIpo={valueIpo}
          />
          <Content valContent={valueIpo} data={state} />
          <Tables
            data={state}
            setState={setState}
            apiCall={apiCall}
            valueIpo={valueIpo}
            Reducer={Reducer}
            pagination={pagination}
            setPagination={setPagination}
            sort={sort}
            setSort={setSort}
          />
        </div>
      ) : (
        <div>
          <FilterSortStock
            handleChange={handleChange}
            setflag={setflag}
            valueIpo={valueIpo}
            handleSubmit={handleSubmit}
          />
        </div>
      )}
    </div>
  );
}
