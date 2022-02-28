import React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import style from "./index.module.scss";


const useStyles = makeStyles((theme) => ({
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        minWidth: 500
    },
    textCenterAlign: {
        textAlign: "center"
    },
    tree: {
        height: 216,
        flexGrow: 1,
        maxWidth: 400,
    },
}));

export default function GroupAwards() {
    const classes = useStyles();

    return (
        <div className={classes.paper}>

            <h2 className={classes.textCenterAlign}>گروه های جوایز</h2>

            <div>
                <TreeView
                    className={classes.tree}
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    multiSelect
                >
                    <TreeItem nodeId="1" label="تست1">
                        <TreeItem nodeId="2" label="تست2" />
                        <TreeItem nodeId="3" label="تست2" />
                        <TreeItem nodeId="4" label="تست2" />
                    </TreeItem>
                    <TreeItem nodeId="5" label="تست1">
                        <TreeItem nodeId="6" label="تست2">
                            <TreeItem nodeId="7" label="تست3">
                                <TreeItem nodeId="8" label="تست5" />
                                <TreeItem nodeId="9" label="تست5" />
                            </TreeItem>
                        </TreeItem>
                    </TreeItem>
                </TreeView>
            </div>


            <div
                className={style['button']}
                style={{ display: "flex", justifyContent: "center", width: "70%", margin: "auto" }}
            >
                <button className={style.btnsBlue}>جدید</button>
                <button className={style.btnsYellow}>ویرایش</button>
                <button className={style.btnsRed}>حذف</button>
            </div>

        </div>
    )
}
