
import ApiConfig from "../../../../../Containers/Common/Components/apiConfig";
import { handleNoAnswarApi, handleAlertMethodSelect } from "../../../../../Containers/Common/method/handleAlertAndSelectApi";
import { SIGANL_V1_DOCUMENT_SELECT, SIGANL_V1_DOCUMENT_SELECT_LOADING } from "../../../typeActions";

export const signal_document_v1_select_actions = (data) => {
  return async (dispatch) => {
    dispatch({ type: SIGANL_V1_DOCUMENT_SELECT_LOADING, payload: true })
    let config = { url: "select_request" };

    let _data = {
      table: "HADAFHAFEZ",
      method_type: "select_uploaded_documents",
      data
    };

    try {
      dispatch({
        type: "ALERT",
        payload: {
          status: true,
          textAlert: "در حال بازخوانی",
          typeAlert: "info",
        },
      });

      let res = await ApiConfig(config, _data);
      let isOk = handleAlertMethodSelect(res.data, dispatch)
      if (!isOk) {
        return
      }

      dispatch({
        type: SIGANL_V1_DOCUMENT_SELECT,
        payload: res.data,
      });
    } catch (err) {
      handleNoAnswarApi(dispatch);
    } finally {
      dispatch({ type: SIGANL_V1_DOCUMENT_SELECT_LOADING, payload: false })
    }
  };
};
