import React from 'react'
import Styles from './index.module.scss';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(2),
        width: '25ch',
      },
    },
    checkbox:{
      marginTop:25
    }
  }));



export default function Index() {

    const data = [
        {
            title : 'چالش' ,
            type : 'select',
            list:[
                {
                    value: 'BTC',
                    label: '฿',
                  },
                  {
                    value: 'JPY',
                    label: '¥',
                  },
            ],
         },
         {
            title : 'درخواست کننده' ,
            type : 'select',
            list:[
                {
                    value: 'BTC',
                    label: '฿',
                  },
                  {
                    value: 'JPY',
                    label: '¥',
                  },
            ],
         },


    ]

    const classes = useStyles();

    return (
        <div className={Styles['filter']}>
        <div className={classes['root']}>

        <div className={Styles['inputs']}>
            {
                data.map((data , index)=>{
                    if(data.type === 'text'){
                       return <TextField id="outlined-basic" label={data.title} variant="outlined" size="small" key={index} />
                    }
                    if(data.type === 'select'){
                     return   <TextField
                        id="standard-select-currency"
                        select
                        label={data.title}
                        // value={data.title}
                        // onChange={handleChange}
                        helperText=""
                        size="small"
                        key={index}
                      >
                        {data.list.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    }
                    return null
                })  
            }
            <div className={classes.checkbox}>
                <Checkbox
                  color="primary"
                  inputProps={{ 'aria-label': 'secondary checkbox'}}
                 />
                 <span>قبول شدگان</span>
            </div>
        </div>
            
        </div>

        </div>
    )
}
