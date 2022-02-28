import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

export default function TableBody({ data, selectedItem, changedSelected, index }) {

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
            <TableCell className="colorInherit" align="center">{data.body.ProvinceName}</TableCell>
            <TableCell className="colorInherit" align="center">{data.body.FullName}</TableCell>
            <TableCell className="colorInherit" align="center">{data.body.OfficeId}</TableCell>
            <TableCell className="colorInherit" align="center">{data.body.PhoneNumber}</TableCell>
            <TableCell className="colorInherit" align="center">{data.body.PostalCode}</TableCell>
            <TableCell className="colorInherit" align="left">{data.body.Address}</TableCell>

        </TableRow>

    )

}
