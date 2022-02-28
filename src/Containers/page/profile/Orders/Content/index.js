import React, { useState, useEffect } from "react";
import FilterItems from "./FilterItems";
import Header from "./Header";
import Tables from "./Tables/index";
import moment from "moment-jalaali";
import { convertDigitToEnglish } from "../../../../Common/method/convertDigitToEnglish";



let flag = false;

export default function Index({
  apiSubmitAggregates,
  apiSubmitDetails,
  stateReducerProfile,
  stateReducerOreder,
  apiSelectProfile,
  stateReducerSummaries,
  pageTab1,
  setPageTab1,
  values,
  setValues,
  setData,
  data,
  handleRefresh,
  apiOrdersSelect,
  sort,
  setSort,
  apiOrdersDetails,
  
}) {
  const [flagFilter, setflagFilter] = useState(false);

  // const [data, setData] = useState({
  //   time: "",
  //   report: "",
  //   checkedSales: false,
  //   checkedBuy: false,
  // });

  useEffect(() => {
    let obj = handelData();
    // let member_id = stateReducerProfile?.data[0]?.id;

    if (data.report === "تجمیعی") {
      // if (pageTab1 !== 1) {
      //   setPageTab1(1);
      //
      //   return;
      // }
      let data = {
        ...obj,
      };

      if (flag) {
        apiOrdersSelect(pageTab1, data);
      }
    }
    if (data.report === "عمومی") {
      // if (pageTab1 !== 1) {
      //   setPageTab1(1);
      //   return;
      // }
      let data = {
        ...obj,
      };

      apiOrdersDetails(pageTab1, data);
    }

    flag = true;
  }, [sort]); //eslint-disable-line  react-hooks/exhaustive-deps

  useEffect(() => {
    if (stateReducerProfile.data[0]) {
      let member_id = stateReducerProfile.data[0].id;
      let data = {
        member_id: member_id,
      };
      apiSubmitAggregates(null, data);
    }
  }, [stateReducerProfile.data]); //eslint-disable-line react-hooks/exhaustive-deps

  const handelData = () => {
    if (!stateReducerProfile.data[0]) {
      return null;
    }

    let member_id = stateReducerProfile.data[0].id;
    let trade_type =
      data.checkedSales === data.checkedBuy
        ? null
        : data.checkedBuy
        ? "1"
        : "2";
    let obj = { member_id: member_id };

    if (trade_type) {
      obj["trade_type"] = trade_type;
    }

    if (data.time) {
      let dformat = moment(data.time, "jYYYY/jM/jD HH:mm").format(
        "YYYY-M-D HH:mm:ss"
      );

      let arr = dformat.split(" ");
      let date = arr[0].split("-");
      let time = arr[1].split(":");

      let digit = (data) => {
        let length = data.length;
        if (length === 1) {
          return "0" + data;
        }
        return data;
      };

      if (date.length !== 3 || time.length !== 3) {
        return false;
      }

      if (data.report === "تجمیعی") {
        let fulldate = `${date[0]}/${digit(date[1])}/${digit(date[2])} ${
          digit(time[0]) + ":" + digit(time[1]) + ":" + digit(time[2])
        }.000000`;
        obj["date_time"] = convertDigitToEnglish(fulldate);
      }

      if (data.report === "عمومی") {
        let fulldate = `${date[0]}${digit(date[1])}${digit(date[2])}`;
        obj["order_entry_date"] = convertDigitToEnglish(fulldate);
      }
    }
    return obj;
  };

  return (
    <div>
      <Header
        handelShowFilterItems={() => setflagFilter((prev) => !prev)}
        apiSelectProfile={apiSelectProfile}
        stateReducerProfile={stateReducerProfile}
        values={values}
        setValues={setValues}
        handleRefresh={handleRefresh}
      />
      <FilterItems
        flagFilter={flagFilter}
        stateReducerProfile={stateReducerProfile}
        apiSubmitAggregates={apiSubmitAggregates}
        apiSubmitDetails={apiSubmitDetails}
        data={data}
        setData={setData}
        handelData={handelData}
        setPageTab1={setPageTab1}
        pageTab1={pageTab1}
      />
      <Tables
        flagFilter={flagFilter}
        stateReducerOreder={stateReducerOreder}
        stateReducerSummaries={stateReducerSummaries}
        apiSubmitAggregates={apiSubmitAggregates}
        stateReducerProfile={stateReducerProfile}
        apiSubmitDetails={apiSubmitDetails}
        handelData={handelData}
        setPageTab1={setPageTab1}
        pageTab1={pageTab1}
        apiSelectProfile={apiSelectProfile}
        values={values}
        data={data}
        setData={setData}
        sort={sort}
        setSort={setSort}
        
      />
    </div>
  );
}
