import React , {useState, memo} from 'react'
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles';
import TextEditorQuill from "../../../../../Common/Components/TextEditorQuill";
import AlertDialogSlide from '../../../../../Common/Components/AlertDialogSlide';


const useStyles = makeStyles((theme) => ({
    ModalAdd: {
        width: '60%',
        borderRadius: 8,
        padding: 15,
        backgroundColor: "whitesmoke",
        textAlign:"right",
        margin:'auto',
        marginTop:'7.5%',
    },
    root: {
        padding: "20px 0",
        width: "90%",
        margin: "auto",
        '& .MuiBox-root': {
            margin: theme.spacing(1),
        },
    },
    btns: {
        margin: "0px 0 10px 0",
        textAlign: "right",
        width: "95%",
    }
}));

export default memo( function Index({ setNewButton , data , HandelSubmit  , index , data_Reducer}) {

    const classes = useStyles();
    const [textEditor , SetTextEditor] = useState(data);
    const [flag , setFlag] = useState(false);

    const handelUpdate = ()=>{
        let res = data_Reducer.map((items , ind)=>{
            if(ind === index)
                return textEditor
            return items
        })
        HandelSubmit(res)
        setNewButton(false)
    }

    const handelDelete = ()=>{
        let res = data_Reducer.filter((items , ind)=> ind !== index)
        HandelSubmit(res)
        setNewButton(false)
    }

    const handelChange = ( value , type)=>{
        SetTextEditor(perv=>({
            ...perv,
            [type] : value
        }))
    }


    let dataCopy = data_Reducer[0].html
    let replace_date  = dataCopy.replaceAll("'", '"')

    return (
        <div className={classes['ModalAdd']}>
            <div className={classes['root']}>
                
                <Box width="40%">   
                    <TextField
                        label="عنوان"
                        id="titleNewButton"
                        value={textEditor.title}
                        variant="outlined"
                        size="small"
                        fullWidth
                        margin="dense"
                        onChange={(event)=>handelChange(event.target.value , 'title')}
                    />
                </Box>

                <Box height={'400px'} >
                    {
                        data&&(
                            <TextEditorQuill answerDataEdit={`${replace_date}`} >
                                {
                                    (_data)=>handelChange(_data , 'html')
                                }
                            </TextEditorQuill>
                        )
                    }
                </Box>
            </div>
            <div className={classes['btns']}>
                <button className={'btnsGreen'} onClick={()=>{handelUpdate()}}>ذخیره </button>
                <button className={'btnsYellow'} onClick={()=>{setFlag(true)}}>حذف </button>
                <button className={'btnsRed'} onClick={() => setNewButton(false)}>انصراف </button>
            </div>
                {
                    flag&&(
                        <AlertDialogSlide
                            flagShow={setNewButton}
                            handleCloseAlert={()=>setFlag(false)}
                            handleOkAlert={handelDelete}
                            data={dataAlertDialogSlide}
                        />
                    )
                }
        </div>
    )
})



const dataAlertDialogSlide = {
    title: "حذف",
    description: "از حذف این رکورد اطمینان دارید؟",
}