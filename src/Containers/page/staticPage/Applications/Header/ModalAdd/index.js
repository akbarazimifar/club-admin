import React, { useState } from 'react'
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Styles from './index.module.scss';
import { makeStyles } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles((theme) => ({
    ModalAdd: {
        width: '60%',
        height: '',
        borderRadius: 8,
        padding: 15,
        backgroundColor: "whitesmoke",
        textAlign: "right",
        margin: 'auto',
        marginTop: '10%',
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

export default function Index({ setNewButton, dataPrev, dataInsert }) {
    const classes = useStyles();

    const [state, setState] = useState({
        category: '',
        list: [
            {
                title: '',
                link: ''
            }
        ]
    })



    const handelDelete = (indexItems) => {
        let res = state.list.filter((data, index) => index !== indexItems)
        setState({ ...state, list: res })
    }

    const handelChangeValue = (valueItems, index, type) => {

        let res = state.list.map((data, ind) => {
            const { ...rest } = data;

            if (ind === index) {
                return { ...rest, [type]: valueItems }
            }
            return data
        })


        setState({ ...state, list: res })
    }

    const hanelChangeTitle = (value) => {
        setState(prev => ({
            ...prev,
            category: value
        }))
    }

    const addItems = () => {
        setState((prev) => ({
            ...prev,
            list: [
                {
                    title: '',
                    link: '#',
                },
                ...prev.list,
            ]
        }))
    }


    const handelClose = () => {
        setNewButton(false)
    }

    const handleSubmitInsert = () => {
        if (!state.category) {
            alert("وارد کردن دسته بندی الزامی است");
            return
        }

        let result = state.list
            .filter(item => {
                if (!item.title) return false
                return true
            })
            .map(item => {
                return {
                    title: item.title,
                    link: item.link,
                    category: state.category
                }
            })

        let resultInsert = [...result, ...dataPrev]

        dataInsert(resultInsert)

        handelClose()
    }

    return (
        <div className={classes['ModalAdd']}>

            <div className={classes['root']}>

                <Box
                    width="40%"
                >
                    <TextField
                        label="دسته بندی"
                        id="titleNewButton"
                        // defaultValue={state.title}
                        value={state.categoty}
                        variant="outlined"
                        size="small"
                        fullWidth
                        margin="dense"
                        onChange={(event) => { hanelChangeTitle(event.target.value) }}
                    />
                </Box>

                <button onClick={() => addItems()} className={`${Styles['btnAdd']} btnsBlue `}>اضافه کردن</button>

                <Box className={Styles['list']} >
                    {
                        state.list && (
                            <>
                                {
                                    state?.list.map((items, index) => {
                                        return (
                                            <div className={Styles['questions']} key={index}>
                                                <Box width={'50%'} className={Styles['inputIcon']}>
                                                    <ClearIcon style={{ color: '#F64E60 ' }} onClick={() => handelDelete(index)} />
                                                    <TextField
                                                        label="عنوان"
                                                        value={items.title}
                                                        id="outlined-basic"
                                                        variant="outlined" size="large" style={{ width: '100%' }}
                                                        onChange={(event) => { handelChangeValue(event.target.value, index, 'title') }}
                                                    />
                                                </Box>
                                                <TextField
                                                    value={items.link}
                                                    id="outlined-basic"
                                                    placeholder={`url`}
                                                    label={''}
                                                    variant="outlined" size="large" style={{ width: '50%' }}
                                                    onChange={(event) => { handelChangeValue(event.target.value, index, 'link') }}
                                                />

                                            </div>
                                        )
                                    })
                                }
                            </>
                        )
                    }
                </Box>
            </div>

            <div className={classes['btns']}>
                <button className={'btnsGreen'}
                    onClick={handleSubmitInsert}
                >
                    ذخیره
                 </button>
                <button className={'btnsRed'} onClick={() => handelClose()} >انصراف </button>
            </div>
        </div>
    )
}
