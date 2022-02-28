import {
    EXCEL_GET_DATA,
    EXCEL_GET_DATA2,
    EXCEL_GET_LOADING,
    EXCEL_GET_ISOK
  } from "../typeActions.js";
  import ApiConfig from '../../../Containers/Common/Components/apiConfig'
//   import ApiConfig from "../../../../../Containers/Common/Components/apiConfig";
  import { handleNoAnswarApi } from "../../../Containers/Common/method/handleAlertAndSelectApi";
  
  
  export function excel_action_list_all(
    data,
    method,
    table,
    valuTab
  ) {
    return async (dispatch) => {
      // dispatch({ type: faq_V1_loading });
      // for (let i = 0; i < 20; i++) {
      //   // const element = array[i];
      //   let from = stateReducerExcelFrom+2000
  
      // }
      dispatch({ type: EXCEL_GET_LOADING, payload: true });
      let _data = {}
      let flag = true;
      let count = 0;
      while (flag) {
        let config = { url: "select_request" };
        if(method === "select_aggregated_user_registrations" || method === "online_charge_report"){
           _data = {
            table: table,
            method_type: method ,
            data: data ? data : {},
          };
        }else{
          _data = {
           table: table,
           method_type: method ,
           data: data ? data : {},
           from: count,
           size: 2000,
         };
        }
  
        try {
  
          if(count >= 10000){
            flag = false
            dispatch({ type: EXCEL_GET_LOADING, payload: false });
            dispatch({ type: EXCEL_GET_ISOK, payload: true });
            return
          }
  
          let response = await ApiConfig(config, _data);
          if (
            response.data?.response?.error_description === "INVALID member_id"
          ) {
            alert("کدملی اشتباه می باشد.");
            flag = false;
            dispatch({ type:EXCEL_GET_LOADING, payload: false });
            return;
          }
          if (
            response.data.status !== 200 ||
            !response.data.response.is_successful
          ) {
            handleNoAnswarApi(dispatch);
            dispatch({ type: EXCEL_GET_LOADING, payload: false });
            flag = false;
            return;
          }
  
          if (response.data.response.data.results.length < 2000) {
            dispatch({ type: EXCEL_GET_LOADING, payload: false });
            dispatch({ type: EXCEL_GET_ISOK, payload: true });
            // alert("2000leter")
            // dispatch({ type: BONUS_V1_SELECT_EXCEL_LOADING, payload: false });
            flag = false;
          }
  
         
  
          if (valuTab === 0) {
            dispatch({
              type: EXCEL_GET_DATA,
              payload: response.data.response.data.results,
            });
          } else {
            dispatch({
              type: EXCEL_GET_DATA2,
              payload: response.data.response.data.results,
            });
          }
        } catch (err) {
          handleNoAnswarApi(dispatch);
        }
        count = count + 2000;
        if(method === "select_aggregated_user_registrations" || method === "online_charge_report"){
          flag = false
        }
      }
      dispatch({ type: EXCEL_GET_LOADING, payload: false });
      dispatch({ type: EXCEL_GET_ISOK, payload: true });
    };
  }
  