import React, { useEffect } from 'react'
import TableClub from './TableClub';
import TableAutomation from './TableAutomation';
import { useSelector, useDispatch } from 'react-redux';
import { bonus_calculate_confiict_action } from '../../../../../../boot/api/Definitions/bonus/bonus_v1_calculate_conflict/action';
import { makeStyles } from '@material-ui/core';
import { BONUS_V1_SELECT_CALCULATE_CONFIICT_EMPTY } from '../../../../../../boot/api/typeActions';


let useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    grid: {
        maxHeight: 350,
        overflow: 'auto',
        minHeight: 200,
        boxShadow: `1px 1px 5px rgb(0 0 0 / 10%)`,
        padding: '20px',
        borderRadius: '8px',
        margin: '20px 0px',
    }
})


let flag = false;

export default function Index({ value, flagApiCalculate, setFlagApiCalculate }) {


    let classes = useStyles()
    let dispatch = useDispatch()

    const reduserUser = useSelector(state => state.bonus_calculate_confiict_reducer)

    useEffect(() => {
        if (flag) {
            apiSubmit()
        }
    }, [flagApiCalculate])

    useEffect(() => {
        flag = true
        return () => {
            flag = false
            dispatch({ type: BONUS_V1_SELECT_CALCULATE_CONFIICT_EMPTY })
        }
    }, [])

    const apiSubmit = () => {

        let obj = {};
        let flag = false;

        Object.keys(value).forEach((element) => {
            if (value[element]) {
                obj[element] = value[element];
            } else {
                flag = true
            }
        });

        if (flag) {
            alert('لطفا تمامی فیلد ها را پر نمایید')
            return
        }

        dispatch(bonus_calculate_confiict_action({ ...value }))
    }


    return (
        <>
            <hr />
            <div className={classes['root']}>
                <div >
                    <h3>اتوماسیون</h3>
                    <div className={classes['grid']}>
                        <TableAutomation reduserUser={reduserUser} />
                    </div>
                </div>
                <div>
                    <h3>باشگاه</h3>
                    <div className={classes['grid']}>
                        <TableClub reduserUser={reduserUser} />
                    </div>
                </div>
            </div>
        </>
    )
}
