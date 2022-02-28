import React, {useState } from 'react';
import { makeStyles } from "@material-ui/styles";
import TextField from '@material-ui/core/TextField';



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

export default function ModalPassword({ getData, setClose }) {
    const styles = useStyles();

    const [state, setstate] = useState(null)

    const handelSubmit = ()=>{
        if(state){
            getData(state)
            setClose(false)
        }else{
            alert('لطفا فیلد مورد نظر را پر نمایید')
        }
     
    }

    return (
        <div className={styles.modalPassword}>
            <p className={styles.titlePassword}>تغییر رمز عبور</p>

            <div className={styles.form}>
                <TextField  
                    size="small"
                    id="outlined-basic"
                    label={"رمز عبور جدید را وارد کنید"} 
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
