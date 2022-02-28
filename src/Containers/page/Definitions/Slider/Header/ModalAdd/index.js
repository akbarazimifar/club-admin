import React, { useState, useRef } from 'react'
import Styles from './index.module.scss';
import TextField from '@material-ui/core/TextField';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import Switch from '@material-ui/core/Switch';


export default function Index({ disable, data, handelSubmitUpdate, index, conditionData }) {

    let myRef = useRef();

    const [Obj, SetObj] = useState({
        Title: '',
        Link: '',
        Priority: 0,
        IMAGE_URI: '',
        showSlider: true,
        IsNewPage: false
    })

    const [nameFile, setNameFile] = useState('')



    const openFile = (file) => {
        const input = file.target;
        const reader = new FileReader();

        reader.onload = function () {
            const dataURL = reader.result;

            let image = input.files[0].type;
            let formatImages = image.split('/')
            let sizeImage = input.files[0].size

            if (formatImages[1] !== 'png' && formatImages[1] !== 'jpg' && formatImages[1] !== 'jpeg') {
                // output.src = dataURL;
                alert('لطفا فرمت مناسبی را انتخاب نمایید (png , jpeg , jpg)')
                return
            }

            if (sizeImage > 500000) {
                alert("سایز عکس باید کمتر از 500KB باشد.")
                return
            }

            SetObj(prev => ({
                ...prev,
                IMAGE_URI: dataURL
            }))

            setNameFile(input.files[0].name)

        };

        reader.readAsDataURL(input.files[0]);
    };


    const handelChangeValue = (value, type) => {
        if (type === "Priority" && value < 0) {
            return
        }

        SetObj(prev => ({
            ...prev,
            [type]: value
        }))
    }

    const handelClick = () => {

        let condition = {
            Title: 'عنوان',
            IMAGE_URI: 'عکس',
        }

        let isOk = conditionData(Obj, condition)
        if (isOk) {
            return
        }

        handelSubmitUpdate(Obj, index)
        disable(false)
    }

    return (
        <div className={Styles['modal']}>
            <div className={Styles['continears']}>

                <Box width="100%">
                    <TextField
                        value={Obj.Title}
                        id="outlined-basic"
                        label={'عنوان'}
                        variant="outlined" size="large" style={{ width: '100%' }}
                        onChange={(event) => { handelChangeValue(event.target.value, 'Title') }}
                    />
                </Box>
                <br />
                <Box width="100%">
                    <TextField
                        value={Obj.Link}
                        id="outlined-basic"
                        label={'لینک'}
                        variant="outlined" size="large" style={{ width: '67%', marginLeft: '1%' }}
                        onChange={(event) => { handelChangeValue(event.target.value, 'Link') }}
                    />
                    <TextField
                        id="standard-number"
                        label="اولویت نمایش"
                        type="number"
                        value={Obj.Priority}
                        onChange={(event) => { handelChangeValue(event.target.value, 'Priority') }}
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        style={{ width: '32%' }}
                    />
                </Box>
                <br />
                <Box width="100%" className={Styles['grid']} >
                    <Box width="50%">
                        <Box width="72%" className={Styles['card-inputs-file']} >
                            <InputBase
                                defaultValue="مسیر عکس"
                                inputProps={{ 'aria-label': 'naked' }}
                                value={nameFile ? nameFile : 'مسیر عکس'}
                                onChange={() => console.log()}
                            />
                            <Button variant="contained" onClick={() => myRef.current.click()} >انتخاب</Button >
                            <input type='file' style={{ display: 'none' }} ref={myRef} onChange={(event) => openFile(event)} />
                        </Box>
                    </Box>
                    <Box style={{ textAlign: 'left' }}>
                        {
                            Obj.IMAGE_URI && (
                                <img src={Obj.IMAGE_URI} alt='gradient' className={Styles.img} />
                            )
                        }
                    </Box>
                    <Box width="100%" style={{ textAlign: 'right' }}>
                        <sapn>
                            <Checkbox
                                checked={Obj.IsNewPage}
                                onChange={(event) => { handelChangeValue(event.target.checked, 'IsNewPage'); }}
                            />
                        لینک خارجی
                        </sapn>
                        <span>
                            <Switch
                                checked={Obj.showSlider}
                                onChange={(event) => handelChangeValue(event.target.checked, 'showSlider')}
                                name="checkedA"
                                color="primary"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                            />
                        فعال
                        </span>
                    </Box>

                </Box>
                <span
                    className={Styles.picDetail}
                >عکس آپلودی در اسلایدر صفحه اول بایستی (480*940) پیکسل باشد.</span>

                <br />
                <div className={Styles['btns']}>
                    <button className={'btnsGreen'} onClick={() => handelClick()}>ذخیره </button>
                    <button className={'btnsRed'} onClick={() => { disable(false) }}>انصراف </button>
                </div>
            </div>
        </div>
    )

}
