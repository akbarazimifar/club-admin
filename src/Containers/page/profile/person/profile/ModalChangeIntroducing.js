import React, {useState } from 'react';
import { makeStyles } from "@material-ui/styles";
import TextField from '@material-ui/core/TextField';
import { useDispatch } from 'react-redux';
import { update_change_introducer } from './../../../../../boot/api/profile/person/person_v1_changeIntroducing/action';



const useStyles = makeStyles(() => ({
    modalPassword: {
        width: 500
    },
    titlePassword: {
        fontSize: "1.3em",
        fontWeight: "bold"
    },
    form: {
        textAlign: "Center",
        margin: "50px 0 30px",
        "& > *": {
            width: 400
        }
    },
    buttons: {
        textAlign: "center"
    }
}))

export default function ModalChangeIntroducing({ setClose, memberId, introducingMemberId }) {
    const styles = useStyles();

    const [state, setstate] = useState(null)
    const dispatch = useDispatch();


    const handelSubmit = ()=>{
        if(state){
         
            dispatch(update_change_introducer(memberId, state, introducingMemberId))
            setClose(false)
        }else{
            alert('لطفا فیلد مورد نظر را پر نمایید')
        }
     
    }
    


    return (
        <div className={styles.modalPassword}>
            <p className={styles.titlePassword}>ثبت معرف</p>

            <div className={styles.form}>
                <TextField  
                    size="small"
                    id="outlined-basic"
                    label={"کدملی معرف را وارد نمائید"} 
                    variant="outlined" 
                    value={state}
                    onChange={(event)=>setstate(event.target.value)}
                    />
            </div>

            <div className={styles.buttons}>
                <button className="btnsGreen" onClick={()=>handelSubmit()}  >ثبت تغییرات</button>
                <button className="btnsRed" onClick={() => setClose(false)}>لغو</button>
            </div>

        </div>
    )
}
