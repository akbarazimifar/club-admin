import React, { useState } from 'react'
import Styles from './index.module.scss';
import RefreshIcon from '@material-ui/icons/Refresh';
import FilterListIcon from '@material-ui/icons/FilterList';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    // border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    minWidth: 500,
    borderRadius: 10
  },
  buttonsAdded: {
    marginTop: 15,
    float: 'right'
  }
}));

export default function Index({ handelShowFilterItems, callActionSelect }) {
  const [addedCategory, setAddedCategory] = useState(false);
  const classes = useStyles();


  // const dataButtons = [
  //   { name: 'افزودن دسته بندی', type: '', className: 'btnsBlue' },
  // ]

  return (
    <div className={Styles['header']}>
      {/* <div className={Styles['button']} >
        {
          dataButtons.map((data, index) => {
            return (
              <button
                key={index}
                onClick={() => setAddedCategory(true)}
                className={data.className}>
               افزودن دسته بندی
              </button>
            )
          })
        }
      </div> */}

      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description11"
          className={classes.modal}
          open={addedCategory}
          onClose={() => setAddedCategory(false)}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={addedCategory}>
            <div className={classes.paper}>
              <h3>افزودن دسته بندی</h3>

              <div>
                <TextField
                  label="نام دسته بندی"
                  id="added_in_group_faq"
                  defaultValue=""
                  variant="outlined"
                  size="small"
                  style={{ margin: "15px 0 35px 0" }}
                />
              </div>

              <div className={classes.buttonsAdded} >
                <button className="btnsGreen">ذخیره</button>
                <button onClick={() => setAddedCategory(false)} className="btnsRed">انصراف</button>
              </div>
            </div>
          </Fade>
        </Modal>
      </div>

      <div className={Styles['icon']}>
        <FilterListIcon
          onClick={() => { handelShowFilterItems() }}
          style={{ cursor: "pointer" }}
        />
        <RefreshIcon
          onClick={callActionSelect}
          style={{ cursor: "pointer" }}
        />
      </div>

    </div>
  )
}
