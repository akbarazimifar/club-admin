import React from 'react'
import Styles from './index.module.scss';
import RefreshIcon from '@material-ui/icons/Refresh';



export default function Index({ handleRefresh }) {
  const dataButtons = [
    // { name: '', type: '', className: 'btnsBlue' },
  ]

  return (
    <div className={Styles['header']}>
      <div className={Styles['button']} >
        {
          dataButtons.map((data, index) => {
            return (
              <button
                key={index}
                className={data.className}>
                {data.name}
              </button>
            )
          })
        }
      </div>


      <div className={Styles['icon']}>
        <RefreshIcon
          onClick={handleRefresh}
          style={{ cursor: "pointer" }}
        />
      </div>

    </div>
  )
}
