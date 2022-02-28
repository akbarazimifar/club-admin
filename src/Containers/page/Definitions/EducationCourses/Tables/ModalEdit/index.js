import React , {useState , useEffect} from 'react'
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { makeStyles } from '@material-ui/core/styles';
import DatePickerEdit from "./../../../../../Common/Components/DatePickerEdit"
import {dateMiladi } from '../../../../../Common/method/date';

const useStyles = makeStyles((theme) => ({
    ModalAdd: {
        width: 930,
        borderRadius: 8,
        padding: 15,
        backgroundColor: "whitesmoke",
        maxHeight:797,
        minWidth:600,
        overflow:'auto',
    },
    root: {
        padding: "0px 0",
        display: "flex",
        flexWrap: "wrap",
        width: "85%",
        margin: "auto",
        '& .MuiBox-root': {
            margin: "2px 1%",
        },
    },
    btns: {
        margin: "10px 0 10px 0",
        textAlign: "right",
        width: "95%",
    }
}));

export default function Index({ setNewButton , data , apiCoursesUpdate }) {

    const classes = useStyles();
    const [state, setstate] = useState({
        // Name : '',
        // is_active : 'TRUE',
        // holding_days : '',
        // start_date : '',
        // end_date : '',
        // registration_start_date:'',
        // registration_end_date:'',
        // holding_time : '',
        // category:'',
        // hours:null,
        // teacher_name:'',
        // explanations:'',
        // external_links:'',
        // cost:null,
        // required_bonus:null,
        // min_participants:null,
        // max_participants:null,
        // location:'',
        // remained_capacity: null,
    })

    useEffect(() => {
        setstate(data.body)
    }, [data])


    const handelCHnage = (data , type)=>{
        let value = data;

        setstate(prev=>({
            ...prev,
            [type] : value
        }))
    }

    const handelSubmit = ()=>{
        apiCoursesUpdate(state , data.id)
        setNewButton(false)
    }

    return (
        <div className={classes['ModalAdd']}>

            <div className={classes['root']}>
                <Box
                    width="100%"
                >
                    <TextField
                        value={state.Name}
                        label="عنوان دوره آموزشی"
                        id="titleNewButton"
                        defaultValue=""
                        variant="outlined"
                        size="small"
                        fullWidth
                        margin="dense"
                        onChange={(event)=>handelCHnage( event.target.value , 'Name' )}
                    />

                </Box>

                <Box
                    width="100%"
                >
                    <TextField
                        value={state.holding_days}
                        label="روزهای برگزاری"
                        id="titleNewButton"
                        defaultValue=""
                        variant="outlined"
                        size="small"
                        fullWidth
                        margin="dense"
                        onChange={(event)=>handelCHnage( event.target.value , 'holding_days' )}
                    />

                </Box>

                <Box
                    width="23%"
                >
                    <DatePickerEdit label="تاریخ شروع کلاس" value={dateMiladi(state.start_date)} >
                        {data => handelCHnage(`${data}` , 'start_date')}
                    </DatePickerEdit>

                </Box>

                <Box
                    width="23%"
                >
                    <DatePickerEdit label="تاریخ پایان کلاس" value={dateMiladi(state.end_date)} >
                       {data => handelCHnage(`${data}` , 'end_date')}
                    </DatePickerEdit>

                </Box>

                <Box
                    width="23%"
                >
                    {/*  */}
                    <DatePickerEdit label="تاریخ شروع ثبت نام" value={state.registration_start_date}>
                       {data => handelCHnage(`${dateMiladi(data)} ${'00:00:00.000000'}` , 'registration_start_date') }
                    </DatePickerEdit>

                </Box>

                <Box
                    width="23%"
                >
                    <DatePickerEdit label="تاریخ پایان ثبت نام"  value={state.registration_end_date} >
                      {data => handelCHnage(`${dateMiladi(data)} ${'23:59:59.000000'}` , 'registration_end_date')}
                    </DatePickerEdit>

                </Box>

                
                <Box     
                    width="48%"
                >
                    <TextField
                        value={state.holding_time}
                        label="ساعات برگزاری"
                        id="titleNewButton"
                        defaultValue=""
                        variant="outlined"
                        size="small"
                        fullWidth
                        margin="dense"
                        onChange={(event)=>handelCHnage( event.target.value , 'holding_time' )}
                    />

                </Box>

                <Box
                    width="48%"
                >
                    <TextField
                        value={state.category}
                        label="دسته بندی"
                        id="titleNewButton"
                        defaultValue=""
                        variant="outlined"
                        size="small"
                        fullWidth
                        // disabled  
                        margin="dense"
                        onChange={(event)=>handelCHnage( event.target.value , 'category' )}
                    />

                </Box>
                <Box
                    width="31%"
                >
                    <TextField
                        value={state.hours}
                        label="تعداد ساعت"
                        id="titleNewButton"
                        defaultValue=""
                        variant="outlined"
                        size="small"
                        fullWidth
                        type="number"
                        margin="dense"
                        onChange={(event)=>handelCHnage(Number(event.target.value) , 'hours' )}
                    />

                </Box>

                <Box
                    width="65%"
                >
                    <TextField
                        value={state.teacher_name}
                        label="نام مدرس"
                        id="titleNewButton"
                        defaultValue=""
                        variant="outlined"
                        size="small"
                        fullWidth
                        margin="dense"
                        onChange={(event)=>handelCHnage( event.target.value , 'teacher_name')}
                    />

                </Box>

                <Box
                    width="98%"
                    height={120}
                // style={{ backgroundColor: 'gray' }}
                >
                    <TextareaAutosize
                        // rowsMax={4}
                        value={state.explanations}
                        aria-label="maximum height"
                        placeholder="توضیحات"
                        style={{ width: "100%", height: "100%", border: "1px solid #ccc", padding: 10, backgroundColor: "transparent" ,borderRadius : 10 }}
                        onChange={(event)=>handelCHnage( event.target.value , 'explanations')}
                    // defaultValue="آدرس"
                    />
                </Box>

                <Box
                    width="98%"
                >
                    <TextField
                        value={state.external_links}
                        label="لینک های خارجی"
                        id="titleNewButton"
                        defaultValue=""
                        variant="outlined"
                        size="small"
                        fullWidth
                        margin="dense"
                        onChange={(event)=>handelCHnage( event.target.value , 'external_links')}
                        helperText="در صورت وارد کردن چند لینک، لینک ها را با کاما( , ) از هم جدا کنید"
                    />

                </Box>

                <Box
                    width="48%"
                >
                    <TextField
                        value={state.cost}
                        label="هزینه دوره"
                        id="titleNewButton"
                        defaultValue=""
                        variant="outlined"
                        size="small"
                        fullWidth
                        margin="dense"
                        type="number"
                        onChange={(event)=>handelCHnage( Number(event.target.value) , 'cost')}
                    />

                </Box>

                <Box
                    width="48%"
                >
                    <TextField
                        value={state.required_bonus}
                        label="امتیاز لازم برای شرکت در دوره"
                        id="titleNewButton"
                        defaultValue=""
                        variant="outlined"
                        size="small"
                        fullWidth
                        margin="dense"
                        type="number"
                        onChange={(event)=>handelCHnage(Number(event.target.value) , 'required_bonus')}
                    />

                </Box>

                <Box
                    width="48%"
                >
                    <TextField
                        value={state.min_participants}
                        label="حدااقل شرکت کنندگان"
                        id="titleNewButton"
                        defaultValue=""
                        variant="outlined"
                        size="small"
                        fullWidth
                        margin="dense"
                        type="number"
                        onChange={(event)=>handelCHnage( Number(event.target.value) , 'min_participants')}
                    />

                </Box>

                <Box
                    width="48%"
                >
                    <TextField
                        value={state.max_participants}
                        label="حدااکثر شرکت کنندگان"
                        id="titleNewButton"
                        defaultValue=""
                        variant="outlined"
                        size="small"
                        fullWidth
                        margin="dense"
                        type="number"
                        onChange={(event)=>handelCHnage( Number(event.target.value) , 'max_participants')}

                    />

                </Box>

                <Box
                    width="98%"
                    height={120}
                // style={{ backgroundColor: 'gray' }}
                >
                    <TextareaAutosize
                        // rowsMax={4}
                        value={state.location}
                        aria-label="maximum height"
                        placeholder="مکان"
                        style={{ width: "100%", height: "100%", border: "1px solid #ccc", padding: 10, backgroundColor: "transparent" ,borderRadius : 10 }}
                        onChange={(event)=>handelCHnage( event.target.value , 'location')}

                        
                    // defaultValue="آدرس"
                    />
                </Box>



            </div>

            <div className={classes['btns']}>
                <button className={'btnsGreen'} onClick={() => handelSubmit()} >ذخیره </button>
                <button className={'btnsRed'} onClick={() => setNewButton(false)}>انصراف </button>
            </div>
        </div>
    )
}
