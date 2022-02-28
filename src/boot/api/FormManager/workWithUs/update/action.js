import ApiConfig from "../../../../../Containers/Common/Components/apiConfig";
import { handleNoAnswarApi } from "../../../../../Containers/Common/method/handleAlertAndSelectApi";
import { WORK_WITH_US_V1_UPDATE } from "../../../typeActions";
import { work_with_us_v1_select_actions } from "./../action";

export const workwithus_v1_update_actions = (id, newStatus, size) => {
  return async (dispatch) => {
    let config = { url: "update_request" };

    let _data = {
      table: "workwithus",
      method_type: "update",

      data: { _id: id, status: newStatus },
    };

    try {
      let res = await ApiConfig(config, _data);

      if (res.data.status !== 200 || !res.data.response.is_successful) {
        handleNoAnswarApi(dispatch);
        return;
      }
      dispatch(work_with_us_v1_select_actions(size));
      dispatch({
        type: WORK_WITH_US_V1_UPDATE,
        payload: res.data.response.data.results,
      });
    } catch (err) {
      handleNoAnswarApi(dispatch);
    }
  };
};
