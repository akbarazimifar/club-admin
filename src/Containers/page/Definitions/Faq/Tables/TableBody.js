import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';


export default function TableBody({ data, index, selectedItem, changedSelected }) {

    const handleClickRow = () => {
        changedSelected(selectedItem[1] === data.id ? [false, null] : [true, data.id])
    }

    return (
        <TableRow
            selected={selectedItem[1] === data.id ? selectedItem[0] : false}
            // className={classes.tableRow}
            onClick={handleClickRow}
        >
            <TableCell className="colorInherit" align="center">{index + 1}</TableCell>
            <TableCell className="colorInherit" align="center">{data.question}</TableCell>
            <TableCell className="colorInherit" align="left">
                <div dangerouslySetInnerHTML={{ __html:data.answer}}></div>
            </TableCell>
            
        </TableRow>
    )
}
