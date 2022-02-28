import React ,{ useEffect, useState } from 'react'
import Styles from './index.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import InformationPost from './InformationPost';
import { post_v1_actions_information, post_v1_actions_information_empty } from '../../../../boot/api/post-forum/post/post_v1_information/action';
import{comments_v1_actions_select , comments_v1_actions_empty} from '../../../../boot/api/post-forum/post/comments_v1_select/action';



export default function Index({setFlagContent , post_id}) {

    const handleClickButtons = (type)=>{
        setFlagContent(type)
    }

    const [state, setState] = useState([])
    const [countComments, setcountComments] = useState(null)

    const dispatch = useDispatch()
    const stateReducer = useSelector(state => state.post_v1_information_Reducer)
    const stateReducerComments = useSelector(state => state.comments_v1_select_Reducer)




    useEffect(() => {
        dispatch(post_v1_actions_information(post_id))
        dispatch(comments_v1_actions_select(post_id))
        
        return () => {
            dispatch(post_v1_actions_information_empty())
            dispatch(comments_v1_actions_empty())
        }

    }, [post_id]) //eslint-disable-line react-hooks/exhaustive-deps



    useEffect(() => {
        if (stateReducer.data) {
            setState(...stateReducer.data.response.data.results)
        }
    }, [stateReducer]) //eslint-disable-line react-hooks/exhaustive-deps

    useEffect(()=>{
        if(stateReducerComments){
            setcountComments(stateReducerComments.data.length)
        }
    },[stateReducerComments]) //eslint-disable-line react-hooks/exhaustive-deps


    return (
        <div className = {Styles['postReport']}>
            <div className={Styles['body']}>
                <InformationPost data={state} countComments={countComments}/>
                {/* <Chart /> */}
            </div>
            <div className={Styles['btns']}>
                    <button className={Styles['btnsBlue']} onClick={()=>handleClickButtons('COMMENTS')} >مشاهده نظرات </button>
                    {/* <button className={Styles['btnsBlue']} onClick={()=>handleClickButtons('POST_Report')}>گزارش </button> */}
            </div>
        </div>
    )
}
