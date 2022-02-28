import React, { useState, useEffect } from "react";
import Header from "./Header";
import FilterGift from "./page/gift/FilterItemsGift";
import FilterRequsetList from "./page/requestList/FilterItemsRequsetList";
import Content from "./page/content";
import { useDispatch, useSelector } from "react-redux";
import { gift_v1_actions_select } from "./../../../../boot/api/Definitions/gift/gift_v1_select/action";
import { gift_v1_actions_INSERT } from "./../../../../boot/api/Definitions/gift/gift_v1_insert/action";
import { gift_v1_actions_update } from "../../../../boot/api/Definitions/gift/gift_v1_update/action";
import { gift_v1_actions_activate } from "../../../../boot/api/Definitions/gift/gift_v1_active/action";
import { gift_v1_actions_deactivate } from "../../../../boot/api/Definitions/gift/gift_v1_deActive/action";
import { gift_v1_actions_select_registrations } from "./../../../../boot/api/Definitions/gift/gift _v1_registrations/action";
import { gift_v1_actions_finalize } from "./../../../../boot/api/Definitions/gift/gift_v1_finalize/action";
import { gift_v1_actions_unregister } from "./../../../../boot/api/Definitions/gift/gift_v1_unregister/action";
import { gift_v1_actions_active_categories } from "../../../../boot/api/Definitions/gift/gift_v1_active_categories/action";
import { gift_v1_actions_active_subcategories } from "../../../../boot/api/Definitions/gift/gift_v1_active_subcategories/action";
import { gift_v1_actions_select_active_name } from "../../../../boot/api/Definitions/gift/gift_v1__select_active_name/action";
import { gift_v1_system_finalize } from "../../../../boot/api/Definitions/gift/gift_v1_system_finalize/action";
import { gift_v1_system_unregister } from "../../../../boot/api/Definitions/gift/gift_v1_system_unregister/action";
import { gift_v1_actions_finalize_bulk_registration } from "../../../../boot/api/Definitions/gift/gift_v1_finalize_bulk_registration/action";
import { useHistory } from "react-router";
import { gift_v1_change_postal_tracking_code } from "../../../../boot/api/Definitions/gift/gift_v1_change_postal_tracking_code/action";
import { gift_v1_actions_unregister_bulk_registration } from "../../../../boot/api/Definitions/gift/gift_v1_unregister_bulk_registration/action";

let initStateGift = {
  gift_category: "",
  gift_sub_category: "",
  is_active: "",
  type: "",
  gift_code: ""
};

let initStateRegistration = {
  member_national_id: "",
  status: "",
  is_physical: "",
  gift_id: "",
  gift_type: "",
  gift_name: null,
  postal_tracking_code: "",
  closing_date_to: null,
  closing_date_from: null,
  registration_date_from: null,
  registration_date_to: null,
};

