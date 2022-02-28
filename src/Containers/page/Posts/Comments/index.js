import React, { useState, useEffect } from 'react'
import Styles from './index.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import Card from './Card';
import CardNoData from "./../../../Common/method/cardNoData/index";


import { comments_v1_actions_select, comments_v1_actions_empty } from '../../../../boot/api/post-forum/post/comments_v1_select/action';
import { post_v1_actions_insert } from '../../../../boot/api/post-forum/post/comments_v1_insert/action';
import { post_v1_actions_update} from '../../../../boot/api/post-forum/post/comment_v1_update/action';
import {data_m} from '../../../Common/method/date';

export default function Index({ post_id }) {


    const [state, setState] = useState([])

    const dispatch = useDispatch()
    const stateReducer = useSelector(state => state.comments_v1_select_Reducer)


    useEffect(() => {

        dispatch(comments_v1_actions_select(post_id))

        return () => {
            dispatch(comments_v1_actions_empty())
        }

    }, [post_id]) //eslint-disable-line react-hooks/exhaustive-deps


   useEffect(()=>{
       if (stateReducer.data.length !== 0){
           let res =  stateReducer.data.filter((items)=>{
               return items.id === post_id
           }  )
           if(res.length !== 0){
               setState(res[0].body.response.data.results)
           }
       }
    } , [stateReducer]) //eslint-disable-line react-hooks/exhaustive-deps


    const handel_Submit_insert_comment = (value , data)=>{
        
       
         let date = data_m()
         let session_login = JSON.parse( sessionStorage.getItem("login"));

         if(!date){
            alert('فرمت تاریخ وارد شده اشتباه می باشد لطفا آن را بررسی نمایید ')
            return 
         }

        let obj = {
            title: value,
            body: value,
            abstract: value,
            create_date: date,
            approve_date: null,
            is_visible: null,
            parent_post_id : data.id,
            forum_name: null,
            subgroup_id: null,
            subgroup_name: null,
            author_id: session_login.member_id,
            author_first_name: null,
            author_last_name: null,
            select_permission_level: null,
            update_permission_level: null,
            delete_permission_level: null,
            isin: null,
            tags: null,
            likes: null,
            short_url: null
        }

        dispatch(post_v1_actions_insert(obj,comments_v1_actions_select,data.id))

    }

    const handel_submit_edit_comment = (value , id , parent_post_id)=>{
        let obj = {
            _id : id,
            abstract: value,
            title: value,
            body: value,
        }
        dispatch(post_v1_actions_update(obj ,comments_v1_actions_select ,parent_post_id ))
    }


    return (
        <div className={Styles['Comments']}>

            {
                state.length === 0 && (
                    <CardNoData />
                )
            }
            {
                state.map((comment, index) => {
                    return (
                        <Card 
                            dataReducer={comment}
                            key={index}
                            data={comment}
                            style={{ mr: '0%', width: '100%' }}
                            parent_post_id={post_id} 
                            handel_Submit_insert_comment={handel_Submit_insert_comment}
                            handel_submit_edite_comment = {handel_submit_edit_comment}
                            />
                    )
                })
            }

        </div>
    )
}
