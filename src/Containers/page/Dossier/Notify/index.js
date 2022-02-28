import React, { useState, useEffect } from "react";
import Header from "./Header";
import Filter from "./Filter";
import Tables from "./Tables";
import { useDispatch, useSelector } from "react-redux";
import { Notify_v1_select_actions } from "../../../../boot/api/Dossier/Notify/Notify_v1_select/action";
import { CLUB_MEMBER_SELECT_EMPTY } from "../../../../boot/api/typeActions";
import { Notify_v1_select_actions_filter_by_national_id } from "../../../../boot/api/Dossier/Notify/Notify_v1_select_filter_by_national_id/action";

let initState = { source: "", state: "", type: "", national_id: "" };
let flag = false;

export default function Index() {
  const [flagFilter, setflagFilter] = useState(false);
  const dispatch = useDispatch();
  const [stateFilter, setstateFilter] = useState(initState);
  const [flagRefresh, setFlagRefresh] = useState(false);
  const [pageTab2, setPageTab2] = React.useState(1);
  const [sort, setSort] = useState({});
  // const [national_id, setNational_id] = useState("")

  /////////////////////////////// api notify select ///////////////////////////////
  const notify_reducer = useSelector((state) => state.Notify_v1_select_Reducer);
  let size = notify_reducer.size;

  const apiNotifyselect = (from) => {
    let obj = {};
    let { id, ...sortRes } = sort;

    Object.keys(stateFilter).forEach((element) => {
      if (stateFilter[element]) {
        obj[element] = stateFilter[element];
      }
    });

    if (!Object.keys(obj).length) {
      if (!from) {
        dispatch(Notify_v1_select_actions(sortRes, size));
        return;
      }
      dispatch(Notify_v1_select_actions(sortRes, size, from));
    } else {
      if (!from) {
        if (!stateFilter.national_id) {
          dispatch(Notify_v1_select_actions(sortRes, size, null, obj));
        } else {
          dispatch(
            Notify_v1_select_actions_filter_by_national_id(
              sortRes,
              size,
              from,
              obj
            )
          );
        }
      } else {
        if (!stateFilter.national_id) {
          dispatch(Notify_v1_select_actions(sortRes, size, from, obj));
        } else {
          dispatch(
            Notify_v1_select_actions_filter_by_national_id(
              sortRes,
              size,
              from,
              obj
            )
          );
        }
      }
    }
  };

  /////////////////////////////// api filter ///////////////////////////////
  const handleSubmitFilter = () => {
    apiNotifyselect();
    setPageTab2(1);
  };
  ///////////////////////////////////////////////////////////////////////////////

  const handleRefresh = () => {
    setstateFilter(initState);
    dispatch({ type: CLUB_MEMBER_SELECT_EMPTY });
    setFlagRefresh((prev) => !prev);
    setPageTab2(1);
  };

  useEffect(() => {
    apiNotifyselect();
  }, [flagRefresh]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (flag) apiNotifyselect(pageTab2);

    flag = true;
  }, [sort]);

  return (
    <div>
      <Header
        handelShowFilterItems={() => setflagFilter((prev) => !prev)}
        handleRefresh={handleRefresh}
        stateFilter={stateFilter}
      />

      <Filter
        flagFilter={flagFilter}
        handleSubmitFilter={handleSubmitFilter}
        stateFilter={stateFilter}
        setstateFilter={setstateFilter}
        // national_id={national_id}
        // setNational_id={setNational_id}
      />

      <Tables
        flag={flag}
        sort={sort}
        setSort={setSort}
        setPageTab2={setPageTab2}
        pageTab2={pageTab2}
        flagFilter={flagFilter}
        notify_reducer={notify_reducer}
        apiNotifyselect={apiNotifyselect}
      />
    </div>
  );
}
