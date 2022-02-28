import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core'
import { TreeViewPer } from './TreeView';
import { ShowPer } from './ShowPer';
import {PREMISSON_DATA} from "./PREMISSON_DATA";

const useStyles = makeStyles(() => ({
    root: {
        width: "96%",
        height: "83vh",
        margin: "100px auto",
        backgroundColor: "white",
        borderRadius: 10,
        padding: 15,
        display: "flex"
    },
    right: {
        width: "50%",
        overflowY : "auto"
    },
    left: {
        width: "50%",
    },
    textarea: {
        resize: "both",
        height: 400

    }
}))

export default function Index() {
    const classes = useStyles();
    const [data, setData] = useState(PREMISSON_DATA)

    const resetData = () =>{
        setData(PREMISSON_DATA)
    }


    

    return (

        <div className={classes.root} >
            <div className={`${classes.right} hideScroll`}>
                <TreeViewPer
                    data={data}
                    setData={setData}
                />
            </div>

            <div className={`${classes.left} hideScroll`}>
                <ShowPer
                    data={data}
                    resetData={resetData}
                    setData={setData}
                />
            </div>
        </div>
    )
}