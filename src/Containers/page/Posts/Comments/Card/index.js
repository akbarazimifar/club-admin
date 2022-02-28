import React, { useState, useEffect } from 'react'
import Styles from './index.module.scss';
import PersonIcon from '@material-ui/icons/Person';
import Card from '../Card';
import { useSelector, useDispatch } from 'react-redux';
import AlertDialogSlide from '../../../../Common/Components/AlertDialogSlide';
import TextAreaSubmited from './TextAreaSubmited';

import { comments_v1_actions_select } from '../../../../../boot/api/post-forum/post/comments_v1_select/action';
import { post_v1_actions_enable } from '../../../../../boot/api/post-forum/post/comments_v1_enable/action';
import { post_v1_actions_remove } from '../../../../../boot/api/post-forum/post/comments_v1_remove/action';


export default function Index({ style, dataReducer, parent_post_id  , handel_Submit_insert_comment , handel_submit_edite_comment}) {

    const [data, setdata] = useState([])
    const [response, setResponse] = useState("");
    const [state, setflag] = useState({ flag: false, id: null })
    const [edite, setEdite] = useState('')

    const [flagAlert, setflagAlert] = useState(false)
    const [flagEdite, setflagEdite] = useState(false)

    const dispatch = useDispatch()
    const stateReducer = useSelector(state => state.comments_v1_select_Reducer)


    useEffect(() => {

        if (state.flag && state.id && data.length === 0) {
            dispatch(comments_v1_actions_select(state.id))
        }
    }, [state]) //eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {

        if (stateReducer.data.length !== 0) {
            let res = stateReducer.data.filter((items) => items.id === state.id)

            if (res.length !== 0){
                setdata(res[0].body.response.data.results)
            }
            setEdite(dataReducer?.body?.abstract)
        }
    }, [stateReducer.data,flagEdite]) //eslint-disable-line react-hooks/exhaustive-deps



    const handelClick = (id) => {
        setflag({
            flag: !state.flag,
            id: id
        })

    }

    const handelStatusComment = () => {


        if (dataReducer.body.is_visible === "TRUE") {

            dispatch(post_v1_actions_remove(dataReducer.id, comments_v1_actions_select, parent_post_id))
        }

        if (dataReducer.body.is_visible === "FALSE") {

            dispatch(post_v1_actions_enable(dataReducer.id, comments_v1_actions_select, parent_post_id))
        }

        setflagAlert(false)

    }


    const handelSubmitinsert= ()=>{
        if(response){
            setResponse(' ')
            handel_Submit_insert_comment(response , dataReducer)
     
        }else{
            alert('لطفا مقدار را وارد نمایید ')
        }
    }


    const handelClickBtnsEdite = ()=>{
        if(state.flag)
        setflagEdite(prev=>!prev)
 
    }


    const handelSubmitUpadte = ()=>{
        setflagEdite(false)
        handel_submit_edite_comment(edite ,dataReducer.id ,parent_post_id)
    }



    const dataAlertDialogSlide = {
        title: "ویرایش",
        description: `از ${dataReducer?.body?.is_visible === "TRUE" ? "عدم نمایش" : "نمایش"} این رکورد اطمینان دارید؟`,
    }



    return (
        <div className={Styles['card']} style={{ marginRight: style.mr, width: style.width }}>
            <div className={Styles['header']} >
                <div className={`${Styles['content']} ${Styles['cursor']}`} onClick={() => handelClick(dataReducer.id)}>
                    <div className={Styles['title']}>
                        <PersonIcon />
                        <p>
                            {dataReducer?.body?.author_first_name}
                            {'\u00A0'}
                            {dataReducer?.body?.author_last_name}
                        </p>
                    </div>
                    <div>
                        <p>
                            {dataReducer?.body?.create_date.split(".")[0]}
                        </p>
                    </div>
                </div>
                <div className={Styles['content']}>
                    <div className={Styles['desc']}>
                            {
                                dataReducer?.body?.abstract && (
                                    
                                    <div
                                        dangerouslySetInnerHTML={{ __html: dataReducer?.body?.abstract }}>
                                    </div>
                                )
                            }
                    </div>
                    <div style={{minHeight:50}}>
                        <button 
                            className={`${Styles['btns']} ${state.flag?'btnsYellow': Styles['disabledItems']} `}
                            onClick={() => handelClickBtnsEdite()}>
                            {
                                flagEdite 
                                ?'پاسخ'
                                :'ویرایش'

                            }
                            
                        </button>
                        <button className={`${Styles['btns']} btnsBlue`} onClick={() => setflagAlert(true)}>
                            {
                                dataReducer?.body?.is_visible === "TRUE"
                                    ? "عدم نمایش"
                                    : "نمایش"
                            }
                        </button>
                    </div>
                </div>
            </div>


            {
                state.flag && (
                    <div className={Styles['Details']}>

                        <div className={Styles['answerTextaria']}>
                        {
                            !flagEdite &&(
                                <>
                                    <TextAreaSubmited  response={response} >
                                        {data => setResponse(data)}
                                    </TextAreaSubmited>
                                    <button className={Styles['button']} onClick={()=>handelSubmitinsert()}>ارسال پاسخ</button>
                                </>
                            )
                        }
                        {
                            flagEdite &&(
                                <>
                                <TextAreaSubmited  response={edite} >
                                    {data => setEdite(data)}
                                </TextAreaSubmited>
                                <div className={Styles['btnsEdit']}>
                                    <button className={'btnsGreen'} onClick={()=>handelSubmitUpadte()}>ثبت</button>
                                    {/* <button className={'btnsRed'} onClick={()=>setflagEdite(false)}>انصراف</button> */}
                                </div>
                              </>
                            )
                        }
                    
                        </div>

                        {
                            data.map((comment, index) => {
                                return <Card 
                                            dataReducer={comment}
                                            key={index}
                                            style={{ mr: '1%', width: '99%' }}
                                            parent_post_id={dataReducer.id} 
                                            handel_Submit_insert_comment={handel_Submit_insert_comment}
                                            handel_submit_edite_comment={handel_submit_edite_comment}
                                            />
                            })
                        }
                        {
                            data.length === 0 && (
                                <p style={{ marginRight: 20 }}>موردی یافت نشد</p>
                            )
                        }
                    </div>
                )
            }
            {
                flagAlert && (
                    <AlertDialogSlide
                        flagShow={flagAlert}
                        handleCloseAlert={() => setflagAlert(false)}
                        handleOkAlert={handelStatusComment}
                        data={dataAlertDialogSlide}
                    />
                )
            }
        </div>
    )
}


