import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from "./header";
import FilterBox from "./FilterBox/FilterBox";
import Table from "./table/Table"
import { stepbystep_discount_action } from '../../../boot/api/stepByStepDiscount/sector_v1_select/action';


let initState = {
    member_first_name: "",
    member_last_name: "",
    member_national_id: "",
    instrument_type: "",
    is_online: "",
    state: ""
};


export default function Index() {
    const [flagFilter, setFlagFilter] = useState(false);
    const [stateFilter, setStateFilter] = useState(initState);
    const [pagination, setPagination] = useState(1);
    const reducerStepbystepDiscount = useSelector((state) => state.stepbystep_discount_Reducer);
    const dispatch = useDispatch();
    const [flagRefresh, setflagRefresh] = useState(false)


    useEffect(() => {
        apiCallSelect()
    }, [pagination, flagRefresh])

    const handleRefresh = () => {
        setStateFilter(initState)
        setflagRefresh(prev => !prev)
        setPagination(1)
    }

    const apiCallSelect = () => {
        let obj = {};
        let { size } = reducerStepbystepDiscount

        Object.keys(stateFilter).forEach((element) => {
            if (stateFilter[element]) {
                obj[element] = stateFilter[element];
            }
        });

        dispatch(stepbystep_discount_action(size, pagination, obj));
    }

    const handleChangeFilter = (data, type) => {
        setStateFilter((prev) => ({
            ...prev,
            [type]: data,
        }));
    };

    const handelSubmitFilter = () => {
        setflagRefresh(prev => !prev)
        setPagination(1)
    }


    return (
        <div>
            <Header
                handleRefresh={handleRefresh}
                setFlagFilter={setFlagFilter}
                stateFilter={stateFilter}
            />

            <FilterBox
                flagFilter={flagFilter}
                stateFilter={stateFilter}
                handleChangeFilter={handleChangeFilter}
                handelSubmitFilter={handelSubmitFilter}
            />

            <Table
                flagFilter={flagFilter}
                reducerData={reducerStepbystepDiscount}
                apiCallSelect={apiCallSelect}
                pagination={pagination}
                setPagination={setPagination}
            />
        </div>
    )
}
