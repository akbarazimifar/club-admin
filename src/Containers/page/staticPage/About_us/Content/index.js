import React  , {useState, useEffect} from 'react';
import Styles from './index.module.scss';
import CardJobs from './Card';


export default function Index({_data , handelsubmitUpdate , handelDeleteSubmit}) {

    const [data , setData] = useState([])

    useEffect(()=>{
        let res = JSON.parse(_data.content) 
        setData(res)
    },[_data])

    return (
        <div className={Styles['content']}>
              {
                  data.map((_data,index)=>{
                      return(
                          <CardJobs data={_data} key={index} index={index} handelsubmitUpdate={handelsubmitUpdate} handelDeleteSubmit={handelDeleteSubmit} />
                      )
                  })
              }    
        </div>
    )
}
