import React, { useState, useEffect } from 'react';
import Header from "./Header";
import Content from './Content';
import { useDispatch, useSelector } from 'react-redux';
import { education_software_v1_select_actions } from "../../../../boot/api/staticPage/education_software/education_software_v1_select/action"
import { distinctMethod } from "./../../../Common/method/distinctMethod";
import { education_software_v1_update_actions } from "./../../../../boot/api/staticPage/education_software/education_software_v1_update_actions/action"



// let dataNEW = [
//     { title: "دانلود Mozilla Firefox 70.0 x86 (ویندوز 32 بیتی)", link: "http://www.mobinsb.com/uploads/webinar/Mozilla-Firefox-70.0-(32-bit).zip", category: "دانلود نرم افزارهای وبینار" },
//     { title: "2", link: "link2", category: "دانلود نرم افزارهای وبینار" },
//     { title: "new category", link: "linkNew", category: "دانلود دسته بندی جدید" },
//     { title: "new category1", link: "linkNew", category: "دانلود دسته بندی جدید" },
// ]

// let category = distinctMethod(dataNEW, ["category"])



export default function Index() {
    const dispatch = useDispatch();
    const data = useSelector(state => state.education_software_v1_select_Reducer);
    const [state, setState] = useState(null)
    const [flagFilter, setflagFilter] = useState(false); //eslint-disable-line no-unused-vars


    useEffect(() => {
        if (data.data.response) {
            setState(JSON.parse(data.data.response.data.results[0].body.content))
        }
    }, [data])

    useEffect(() => {
        api_call_select()
    }, []) //eslint-disable-line react-hooks/exhaustive-deps

    const api_call_select  = ()=>{
        dispatch(education_software_v1_select_actions())
    }

    const handleUpdateDispatch = (dataIns) => {
        const { id } = data.data.response.data.results[0];

        dispatch(education_software_v1_update_actions(JSON.stringify(dataIns), id))
    }



    return (
        <div>
            <Header
                handelShowFilterItems={() => setflagFilter(prev => !prev)}
                dataPrev={state}
                dataInsert={handleUpdateDispatch}
                api_call_select = {api_call_select}
            />
            {
                state && (
                    <Content
                        category={distinctMethod(state, ["category"])}
                        data={state}
                        handleUpdate={handleUpdateDispatch} 
                    />
                )
            }

        </div>
    )
}
