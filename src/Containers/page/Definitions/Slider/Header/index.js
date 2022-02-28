import React, { useState } from 'react'
import Styles from './index.module.scss';
import RefreshIcon from '@material-ui/icons/Refresh';
import FilterListIcon from '@material-ui/icons/FilterList';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import ModalAdd from './ModalAdd';


const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));



export default function Index({ handelShowFilterItems, handelSubmitUpdate, handleRefresh ,conditionData }) {
  const dataButtons = [
    { name: 'افزودن اسلاید', type: '', className: 'btnsBlue' },
    // {name : 'تایید' , type:'' , className:'btnsGreen'},
    // {name : 'عدم تایید' , type:'' , className:'btnsRed'},
    // {name : 'ویرایش' , type:'' , className:'btnsYellow'},
    // {name : 'حذف' , type:'' , className:'btnsBlack'},
  ]

  const classes = useStyles();
  const [newButton, setNewButton] = useState(false);


  const handleClickButton = (data) => {
    if (data === "NEW") {
      setNewButton(prev => !prev)
    }
  }


  return (
    <div className={Styles['header']}>
      <div className={Styles['button']} >
        {
          dataButtons.map((data, index) => {
            return (
              <button key={index} className={data.className} onClick={() => { setNewButton(!newButton) }}>{data.name}</button>
            )
          })
        }
      </div>
      <div className={Styles['icon']}>
        <FilterListIcon
          // onClick={() => { handelShowFilterItems() }}
          onClick={() => { alert("در دسترس نیست") }}
          color="disabled"
        />
        <RefreshIcon
          onClick={handleRefresh}
        />
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={newButton}
        onClose={() => handleClickButton("NEW")}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={newButton}>
          <ModalAdd
            setNewButton={setNewButton}
            handleCloseModal={() => handleClickButton("NEW")}
            handelSubmitUpdate={handelSubmitUpdate}
            disable={setNewButton}
            conditionData={conditionData}
          />
        </Fade>
      </Modal>


    </div>
  )
}
