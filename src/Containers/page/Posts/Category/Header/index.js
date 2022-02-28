import React, { useState } from 'react'
import Styles from './index.module.scss';
import RefreshIcon from '@material-ui/icons/Refresh';
import ModalInsert from "./ModalInsert";
import { Modal } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';






export default function Index({ handleRefresh, handleRefreshButton }) {
  const [newButton, setNewButton] = useState(false);

  const dataButtons = [
    { name: 'افزودن گروه', type: '', className: 'btnsBlue' },
  ]


  return (
    <div className={Styles['header']}>
      <div className={Styles['button']} >
        {
          dataButtons.map((data, index) => {
            return (
              <button
                key={index}
                className={data.className}
                onClick={() => setNewButton(true)}
              >
                {data.name}
              </button>
            )
          })
        }
      </div>

      <div className={Styles['icon']}>

        <RefreshIcon
          onClick={handleRefreshButton}
          style={{ cursor: "pointer" }}
        />
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        // className={classes.modal}
        open={newButton}
        onClose={() => setNewButton(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={newButton}>
          <ModalInsert
            setNewButton={setNewButton}
          />
        </Fade>
      </Modal>

    </div>
  )
}
