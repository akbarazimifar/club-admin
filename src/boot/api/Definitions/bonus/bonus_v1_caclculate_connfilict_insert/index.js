
import AxiosCustom from '../../../../../Containers/Common/Components/apiConfig';

export function bonus_caclculate_connfilict_insert(_data) {
    let config = {
        url: "insert_request"
    }

    let data = {
        table: "bonus",
        method_type: "recalculate_bonus",
        data: _data ? _data : {}
    }


    return AxiosCustom(config, data)
}