import React from 'react'
import Styles from './index.module.scss';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import RadioButtonsGroup from '../../../Tables/RadioButtonsGroup';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
      width: '25ch',
    },
  },
  grid: {
    margin: 20,
    display: "flex"
  },
  link: {
    width: '100%',
    backgroundColor: 'red'
  },
  itemCheckbox: {
    width: "27%",
    marginRight: "5.5%"
  }
}));



export default function Index({ data_Reducer, handelchange }) {

  const data = [

    {
      title: 'نام شعبه',
      type: 'text',
      value: 'Name',
    },
    {
      title: 'مسئول',
      type: 'text',
      value: 'DirectorName',
    },
    {
      title: 'کد پستی',
      type: 'text',
      value: 'PostalCode',
    },
    {
      title: 'تلفن',
      type: 'text',
      value: 'PhoneNumber',
    },
    {
      title: 'کد',
      type: 'text',
      value: 'CityCodePhoneNumber',
    },
    {
      title: 'لینک',
      type: 'text',
      value: 'GoogleMapUrl',
    },
    {
      title: 'استان',
      type: 'text',
      value: 'ProvinceName',
    },
    {
      title: 'شهر',
      type: 'text',
      value: 'CityName',
    },
    {
      title: 'کد شعبه',
      type: 'text',
      value: 'recommender_id',
    },
  ]


  const classes = useStyles();

  if (!data_Reducer) {
    return
  }

  return (
    <div className={Styles['filter']}>
      <div className={classes['root']}>

        <div className={Styles['inputs']}>
          {
            data.map((data, index) => {
              if (data.type === 'text') {
                return <TextField id="outlined-basic"
                  label={data.title}
                  variant="outlined"
                  size="small"
                  key={index}
                  value={data_Reducer.body[data.value]}
                  onChange={(event) => handelchange(event.target.value, data.value)}
                  style={{ width: "27%" }}
                />
              }
              return null
            })
          }
        </div>
        <div className={classes['grid']}>
          <span
            className={classes['itemCheckbox']}
          >
            <span>فعال / غیر فعال</span>
            <Checkbox
              checked={JSON.parse(data_Reducer.body['IsActive'].toLowerCase())}
              color="primary"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
              onChange={(event) => handelchange(JSON.stringify(event.target.checked).toUpperCase(), 'IsActive')}
            />
          </span>

          <span
            className={classes['itemCheckbox']}
          >
            <span>شعبه مرکزی</span>
            <Checkbox
              checked={JSON.parse(data_Reducer.body['IsMainBranch'].toLowerCase())}
              color="primary"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
              onChange={(event) => handelchange(JSON.stringify(event.target.checked).toUpperCase(), 'IsMainBranch')}
            />
          </span>

          <span
            className={classes['itemCheckbox']}
          >
            <RadioButtonsGroup flag={data_Reducer.body['IsBranch']} activeChange={true} >
              {(data) => handelchange(data, 'IsBranch')}
            </RadioButtonsGroup>
          </span>
        </div>

      </div>

    </div>
  )
}
