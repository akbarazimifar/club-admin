import React from 'react'
import TablesRight from './TablesRight/Tables';
import TablesLeft from './TablesLeft/Tables';
import Styles from './index.module.scss';
import AddBoxIcon from '@material-ui/icons/AddBox';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

export default function index() {
    return (
        <div className={Styles['tables']}>
            <div className={Styles['containers']}>
                <div className={Styles['grid']}>
                    <div className={Styles['desc']}>لیست درخواست های دارای وضعیت</div>
                    <TablesRight />
                </div>
                <div className={Styles['grid']}>
                    <div className={Styles['desc']}>لیست درخواست های فاقد وضعیت</div>
                    <TablesLeft />
                </div>
            </div>
            <div className={Styles['iconBottom']}>
                <div className={Styles['icons']}>
                    <AddBoxIcon />
                    {/* <CreateIcon /> */}
                    <DeleteForeverIcon />
                </div>
                <div className={Styles['icons']}>
                    <AddBoxIcon />
                    {/* <CreateIcon /> */}
                    <DeleteForeverIcon />
                </div>
            </div>
        </div>
    )
}
