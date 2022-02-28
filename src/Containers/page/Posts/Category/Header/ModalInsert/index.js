import React, { useState } from 'react'
import CardInput from './CardInput';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { forum_v1_actions_insert } from "./../../../../../../boot/api/post-forum/forum/for_v1_insert_forum/action";
import { useDispatch } from 'react-redux';


const useStyles = makeStyles(() => ({
    card: {
        width: "40%",
        minHeight: 420,
        backgroundColor: 'white',
        borderRadius: 8,
        margin: 'auto',
        marginTop: '12%',
        padding: '10px -10px 10px 10px',
        position: 'relative',

    },
    header: {
        display: 'flex',
        alignItems: 'center',
        width: '95%',
        margin: 'auto'
    },
    list: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        width: "95%",
        height: 'auto',
        maxHeight: 270,
        margin: 'auto',
        overflow: 'auto'
    },
    btns: {
        width: "95%",
        textAlign: 'right',
        position: 'absolute',
        bottom: 20,

    }
}));



export default function Index({ setNewButton }) {
    const dispatch = useDispatch()

    const classes = useStyles();
    const [state, setState] = useState([
        { type: "name", value: "" }
    ])

    const handel_add_subgroup = () => {
        setState(prev => [
            ...prev,
            { type: "subgroup_name", value: "" }
        ])
    }


    const handleChangeState = (value, index) => {
        let items = [...state];
        let item = { ...items[index + 1] };
        item.value = value;
        items[index + 1] = item;

        setState(items)
    }

    const handleSubmitInsert = () => {
        const { value } = state[0]

        let resultInsert = state
            .filter(item => item.type !== "name" && item.value)
            .map(item => {
                return {
                    name: value,
                    subgroup_name: item.value,
                    is_visible: null,
                    author_id: null
                }
            })

        resultInsert.forEach(item => {
            dispatch(forum_v1_actions_insert(item))
        })

        setNewButton(false)
    }

    if (!state) return null

    return (
        <div className={classes['card']}>
            <Box className={classes['header']}>
                {
                    state
                        .filter(item => item.type === "name")
                        .map((item, ind) => {
                            return (
                                <CardInput
                                    title={'عنوان گروه'}
                                    type={item.type}
                                    key={ind}
                                    index={ind}
                                    value={item.value}
                                    handleChange={handleChangeState}
                                />
                            )
                        })
                }
                <button className={'btnsBlue'} onClick={handel_add_subgroup}>افزودن</button>
            </Box>
            <Box className={classes['list']}>
                {
                    state
                        .filter(item => item.type !== "name")
                        .map((item, ind) => {
                            return (
                                <CardInput
                                    title={'عنوان زیر گروه'}
                                    type={item.type}
                                    key={ind}
                                    index={ind}
                                    value={item.value}
                                    handleChange={handleChangeState}
                                />
                            )
                        })
                }
            </Box>

            <Box className={classes['btns']}>
                <button onClick={handleSubmitInsert} className={'btnsGreen'} >ذخیره </button>
                <button className={'btnsRed'} onClick={() => setNewButton(false)}>انصراف </button>
            </Box>

        </div>
    )
}


