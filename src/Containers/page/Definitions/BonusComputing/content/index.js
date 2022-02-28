import React from 'react'
import TableComputing from './tableComputing';
import TableUser from './tableUser';

export default function Index({
    value,
    flagApi,
    setflagApi,
    flagApiCalculate,
    setFlagApiCalculate,
}) {

    return (
        <div>
            <TableComputing
                value={value}
                flagApiCalculate={flagApiCalculate}
                setFlagApiCalculate={setFlagApiCalculate}
            />
            <TableUser
                value={value}
                flagApi={flagApi}
                setflagApi={setflagApi} />
        </div>
    )
}
