import React , {useState} from 'react'
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles';
import TextEditorQuill from "../../../../../Common/Components/TextEditorQuill";

const useStyles = makeStyles((theme) => ({
    ModalAdd: {
        width: '60%',
        borderRadius: 8,
        padding: 15,
        backgroundColor: "whitesmoke",
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

export default function Index({ setNewButton , HandelSubmit  , data_Reducer}) {

    const classes = useStyles();
    const [textEditor , SetTextEditor] = useState({title:'' ,html:'' });

    const handelChange = ( value , type)=>{
        SetTextEditor(perv=>({
            ...perv,
            [type] : value
        }))
    }

    const handelClick = ()=>{

        if(!textEditor.title && !textEditor.html){
            alert('لطفا مقادیر مورد نظر را وارد نمایید')
            return 
        }

        let res =JSON.parse( data_Reducer.response.data.results[0].body.content);
        HandelSubmit([textEditor , ...res])
        setNewButton(false)
    }
    
    return (
        <div className={classes['ModalAdd']}>

            <div className={classes['root']}>

                        <Box
                            width="40%"
                        >
                            <TextField
                                label="عنوان"
                                id="titleNewButton"
                                defaultValue=""
                                variant="outlined"
                                size="small"
                                fullWidth
                                margin="dense"
                                value={textEditor.title}
                                onChange={(event)=>handelChange(event.target.value , 'title')}

                            />
                        </Box>
                        <Box height={'400px'}>
                           <TextEditorQuill answerDataEdit={textEditor.html} >
                                {
                                    (_data)=>handelChange(_data , 'html')
                                }
                            </TextEditorQuill>
                        </Box>

            </div>

            <div className={classes['btns']}>
                <button className={'btnsGreen'} onClick={()=>handelClick()}>ذخیره </button>
                <button className={'btnsRed'} onClick={() => setNewButton(false)}>انصراف </button>
            </div>
        </div>
    )
}
