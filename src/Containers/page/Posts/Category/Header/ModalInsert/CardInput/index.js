import React from 'react'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    card: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 300,
        padding: 20,
    },
    input: {
        width: 250,
        minWidth: 200,
        '& input': {
            fontSize: 14,

        }
    },
    iconDelete: {
        fill: '#F64E60',
        cursor: 'pointer',
        width: 35,
        height: 25
    }
}));

export default function Index({ title, type, value, handleChange, index }) {
    const classes = useStyles();


    return (
        <>
            <div className={classes['card']}>

                <TextField
                    className={classes['input']}
                    id="outlined-basic"
                    label={title}
                    variant="outlined"
                    size="small"
                    value={value}
                    onChange={(event) => {
                        if (type === "name") {
                            handleChange(event.target.value, -1)
                            return
                        }
                        handleChange(event.target.value, index)
                    }}
                />

            </div>


        </>
    )
}
