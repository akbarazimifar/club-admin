import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import ModalEdit from './EditModal';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import AlertDialogSlide from "./../../../../../Common/Components/AlertDialogSlide";
import { useDispatch } from 'react-redux';
import { seprateNumberFromComma } from '../../../../../Common/method/seprateNumberFromComma';



const useStyles = makeStyles({
    root: {
        width: "23%",
        margin: "1%"
    },
    CardActions: {
        display: "flex",
        flexDirection: "column"
    },
    topCardAction: {
        display: "flex",
        justifyContent: "space-between"
    },
    cardHeader: {
        textAlign: "center",
        "& div": {
            width: "100%"
        },
        "& span": {
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
        }
    },
    border: {
        borderBottom: "1px solid lightgray",
        padding: "7px 0"
    },
    image: {
        width: "auto",
        height: 150,
        margin: "auto"
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});


export default function ImgMediaCard({ data, apiGiftUpdate, apiGiftActive, apiGiftDeactivate, handleOrderInGift }) {

    const classes = useStyles();

    const [newButton, setNewButton] = useState(false);
    const [FlagAlert, setFlagAlert] = useState(false);
    const dispatch = useDispatch()



    const handleClickButton = (data) => {
        if (data === "NEW") {
            setNewButton(prev => !prev)
        }
        return
    }

    const handelSubmitStatus = () => {

        data.body.is_active === "TRUE"
            ? apiGiftDeactivate(data.id)
            : apiGiftActive(data.id)

        setFlagAlert(false)

    }

    const copyToClipboard = () => {
        var copyText = document.getElementById(`input-id-gift-${data.id}`);

        /* Select the text field */
        copyText.select();
        copyText.setSelectionRange(0, 99999); /* For mobile devices */

        /* Copy the text inside the text field */
        document.execCommand("copy");

        /* Alert the copied text */
        dispatch({ type: "ALERT", payload: { status: true, textAlert: `با موفقیت کپی شد`, typeAlert: "success" } })

        // alert("Copied the text: " + copyText.value);
    }

    const handelchange = () => {
    }

    return (
        <Card className={classes.root}>
            {/* <CardHeader
                className={classes.cardHeader}
                title={data.body.title}
            /> */}
            <CardActionArea
                onClick={() => setNewButton(prev => !prev)}
            >
                <CardMedia
                    className={classes.image}
                    component="img"
                    alt=""
                    image={`data:image/png;base64,${data.body.image}`}
                    title=""
                />
                <CardContent>
                    <Typography gutterBottom variant="body1" className="ellipsis" component="h5" style={{ fontWeight: "bold" }}>
                        {data.body.title}
                    </Typography>
                    <Typography className={`${classes.border} ellipsis`} variant="body2" color="textSecondary" component="p">
                        گروه : {data.body.gift_category}
                    </Typography>
                    <Typography className={`${classes.border} ellipsis`} variant="body2" color="textSecondary" component="p">
                        زیرگروه : {data.body.gift_sub_category}
                    </Typography>
                    <Typography className={classes.border} variant="body2" color="textSecondary" component="p">
                        امتیاز مورد نیاز : {seprateNumberFromComma(data.body.required_bonus)}
                    </Typography>
                    <Typography className={classes.border} variant="body2" color="textSecondary" component="p">
                        وضعیت فعلی : {data.body.is_active === "TRUE" ? "فعال" : "غیر فعال"}
                    </Typography>
                    <Typography className={classes.border} variant="body2" color="textSecondary" component="p">
                        کد کالا : {data.body.gift_code === "null" || !data.body.gift_code ? "-" : data.body.gift_code}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className={classes.CardActions}>
                <>
                    <div className={classes.topCardAction}>
                        <div>
                            <Button size="small" color="primary">
                                <Switch
                                    checked={data.body.is_active === "TRUE" ? true : false}
                                    onChange={() => setFlagAlert(prev => !prev)}
                                    name="checkedA"
                                    color="primary"
                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                />
                            </Button>
                        </div>
                        <div>
                            <Button size="small" color="primary" style={{ margin: "0 5px" }} variant="contained" onClick={copyToClipboard}>
                                کپی کردن شناسه
                            </Button>
                            <Button size="small" color="default" variant="outlined" onClick={() => setNewButton(prev => !prev)}>
                                ویرایش
                            </Button>
                            <input
                                onChange={() => handelchange()}
                                style={{ opacity: 0, width: 10 }} type="text" value={data.id} id={`input-id-gift-${data.id}`}
                            />
                        </div>
                    </div>

                    <div>
                        <Button size="small" color="secondary" variant="outlined"
                            onClick={() => handleOrderInGift(data.id)}
                        >
                            سفارشات
                        </Button>
                    </div>
                </>
            </CardActions>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={newButton}
                onClose={() => handleClickButton("NEW")}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={newButton}>
                    <ModalEdit setNewButton={setNewButton} data={data} apiGiftUpdate={apiGiftUpdate} />
                </Fade>
            </Modal>


            <AlertDialogSlide
                flagShow={FlagAlert}
                handleCloseAlert={setFlagAlert}
                handleOkAlert={() => handelSubmitStatus()}
                data={dataAlertDialogSlide}
            />


        </Card>
    );
}

const dataAlertDialogSlide = {
    title: "ویرایش",
    description: "از ویرایش این رکورد اطمینان دارید؟",
}