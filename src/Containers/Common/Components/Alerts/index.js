import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}



const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));



export default function CustomizedSnackbars() {
    const classes = useStyles();
    const dispatch = useDispatch()
    let reducers_alert = useSelector(state => state.reducers_alert)


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch({ type: "ALERT", payload: { status: false } })
    };

    if (!reducers_alert.typeAlert) return null

    return (
        <div className={classes.root}>

            <Snackbar
                anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                open={reducers_alert.status}
                autoHideDuration={3000} 
                onClose={handleClose}
            >
                <Alert
                    onClose={handleClose}
                    severity={reducers_alert.typeAlert}
                >
                    {reducers_alert.textAlert}
                </Alert>
            </Snackbar>
        </div>
    );
}



//  <Alert severity="error">This is an error message!</Alert>
//       <Alert severity="warning">This is a warning message!</Alert>
//       <Alert severity="info">This is an information message!</Alert>
//       <Alert severity="success">This is a success message!</Alert> 