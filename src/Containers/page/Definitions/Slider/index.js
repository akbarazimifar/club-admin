import React, { useState, useEffect } from 'react'
import Header from './Header';
import FilterItems from './FilterItems';
import Tables from './Tables/Tables';
import { useDispatch, useSelector } from 'react-redux';
import { slider_v1_select_actions } from "./../../../../boot/api/Definitions/slider/slider_v1_select/action";
import { slider_v1_update_actions } from "./../../../../boot/api/Definitions/slider/slider_v1_update_actions/action";

export default function Index() {

    const dispatch = useDispatch();
    const [flagFilter, setFlagFilter] = useState(false)
    const [state, setState] = useState({ id: null, body: {} })

    const Reducer = useSelector(state => state.slider_v1_select_Reducer)

    const handelSubmitUpdate = (obj) => {

        let data = {
            slider_name: "HOME_PAGE",
            content: [
                {
                    Title: obj.Title,
                    Link: obj.Link,
                    Priority: obj.Priority,
                    IMAGE_URI: obj.IMAGE_URI,
                    IsNewPage: obj.IsNewPage,
                    showSlider: obj.showSlider,
                },
                ...state.body.content
            ]
        }

        let { id } = state;

        dispatch(slider_v1_update_actions(JSON.stringify(data), id))
    }

    const handelSubmitDelete = (index) => {
        let deleteDate = state.body.content.filter((item, ind) => ind !== index)
        let data = {
            slider_name: state.body.slider_name,
            content: deleteDate
        }
        let { id } = state;
        dispatch(slider_v1_update_actions(JSON.stringify(data), id))
    }

    const apiCall = () => {
        dispatch(slider_v1_select_actions());
    }

    const apiUpdateSlider = (obj, index) => {

        let isOk = conditionData(obj)
        if (isOk) {
            return
        }

        let data = {
            slider_name: state.body.slider_name,
            content: [
                ...state.body.content.map((item, ind) => {
                    if (index === ind) {
                        return {
                            Title: obj.Title,
                            Link: obj.Link,
                            Priority: obj.Priority,
                            IMAGE_URI: obj.IMAGE_URI,
                            IsNewPage: obj.IsNewPage,
                            showSlider: obj.showSlider,
                        }
                    }
                    return item
                })
            ]
        }

        let { id } = state;

        dispatch(slider_v1_update_actions(JSON.stringify(data), id))
    }

    const conditionData = (data, condition) => {

        let flag = false
        let text = ''

        if (!data || !condition) {
            return
        }
        Object.keys(condition).forEach((item, index) => {
            let string = String(data[item])
            if (!string) {
                text += `
                ${condition[item]} ${index === Object.keys(data).length
                        ? ''
                        : '،'
                    } `
                flag = true
            }
        })

        if (flag) {
            dispatch({ type: "ALERT", payload: { status: true, textAlert: `لطفا فیلد (${text.slice(0, text.length - 2)}) را پر نمایید`, typeAlert: "warning" } })
            return true
        }
        return false

    }

    useEffect(() => {
        apiCall()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {

        Reducer.forEach(item => {
            const content = JSON.parse(item.body.content)
            if (content.slider_name === "HOME_PAGE") {
                setState({ id: item.id, body: content })
            }
        })
    }, [Reducer])



    return (
        <div>
            < Header
                handelShowFilterItems={() => setFlagFilter(!flagFilter)}
                handelSubmitUpdate={handelSubmitUpdate}
                handleRefresh={apiCall}
                conditionData={conditionData}
            />
            <FilterItems flagFilter={flagFilter} />

            <Tables
                data={state}
                flagFilter={flagFilter}
                handelSubmitDelete={handelSubmitDelete}
                apiUpdateSlider={apiUpdateSlider}
                conditionData={conditionData}
            />
        </div>
    )
}




