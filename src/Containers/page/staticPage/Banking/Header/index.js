import React, { useState } from 'react'
import Styles from './index.module.scss';
import RefreshIcon from '@material-ui/icons/Refresh';
import FilterListIcon from '@material-ui/icons/FilterList';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import ModalAdd from './ModalAdd';
import { Modal } from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));



export default function Index({ handelShowFilterItems , handel_Submit_Insert  , api_Call_Select}) {
  const dataButtons = [
    { name: 'افزودن شماره حساب', type: '', className: 'btnsBlue' },
  ]
  const classes = useStyles();
  const [newButton, setNewButton] = useState(false);


  const handleClickButton = (data) => {
    if (data === "NEW") {
      setNewButton(prev => !prev)
    }

    return
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
        <FilterListIcon onClick={() => { handelShowFilterItems() }}  />
        <RefreshIcon  onClick={()=>api_Call_Select()}/>
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
          <ModalAdd setNewButton={setNewButton} handel_Submit_Insert = {handel_Submit_Insert} />
        </Fade>
      </Modal>

    </div>
  )
}
