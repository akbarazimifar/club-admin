import React, { useEffect, useState } from 'react';
import Header from "./header";
import Filter from "./Filter";
import { useDispatch, useSelector } from 'react-redux';
import { summaries_v1_actions_select } from '../../../../boot/api/profile/summaries/action';
import Table from "./table";
import { STOCK_V1_SELECT_SUMMARIES_PAGE_STOCK_EMPTY } from './../../../../boot/api/typeActions'
import { summaries_v1_actions_select_filter } from '../../../../boot/api/profile/summaries/stock_filter_summaries/action';

let initState = {
    isin: "", back_office_id: "", short_name: "", full_name: "", sector_code: "", sector_name: "", sub_sector_code: "", flow: "", is_active: "", stock_type: ""
};

let flag = false

export default function Index() {
    const [flagFilter, setFlagFilter] = useState(false);
    const [stateFilter, setStateFilter] = useState(initState);

    const [sort, setSort] = useState({});
    const dataReducer = useSelector((state) => state.stock_select_summaries_reducer);
    const dispatch = useDispatch();



    const apiCallActionSummaries = (data) => {
        let res = data ? data : {}
        let { id, ...sortRes } = sort
        dispatch(summaries_v1_actions_select(res, sortRes))
    }

    useEffect(() => {
        if (dataReducer.data.length === 0 || dataReducer.pageStock.length === 0) {
            apiCallActionSummaries()
        }
    }, [])


    const handleNull = (key) => {
        if (key === null || key === "" || key === "null") {
            return "_";
        } else {
            return key;
        }
    };

    const handleRefresh = () => {
        setStateFilter(initState)
        apiCallActionSummaries()
    }

    const handleChangeFilter = (data, type) => {
        setStateFilter((prev) => ({
            ...prev,
            [type]: data,
        }));
    };

    const handelSubmitFilter = () => {
        dispatch({ type: STOCK_V1_SELECT_SUMMARIES_PAGE_STOCK_EMPTY })
        let obj = {}
        Object.keys(stateFilter).forEach((element) => {
            if (stateFilter[element]) {
                obj[element] = stateFilter[element];
            }
        });

        dispatch(summaries_v1_actions_select_filter(obj))
    };

    useEffect(() => {
        if (flag) {
            apiCallActionSummaries();
        }
        flag = true
    }, [sort]);


    return (
        <>
            <Header
                handleRefresh={handleRefresh}
                setFlagFilter={setFlagFilter}
            />
            <Filter
                flagFilter={flagFilter}
                stateFilter={stateFilter}
                handleChangeFilter={handleChangeFilter}
                handelSubmitFilter={handelSubmitFilter}
                dataReducer={dataReducer.data}
            />

            <Table
                sort={sort}
                stateFilter={stateFilter}
                setSort={setSort}
                flagFilter={flagFilter}
                data={dataReducer.pageStock}
                handleNull={handleNull}
            />
        </>
    )
}
