import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CheckIcon from '@material-ui/icons/Check';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from "@material-ui/core/styles";
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
// import DeleteIcon from '@material-ui/icons/Delete';
// import ReportIcon from '@material-ui/icons/Report';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import AlertDialogSlide from "./../../../Common/Components/AlertDialogSlide";;




const useStyles = makeStyles(() => ({
    item: {
        marginBottom: 5
    },
    CheckIcon: {
        backgroundColor: "#1BC5BD",
        padding: 5,
        borderRadius: 3,
        cursor: "pointer",
        color: "white"
    }
}))

const ITEM_HEIGHT = 48;

export default function LongMenu({ clickDropdown, visible, handleRemove, handleEnable }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [ensureDeleteRemove, setEnsureDeleteRemove] = useState(false);
    const [ensureEnable, setEnsureEnable] = useState(false);


    const classes = useStyles();

    const options = [
        { icon: <CheckIcon fontSize="medium" className={classes.CheckIcon} />, title: "مشاهده", value: "SHOW_POST" },
        { icon: visible === "TRUE" ? < VisibilityOffIcon color="action" /> : < RemoveRedEyeIcon color="action" />, title: visible === "TRUE" ? "مخفی کردن" : "دیده شدن", value: visible === "TRUE" ? "REMOVE" : "ENABLE" },
        // { icon: <DeleteIcon color="secondary" />, title: "حذف", value: "DELETE" },
        // { icon: <ReportIcon />, title: "گزارش", value: "REPORT" },
        { icon: <EditIcon />, title: "ویرایش", value: "EDIT" },
    ];

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {

        setAnchorEl(null);
    };

    const handleSubmit = (value) => {
        clickDropdown(value)

        if (value === "REMOVE") {
            setEnsureDeleteRemove(true)
        }

        if (value === "ENABLE") {
            setEnsureEnable(true)
        }

    }

    const handleOkAlert = () => {
        handleRemove()

        setEnsureDeleteRemove(false)
    }

    const handleOkAlertEnable = () => {
        handleEnable()

        setEnsureEnable(false)
    }

    const dataAlertDialogSlide = {
        title: "ویرایش",
        description: `از ${visible === "TRUE" ? "مخفی کردن" : "دیده شدن"} این پست اطمینان دارید؟`,
    }


    return (
        <div>
            <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
            >
                {options.map((option, ind) => {
                    let Icon = options[ind].icon
                    return (
                        <MenuItem
                            className={classes.item}
                            key={ind}
                            //    selected={option === 'Pyxis'}
                            onClick={() => {
                                handleClose()
                                handleSubmit(option.value)
                            }}
                        >
                            {Icon}
                            {'\u00A0'}
                            {option.title}
                        </MenuItem>

                    )
                })}
            </Menu>

            {/* ---------ensure remove------ */}
            <AlertDialogSlide
                flagShow={ensureDeleteRemove}
                handleCloseAlert={setEnsureDeleteRemove}
                handleOkAlert={handleOkAlert}
                data={dataAlertDialogSlide}
            />

            {/* ---------ensure enable------ */}
            <AlertDialogSlide
                flagShow={ensureEnable}
                handleCloseAlert={setEnsureEnable}
                handleOkAlert={handleOkAlertEnable}
                data={dataAlertDialogSlide}
            />
        </div>
    );
}

