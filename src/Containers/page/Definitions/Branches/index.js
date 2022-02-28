import React, { useState, useEffect } from "react";
import Header from "./Header";
import FilterItems from "./FilterItems";
import Tables from "./Tables/Tables";
import { useDispatch, useSelector } from "react-redux";
import { branches_v1_select_actions } from "../../../../boot/api/Branches/Branches_v1_select/action";
import { branches_v1_insert_actions } from "../../../../boot/api/Branches/Branches_v1_insert/action";
import { branches_v1_delete_actions } from "../../../../boot/api/Branches/Branches_v1_delete/action";
import { branches_v1_update_actions } from "../../../../boot/api/Branches/Branches_v1_update/action";

let flag = false;

export default function Index() {
  const [flagFilter, setFlagFilter] = useState(false);
  const [pageTab1, setPageTab1] = useState(1);
  const [sort, setSort] = useState({});

  const dispatch = useDispatch();
  const barnches_reducer = useSelector(
    (state) => state.branches_v1_select_Reducer
  );

  let size = barnches_reducer.size;
  let { id, ...sortRes } = sort;

  useEffect(() => {
    api_call_select();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  const api_call_select = () => {
    dispatch(branches_v1_select_actions(size, pageTab1, sortRes));
  };

  const handelsubmitUpdate = (value, index) => {
    // let data = barnches_reducer.response.data.results
    //     let res = data.map((items , ind)=>{
    //         if(ind === index && items.id === value.id)
    //             return value
    //         return items
    //     })

    dispatch(branches_v1_update_actions(value.body, value.id));
  };

  const handelSubmitAdd = (value) => {
    let res = { ...value.body };
    dispatch(branches_v1_insert_actions(res));
  };

  const handelSubmitDelete = (value) => {
    let id = value.id;
    dispatch(branches_v1_delete_actions(id));
  };

  const handleRefresh = () => {
    setSort({});
    if (pageTab1 !== 1) {
      setPageTab1(1);
    }
  };

  useEffect(() => {
    // flagRefresh = true;
    // if (flagRefresh) setSort({});
    if (flag) api_call_select();

    flag = true;
    // flagRefresh = false;
  }, [sort]);

  return (
    <div>
      <Header
        handelShowFilterItems={() => setFlagFilter((prev) => !prev)}
        handelSubmitAdd={handelSubmitAdd}
        api_call_select={api_call_select}
        handleRefresh={handleRefresh}
      />
      <FilterItems flagFilter={flagFilter} />
      <Tables
        flagFilter={flagFilter}
        barnches_reducer={barnches_reducer}
        handelsubmitUpdate={handelsubmitUpdate}
        handelSubmitDelete={handelSubmitDelete}
        pageTab1={pageTab1}
        setPageTab1={setPageTab1}
        api_call_select={api_call_select}
        setSort={setSort}
        sort={sort}
      />
    </div>
  );
}
