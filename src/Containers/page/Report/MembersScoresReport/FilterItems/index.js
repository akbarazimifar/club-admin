import React from 'react'
import Input from './Inputs';
import DataPicker from './DataPicker';
import Styles from './index.module.scss';


export default function Index({flagFilter}) {

    return (
        <>
            {
            flagFilter 
            ?(
                <div className={Styles['filter']}>
                    <DataPicker />
                    <Input />
                    <div className={Styles['btns']}>
                        <button className={Styles['btnsBlack']}>گزارش </button>
                    </div>
                </div>

            ) 
            :''

            }
        </>
    )
}
