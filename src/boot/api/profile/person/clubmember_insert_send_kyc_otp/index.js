import AxiosCustom from '../../../../../Containers/Common/Components/apiConfig';

export function clubmember_send_kyc_otp(_data) {
    let config = {
        url: "insert_request"
    }

    let data = {
        // "api_key": "d025488f-8ec6-4434-afbe-b6a5343815a7",
        // token: "3cf61fab-b50a-410f-9d59-3357ee4706fe",
        // member_id: "_0zehXYBdxxYGfkX5_wd",
        table: "clubmember",
        method_type:"send_kyc_otp",
        data: _data ?_data :{}
    }


    return AxiosCustom(config, data)
}