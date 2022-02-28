import React  , {useState , useEffect} from 'react';
import Styles from './index.module.scss';
import CardJobs from './CardJobs';



export default function Index({data_Reducer , HandelSubmit}) {

    const [data , setData] = useState([])

    useEffect(()=>{
    
        if(data_Reducer !== undefined){
            let res = JSON.parse(data_Reducer.response.data.results[0].body.content);
            setData(res)  
        }

    } , [data_Reducer])

    return (
        <div className={Styles['content']}>

                {
                    data&&(
                        <React.Fragment>
                            {
                                data.map((items , index)=>{
                                    return (
                                        <CardJobs data={items} HandelSubmit={HandelSubmit} key={index} index={index} data_Reducer={data}/>
                                    )
                                })
                            }
                        </React.Fragment>
                    )
                }
        </div>
    )
}
