import React from 'react';
import Switch from '@material-ui/core/Switch';
import AlertDialogSlide from "./../../../../Common/Components/AlertDialogSlide"
import { useDispatch } from 'react-redux';
import { summaries_v1_actions_deactive } from '../../../../../boot/api/profile/summaries/stock_deactive_summaries/action';
import { summaries_v1_actions_active } from '../../../../../boot/api/profile/summaries/stock_active_summaries/action';



export function TableCellActive({ row }) {
    const [showAlert, setShowAlert] = React.useState(false);
    const dispatch = useDispatch()

    const handleChangeIsActive = (e) => {
        setShowAlert(true)
    }

    const handleOkAlertIsActive = () => {
        setShowAlert(false)
        if (row.body.is_active === "TRUE") {
            dispatch(summaries_v1_actions_deactive(row.id))
        } else {
            dispatch(summaries_v1_actions_active(row.id))
        }
    }

    return (
        <>
            <Switch
                checked={row.body.is_active === "TRUE" ? true : false}
                onChange={handleChangeIsActive}
                color="primary"
                name="checkedB"
                inputProps={{ 'aria-label': 'primary checkbox' }}
            />
            <AlertDialogSlide
                flagShow={showAlert}
                handleCloseAlert={setShowAlert}
                handleOkAlert={handleOkAlertIsActive}
                data={dataDelete}
            />
        </>
    )
}

const dataDelete = {
    title: "ویرایش",
    description: "از تغییر نمایش این رکورد اطمینان دارید؟",
};

