import React from 'react'
import Styles from './index.module.scss';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(2),
        width: '25ch',
      },
    },
  }));



export default function Index() {

    const data = [
        {
            title : 'گروه موضوع' ,
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
            title : 'موضوع ارسال' ,
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
            title : 'نوع تایید' ,
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
            title : 'نماد' ,
            type : 'text',
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
            title : 'فرستنده' ,
            type : 'text',
            list:[
                
            ],
         },
         {
            title : 'عنوان' ,
            type : 'text',
            list:[],
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
        </div>
            
        </div>

        </div>
    )
}
