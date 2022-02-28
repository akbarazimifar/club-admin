import React, { useState, useEffect } from 'react';
import Card from './Card';
import Styles from './index.module.scss';
import Header from './Header';
import { useDispatch, useSelector } from 'react-redux';
import { forum_v1_actions_select } from "../../../../boot/api/post-forum/forum/forum_v1_select/action";
import { distinctMethod } from "./../../../Common/method/distinctMethod";

import { forum_v1_actions_remove } from '../../../../boot/api/post-forum/forum/forum_v1_remove_forum/action';
import { forum_v1_actions_enable } from '../../../../boot/api/post-forum/forum/forum_v1_enable_forum/action';
import { forum_v1_actions_update } from '../../../../boot/api/post-forum/forum/for_v1_update_forum/action';
import { forum_v1_actions_insert } from '../../../../boot/api/post-forum/forum/for_v1_insert_forum/action';


export default function Index({ flagFilter }) {

    const dispatch = useDispatch();
    const stateReducer = useSelector(state => state.forum_v1_select_Reducer)
    const [state, setstate] = useState([])
    const [category, setCategory] = useState([])


    const apiCall = () => {
        dispatch(forum_v1_actions_select())
    }

    useEffect(() => {
        apiCall()
    }, []) //eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (stateReducer?.data.response)
            setstate(stateReducer.data.response.data.results)

    }, [stateReducer])

    useEffect(() => {
        if (state) {
            let distickCategory = distinctMethod(state, ['body', 'name'])
            setCategory(distickCategory)
        }
    }, [state])

    const handel_Remove_forum = (data) => {
 
        dispatch(forum_v1_actions_remove(data.id))
    }

    const handel_remove_all_forums = (data) => {

    }


    const handel_enable_forum = (data) => {

        dispatch(forum_v1_actions_enable(data.id))
    }


    const handel_update_forum = (data) => {

        let res = {
            _id: data.id,
            subgroup_name: data.subgroup_name,
            name: data.name,
        }

        dispatch(forum_v1_actions_update(res))
    }

    const handel_insert_forum = (data) => {

        let res = {
            name: data.name,
            author_id: null,
            is_visible: null,
            subgroup_name: data.subgroup_name,
        }

        dispatch(forum_v1_actions_insert(res))

    }

    const handel_update_name_formus = (data, name) => {

        data.forEach((item) => {
            let res = {
                _id: item.id,
                subgroup_name: item.body.subgroup_name,
                name: item.body.name,
            }

            dispatch(forum_v1_actions_update(res))
        })
    }


    return (
        <>
            <Header
                handleRefreshButton={apiCall}
            />
            <div
                className={Styles['Category']}
                style={{ height: !flagFilter ? '80vh' : '60.5vh' }}
            >
                {
                    category
                        // .filter(data => data.is_visible)
                        .map((data, index) => {
                            return (
                                <Card
                                    key={index}
                                    data={data}
                                    index={index}
                                    state={state}
                                    handel_Remove_forum={handel_Remove_forum}
                                    handel_update_forum={handel_update_forum}
                                    handel_enable_forum={handel_enable_forum}
                                    handel_insert_forum={handel_insert_forum}
                                    handel_update_name_formus={handel_update_name_formus}
                                    handel_remove_all_forums={handel_remove_all_forums}
                                />
                            )
                        })
                }

            </div>
        </>
    )
}