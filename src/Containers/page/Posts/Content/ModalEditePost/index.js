import React, { useState, useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Box } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import CKEditor from "../../../../Common/Components/TextEditorQuill";
import { useDispatch , useSelector} from 'react-redux';
import { post_v1_actions_information, post_v1_actions_information_empty } from '../../../../../boot/api/post-forum/post/post_v1_information/action';
import {post_v1_actions_update} from '../../../../../boot/api/post-forum/post/post_v1_update/action';


const useStyles = makeStyles(({
    root: {
        width: "80%",
        height: "80vh",
        backgroundColor: 'white',
        borderRadius: 8,
        margin: 'auto',
        marginTop: '10vh',
        padding: 30,
        position: 'relative',
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column"
    },
    buttons: {
        textAlign: "right",
        margin: "10px 20px"
    }
}))


export default function Index({ setFlagNewPost, subgroup_id , data }) {

    const classes = useStyles();
    const [state, setState] = useState({
        title: "",
        abstract: "",
        body: "",
        tags: "",
        isin: "",
        short_url: "",
        create_date: "",
        subgroup_id: "",
        author_id: "",
        approve_date: "",
        is_visible: "",
        parent_post_id: "",
        forum_name: "",
        subgroup_name: "",
        author_first_name: "",
        author_last_name: "",
        select_permission_level: "",
        update_permission_level: "",
        delete_permission_level: "",
        likes: "",
    })

    const dispatch = useDispatch()
    const stateReducer = useSelector(state => state.post_v1_information_Reducer)

    useEffect(() => {
        dispatch(post_v1_actions_information(subgroup_id))

        return () => {
            dispatch(post_v1_actions_information_empty())
        }

    }, [subgroup_id]) //eslint-disable-line react-hooks/exhaustive-deps


    useEffect(()=>{
        if (stateReducer.data){
            setState(stateReducer.data.response.data.results[0].body)
        }
    },[stateReducer]) //eslint-disable-line react-hooks/exhaustive-deps


    ///////////////////////OnChange state//////////////////
    const handleChange = (value, type) => {
        setState(prev => ({
            ...prev,
            [type]: value
        }))
    }

    ///////////////////////submit edit post//////////////////
    const handleSubmitUpdatePost = () => {

        let obj ={}
        Object.keys(state).forEach((key)=>{

            if(state[key] !== stateReducer.data.response.data.results[0].body[key]){

                if(key === 'tags'){
                    let tagsTrim = state.tags.trim();
                    let tagsReplace = tagsTrim.replaceAll(" ",",")
                    obj[key] = tagsReplace
                    return
                }

                obj[key] = state[key]
            }
        })


        if(Object.keys(obj).length){
            let id = stateReducer.data.response.data.results[0].id
            let data ={
                _id : id,
                ...obj
            }

           dispatch(post_v1_actions_update(data ))
           setFlagNewPost(false)
           
        }else{
            alert('تغییری ثبت نگردیده است')
        }

    }

    return (
        <div className={classes.root}>
            <Box>
                <TextField
                    id="outlined-basic"
                    label="عنوان"
                    variant="outlined"
                    value={state.title}
                    onChange={(event) => handleChange(event.target.value,'title')}
                    style={{ width: "100%" }}
                />
            </Box>

            <Box>
                <TextField
                    id="outlined-basic"
                    label="خلاصه"
                    variant="outlined"
                    value={state.abstract}
                    onChange={(event) => handleChange(event.target.value, 'abstract')}
                    style={{ width: "100%" }}
                />
            </Box>

            <Box>
                <TextField
                    id="outlined-basic"
                    label="کلمات کلیدی"
                    variant="outlined"
                    value={state.tags ? state.tags.replaceAll(","," ") : ''}
                    onChange={(event) => handleChange(event.target.value, 'tags')}
                    style={{ width: "32%", marginLeft: "1%" }}
                />

                <TextField
                    id="outlined-basic"
                    label="نماد"
                    variant="outlined"
                    value={state.isin}
                    onChange={(event) => handleChange(event.target.value, 'isin')}
                    style={{ width: "33%", marginLeft: "1%" }}
                />

                <TextField
                    id="outlined-basic"
                    label="لینک کوتاه"
                    variant="outlined"
                    value={state.short_url}
                    onChange={(event) => handleChange(event.target.value, 'short_url')}
                    style={{ width: "33%" }}
                />
            </Box>

            <Box height={'400px'}>
                <CKEditor answerDataEdit={state.body?state.body:''} >
                    {
                        data => handleChange(data, 'body')
                    }
                </CKEditor>
            </Box>

            <Box className={classes['buttons']}>
                <button
                    className={`btnsYellow`}
                    onClick={() => handleSubmitUpdatePost()}
                >
                    ویرایش
                </button>
                <button
                    className={'btnsRed'}
                    onClick={() => setFlagNewPost(false)}
                >
                    انصراف
                 </button>
            </Box>
        </div>
    )
}
