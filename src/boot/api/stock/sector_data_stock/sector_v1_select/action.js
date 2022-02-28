
import ApiConfig from "../../../../../Containers/Common/Components/apiConfig";
import { handleNoAnswarApi , handleAlertMethodSelect } from "../../../../../Containers/Common/method/handleAlertAndSelectApi";
import { SECTOR_V1_MANAGEMENT_DATA_SELECT } from "../../../typeActions";

export const management_data_sector_actions = (size, from, data, sort_by) => {
  return async (dispatch) => {
    let config = { url: "select_request" };

    let _data = {
      table: "stock",
      method_type: "select_sectors",

      from: from ? (from - 1) * size : 0,
      data: data ? data : {},
      size: size ? size : 20,
      sort_by: sort_by ? sort_by : {},
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

      let isOk = handleAlertMethodSelect(res.data ,dispatch )
      if(!isOk){
              return 
      }

      if (!res.data.response.data.results.length) {
        dispatch({
          type: "ALERT",
          payload: {
            status: true,
            textAlert: "سهم بیشتری وجود ندارد",
            typeAlert: "warning",
          },
        });
      }

      dispatch({
        type: SECTOR_V1_MANAGEMENT_DATA_SELECT,
        payload: res.data.response.data,
      });
    } catch (err) {
      handleNoAnswarApi(dispatch);
    }
  };
};
