import React from 'react'
import Input from './Inputs';
import Styles from './index.module.scss';


export default function Index({flagFilter}) {

    return (
        <>
            {
            flagFilter 
            ?(
                <div className={Styles['filter']}>
                    <h3 className={Styles['title']}>فیلتر اطلاعات</h3>
                    <Input />
                    <div className={Styles['btns']}>
                        <button className={Styles['btnsBlack']}>بازخوانی </button>
                    </div>
                </div>
            ) 
            :''

            }
        </>
    )
}
