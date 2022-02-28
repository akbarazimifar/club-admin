import React, { useEffect, useState } from 'react'
import Styles from './index.module.scss';
import CheckIcon from '@material-ui/icons/Check';
import { useSelector, useDispatch } from 'react-redux';
import AlertDialogSlide from "./../../../Common/Components/AlertDialogSlide";
import { post_v1_actions_approve } from "./../../../../boot/api/post-forum/post/post_v1_approve/action";
import { post_v1_actions_information, post_v1_actions_information_empty } from '../../../../boot/api/post-forum/post/post_v1_information/action';

export default function Index({ setFlagContent, post_id, handleApproveDetail }) {
    const [ensureApprove, setEnsureApprove] = useState(false);

    const handleClickButtons = (type) => {
        setFlagContent(type)
    }

    const [state, setState] = useState([])

    const dispatch = useDispatch()
    const stateReducer = useSelector(state => state.post_v1_information_Reducer)

    const handleOkAlert = () => {
        dispatch(post_v1_actions_approve(post_id, [post_v1_actions_information(post_id)]))

        setEnsureApprove(false)
    }

    useEffect(() => {
        dispatch(post_v1_actions_information(post_id))

        return () => {
            dispatch(post_v1_actions_information_empty())
        }

    }, [post_id]) //eslint-disable-line react-hooks/exhaustive-deps



    useEffect(() => {
        if (stateReducer.data) {
            setState(...stateReducer.data.response.data.results)
        }
    }, [stateReducer]) //eslint-disable-line react-hooks/exhaustive-deps



    return (
        <div className={Styles['cardPostShow']}>
            <div className={Styles['header']}>
                {
                    state?.body?.approve_date === "1970/01/01 00:00:00.000000" && (
                        <div className={Styles['head']}>
                            <h4>پست تایید شود؟</h4>
                            <div>
                                <CheckIcon
                                    className={Styles['CheckIcon']}
                                    onClick={() => setEnsureApprove(true)}
                                />
                                {/* <ClearIcon className={Styles['ClearIcon']}  /> */}
                            </div>
                        </div>
                    )
                }
                <div className={Styles['content']} >
                    <div dangerouslySetInnerHTML={{__html:state?.body?.body}} className={Styles['bodyhtml']}></div>
                            {/* ---------------------- */}
                </div>
            </div>
            <div className={Styles['btns']}>
                {/* <button className={Styles['btnsBlue']}>مشاهده ضمائم</button> */}
                <button className={Styles['btnsBlue']} onClick={() => handleClickButtons('COMMENTS')} >مشاهده نظرات </button>
                <button className={Styles['btnsBlue']} onClick={() => handleClickButtons('POST_Report')}>گزارش </button>
            </div>

            <AlertDialogSlide
                flagShow={ensureApprove}
                handleCloseAlert={setEnsureApprove}
                handleOkAlert={handleOkAlert}
                data={dataAlertDialogSlide}
            />
        </div>


    )
}

const dataAlertDialogSlide = {
    title: "تایید",
    description: "از تایید این مورد اطمینان دارید؟",
}