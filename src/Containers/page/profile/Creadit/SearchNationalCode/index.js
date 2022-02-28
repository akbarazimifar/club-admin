import React from 'react'
import Styles from './index.module.scss';
import Box from "@material-ui/core/Box";

import TextField from '@material-ui/core/TextField';

export default function Index({ apiselectCreadit , national_id , setNational_id }) {

    const handleSubmit = () => {
        if (national_id.length === 0) {
            alert("کد ملی را پر کنید")
            return
        }

        apiselectCreadit({ national_id: national_id })
    }

    return (
        <div className={Styles['Search_National_Code']}>
            <div className={Styles['card']}>
                <h3 className={Styles['title']}>جستجوی کد ملی</h3>
                <div className={Styles['cardInput']}>
                    <Box width={350} className={Styles['TextField']} >
                        <TextField
                            id="standard-select-currency"
                            label={'کد ملی خود را وارد نمایید'}
                            value={national_id}
                            onChange={(event) => setNational_id(event.target.value)}
                            helperText=""
                            size="small"
                            fullWidth
                            variant="outlined"
                            margin="dense"
                        />
                    </Box>
                </div>
                <div className={Styles['btns']}>
                    <button
                        className={'btnsGreen'}
                        onClick={handleSubmit}
                    >
                        تایید
                        </button>
                    <button className={'btnsRed'}>لغو</button>
                </div>
            </div>
        </div>
    )
}
