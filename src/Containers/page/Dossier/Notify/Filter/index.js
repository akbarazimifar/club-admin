import React, { useEffect } from 'react';
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { CLUB_MEMBER_SELECT_EMPTY } from '../../../../../boot/api/typeActions';


const useStyles = makeStyles(() => ({
    filter: {
        width: "96.5%",
        height: "auto",
        backgroundColor: "white",
        margin: 'auto',
        marginTop: '30px',
        border: '1px solid rgba(0, 0, 0, 0.2)',
        borderRadius: '5px',
    },
    buttons: {
        textAlign: "right"
    },
    grid: {
        flexWrap: 'wrap'
    }
}))


export default function Index({ flagFilter, handleSubmitFilter, stateFilter, setstateFilter }) {
    const dispatch = useDispatch();
    const club_reducer = useSelector(state => state.club_member_v1_reducer)



    const classes = useStyles();

    const handelCHnage = (value, type) => {
        setstateFilter(prev => ({
            ...prev,
            [type]: value
        }))
    }

    const handelSubmitFilter = () => {
            handleSubmitFilter()
    }


    // const handelGetMemberId = () => {
    //     if (national_id) {

    //         let nCode = checkNationalCode(national_id)

    //         // if (nCode) {
    //         //     dispatch(club_member_v1_action_select(national_id))
    //         // }

    //         if (!nCode) {
    //             alert('کد ملی وارد شده صحیح نمی باشد')
    //             dispatch({ type: CLUB_MEMBER_SELECT_EMPTY })
    //             handelCHnage("", 'receiver_id')
    //         }

    //     }
    // }

    // const handlePressNationalId = () => {
    //     let nCode = checkNationalCode(national_id)
    //     if(national_id.length === 0){
    //         dispatch({ type: CLUB_MEMBER_SELECT_EMPTY })
    //         handelCHnage("", 'receiver_id')
    //     }




    //     if(national_id.length === 10){
    //         if (!nCode) {
    //             // alert('کد ملی وارد شده صحیح نمی باشد')
    //             // dispatch({ type: CLUB_MEMBER_SELECT_EMPTY })
    //         }else{
    //             dispatch(club_member_v1_action_select(national_id))
    //         }

    //     }
    // }

    useEffect(() => {
        if (club_reducer.data.length) {
            handelCHnage(club_reducer.data[0].id, 'receiver_id')
        }
    }, [club_reducer]) //eslint-disable-line react-hooks/exhaustive-deps



    useEffect(() => {
        return function cleanup() {
            dispatch({ type: CLUB_MEMBER_SELECT_EMPTY })
        }
    }, []) //eslint-disable-line react-hooks/exhaustive-deps



    return (
        <>
            {
                flagFilter
                    ? (
                        <div className={classes['filter']} >
                            <Box p={1} >
                                <h3>فیلتر اطلاعات</h3>
                            </Box>

                            <Box display="flex" className={classes['grid']}>
                                <Box width={200} ml={3}>
                                    <TextField
                                        id="standard-select-currency"
                                        select
                                        label={"منبع"}
                                        value={stateFilter.source}
                                        onChange={(event) => handelCHnage(event.target.value, 'source')}
                                        size="small"
                                        fullWidth
                                        variant="outlined"
                                        margin="dense"
                                    >
                                        <MenuItem value=""> همه </MenuItem>
                                        <MenuItem value="INTERNAL"> سرویس داخلی </MenuItem>
                                        <MenuItem value="ADMIN"> ادمین </MenuItem>
                                    </TextField>
                                </Box>

                                {/* <Box width={200} ml={3} >
                                    <TextField
                                        id="standard-select-currency"
                                        select
                                        label={"گیرنده"}
                                        // value={data.title}
                                        onChange={(event) => handelCHnage(event.target.value, 'is_active')}
                                        size="small"
                                        fullWidth
                                        variant="outlined"
                                        margin="dense"
                                    >
                                        <MenuItem value=""> همه </MenuItem>
                                    </TextField>
                                </Box> */}

                                <Box width={200} ml={3} >
                                    <TextField
                                        id="standard-select-currency"
                                        select
                                        label={"وضعیت"}
                                        value={stateFilter.state}
                                        onChange={(event) => handelCHnage(event.target.value, 'state')}
                                        size="small"
                                        fullWidth
                                        variant="outlined"
                                        margin="dense"
                                    >
                                        <MenuItem value=""> همه </MenuItem>
                                        <MenuItem value="IN_QUEUE">در صف ارسال</MenuItem>
                                        <MenuItem value="SENT">ارسال شده</MenuItem>
                                        <MenuItem value="NOT_SENT_Exception">لغو شده</MenuItem>
                                    </TextField>
                                </Box>

                                <Box width={200} ml={3} >
                                    <TextField
                                        id="standard-select-currency"
                                        select
                                        label={"نوع"}
                                        value={stateFilter.type}
                                        onChange={(event) => handelCHnage(event.target.value, 'type')}
                                        size="small"
                                        fullWidth
                                        variant="outlined"
                                        margin="dense"
                                    >
                                        <MenuItem value=""> همه </MenuItem>
                                        <MenuItem value="SMS">پیامک</MenuItem>
                                        <MenuItem value="EMAIL">ایمیل</MenuItem>
                                        <MenuItem value="WEB">وب</MenuItem>
                                    </TextField>
                                </Box>

                                <Box width={200} ml={3} >
                                    <TextField
                                        id="outlined-basic"
                                        label={'کد ملی'}
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        margin="dense"
                                        value={stateFilter.national_id}
                                        // onBlur/={() => handelGetMemberId()}
                                        // onChange={(event) => setNational_id(event.target.value)}
                                        onChange={(event) => handelCHnage(event.target.value, 'national_id')}
                                        // onKeyUp={handlePressNationalId}
                                    />
                                </Box>

                                <Box width={200} ml={3} >
                                    {
                                        club_reducer.data[0]?.body.first_name && (
                                            <Box width={200} mt={3} >
                                                {club_reducer.data[0].body.first_name}
                                                {" "}
                                                {club_reducer.data[0].body.last_name}
                                            </Box>
                                        )
                                    }
                                </Box>



                            </Box>

                            <Box p={2}>
                                <div className={classes.buttons}>
                                    <button className="btnBlueFilter" onClick={handelSubmitFilter}>بازخوانی </button>
                                </div>
                            </Box>
                        </div>
                    )
                    : ''

            }
        </>
    )
}

