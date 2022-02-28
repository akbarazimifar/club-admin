import React, { useState, useEffect } from "react";
import Styles from "./index.module.scss";
// import SearchNationalCode from './SearchNationalCode';
import Content from "./Content";
import { useSelector, useDispatch } from "react-redux";
import { stock_v1_action_select } from "../../../../boot/api/profile/stock/stock_v1_select/action";
import { STCOK_V1_SELECT_EMPTY } from "./../../../../boot/api/typeActions";
import { person_v1_select_Integrate_profiles } from "../../../../boot/api/profile/person/person_v1_select_Integrate_profiles/action";
import { summaries_v1_actions_select } from "../../../../boot/api/profile/summaries/action";

export default function Index() {
  const stateReducerClubMember = useSelector(
    (state) => state.person_v1_select_Integrate_profiles_reducer
  );
  const stateReducerSummaries = useSelector(
    (state) => state.stock_select_summaries_reducer
  );
  const stateReducerStock = useSelector((state) => state.stock_v1_reducer);

  const dispatch = useDispatch();
  const [national_id, setNational_id] = useState("");

  useEffect(() => {
    if (stateReducerStock.data.length) {
      Object.keys(stateReducerStock.data[0].body.customer_stock_portfolio).forEach((item) => {
        if (!stateReducerSummaries.isinJson[item]) {
          getNameByIsin(item)
        }
      })
    }
  }, [stateReducerStock])

  const getNameByIsin = (isin) => {
    dispatch(summaries_v1_actions_select({ isin: isin }))
  }

  useEffect(() => {
    if (!stateReducerSummaries.data.length) {
      dispatch(summaries_v1_actions_select());
    }
  }, []); //eslint-disable-line  react-hooks/exhaustive-deps

  /*--------------------api select---------------------- */
  const apiCallClubMember = (national_id) => {
    dispatch(person_v1_select_Integrate_profiles(national_id));
  };

  useEffect(() => {
    if (stateReducerClubMember.national_id) {
      setNational_id(stateReducerClubMember.national_id);
    }
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (stateReducerClubMember.data.length) {
      let id = stateReducerClubMember.data[0].id;
      dispatch(stock_v1_action_select({ member_id: id }));
    }
  }, [stateReducerClubMember.data]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    return function cleanup() {
      dispatch({ type: STCOK_V1_SELECT_EMPTY });
    };
  }, []); //eslint-disable-line react-hooks/exhaustive-deps


  return (
    <div className={Styles["portfolio"]}>
      <Content
        data={stateReducerStock.data}
        apiCallClubMember={apiCallClubMember}
        national_id={national_id}
        setNational_id={setNational_id}
        stateReducerClubMember={stateReducerClubMember}
        stateReducerSummaries={stateReducerSummaries}
      />
    </div>
  );
}
