import React  from 'react';
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
        backgroundColor: "white",
        width: "96.5%",
        margin: "30px auto 0",
        overflow: "auto"
    },
}))

export default function Index({ flagFilter }) {
    const classes = useStyles();
    // const stateReducer = useSelector(state => state.post_v1_select_Reducer_filter)


    return (
        <div
            className={classes.root}
            style={{ height: !flagFilter ? "79vh" : "41vh" }}
        >
            post filter
        </div>
    )
}
