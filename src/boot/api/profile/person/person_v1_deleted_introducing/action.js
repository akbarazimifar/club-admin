import ApiConfig from "../../../../../Containers/Common/Components/apiConfig";
import { handleAlertAndSelectApi, handleNoAnswarApi } from "../../../../../Containers/Common/method/handleAlertAndSelectApi";
import { SELECT_INTRODUCTION_DETAIL_EMPTY } from "../../../typeActions";

export const update_delete_introducer = (
  memberId,
) => {

  return async (dispatch) => {

    let config = { url: "update_request" };

    let _data = {
      table: "clubmember",
      method_type: "change_introducer",

      data: {
        _id: memberId,
        introducing_member_id: null,
        introducing_member_national_id: null,
        introducing_member_automation_id: null,
      },
    };

    try {
      let res = await ApiConfig(config, _data);

      handleAlertAndSelectApi(res.data, null, dispatch)
      
      if (res.data.status === 200 && res.data?.response?.is_successful) {
        dispatch({
          type: SELECT_INTRODUCTION_DETAIL_EMPTY
        });
      }



    } catch (err) {
      handleNoAnswarApi(dispatch);
    }
  }

};
