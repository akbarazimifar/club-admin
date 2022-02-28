
import React from 'react';
import classes from './index.module.scss';
import Table from "./Tables/Tables";

export default function Index() {
    return (
        <div 
        className={classes.filter}
        style={{marginTop:30}}
        >
            <Table />
        </div>
    )
}
