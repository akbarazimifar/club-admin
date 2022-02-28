import React , {useState , useEffect}  from 'react'
import Styles from './index.module.scss';
import Inputs from '../ModalAEdit/Inputs';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';


export default function Index({  handleCloseModal , data  , handelsubmitUpdate , activeItems}) {

    const [data_Reducer , setData_Reducer] = useState('')

    
    useEffect(()=>{
        setData_Reducer(data)
      } , [data])

      useEffect(() => {
      }, [data_Reducer])

      const handelchange = (value , type)=>{
        setData_Reducer(prev=>({
            ...prev,
            body:{
                ...prev.body,
                [type] : value
            }
        }))
      }

      const handelsubmit = ()=>{
          if(activeItems.id === data_Reducer.id){
            handelsubmitUpdate(data_Reducer ,activeItems.index)
            handleCloseModal()
          }
      }
      
    return (
        <div className={Styles['ModalAdd']}>
            <div className={Styles['content']}>
                <div className={Styles['inputs']}>
                    <Inputs data_Reducer={data_Reducer}  handelchange={handelchange}  />
                </div>
            </div>
            <div className={Styles['TextEditorQuill']}>
                {
                    data_Reducer&&(
                        <TextareaAutosize
                            className={Styles['textarea']}
                            rowsMax={4}
                            aria-label="maximum height"
                            placeholder="آدرس"
                            // defaultValue="آدرس"
                            value={data_Reducer.body.Address}
                            onChange={(event)=>handelchange(event.target.value , 'Address')}
                        />
                    )
                }
            </div>
            <div className={Styles['btns']}>
                <button className={'btnsGreen'} onClick={()=>handelsubmit()}>ذخیره </button>
                <button onClick={() => handleCloseModal()} className={'btnsRed'}>انصراف </button>
            </div>
        </div >
    )
}
