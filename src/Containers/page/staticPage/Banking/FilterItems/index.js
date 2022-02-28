import React, { useState , useEffect} from 'react'
import{ useSelector} from 'react-redux';

import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import {distinctMethod} from '../../../../Common/method/distinctMethod';

const useStyles = makeStyles((theme) => ({
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
    }

}))


export default function Index({ flagFilter  , SetfilterSreach}) {

    const classes = useStyles();
    const [data ,setData] = useState([]) 
    const [filter , setfilter] = useState('')
    const accounts_reducer = useSelector(state => state.ACCOUNTS_v1_select_Reducer.data)

    useEffect(() => {
        if(accounts_reducer){
            let _data = JSON.parse(accounts_reducer.response.data.results[0].body.content);
            let category = distinctMethod(_data , ['Group'])
                  category.push('همه')

            setData(category)
        }
    }, [accounts_reducer])



    return (
        <>
            {
                flagFilter
                    ? (
                        <div className={classes['filter']} >
                            <Box p={1} >
                                <h3>فیلتر اطلاعات</h3>
                            </Box>

                            <Box
                                display="flex"
                            >
                                <Box
                                    width="20%"
                                    m={'0px 30px'}
                                >
                                    <TextField
                                        id="standard-select-currency"
                                        select
                                        label={"دسته بندی"}
                                        // value={data.title}
                                        onChange={(event)=>{setfilter(event.target.value)}}
                                        helperText=""
                                        size="small"
                                        fullWidth
                                        variant="outlined"
                                        margin="dense"
                                    >
                                        {
                                            data.map((value  , index)=>{
                                                return(
                                                    <MenuItem value={value} key={index} >{value} </MenuItem>

                                                ) 
                                            })
                                        }
                                       
                                    </TextField>
                                </Box>
                            </Box>

                            <Box p={2}>
                                <div className={classes.buttons}>
                                    <button className="btnBlueFilter"onClick={()=>SetfilterSreach(filter)} >بازخوانی </button>
                                </div>
                            </Box>
                        </div>
                    )
                    : ''

            }
        </>
    )
}

