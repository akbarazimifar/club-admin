import React from 'react'
import Styles from './index.module.scss';
import RefreshIcon from '@material-ui/icons/Refresh';
import FilterListIcon from '@material-ui/icons/FilterList';
// import List from '@material-ui/icons/List';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';




export default function Index({ handleRefresh, setFlagFilter, handel_router_back }) {


  return (
    <div className={Styles['header']}>
      <div></div>
      <div className={Styles['icon']}>
        <ArrowBackIcon
          onClick={() => handel_router_back()}
        />

        <FilterListIcon
          onClick={() =>
            // alert("در این ورژن در دسترس نیست")
            setFlagFilter(prev => !prev)
          }
          // color="disabled"
        />

        <RefreshIcon
          onClick={() => handleRefresh(true)}
          style={{ cursor: "pointer" }}
        />
      </div>

    </div>
  )
}
