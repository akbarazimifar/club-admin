import React, { useState, useEffect } from "react";
import Header from "./Header";
import FilterItems from "./FilterItems";
import Content from "./content";
import { useSelector, useDispatch } from "react-redux";
import { feedback_v1_actions_select } from "./../../../../boot/api/Definitions/feedback/feedback_v1_select/action";
import { feedback_v1_actions_update } from "./../../../../boot/api/Definitions/feedback/feedback_v1_update/action";
let flag = false;
let flag1 = false;
export default function Index() {
  let dispatch = useDispatch();
  const [flagFilter, setflagFilter] = useState(false);
  const [state, setState] = useState([]);
  const [direction, setdirection] = useState(null);
  const [stateSubmitted, setstateSubmitted] = useState([]);
  const [value, setValue] = React.useState(0);
  const [data, setData] = useState({
    member_national_id: "",
    member_first_name: "",
    member_last_name: "",
  });
  const [pageTab1, setPageTab1] = useState(1);
  let dataReducer = useSelector((state) => state.feedback_v1_select_Reducer);
  let { size } = dataReducer;
  const [updateflag, setupdateflag] = useState(false);

  const apiCallSelect = (data) => {
    let sort = handleSort();
    let obj = {};
    let method = "";
    if (value === 0) {
      method = "select_submitted_feedback";
    } else {
      method = "select_answered_feedback";
    }
    if (data) {
      Object.keys(data)
        .filter((item) => data[item])
        .forEach((key) => {
          obj[key] = data[key];
        });
    }
    // if(obj?.member_first_name){
    //   console.log("yees")
    //   let firstLastName = {member_first_name:obj.member_first_name.split(" ")[0],member_last_name:obj.member_first_name.split(" ")[1]}
    //   obj = {...obj,...firstLastName}
    // }

    dispatch(
      feedback_v1_actions_select(method, value, size, pageTab1, obj, sort)
    );
    setupdateflag(false);
  };

  //   const [pageTab2, setPageTab2] = useState(1);
  const handleSort = () => {
    switch (direction) {
      case "asc":
        return {
          feedback_date: "asc",
        };
      case "desc":
        return {
          feedback_date: "desc",
        };
      default:
        return {};
    }
  };

  useEffect(() => {
    apiCallSelect(data);
  }, [direction]);

  //   useEffect(() => {
  //     if (dataReducer.data?.status === 200) {
  //       setState(dataReducer.data.response.data.results);
  //     }
  //   }, [dataReducer]);
  useEffect(() => {
    if (flag) {
      apiCallSelect(data);
    }
    flag = true;
  }, [pageTab1]);

  useEffect(() => {
    if (flag1) {
      setPageTab1(1);
      apiCallSelect(data);
    }
    flag1 = true;
  }, [value]); //eslint-disable-line react-hooks/exhaustive-deps

  //   const handleFilter = (dataFilter) => {
  //     if (!state) return;

  //     if (!dataFilter.time && !dataFilter.person && !dataFilter.nationalCode) {
  //       // alert("مقادیر را پر نکرده اید.")
  //       setState(dataReducer.data.response.data.results);
  //       return;
  //     }

  //     let afterFilter = dataReducer.data.response.data.results.filter((item) => {
  //       let splitDate = item.body.feedback_date.split(" ")[0];
  //       let fullname = `${item.body.member_first_name} ${item.body.member_last_name}`;

  //       if (
  //         (splitDate === dataFilter.time || !dataFilter.time) &&
  //         (fullname.includes(dataFilter.person) || !dataFilter.person) &&
  //         (item.body.member_national_id.includes(dataFilter.nationalCode) ||
  //           !dataFilter.nationalCode)
  //       ) {
  //         return true;
  //       }
  //       return false;
  //     });

  //     setState(afterFilter);
  //   };
  const handleRefresh = () => {
    setData({
      member_national_id: "",
      member_first_name: "",
      member_last_name: "",
    });
    setPageTab1(1);
    if (value === 0) {
      apiCallSelect();
    } else {
      setValue(0);
    }
  };

  const handleUpdateDispatch = (data) => {
    dispatch(feedback_v1_actions_update(data));
    setupdateflag(true);
  };

  const handleChange = (data, type) => {
    setData((prev) => ({ ...prev, [type]: data }));
  };

  useEffect(() => {
    if (updateflag) {
      apiCallSelect(data);
    }
  }, [updateflag]);

  return (
    <div>
      <Header
        handelShowFilterItems={() => setflagFilter((prev) => !prev)}
        handleRefresh={handleRefresh}
      />
      <FilterItems
        apiCallSelect={apiCallSelect}
        data={data}
        setData={setData}
        flagFilter={flagFilter}
        //   handleFilter={handleFilter}

        handleChange={handleChange}
      />

      {state ? (
        <Content
          direction={direction}
          setdirection={setdirection}
          pageTab1={pageTab1}
          setPageTab1={setPageTab1}
          dataReducer={dataReducer}
          value={value}
          setValue={setValue}
          flagFilter={flagFilter}
          state={state}
          SubmitReponse={handleUpdateDispatch}
        />
      ) : null}
    </div>
  );
}
