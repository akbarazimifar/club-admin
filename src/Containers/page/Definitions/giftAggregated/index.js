import React, { useState, useEffect } from 'react'
import ModuleSearchDate from './ModuleSearchDate';
import GiftAggregated from './page';
import { useDispatch, useSelector } from "react-redux";
import { giftAggregated_v1_select_actions } from "../../../../boot/api/Definitions/gift/giftAggregated_v1_select/action";
import { dateConverttShamsiToMiladi } from '../../../Common/method/date';


export default function Index() {

  const dispatch = useDispatch();

  let initState = {
    start_time: "",
    end_time: "",
  };

  const [flagFilter, setFlagFilter] = useState(false);
  const [state, setState] = useState(initState);
  const [pageTab1, setPageTab1] = useState(1);
  const [sort, setSort] = useState({});


  const reducerGift = useSelector((state) => state.giftAggregated_v1_select_reducer);

  let { id, ...sortRes } = sort;
  let size = reducerGift.size;

  const apiSelectGiftAggregated = () => {
    let obj = {};

    Object.keys(state).forEach((element) => {
      if (state[element]) {
        obj[element] = state[element];
      }
    });
    if (Object.keys(obj).length !== 2) {
      dispatch({ type: "ALERT", payload: { status: true, textAlert: "لطفا تمام مقادیر را وارد نمایید", typeAlert: "info" } })
      return
    }   

    let data = {
      start_time:`${obj.start_time} 00:00:00.000000`,
      end_time: `${obj.end_time} 23:59:59.000000`,
    }
    
    dispatch(giftAggregated_v1_select_actions(sortRes, size, pageTab1, data));
  };

  return (
    <div>
      {
        typeof reducerGift.data === 'string' && (
          <ModuleSearchDate
            state={state}
            setState={setState}
            reducerGift={reducerGift}
            apiSelectGiftAggregated={apiSelectGiftAggregated}
          />
        )
      }

      {
        typeof reducerGift.data !== 'string' && (
          <GiftAggregated
            flagFilter={flagFilter}
            setFlagFilter={setFlagFilter}
            state={state}
            setState={setState}
            pageTab1={pageTab1}
            setPageTab1={setPageTab1}
            sort={sort}
            setSort={setSort}
            initState={initState}
            apiSelectGiftAggregated={apiSelectGiftAggregated}
          />
        )
      }


    </div>
  )
}
