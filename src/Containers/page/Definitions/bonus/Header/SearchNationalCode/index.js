import React, { useState, useEffect } from 'react'
import Styles from './index.module.scss';
import TextField from '@material-ui/core/TextField';



export default function Index({ setFlag , apiselectProfile , reducerProfile , handelRouterModal }) {

    const [state, setstate] = useState('')

    const handleSubmit = () => {
        if (state.length === 0) {
            alert("کد ملی را پر کنید")
            return
        }

        apiselectProfile(state)
    }

    useEffect(() => {
        if(reducerProfile.data[0]){
            handelRouterModal()
            setFlag({ status: false, type: "" })
        }
    }, [reducerProfile.data]) //eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <div className={Styles['card']}>
                <h3 className={Styles['title']}>جستجوی کد ملی</h3>
                <div className={Styles['cardInput']}>

                    <TextField
                        id="standard-select-currency"
                        label={'کد ملی خود را وارد نمایید'}
                        value={state}
                        onChange={(event) => setstate(event.target.value)}
                        helperText=""
                        size="small"
                        fullWidth
                        variant="outlined"
                        margin="dense"
                        className={Styles['TextField']}
                    />

                </div>
                <div className={Styles['btns']}>
                    <button className={'btnsRed'} onClick={() => setFlag({ status: false, type: "" })}>انصراف</button>
                    <button className={'btnsBlue'} onClick={handleSubmit}>ثبت </button>
                </div>
            </div>
        </div>
    )
}
