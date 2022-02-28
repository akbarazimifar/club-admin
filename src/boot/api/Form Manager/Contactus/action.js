import ApiConfig from "../../../../Containers/Common/Components/apiConfig";
import { handleAlertMethodSelect, handleNoAnswarApi } from "../../../../Containers/Common/method/handleAlertAndSelectApi";
import {
  CONTACT_US_V1_SELECT,
  CONTACT_US_V1_SELECT_LOADING,
  } from "../../typeActions";

export const contactus_v1_select_actions = (size, from, data, sort_by) => {
    return async (dispatch) => {
      let config = { url: "select_request" };
  
      let _data = {
        table: "contactus",
        method_type: "select",
  
        from: from ? (from - 1) * size : 0,
        data: data ? data : {},
        size: 50,
        sort_by: sort_by,
      };
  
      dispatch({ type:   CONTACT_US_V1_SELECT_LOADING, payload: true });
  
      try {
        let res = await ApiConfig(config, _data);
  
        let isOk = handleAlertMethodSelect(res.data ,dispatch )
        if(!isOk){
                return 
        }
  
        if (!res.data.response.data.results) {
          dispatch({
            type: "ALERT",
            payload: {
              status: true,
              textAlert: "رکورد بیشتری وجود ندارد",
              typeAlert: "warning",
            },
          });
        }
  
        dispatch({
          type:     CONTACT_US_V1_SELECT,
          payload: res.data,
        });
  
        dispatch({ type: CONTACT_US_V1_SELECT_LOADING, payload: false });
      } catch (err) {
        handleNoAnswarApi(dispatch);
        dispatch({ type: CONTACT_US_V1_SELECT_LOADING, payload: false });
      }
    };
  };
  