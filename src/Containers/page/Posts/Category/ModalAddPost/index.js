import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Box } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import CKEditor from "./../../../../Common/Components/TextEditorQuill";
import { useDispatch } from 'react-redux';
import { post_v1_actions_remove } from "./../../../../../boot/api/post-forum/post/post_v1_insert/action";
import { data_m } from "./../../../../Common/method/date";


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


export default function Index({ setFlagNewPost, subgroup_id }) {
    const classes = useStyles();
    const dispatch = useDispatch()
    const [state, setState] = useState({
        title: "",
        abstract: "",
        body: "",
        tags: "",
        isin: "",
        short_url: "",
        create_date: null,
        subgroup_id: subgroup_id,
        author_id: null,
        approve_date: null,
        is_visible: null,
        parent_post_id: null,
        forum_name: null,
        subgroup_name: null,
        author_first_name: null,
        author_last_name: null,
        select_permission_level: null,
        update_permission_level: null,
        delete_permission_level: null,
        likes: null,
    })

    // useEffect(() => {
    //     console.log("state", state);
    // }, [state])

    ///////////////////////OnChange state//////////////////
    const handleChange = (value, type) => {
        setState(prev => ({
            ...prev,
            [type]: value
        }))
    }

    ///////////////////////submit insert post//////////////////
    const handleSubmitInsetPost = () => {
        let getSession = sessionStorage.getItem("login");
        var { member_id } = JSON.parse(getSession);
        let date = data_m();

        let tagsTrim = state.tags.trim();
        let tagsReplace = tagsTrim.replaceAll(" ",",")

        if (!date) {
            alert("فرمت تاریخ مناسب نمی باشد.")
            return
        }

        let result = {
            ...state,
            author_id: member_id,
            create_date: date,
            tags: tagsReplace
        }
        // console.log("result", result);

        dispatch(post_v1_actions_remove(result))

        setFlagNewPost(false)
    }

    return (
        <div className={classes.root}>
            <Box>
                <TextField
                    id="outlined-basic"
                    label="عنوان"
                    variant="outlined"
                    value={state.title}
                    onChange={(event) => handleChange(event.target.value, 'title')}
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
                    value={state.tags}
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
                <CKEditor>
                    {
                        data => handleChange(data, 'body')
                    }
                </CKEditor>
            </Box>

            <Box className={classes['buttons']}>
                <button
                    className={`btnsBlue`}
                    onClick={() => handleSubmitInsetPost()}
                >
                    افزودن
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
