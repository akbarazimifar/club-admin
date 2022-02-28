import React from 'react'
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
// import DatePicker from "./../../../Common/Components/DatePicker";
import Styles from './index.module.scss';


const useStyles = makeStyles((theme) => ({
    filter: {
        width: "96.5%",
        height: "auto",
        backgroundColor: "white",
        margin: 'auto',
        marginTop: '30px',
        border: '1px solid rgba(0, 0, 0, 0.2)',
        borderRadius: '5px',
        padding: 30,
    },
    buttons: {
        textAlign: "right"
    }

}))


export default function Index({
    flagFilter, stateFilter, handleChangeFilter, handelSubmitFilter
}) {
    const classes = useStyles();


    return (
        <>
            {
                flagFilter
                    ? (
                        <div className={classes['filter']} >
                            <Box p={1} >
                                <h3>فیلتر اطلاعات</h3>
                            </Box>
                            <Box className={Styles['filter']} >
                                {/* <Box width={193} style={{ margin: "0 50px" }} >
                                    <DatePicker label="تاریخ ثبت">
                                        {
                                            data => handleChange(data, "create_date")
                                        }
                                    </DatePicker>
                                </Box> */}
                                <Box width={250} className={Styles['TextField']} >
                                    <TextField
                                        id="standard-select-currency"
                                        label={'نام گروه'}
                                        value={stateFilter.forum_name}
                                        onChange={(event) => handleChangeFilter(event.target.value, "forum_name")}
                                        helperText=""
                                        size="small"
                                        fullWidth
                                        variant="outlined"
                                        margin="dense"
                                    />
                                </Box>
                                <Box width={250} className={Styles['TextField']} >
                                    <TextField
                                        id="standard-select-currency"
                                        label={'نام زیر گروه'}
                                        value={stateFilter.subgroup_name}
                                        onChange={(event) => handleChangeFilter(event.target.value, "subgroup_name")}
                                        helperText=""
                                        size="small"
                                        fullWidth
                                        variant="outlined"
                                        margin="dense"
                                    />
                                </Box>
                                <Box width={250} className={Styles['TextField']} >
                                    <TextField
                                        id="outlined-select-currency"
                                        select
                                        label="نمایش و عدم نمایش"
                                        value={stateFilter.is_visible}
                                        onChange={(event) => handleChangeFilter(event.target.value, "is_visible")}
                                        variant="outlined"
                                        size="small"
                                        helperText=""
                                        style={{ minWidth: 250 }}
                                    >
                                        {is_visible.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Box>
                                <Box width={250} className={Styles['TextField']} >
                                    <TextField
                                        id="standard-select-currency"
                                        label={'نام خانوادگی کاربر ثبت کننده'}
                                        value={stateFilter.author_last_name}
                                        onChange={(event) => handleChangeFilter(event.target.value, "author_last_name")}
                                        helperText=""
                                        size="small"
                                        fullWidth
                                        variant="outlined"
                                        margin="dense"
                                    />
                                </Box>
                                <Box width={250} className={Styles['TextField']} >
                                    <TextField
                                        id="standard-select-currency"
                                        label={'عنوان'}
                                        value={stateFilter.title}
                                        onChange={(event) => handleChangeFilter(event.target.value, "title")}
                                        helperText=""
                                        size="small"
                                        fullWidth
                                        variant="outlined"
                                        margin="dense"
                                    />
                                </Box>
                                <Box width={250} className={Styles['TextField']} >
                                    <TextField
                                        id="standard-select-currency"
                                        label={'خلاصه'}
                                        value={stateFilter.abstract}
                                        onChange={(event) => handleChangeFilter(event.target.value, "abstract")}
                                        helperText=""
                                        size="small"
                                        fullWidth
                                        variant="outlined"
                                        margin="dense"
                                    />
                                </Box>

                            </Box>


                            <Box p={2}>
                                <div className={classes.buttons}>
                                    <button
                                        className="btnBlueFilter"
                                        onClick={() => handelSubmitFilter()}
                                    >
                                        بازخوانی
                                     </button>
                                </div>
                            </Box>
                        </div>
                    )
                    : ''

            }
        </>
    )
}

const is_visible = [
    {
        value: 'TRUE',
        label: 'نمایش',
    },
    {
        value: 'FALSE',
        label: 'عدم نمایش',
    },
    {
        value: '',
        label: 'همه',
    },

]

// const approveSelect = [
//     {
//         value: 'select',
//         label: 'همه',
//     },
//     {
//         value: 'select_approve',
//         label: 'تایید شده',
//     },
//     {
//         value: 'select_reject',
//         label: 'تایید نشده',
//     },
// ]

