import React , {useState, useEffect }  from 'react'
import Styles from './index.module.scss';
import Inputs from './Inputs';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { ContactSupportOutlined } from '@material-ui/icons';


export default function Index({  handleCloseModal , handelSubmitAdd}) {


  

    const [data_Reducer , setData_Reducer] = useState(
        {
            id:'',
            body:
            {
                Name: "",
                IsActive: "TRUE",
                Address: "",
                IsBranch: "TRUE",
                IsMainBranch: "FALSE",
                DirectorName: "",
                CityCodePhoneNumber: "",
                PhoneNumber: "",
                GoogleMapUrl: "",
                PostalCode: "",
                ProvinceId:"null",
                ProvinceName: "",
                CityId:"null" , 
                CityName:"",
                recommender_id:""
            }
        }
    )





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

          if(
              !data_Reducer.body.Name&&
              !data_Reducer.body.Address&&
              !data_Reducer.body.DirectorName&&
              !data_Reducer.body.CityCodePhoneNumber&&
              !data_Reducer.body.GoogleMapUrl&&
              !data_Reducer.body.PostalCode&&
              !data_Reducer.body.ProvinceName&&
              !data_Reducer.body.PhoneNumber&&
              !data_Reducer.body.recommender_id
              ){
                alert('لطفا مقادیر مورد نظر را وارد نمایید')
                return
          }
          
            handelSubmitAdd(data_Reducer )
            handleCloseModal()
          
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
                    <TextareaAutosize
                        className={Styles['textarea']}
                        rowsMax={4}
                        aria-label="maximum height"
                        placeholder="آدرس"
                        value={data_Reducer.body.Address}
                        onChange={(event)=>handelchange(event.target.value , 'Address')}
                    />
                }
            </div>
            <div className={Styles['btns']}>
                <button className={'btnsGreen'} onClick={()=>handelsubmit()}>ذخیره </button>
                <button onClick={() => handleCloseModal()} className={'btnsRed'}>انصراف </button>
            </div>
        </div >
    )
}