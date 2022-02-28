import React, { useState } from 'react'
import Styles from './index.module.scss';
import RefreshIcon from '@material-ui/icons/Refresh';
import FilterListIcon from '@material-ui/icons/FilterList';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import NewButton from "./NewButton";
import GroupAwards from "./GroupAwards"



const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function Index({handelShowFilterItems}) {
  
  const [newButton, setNewButton] = useState(false);
  const [groupAwards, setGroupAwards] = useState(false);

  const classes = useStyles();


  const dataButtons = [
    { name: 'جدید', type: 'NEW', className: 'btnsBlue' },
    { name: 'ویرایش', type: '', className: 'btnsYellow' },
    { name: 'حذف', type: '', className: 'btnsRed' },
    { name: 'ضمائم', type: '', className: 'btnsBlack'},
  ]

  const handleClickButton = (data) => {
    if (data === "NEW") {
      setNewButton(prev => !prev)
    }

    if (data === "GROUP_AWARDS") {
      setGroupAwards(prev => !prev)
    }

    return
  }

  return (
    <div className={Styles['header']}>
      <div className={Styles['button']} >
        {
          dataButtons.map((data, index) => {
            return (
              <button
                key={index}
                className={data.className}
                onClick={() => handleClickButton(data.type)}
              >
                {data.name}
              </button>
            )
          })
        }
      </div>

      <div>
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
            <NewButton handleCloseModal={() => handleClickButton("NEW")} />
          </Fade>
        </Modal>
      </div>

      <div className={Styles['icon']}>
        <button onClick={() => handleClickButton("GROUP_AWARDS")}> گروه های جوایز</button>

        <div>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={groupAwards}
            onClose={() => handleClickButton("GROUP_AWARDS")}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={groupAwards}>
              <GroupAwards />
            </Fade>
          </Modal>
        </div>

        <FilterListIcon onClick={()=> handelShowFilterItems()} />
        <RefreshIcon />
      </div>

    </div>
  )
}
