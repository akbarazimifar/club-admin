import React, { useEffect, useState } from "react";
import Filter from "./Filter";
import Table from "./table";
import Header from "./header";
import { useDispatch, useSelector } from "react-redux";
import { discountCode_v1_select_actions } from "../../../../boot/api/Definitions/gift/discountCode_v1_select/action";
import { checkNationalCode } from "../../../Common/method/NationalCode";
import { profile_v1_action_select } from "../../../../boot/api/profile/person/person_v1_select/action";
import { PROFILE_V1_SELECT_EMPTY } from "./../../../../boot/api/typeActions";
import ExcelInsert from "./header/excelInsert";

let initState = {
  member_id: "",
  issuer_id: "",
  expiration_date: "",
  code: "",
  category: "",
};

let flag = false;

const UsersList = () => {
  const dispatch = useDispatch();

  const [flagFilter, setFlagFilter] = useState(false);
  const [stateFilter, setStateFilter] = useState(initState);
  const [national_id, setNational_id] = useState("");
  const [pageTab1, setPageTab1] = useState(1);
  const [sort, setSort] = useState({});
  const [flagExcel, setFlagExcel] = useState(false);

  const data = useSelector((state) => state.discountCode_v1_select_reducer);
  const stateClubmember = useSelector((state) => state.profile_v1_reducer);

  useEffect(() => {
    apiSelectdiscountCode(pageTab1);
  }, []);

  useEffect(() => {
    if (data.excel.length > 0) {
      setFlagExcel(true);
    }
  }, [data]);

  useEffect(() => {
    if (flag) apiSelectdiscountCode(pageTab1);

    flag = true;
  }, [pageTab1, sort]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (stateClubmember.data.length > 0) {
      let obj = {
        member_id: stateClubmember.data[0].id,
      };
      setStateFilter((prev) => ({
        ...prev,
        member_id: stateClubmember.data[0].id,
      }));
      apiSelectdiscountCode(null, obj);
      dispatch({ type: PROFILE_V1_SELECT_EMPTY });
    }
  }, [stateClubmember]); //eslint-disable-line react-hooks/exhaustive-deps

  //functions
  const handleRefresh = () => {
    setPageTab1(1);
    setStateFilter(initState);
    setSort({});
    setNational_id("");
  };

  const apiSelectdiscountCode = (from, _obj) => {
    let obj = _obj ? _obj : {};
    let size = data.size;
    let { id, ...sortRes } = sort;

    if (!_obj)
      Object.keys(stateFilter).forEach((element) => {
        if (stateFilter[element]) {
          obj[element] = stateFilter[element];
        }
      });

    if (!Object.keys(obj).length) {
      if (!from) {
        dispatch(discountCode_v1_select_actions(sortRes, size));
        return;
      }
      dispatch(discountCode_v1_select_actions(sortRes, size, from));
    } else {
      if (!from) {
        dispatch(discountCode_v1_select_actions(sortRes, size, null, obj));
      } else {
        dispatch(discountCode_v1_select_actions(sortRes, size, from, obj));
      }
    }
  };

  const handleChangeFilter = (data, type) => {
    if (national_id)
      if (type === "member_id") {
        setNational_id("");
        dispatch({ type: PROFILE_V1_SELECT_EMPTY });
      }

    setStateFilter((prev) => ({
      ...prev,
      [type]: data,
    }));
  };

  const handelSubmitFilter = () => {
    apiSelectdiscountCode();
  };

  const handleNull = (key) => {
    if (key === null || key === "" || key === "null") {
      return "_";
    } else {
      return key;
    }
  };

  const handelSubmitNationalId = () => {
    if (!national_id.length) {
      dispatch({
        type: "ALERT",
        payload: {
          status: true,
          textAlert: `لطفا کد ملی خود را وارد نمایید`,
          typeAlert: "warning",
        },
      });
      setStateFilter((prev) => ({ ...prev, member_id: "" }));
      return;
    }

    let isOk = checkNationalCode(national_id);

    if (!isOk) {
      dispatch({
        type: "ALERT",
        payload: {
          status: true,
          textAlert: `کد ملی وارد شده صحیح نمی باشد`,
          typeAlert: "warning",
        },
      });
      setStateFilter((prev) => ({ ...prev, member_id: "" }));
      return;
    }

    dispatch(profile_v1_action_select(national_id));
  };

  return (
    <>
      <Header
        handleRefresh={handleRefresh}
        setFlagFilter={setFlagFilter}
        stateFilter={stateFilter}
        national_id={national_id}
        setNational_id={setNational_id}
        handelSubmitNationalId={handelSubmitNationalId}
        // setFlagContent={() => flagContent === "CONTENT" ? setFlagContent("CATEGORY") : setFlagContent("CONTENT")}
      />
      <Filter
        flagFilter={flagFilter}
        stateFilter={stateFilter}
        handleChangeFilter={handleChangeFilter}
        handelSubmitFilter={handelSubmitFilter}
      />
      {/*<Table flagFilter={flagFilter} />*/}
      {
        <Table
          flagFilter={flagFilter}
          data={data}
          apiSelectdiscountCode={apiSelectdiscountCode}
          handleNull={handleNull}
          pageTab1={pageTab1}
          setPageTab1={setPageTab1}
          sort={sort}
          setSort={setSort}
        />
      }

      {flagExcel && (
        <>
           <ExcelInsert
            data={data?.excel}
            flagExcel={flagExcel}
            setFlagExcel={setFlagExcel}
          /> 
        </>
      )}
    </>
  );
};

export default UsersList;
