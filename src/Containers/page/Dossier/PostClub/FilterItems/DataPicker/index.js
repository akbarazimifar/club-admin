import React from 'react'
import Styles from './index.module.scss';
import DatePicker from '../../../../../Common/Components/DatePicker';



export default function Index() {
    
    return (
        <div className={Styles['dataPicker']}>
           <h3 className={Styles['title']}>فیلتر اطلاعات</h3>
           <div style={{display:'flex'}}>
                <div style={{ width: 140, marginRight: 50 }}>
                    <DatePicker  label="از تاریخ" >
                        {
                            (data)=>{console.log(data);}
                        }
                    </DatePicker >

                </div>
                <div style={{ width: 140, marginRight: 50 }}>
                    <DatePicker  label="تا تاریخ" >
                        {
                            (data)=>{console.log(data);}
                        }
                    </DatePicker >
                </div>
           </div>
        </div>
    )
}
