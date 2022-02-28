import React from 'react'
import Styles from './index.module.scss';
import RefreshIcon from '@material-ui/icons/Refresh';
  import FilterListIcon from '@material-ui/icons/FilterList';

export default function Index({handelShowFilterItems}) {
    const dataButtons= [
        {name : 'تایید' , type:'' , className:'btnsGreen'},
        {name : 'عدم تایید' , type:'' , className:'btnsRed'},
        {name : 'ویرایش' , type:'' , className:'btnsYellow'},
        {name : 'حذف' , type:'' , className:'btnsBlack'},   
    ]
    
    return (
        <div className={Styles['header']}> 
            <div className={Styles['button']} > 
              {
                  dataButtons.map((data , index)=>{
                      return(
                        <button key={index} className={data.className}>{data.name}</button>
                      )
                  })
              }
            </div>
            <div className={Styles['icon']}>
              <FilterListIcon onClick={()=>{handelShowFilterItems()}} />
              <RefreshIcon />
            </div>
            
        </div>
    )
}
