
import React, { useEffect, useState } from "react";
import Table from "./Table";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";
import { bonus_select_confiict_action } from "../../../../../../boot/api/Definitions/bonus/bonus_v1_select_conflicts/action";



let useStyles = makeStyles({
    grid: {
        padding: 30
    }
})

export default function Index({
    value,
    flagApi,
    setflagApi,
}) {

    let classes = useStyles()
    const dispatch = useDispatch();

    const [pageTab1, setPageTab1] = useState(1);
    const [sort, setSort] = useState({})

    const dataReducer = useSelector((state) => state.bonus_select_confiict_reducer);

    const apiSubmit = () => {

        let obj = {};
        let size = dataReducer.size;
        let { id, ...sortRes } = sort;


        Object.keys(value).forEach((element) => {
            if (value[element]) {
                obj[element] = value[element];
            }
        });



        dispatch(bonus_select_confiict_action(
            sortRes,
            size,
            pageTab1,
            obj.member_national_id
                ? { member_national_id: obj.member_national_id }
                : {}
        ));

    };

    useEffect(() => {
        apiSubmit()
    }, [flagApi])

    return (
        <div>
            <div className={classes['grid']}>
                <h3>تاریخچه محاسبه مجدد</h3>
                <Table
                    data={dataReducer}
                    pageTab1={pageTab1}
                    setPageTab1={setPageTab1}
                    sort={sort}
                    setSort={setSort}
                    setflagApi={setflagApi}
                />
            </div>

        </div>
    )
}
