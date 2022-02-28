import React, { useEffect, useState } from "react";
import Header from "./Header";
import FilterItems from "./FilterItems";
import Content from "./content";

import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { orders_v1_actions_select } from "../../../../boot/api/profile/Orders/orders_v1_select/action";
import { orders_v1_select_aggregates } from "../../../../boot/api/profile/Orders/orders_v1_select_aggregates/action";
import { person_v1_select_Integrate_profiles } from "../../../../boot/api/profile/person/person_v1_select_Integrate_profiles/action";
import { summaries_v1_actions_select } from "../../../../boot/api/profile/summaries/action";
import { PERSON_V1_SELECT_INTEGRATE_PROFILES_EMPTY } from "../../../../boot/api/typeActions";


const useStyles = makeStyles({
  Orders: {
    width: "100%",
    height: "90.5vh",
    marginTop: 80,
  },
});

let flag = true

export default React.memo(function Index() {

  const classes = useStyles();
  const dispatch = useDispatch();


  const [sort, setSort] = useState({});
  const [sort_agg, setSort_agg] = useState({});
  const [valueTab, setValueTab] = useState(0)
  const [mamber_id, setMamber_id] = useState('')
  const [pagination_agg, setPagination_agg] = useState(1);
  const [pagination, setPagination] = useState(1);
  const [state, setState] = React.useState({ national_id: "", fullName: "" });
  const [flagFilter, setflagFilter] = useState(false);

  const [stateFilterDetalis, setStateFilterDetalis] = useState({})
  const [stateFilterAggregates, setStateFilterAggregates] = useState({})



  const stateReducerProfile = useSelector((state) => state.person_v1_select_Integrate_profiles_reducer);
  const stateReducerSummaries = useSelector((state) => state.stock_select_summaries_reducer);
  const stateReducerOreder = useSelector((state) => state.orders_select_Reducer);
  const stateReducerOrederAggregates = useSelector((state) => state.orders_v1_select_aggregates_Reducer);

  let size = stateReducerOreder.size;

  // useEffect(() => {
  //   apiOrdersSelect()
  // }, [])//eslint-disable-line  react-hooks/exhaustive-deps

  useEffect(() => {
    if (!stateReducerSummaries.data.length) {
      dispatch(summaries_v1_actions_select());
    }
  }, []); //eslint-disable-line  react-hooks/exhaustive-deps

  useEffect(() => {

    if (valueTab === 0) {
      apiSelectOrderAggregates(pagination_agg)
    }
    if (valueTab === 1) {
      apiOrdersSelect(pagination)
    }
  }, [sort_agg, sort])//eslint-disable-line  react-hooks/exhaustive-deps



  useEffect(() => {
    if (!mamber_id) {
      return
    }
    if (valueTab === 0) {
      setTimeout(() => {
        apiSelectOrderAggregates(pagination_agg)
      }, 300);
    }
    if (valueTab === 1) {
      apiOrdersSelect(pagination)
    }
  }, [mamber_id])//eslint-disable-line  react-hooks/exhaustive-deps

  const apiSelectProfile = (national_id) => {
    dispatch(person_v1_select_Integrate_profiles(national_id));
  };

  const apiOrdersSelect = (from, flag) => {

    let obj = {};
    let statefilter = {
      ...stateFilterDetalis,
      member_id: mamber_id,
    }
    Object.keys(statefilter).forEach((element) => {
      if (statefilter[element]) {
        obj[element] = statefilter[element];
      }
    });
    const { id, ...sort_Res } = sort

    if (flag) {
      //refresh
      dispatch(orders_v1_actions_select(0, {}, size, {}))
      return
    }

    dispatch(orders_v1_actions_select(from, obj, size, sort_Res))

  };

  const apiSelectOrderAggregates = (from, flag) => {

    let obj = {};

    let statefilter = {
      ...stateFilterAggregates,
      member_id: mamber_id,
    }

    Object.keys(statefilter).forEach((element) => {
      if (statefilter[element]) {
        obj[element] = statefilter[element];
      }
    });

    const { id, ...sort_Res } = sort_agg


    if (flag) {
      //refresh
      orders_v1_select_aggregates(0, {}, size, {})
      return
    }

    dispatch(
      orders_v1_select_aggregates(from, obj, size, sort_Res)
    );

  };

  const handleRefresh = () => {

    setSort({});
    setPagination(1);
    setStateFilterDetalis({})

    setSort_agg({});
    setPagination_agg(1);
    setStateFilterAggregates({})

    setState({ national_id: "", fullName: "" });
    setflagFilter(false);
    setMamber_id('')
    setValueTab(0)
    dispatch({ type: PERSON_V1_SELECT_INTEGRATE_PROFILES_EMPTY })
    let flag = true

    setTimeout(() => {
      apiOrdersSelect(1, flag)
      apiSelectOrderAggregates(1, flag)
    }, 1000);
  };

  const handelchangeState = (value, type) => {
    setState(prev => ({
      ...prev,
      [type]: value
    }))
  }

  const handelchangeStateFilterDetalis = (value, type) => {
    setStateFilterDetalis(prev => ({
      ...prev,
      [type]: value
    }))
  }

  const handelchangeStateFilterAggregates = (value, type) => {
    setStateFilterAggregates(prev => ({
      ...prev,
      [type]: value
    }))
  }

  return (
    <div>
      <Header
        state={state}
        valueTab={valueTab}
        setMamber_id={setMamber_id}
        handleRefresh={handleRefresh}
        apiSelectProfile={apiSelectProfile}
        handelchangeState={handelchangeState}
        stateReducerProfile={stateReducerProfile}
        handelShowFilterItems={() => setflagFilter((prev) => !prev)}
      />

      <FilterItems
        valueTab={valueTab}
        flagFilter={flagFilter}
        apiOrdersSelect={apiOrdersSelect}
        stateFilterDetalis={stateFilterDetalis}
        stateFilterAggregates={stateFilterAggregates}
        apiSelectOrderAggregates={apiSelectOrderAggregates}
        handelchangeStateFilterDetalis={handelchangeStateFilterDetalis}
        handelchangeStateFilterAggregates={handelchangeStateFilterAggregates}
      />

      <Content
        sort={sort}
        setSort={setSort}
        valueTab={valueTab}
        sort_agg={sort_agg}
        flagFilter={flagFilter}
        setSort_agg={setSort_agg}
        pagination={pagination}
        setValueTab={setValueTab}
        setMamber_id={setMamber_id}
        setPagination={setPagination}
        pagination_agg={pagination_agg}
        apiOrdersSelect={apiOrdersSelect}
        setPagination_agg={setPagination_agg}
        stateReducerOreder={stateReducerOreder}
        stateReducerProfile={stateReducerProfile}
        stateReducerSummaries={stateReducerSummaries}
        apiSelectOrderAggregates={apiSelectOrderAggregates}
        stateReducerOrederAggregates={stateReducerOrederAggregates}
        setStateFilterDetalis={setStateFilterDetalis}
        setStateFilterAggregates={setStateFilterAggregates}
      />
    </div>
  );
}
)