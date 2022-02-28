import React, { useEffect, useState } from "react";
import Content from "./Content";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { orders_v1_actions_select } from "../../../../boot/api/profile/Orders/orders_v1_select/action";
import { person_v1_select_Integrate_profiles } from "../../../../boot/api/profile/person/person_v1_select_Integrate_profiles/action";
import { summaries_v1_actions_select } from "../../../../boot/api/profile/summaries/action";

const useStyles = makeStyles({
  Orders: {
    width: "100%",
    height: "90.5vh",
    marginTop: 80,
  },
});

export default function Index() {
  const [data, setData] = useState({
    time: "",
    report: "",
    checkedSales: false,
    checkedBuy: false,
  });
  const classes = useStyles();

  const [pageTab1, setPageTab1] = useState(1);

  const [values, setValues] = React.useState({ Ncode: "", fullName: "" });
  const [sort, setSort] = useState({});

  

  const dispatch = useDispatch();

  const stateReducerProfile = useSelector((state) => state.person_v1_select_Integrate_profiles_reducer
  );


  const stateReducerSummaries = useSelector(
    (state) => state.stock_select_summaries_reducer
  );
  const stateReducerOreder = useSelector(
    (state) => state.orders_select_Reducer
  );

  let size = stateReducerOreder.size;
  useEffect(() => {
    if (!stateReducerSummaries.data.length) {
      dispatch(summaries_v1_actions_select());
    }
  }, []); //eslint-disable-line  react-hooks/exhaustive-deps

  /*--------------------api select Profile---------------------- */

  const apiSelectProfile = (national_id) => {
    dispatch(person_v1_select_Integrate_profiles(national_id));
  };

  /*------------------------------------------------------------ */
  let { id, ...sortRes } = sort;

  const apiOrdersSelect = (from, data) => {
    let obj = {};

    Object.keys(data).forEach((element) => {
      if (data[element]) {
        obj[element] = data[element];
      }
    });

    // let { size } = Courses_Reducer;

    dispatch(orders_v1_actions_select(from, obj, size, null, sortRes));
  };

  const apiOrdersDetails = (from, data) => {
    let obj = {};

    Object.keys(data).forEach((element) => {
      if (data[element]) {
        obj[element] = data[element];
      }
    });

    // let { size } = Courses_Reducer;

    dispatch(
      orders_v1_actions_select(from, obj, size, "select_details", sortRes)
    );
  };

  /*------------------------------------------------------------ */

  const apiSubmitAggregates = (from, data) => {
    let obj = {};

    Object.keys(data).forEach((element) => {
      if (data[element]) {
        obj[element] = data[element];
      }
    });

    if (!Object.keys(obj).length) {
      if (!from) {
        dispatch(orders_v1_actions_select(null, obj, size, null, sortRes));
        return;
      }
      dispatch(orders_v1_actions_select(from, obj, size, null, sortRes));
    } else {
      if (!from) {
        dispatch(orders_v1_actions_select(null, obj, size, null, sortRes));
      } else {
        dispatch(orders_v1_actions_select(from, obj, size, null, sortRes));
      }
    }
  };

  const apiSubmitDetails = (from, data) => {
    let obj = {};

    Object.keys(data).forEach((element) => {
      if (data[element]) {
        obj[element] = data[element];
      }
    });

    if (!Object.keys(obj).length === 1) {
      if (!from) {
        dispatch(
          orders_v1_actions_select(null, obj, size, "select_details", sortRes)
        );
        return;
      }
      dispatch(
        orders_v1_actions_select(from, obj, size, "select_details", sortRes)
      );
    } else {
      if (!from) {
        dispatch(
          orders_v1_actions_select(null, obj, size, "select_details", sortRes)
        );
      } else {
        dispatch(
          orders_v1_actions_select(from, obj, size, "select_details", sortRes)
        );
      }
    }
  };

  const handleRefresh = () => {
    setData({
      time: "",
      report: "تجمیعی",
      checkedSales: false,
      checkedBuy: false,
    });

    // let data = {
    //   member_id: stateReducerProfile?.data[0]?.id,
    // };

    // if (pageTab1 !== 1) {
    //   setPageTab1(1);
    // } else {
    //   dispatch(orders_v1_actions_select(null, data, size));
    // }

    if (pageTab1 !== 1) {
      setSort({});
      setPageTab1(1);
    } else {
      setSort({});
    }
  };

  /*------------------------------------------------------------ */



  return (
    <div className={classes["Orders"]}>
      <Content
        stateReducerProfile={stateReducerProfile}
        stateReducerOreder={stateReducerOreder}
        apiSelectProfile={apiSelectProfile}
        stateReducerSummaries={stateReducerSummaries}
        apiSubmitAggregates={apiSubmitAggregates}
        apiSubmitDetails={apiSubmitDetails}
        pageTab1={pageTab1}
        setPageTab1={setPageTab1}
        values={values}
        setValues={setValues}
        setData={setData}
        data={data}
        handleRefresh={handleRefresh}
        apiOrdersSelect={apiOrdersSelect}
        sort={sort}
        setSort={setSort}
        apiOrdersDetails={apiOrdersDetails}
    
      />
    </div>
  );
}
