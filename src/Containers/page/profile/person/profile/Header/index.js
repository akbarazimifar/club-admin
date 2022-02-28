import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Box from "@material-ui/core/Box";
import SearchIcon from '@material-ui/icons/Search';
import Styles from './index.module.scss';
import { useDispatch } from 'react-redux'
import { SELECT_INTRODUCTION_DETAIL_EMPTY } from '../../../../../../boot/api/typeActions';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '35ch',
    [`& fieldset`]: {
      borderRadius: 20,
    },
  },
}));


export default function Index({ apiselectProfile, national_id }) {

  const classes = useStyles();
  let dispatch = useDispatch()

  const [values, setValues] = React.useState({
    Ncode: '',
  });

  useEffect(() => {
    if (national_id) {
      setValues(prev => ({ ...prev, Ncode: national_id }))
    }
  }, [national_id])

  
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handel_submit = () => {
    if (values.Ncode.length > 1) {
      apiselectProfile(values.Ncode)
      dispatch({type :SELECT_INTRODUCTION_DETAIL_EMPTY})
    } else {
      dispatch({ type: "ALERT", payload: { status: true, textAlert: "لطفا فیلد کد ملی را وارد نمایید", typeAlert: "info" } })
    }
  }

  return (
    <div className={Styles['header']}>
      <Box borderRadius={20} ml={5}>
        <FormControl size="small" className={clsx(classes.margin, classes.textField)} variant="outlined">
          <InputLabel className={Styles['test']} htmlFor="standard-start-adornment">کد ملی را وارد نمایید</InputLabel>
          <OutlinedInput
            id="standard-start-adornment"
            type={'text'}
            value={values.Ncode}
            onChange={handleChange('Ncode')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  // onClick={handleClickShowPassword}
                  // onMouseDown={handleMouseDownPassword}
                  edge="end"
                  onClick={() => handel_submit()}
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
            labelWidth={270}
          />
        </FormControl>
      </Box>
    </div>
  )
}
