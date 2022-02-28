import {
  REGISTRATION_COURSE_V1_SELECT,
  REGISTRATION_COURSE_V1_SELECT_MORE,
  REGISTRATION_COURSE_V1_LIST,
} from "../../../typeActions";

import ApiConfig from "../../../../../Containers/Common/Components/apiConfig";
import {
  handleNoAnswarApi,
  handleAlertMethodSelect,
} from "../../../../../Containers/Common/method/handleAlertAndSelectApi";

export function registeration_v1_select_actions(
  sort_by,
  size,
  from,
  data,
  flag
) {
  return async (dispatch) => {
    let config = { url: "select_request" };
    let _data = {};
    if (flag) {
      _data = {
        table: "course",
        method_type: "select_registrations",
        data: data ? data : {},
      };
    } else {
      _data = {
        table: "course",
        method_type: "select_registrations",
        from: from ? (from - 1) * size : 0,
        size: size,
        data: data ? data : {},
        sort_by: sort_by,
      };
    }

    try {
      dispatch({
        type: "ALERT",
        payload: {
          status: true,
          textAlert: "در حال بازخوانی",
          typeAlert: "info",
        },
      });

      let response = await ApiConfig(config, _data);

      let isOk = handleAlertMethodSelect(response.data, dispatch);
      if (!isOk) {
        return;
      }
      if (flag) {
        dispatch({
          type: REGISTRATION_COURSE_V1_LIST,
          payload: response.data.response.data,
        });
      } else {
        dispatch({
          type: REGISTRATION_COURSE_V1_SELECT,
          payload: response.data.response.data,
        });
      }
    } catch (err) {
      handleNoAnswarApi(dispatch);
    }
  };
}
