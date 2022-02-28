import React, { useRef } from 'react'
import Box from '@material-ui/core/Box';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles } from '@material-ui/core';

let useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        boxShadow: '1px 1px 10px rgba(0,0,0,0.3)',
        padding: 10,
        marginTop: 10,
        width: "95%",
    },
    InputBase:{
        width: "75%",
    }
})
// shadow p-5 mt-5 d-flex justify-content-between
export default function Index({ value, setValues }) {

    let classes = useStyles()

    let myRef = useRef();  
    const openFile = (file) => {

        const input = file.target;
        const reader = new FileReader();

        reader.onload = function () {
            const dataURL = reader.result;
            let image = input.files[0].type;

            let data = {
                file: dataURL,
                file_type: image.split('/')[1],
                file_name: input.files[0].name,
                file_size: input.files[0].size
            }
            setValues(data)
        };

        reader.readAsDataURL(input.files[0]);
    };

    const handelclik = (type) => {

        if (type === 'حذف') {
            myRef.current.value = null
            setValues('')
        }

        if (!value.file && type === 'انتخاب') {
            myRef.current.click()
        }

    }


    return (
        <Box width="100%" className={classes['root']} >
            <InputBase
                inputProps={{ 'aria-label': 'naked' }}
                value={value.file_name ? value.file_name : 'مسیر فایل'}
                className={classes['InputBase']}
             
            />
            <button type={'button'}
                value={!value.file ? 'انتخاب' : 'حذف'}
                className={`${!value.file ? 'btnsBlue' : 'btnsRed'}`}
                onClick={() => handelclik(!value.file? 'انتخاب' : 'حذف')} >
                {
                    !value.file? 'انتخاب' : 'حذف'
                }
            </button >
            <input type='file' style={{ display: 'none' }} ref={myRef} onChange={(event) => openFile(event)} />
        </Box>
    )
}
