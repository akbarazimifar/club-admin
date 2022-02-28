import React, { useState } from 'react'
import Header from './header';
import Content from './content/'
import Info from './header/info';
import { makeStyles } from '@material-ui/core';
import { LinearProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

let useStyles = makeStyles({
    root: {
        backgroundColor: 'white',
        height: '90vh',
        overflow: 'auto'
    },
    loading: {
        width: "84%",
        position: "absolute",
        top: 0
    }
})

export default function Index() {

    let classes = useStyles();
    const [flagApi, setflagApi] = useState(false)
    const [flagApiCalculate, setFlagApiCalculate] = useState(false)


    const [state, setState] = useState({
        conflict_from_date: "",
        conflict_to_date: "",
        member_national_id: ""
    })

    const reduserUserCalculate = useSelector(state => state.bonus_calculate_confiict_reducer)
    const dataReducer = useSelector((state) => state.bonus_select_confiict_reducer);

    return (
        <div className={classes['root']}>
            {
                (
                    reduserUserCalculate.loading ||
                    dataReducer.loading
                ) && (
                    <div className={classes['loading']}>
                        <LinearProgress />
                    </div>
                )
            }
            <hr />

            <Header
                value={state}
                setValue={setState}
                setflagApi={setflagApi}
                setFlagApiCalculate={setFlagApiCalculate}
            />
            <Info />
            <Content
                value={state}
                flagApi={flagApi}
                setflagApi={setflagApi}
                flagApiCalculate={flagApiCalculate}
                setFlagApiCalculate={setFlagApiCalculate}
            />
        </div>
    )
}
