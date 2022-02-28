import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import CircularProgress from '@material-ui/core/CircularProgress';
// import axios from "axios";

import { useSelector } from 'react-redux'


const useStyles = makeStyles((theme) => ({
    login: {
        width: '100%',
        height: '100vh',
        backgroundColor: "#3D5A80",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

    },
    root: {
        height: "80%",
        [theme.breakpoints.down('md')]: {
            marginTop: "0",
        },
    },
    rowCustom: {
        height: "100%",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightArticle: {
        height: "100%",
        padding: "15% 0 2%",
        borderRadius: 20,
        backgroundColor: '#EEF5FA',
        minHeight: 500
    },
    form: {
        width: "70%",
        margin: "50px auto",

    },
    blockWidth: {
        width: "100%"
    },
    loading: {
        margin: '10px 0',
        boxSizing: "border-box"
    }
}));


export default function Index({ handelSubmit }) {


    const classes = useStyles();
    const [data, SetDate] = useState({ userName: '', passWord: '' });
    const dataReducer = useSelector(state => state.login_v1_Reducer)

    const handelChange = (type, value) => {
        SetDate(prevState => (
            {
                ...prevState,
                [type]: value,
            }
        ))
    }

    return (
        <Box className={classes.login}>
            <Container
                className={classes.root}
                maxWidth="lg"
            // disableGutters
            >
                <Grid
                    container
                    className={classes.rowCustom}
                    justify="center"
                >

                    <Grid item xs={12} md={5} >

                        <Paper
                            className={classes.rightArticle}
                        >

                            <Box align={'center'}>
                                <Typography variant='h5'> پنل مدیریت </Typography>
                                <Typography variant='h5'>باشگاه مشتریان مبین سرمایه</Typography>
                            </Box>


                            <Box className={classes.form}>
                                <FormControl className={classes.blockWidth}>
                                    <TextField
                                        margin='normal'
                                        id="outlined-basic-text"
                                        value={data.userName}
                                        label="کلید"
                                        variant="outlined"
                                        onChange={(e) => {
                                            let { value } = e.target
                                            handelChange('userName', value)
                                        }}
                                    />
                                </FormControl>

                                <FormControl className={classes.blockWidth}>
                                    <TextField
                                        margin='normal'
                                        value={data.passWord}
                                        type={'password'}
                                        id="outlined-basic-password"
                                        label="رمز عبور"
                                        variant="outlined"
                                        onChange={(e) => {
                                            let { value } = e.target
                                            handelChange('passWord', value)
                                        }}
                                    />
                                </FormControl>

                                <Box pt={2}>
                                    <Button
                                        onClick={() => handelSubmit(data)}
                                        className={classes.blockWidth}
                                        size="large"
                                        margin='normal'
                                        variant="contained"
                                        color="primary"
                                    >
                                        ورود
                                    </Button>
                                </Box>

                                <Box pt={2} height={100} >
                                    {/* <Typography
                                        style={{ fontSize: '0.9em' }}
                                    >
                                        رمزعبور خود را فراموش کرده‌اید؟
                                   </Typography> */}

                                    <Typography color="secondary"
                                        style={{ fontSize: '0.9em', paddingTop: "10px" }}>
                                        {dataReducer.error}
                                    </Typography>

                                    {
                                        dataReducer.loading && (
                                            <CircularProgress className={classes.loading} />
                                        )
                                    }
                                </Box>
                            </Box>

                        </Paper>
                    </Grid>

                    {/* <Grid
                        className={classes.leftArticle}
                        item md={8}
                    // display={{md: 'none' }}
                    > 
                    </Grid>*/}

                </Grid>

            </Container>

        </Box>
    )
}