import React, { useEffect } from 'react';
import Header from "./Header";
import Tables from "./Tables/Tables";
import { useDispatch, useSelector } from 'react-redux';
import { systems_v1_select_actions } from "../../../../boot/api/staticPage/systems/systems_v1_select/action"



export default function Index() {
    const dispatch = useDispatch();
    const data = useSelector(state => state.systems_v1_select_Reducer)

    useEffect(() => {
        api_call_select()
    }, []) //eslint-disable-line react-hooks/exhaustive-deps

    const api_call_select = ()=>{
        dispatch(systems_v1_select_actions())
    }

    return (
        <div>
            <Header dataPrev={data?.data.response?.data.results} api_call_select={api_call_select} />
            {
                data?.data.response ?
                    <Tables data={data?.data.response.data.results} />
                    : ""
            }        </div>
    )
}
