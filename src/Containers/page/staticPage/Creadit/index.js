import React, { useState, useEffect } from 'react';
import Header from "./Header";
import Content from './Content';
import { useSelector, useDispatch } from 'react-redux';

import { creadit_v1_select_actions } from '../../../../boot/api/staticPage/creadit/creadit_v1_select/action';
import { creadit_v1_update_actions } from '../../../../boot/api/staticPage/creadit/creadit_v1_update/action';

export default function Index() {

    let dispatch = useDispatch();
    const [flagFilter, setflagFilter] = useState(false); //eslint-disable-line no-unused-vars
    let caredit_reducer = useSelector(state => state.creadit_v1_select_actions_Reducer.data);

    useEffect(() => {
        api_call_select()
    }, [])//eslint-disable-line react-hooks/exhaustive-deps

    const api_call_select = () => {
        dispatch(creadit_v1_select_actions())
    }

    const handelSubmitUpdate = (value, index) => {
        let id = caredit_reducer.response.data.results[0].id;
        let data = JSON.parse(caredit_reducer.response.data.results[0].body.content);
        let res = data.map((items, ind) => {
            if (ind === index)
                return value
            return items
        })

        dispatch(creadit_v1_update_actions(JSON.stringify(res), id))
    }

    const handelSubmitAdd = (value) => {

        let id = caredit_reducer.response.data.results[0].id;
        let data = JSON.parse(caredit_reducer.response.data.results[0].body.content);
        let res = [value, ...data]

        dispatch(creadit_v1_update_actions(JSON.stringify(res), id))
    }

    const handelDeleteSubmit = (index) => {

        let id = caredit_reducer.response.data.results[0].id;
        let data = JSON.parse(caredit_reducer.response.data.results[0].body.content);
        let res = data.filter((items, ind) => ind !== index)

        dispatch(creadit_v1_update_actions(JSON.stringify(res), id))
    }

    return (
        <div>
            <Header
                handelShowFilterItems={() => setflagFilter(prev => !prev)}
                handelSubmitAdd={handelSubmitAdd}
                api_call_select={api_call_select}
            />
            <div style={{ overflow: 'auto', height: '80vh' }}>

                {
                    caredit_reducer && (

                        <Content
                            handelDeleteSubmit={handelDeleteSubmit}
                            handelSubmitUpdate={handelSubmitUpdate}
                            caredit_reducer={caredit_reducer.response.data.results[0].body}
                        />
                    )
                }
            </div>
        </div>
    )
}
