import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signal_document_v1_select_actions } from '../../../../../../boot/api/signalHafez/signals/detail_document/action'
import { SIGANL_V1_DOCUMENT_SELECT_EMPTY } from '../../../../../../boot/api/typeActions'
import CircularProgress from '@material-ui/core/CircularProgress';
import CardNoData from "./../../../../../Common/method/cardNoData"

export default function FileDetails({ data }) {
    const stateReducer = useSelector(state => state.signal_document_hafez_v1_select_Reducer)
    const dispatch = useDispatch()

    useEffect(() => {
        let res = { _id: data.id }
        dispatch(signal_document_v1_select_actions(res))

        return () => {
            dispatch({ type: SIGANL_V1_DOCUMENT_SELECT_EMPTY })
        }
    }, [])

    return (
        <div>
            {
                stateReducer.loading ?
                    <CircularProgress />
                    : stateReducer.data[0] ?
                        <>
                            <iframe src={`data:application/pdf;base64,${stateReducer.data[0]?.body?.document}`} style={{ width: "70vh", height: "70vh" }} ></iframe> {//eslint-disable-line jsx-a11y/iframe-has-title
                            }
                        </> : <CardNoData label="فایلی وجود ندارد" />
            }

        </div>
    )
}
