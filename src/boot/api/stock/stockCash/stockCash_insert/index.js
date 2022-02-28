
import AxiosCustom from '../../../../../Containers/Common/Components/apiConfig';

export function stockCash_insert(_data) {
    let config = {
        url: "insert_request"
    }

    let data = {
        table: "codal",
        method_type: "insert_codal_participation",
        data: _data ? _data : {}
    }


    return AxiosCustom(config, data)
}