let flag2 = false;
export default function Gift() {
  const [flagTypePage, setflagTypePage] = useState("GIFT");
  const [flagFilter, setFlagFilter] = useState(false);
  const [selectMultiRow, setSelectMultiRow] = useState({});
  const { push } = useHistory()


  //   const [checkPhysical, setcheckPhysical] = useState("TRUE");
  const dispatch = useDispatch();
  const stateReducerGift = useSelector((state) => state.gift_v1_select_Reducer);
  const stateReducerRegistration = useSelector(
    (state) => state.gift_v1_select_registration_Reducer
  );
  ////////////////////////////////////////////////state filter gift///////////////////////////////////////////////
  const [stateFilter, setstateFilter] = useState(initStateGift);
  const [flagRefresh, setFlagRefresh] = useState(false);
  const [valueTab, setValueTab] = React.useState(0);
  ////////////////////////////////////////////////state filter Registration///////////////////////////////////////
  const [stateFilterRegistration, setStateFilterRegistration] = useState(
    initStateRegistration
  );


  const reducerCategories = useSelector(
    (state) => state.gift_v1_select_Reducer_categories.data
  );
  const reducerSubcategories = useSelector(
    (state) => state.gift_v1_select_Reducer_subcategories.data
  );

  const reducerActiveName = useSelector(
    (state) => state.gift_v1_select_active_name_Reducer.data
  );
  ///////////////////////////////pagination///////////////////////////////
  const [paginationRegistration, setPaginationRegistration] = React.useState(1);
  const [paginationGift, setpaginationGift] = React.useState(1);

  ////////////////////////////sort////////////////////////////////////
  const [sort, setSort] = React.useState({});



  const statePrimary = () => {
    setstateFilter(initStateGift);
    setStateFilterRegistration(initStateRegistration);
    setPaginationRegistration(1);
    setSelectMultiRow({});
    push({
      state: null
    })
  };

  /////////////////////////////select///////////////////////////////
  const callApiGift = () => {
    let obj = {};
    let size = stateReducerGift.size;

    Object.keys(stateFilter).forEach((element) => {
      if (stateFilter[element]) {
        obj[element] = stateFilter[element];
      }
    });

    dispatch(gift_v1_actions_select(size, paginationGift, obj));
  };

  const handleRefresh = () => {
    statePrimary();
    setFlagRefresh((prev) => !prev);
  };

  useEffect(() => {
    callApiGift();
    if (flag2) {
      callApiRegistration();
    }

    flag2 = true
  }, [flagRefresh]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    return () => {
      flag2 = false
    }
  }, []) //eslint-disable-line react-hooks/exhaustive-deps
  ///////////////////////////////////////////////////////////////////////

  /////////////////////////////// api gift insert //////////////////////////////

  const apiGiftInsert = (data) => {
    let image = data.image.split(",")[1] ? data.image.split(",")[1] : "";
    let is_physical = data.is_physical ? "TRUE" : "FALSE";

    let obj = {
      ...data,
      image,
      is_physical,
      gift_code: data.gift_code ? data.gift_code : null
    };

    dispatch(gift_v1_actions_INSERT(obj));
  };

  //////////////////////////////////////////////////////////////////////////////

  /////////////////////////////// api gift update //////////////////////////////

  const apiGiftUpdate = (data, id) => {
    const { is_active, ...rest } = data;
    let obj = {
      _id: id,
      ...rest,
    };
    dispatch(gift_v1_actions_update(obj));
  };

  //////////////////////////////////////////////////////////////////////////////

  /////////////////////////////// api gift active //////////////////////////////

  const apiGiftActive = (id) => {
    let obj = {
      _id: id,
    };

    dispatch(gift_v1_actions_activate(obj));
  };

  //////////////////////////////////////////////////////////////////////////////

  /////////////////////////////// api gift deactive //////////////////////////////

  const apiGiftDeactivate = (id) => {
    let obj = {
      _id: id,
    };

    dispatch(gift_v1_actions_deactivate(obj));
  };

  //////////////////////////////////////////////////////////////////////////////

  /////////////////////////////// api finalize//////////////////////////////////
  const apiCallFinalize = (id) => {
    let dataSelect = getDataForSelectApiRegistration()
    let data = { _id: id }
    dispatch(gift_v1_actions_finalize(data, dataSelect));
  };
  /////////////////////////////////////////////////////////////////////////////

  /////////////////////////////// api Unregister//////////////////////////////////
  const apiCallUnregister = (id) => {
    let dataSelect = getDataForSelectApiRegistration()
    let data = { _id: id }
    dispatch(gift_v1_actions_unregister(data, dataSelect));
  };
  /////////////////////////////////////////////////////////////////////////////

  /////////////////////////////// api system finalize//////////////////////////////////
  const apiCallFinalizeSystem = (id) => {
    let dataSelect = getDataForSelectApiRegistration()
    let data = { _id: id }
    dispatch(gift_v1_system_finalize(data, dataSelect));
  };
  /////////////////////////////////////////////////////////////////////////////

  /////////////////////////////// api System Unregister//////////////////////////////////
  const apiCallSystemUnregister = (id, type, alert) => {
    let dataSelect = getDataForSelectApiRegistration()
    let data = { _id: id }
    dispatch(gift_v1_system_unregister(data, dataSelect));
  };
  /////////////////////////////////////////////////////////////////////////////

  /////////////////////////////// api multi finalize//////////////////////////////////
  const submitMultiSelectFinally = () => {
    let dataSelect = getDataForSelectApiRegistration()

    let res = Object.keys(selectMultiRow).map(item => {
      return { _id: item }
    })

    dispatch(gift_v1_actions_finalize_bulk_registration(res, dataSelect))

    setSelectMultiRow({});

  };

  const submitMultiSelectReject = () => {

    let dataSelect = getDataForSelectApiRegistration()

    let res = Object.keys(selectMultiRow).map(item => {
      return { _id: item }
    })

    dispatch(gift_v1_actions_unregister_bulk_registration(res, dataSelect))
    setSelectMultiRow({});

    //   if (
    //     selectMultiRow[item][1] === "UP" ||
    //     selectMultiRow[item][1] === "BIMEH_SAMAN" ||
    //     selectMultiRow[item][1] === "DG"
    //   ) {
  
  };
  /////////////////////////////////////////////////////////////////////////////

  /////////////////////////////// select active category  //////////////////////////////
  const handleClickPostalTrackingCode = (data) => {
    let dataSelect = getDataForSelectApiRegistration()
    dispatch(gift_v1_change_postal_tracking_code(data, dataSelect))
  }
  /////////////////////////////////////////////////////////////////////////////

  /////////////////////////////// select active category  //////////////////////////////
  useEffect(() => {
    dispatch(gift_v1_actions_active_categories());
  }, []); //eslint-disable-line react-hooks/exhaustive-deps
  //////////////////////////////////////////////////////////////////////////////

  /////////////////////////////// update subcategory  //////////////////////////////
  useEffect(() => {
    let isFilter = stateFilter.gift_category
      ? { gift_category: stateFilter.gift_category }
      : {};
    stateFilter.gift_sub_category &&
      setstateFilter((prev) => ({ ...prev, gift_sub_category: "" }));

    dispatch(gift_v1_actions_active_subcategories(isFilter));
  }, [stateFilter.gift_category]); //eslint-disable-line react-hooks/exhaustive-deps

  const change_gift_category_in_insert_gift = (data) => {
    let isFilter = data ? { gift_category: data } : {};

    dispatch(gift_v1_actions_active_subcategories(isFilter));
  };


  const getDataForSelectApiRegistration = () => {
    let obj = {};
    let { size } = stateReducerRegistration;
    let { id, ...sortRes } = sort;

    Object.keys(stateFilterRegistration).forEach((element) => {
      if (stateFilterRegistration[element]) {
        obj[element] = stateFilterRegistration[element];
      }
    });

    return {
      sort: sortRes,
      size: size,
      from: paginationRegistration,
      data: obj
    }

  }

  const callApiRegistration = () => {

    let value = getDataForSelectApiRegistration()

    dispatch(
      gift_v1_actions_select_registrations(value)
    );
  };

  //////////////////////////////////////////////select active name/////////////////////
  useEffect(() => {
    if (reducerActiveName.length === 0)
      dispatch(gift_v1_actions_select_active_name());
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmitFilter = () => {
    callApiRegistration();
  };

  return (
    <div>
      <Header
        valueTab={valueTab}
        stateFilter={stateFilter}
        stateFilterRegistration={stateFilterRegistration}
        setFlagFilter={setFlagFilter}
        apiGiftInsert={apiGiftInsert}
        handleRefresh={handleRefresh}
        reducerCategories={reducerCategories}
        reducerSubcategories={reducerSubcategories}
        change_gift_category_method={change_gift_category_in_insert_gift}
        selectMultiRow={selectMultiRow}
        submitMultiSelectFinally={submitMultiSelectFinally}
        submitMultiSelectReject={submitMultiSelectReject}
      />

      {flagTypePage === "GIFT" && (
        <>
          <FilterGift
            flagFilter={flagFilter}
            apiGiftFilter={callApiGift}
            stateFilter={stateFilter}
            setstateFilter={setstateFilter}
            reducerCategories={reducerCategories}
            reducerSubcategories={reducerSubcategories}
            setpaginationGift={setpaginationGift}
            paginationGift={paginationGift}
          />
        </>
      )}

      {flagTypePage === "REQUEST_LIST" && (
        <>
          <FilterRequsetList
            flagFilter={flagFilter}
            callApiRegistration={handleSubmitFilter}
            stateFilterRegistration={stateFilterRegistration}
            setStateFilterRegistration={setStateFilterRegistration}
            reducerActiveName={reducerActiveName}
            paginationRegistration={paginationRegistration}
            setPaginationRegistration={setPaginationRegistration}
          />
        </>
      )}

      <Content
        callApiRegistration={callApiRegistration}
        apiCallSystemUnregister={apiCallSystemUnregister}
        apiCallFinalizeSystem={apiCallFinalizeSystem}
        flagFilter={flagFilter}
        callApiGift={callApiGift}
        setflagTypePage={setflagTypePage}
        stateReducerGift={stateReducerGift}
        apiGiftUpdate={apiGiftUpdate}
        apiGiftActive={apiGiftActive}
        apiGiftDeactivate={apiGiftDeactivate}
        stateReducerRegistration={stateReducerRegistration}
        apiCallUnregister={apiCallUnregister}
        apiCallFinalize={apiCallFinalize}
        sort={sort}
        setSort={setSort}
        paginationRegistration={paginationRegistration}
        setPaginationRegistration={setPaginationRegistration}
        setpaginationGift={setpaginationGift}
        paginationGift={paginationGift}
        valueTab={valueTab}
        setValueTab={setValueTab}
        selectMultiRow={selectMultiRow}
        setSelectMultiRow={setSelectMultiRow}
        setStateFilterRegistration={setStateFilterRegistration}
        handleClickPostalTrackingCode={handleClickPostalTrackingCode}
      />
    </div>
  );
}
