import React from 'react'
import Styles from './index.module.scss';
import RefreshIcon from '@material-ui/icons/Refresh';
import FilterListIcon from '@material-ui/icons/FilterList';


export default function Index({ handelShowFilterItems, handleRefresh }) {

  return (
    <div className={Styles['header']}>
      <div className={Styles['button']} >
      </div>
      <div className={Styles['icon']}>
        <FilterListIcon onClick={() => { handelShowFilterItems() }} />
        <RefreshIcon
          onClick={handleRefresh}
          style={{ cursor: "pointer" }}
        />
      </div>

    </div>
  )
}
