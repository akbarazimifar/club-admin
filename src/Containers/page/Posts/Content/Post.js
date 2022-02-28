import React, { useState } from 'react';
import { makeStyles } from "@material-ui/styles";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
import PersonIcon from '@material-ui/icons/Person';
// import ThumbUpIcon from '@material-ui/icons/ThumbUp';
// import CommentIcon from '@material-ui/icons/Comment';
import CheckIcon from '@material-ui/icons/Check';
// import ClearIcon from '@material-ui/icons/Clear';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import LongMenu from './LongMenu';
import AlertDialogSlide from "./../../../Common/Components/AlertDialogSlide";
import { Modal } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import ModalEditPost from './ModalEditePost';
import { dateMiladiToShamsi } from '../../../Common/method/date';

const useStyles = makeStyles(() => ({
    post: {
        width: "100%",
        padding: 5,

        // marginBottom: "5px",
        alignItems: "center",
        borderBottom: "1px solid lightgray",
        '& .svgPosts': {
            cursor: "pointer",
            verticalAlign: "sub",
            color: "rgba(0, 0, 0, 0.5)"
        },
        backgroundColor: 'red',
    },
    more: {
        width: "5%",

    },
    title: {
        width: "80%"
    },
    // text: {
    //     width: "65%",
    // },
    buttons: {
        width: "15%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end"
    },

    bold: {
        fontSize: "1em",
        fontWeight: "600"
    },
    align_item_center: {
        display: "flex",
        alignItems: "center"
    },

    ClearIcon: {
        backgroundColor: "#F64E60",
        marginRight: 10,
        padding: 5,
        borderRadius: 3,
        cursor: "pointer",
        color: "white"
    },
    CheckIcon: {
        backgroundColor: "#1BC5BD",
        padding: 5,
        borderRadius: 3,
        cursor: "pointer",
        color: "white"
    },
    margin_t: {
        marginTop: 20
    },
    groupText: {
        color: "rgba(0, 0, 0, 0.5)",
        marginLeft: 50
    }
}))


export default function Post({ buttons, index, setFlagContent, data, setparent_post_id, handleApprove, handleRemove , handleEnable }) {
    const classes = useStyles();
    const [ensureDelete, setEnsureDelete] = useState(false);

    const [flagNewPost, setFlagNewPost] = useState(false);

    const handleOkAlert = () => {
        handleApprove(data.id)
        setEnsureDelete(false)
    }


    const handelClickIcon = (type) => {
        if (type === 'SHOW_POST') {
            setFlagContent('POST_SHOW')
        }
        if(type === 'EDIT'){
            setFlagNewPost(true)
        }
        setparent_post_id(data.id)
    }

    return (
        <Grid
            style={{ backgroundColor: index % 2 === 0 ? "whitesmoke" : "white" }}
            className={classes.post}
            component="span"
            container
        >
            <Typography className={classes.more} component="span">
                {/* <MoreVertIcon className="svgPosts" /> */}

                <LongMenu
                    clickDropdown={(value) => handelClickIcon(value)}
                    visible={data.body.is_visible}
                    handleRemove={() => handleRemove(data.id)}
                    handleEnable={()=>handleEnable(data.id)}
                />
            </Typography>

            <Typography className={classes.title} component="span">
                <div>
                    <Typography className={classes.bold} component="h5">
                        {
                            data.body.is_visible === "FALSE" && (
                                <>
                                    <VisibilityOffIcon className="svgPosts" />
                                    {'\u00A0'}
                                </>
                            )
                        }
                        {data.body.title}
                    </Typography>
                </div>

                <Typography component="p" className={classes['margin_t']} >
                    {data.body.abstract}
                </Typography>


                <Typography className={`${classes['margin_t']} ${classes.align_item_center}`} component="div">
                    <div>
                        <span className="grayColor"><PersonIcon className="svgPosts" /></span>
                        <span className={`grayColor`} >{data.body.author_first_name}{'\u00A0'}{data.body.author_last_name}</span>
                    </div>

                    <div
                        className={classes['groupText']}
                    >
                        <span>  گروه مطلب: {data.body.subgroup_name}</span>
                    </div>

                </Typography>
            </Typography>

            {/* <Typography className={classes.text} component="span">
                
                <Grid container justify="space-around" component="p" className="grayColor">
                    <Grid item component="p" className={`${classes['margin_t']}`} >
                      
                    </Grid>
                    <Grid item component="p" align="left" className={`${classes['margin_t']}`}>
                        
                        {'\u00A0'} {'\u00A0'}
                        <CommentIcon className="svgPosts" />7
                    </Grid>
                </Grid>
            </Typography> */}

            <Typography className={classes.buttons} component="span">
                
                {buttons && (
                    <Typography component="p">
                        <CheckIcon onClick={() => setEnsureDelete(true)} fontSize="large" className={classes.CheckIcon} />
                        {'\u00A0'} {'\u00A0'}
                        {/* <ClearIcon fontSize="large" className={classes.ClearIcon} /> */}
                    </Typography>
                )}
                <Typography className="grayColor" component="p"
                    style={{ direction: "ltr" }}
                >{data.body.create_date === "1970/01/01 00:00:00.000000" ? "" :dateMiladiToShamsi(data.body.create_date.split(".")[0])}</Typography>
            </Typography>

            {/* ---------ensure approve------ */}
            <AlertDialogSlide
                flagShow={ensureDelete}
                handleCloseAlert={setEnsureDelete}
                handleOkAlert={handleOkAlert}
                data={dataAlertDialogSlide}
            />


                {/* ----------------------------moda edit post ---------------------------- */}
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={flagNewPost}
                        onClose={() => setFlagNewPost(false)}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={flagNewPost}>
                            <ModalEditPost
                                setFlagNewPost={setFlagNewPost}
                                subgroup_id={data.id}
                                // data = {data}
                            />
                        </Fade>
                    </Modal>
                 {/* ----------------------------------------------------------------- */}
        </Grid>
    )
}

const dataAlertDialogSlide = {
    title: "تایید",
    description: "از تایید این مورد اطمینان دارید؟",
}