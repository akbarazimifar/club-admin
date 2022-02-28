import React from 'react'
import Excel from "../../../../Common/Components/Excel";
import { useSelector } from 'react-redux';


export default function ExcelListRefCode({ introducing_member_id }) {

    const stateReducerExcel = useSelector((state) => state.excel_list_all_reducer);


    const handelNull = (data) => {
        if (!data || data === 'null') {
            return '-'
        }
        return data
    }

    const headers = [
        { label: "ردیف", key: "row" },
        { label: "نام", key: "first_name" },
        { label: "نام خانوادگی", key: "last_name" },
        { label: "نام کاربری", key: "user" },
        { label: "کد ملی", key: "national_id" },
        { label: "شماره تلفن", key: "phone" },
    ];

    const handleExcelData = () => {
        let dataExcel = stateReducerExcel.data?.map((info, index) => {
            return {
                row: index + 1,
                first_name: handelNull(info.body.first_name),
                last_name: handelNull(info.body.last_name),
                user: handelNull(info.body.user),
                national_id: handelNull(info.body.national_id),
                phone: handelNull(info.body.phone),
            };
        });
        return dataExcel;
    };

    if (!introducing_member_id) {
        return <></>
    }

    return (
        <Excel
            headers={headers}
            handleExcelData={handleExcelData}
            stateFilter={{ introducing_member_id: introducing_member_id }}
            stateReducerExcel={stateReducerExcel}
            methodType={"select"}
            methodTypeNationId={null}
            methodType2={null}
            methodTypeNationId2={null}
            tableApi={"clubmember"}
            valueTab={0}
            filename={'introducing_member_id'}
        />
    )
}
