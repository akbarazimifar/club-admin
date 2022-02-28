import React, { useState, useEffect } from 'react';
import Header from "./Header";
import Content from './Content';
import { useDispatch, useSelector } from 'react-redux';
import { about_us_v1_select_actions } from '../../../../boot/api/staticPage/about_us/about_us_v1_select/action';
import { about_us_v1_update_actions } from '../../../../boot/api/staticPage/about_us/about_us_v1_update/action';


export default function Index() {
    const [flagFilter, setflagFilter] = useState(false); //eslint-disable-line  no-unused-vars

    const dispatch = useDispatch();
    const about_us_reducer = useSelector(state => state.about_us_v1_select_actions_Reducer.data)

    useEffect(() => {
        api_call_select()
    }, []) //eslint-disable-line  react-hooks/exhaustive-deps

    const api_call_select = () => {
        dispatch(about_us_v1_select_actions())
    }

    const handelsubmitUpdate = (value, index) => {
        let id = about_us_reducer.response.data.results[0].id;

        let data = JSON.parse(about_us_reducer.response.data.results[0].body.content);
        let res = data.map((items, ind) => {
            if (ind === index)
                return value
            return items
        })

        dispatch(about_us_v1_update_actions(JSON.stringify(res), id))

    }

    const handelSubmitAdd = (value) => {

        let id = about_us_reducer.response.data.results[0].id;
        let data = JSON.parse(about_us_reducer.response.data.results[0].body.content);
        let res = [value, ...data]

        dispatch(about_us_v1_update_actions(JSON.stringify(res), id))
    }

    const handelDeleteSubmit = (index) => {
        let id = about_us_reducer.response.data.results[0].id;
        let data = JSON.parse(about_us_reducer.response.data.results[0].body.content);
        let res = data.filter((items, ind) => index !== ind)
        dispatch(about_us_v1_update_actions(JSON.stringify(res), id))
    }


    return (
        <div >
            <Header
                handelShowFilterItems={() => setflagFilter(prev => !prev)}
                handelSubmitAdd={handelSubmitAdd}
                api_call_select={api_call_select}
            />
            <div style={{overflow:'auto' , height:'80vh'}}>
                {
                    about_us_reducer && (
                        <Content _data={about_us_reducer.response.data.results[0].body} handelsubmitUpdate={handelsubmitUpdate} handelDeleteSubmit={handelDeleteSubmit} />
                    )
                }
            </div>
        </div>
    )
}
