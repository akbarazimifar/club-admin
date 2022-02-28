
import AxiosCustom from '../../../../../Containers/Common/Components/apiConfig';

export function stockCash_update(_data) {
    let config = {
        url: "update_request"
    }

    let data = {
        table: "codal",
        method_type: "update_codal_participation",
        data: _data ? _data : {}
    }


    return AxiosCustom(config, data)
}