import React from 'react'
import Styles from './index.module.scss';
import TextField from '@material-ui/core/TextField';

export default function Index({flagFilter}) {

    return (
        <>
            {
                flagFilter 
                ?(
                <div className={Styles['filter']}>
                    <h3>فیلتر اطلاعات</h3>
                    <TextField id="outlined-basic" label={'صفحه اصلی'} variant="outlined" size="small" />
                    <button className={Styles['btnsBlack']}>بازخوانی </button>
                </div>

                ) 
                :''

            }
        </>
    )
}
