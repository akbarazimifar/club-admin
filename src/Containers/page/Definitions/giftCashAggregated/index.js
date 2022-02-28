import React, { useState } from 'react'
import ModuleSearchDate from './ModuleSearchDate';
import GiftAggregated from './page';
import { useDispatch, useSelector } from "react-redux";
import { giftCashAggregated_v1_select_actions } from "../../../../boot/api/Definitions/gift/giftCashAggregated_v1_select/action";



export default function Index() {

  const dispatch = useDispatch();

  let initState = {
    from_date: "",
    to_date: "",
  };


  const [flagFilter, setFlagFilter] = useState(false);
  const [state, setState] = useState(initState);
  const [pageTab1, setPageTab1] = useState(1);
  const [sort, setSort] = useState({});


  const reducerGift = useSelector((state) => state.giftCashAggregated_v1_select_reducer);

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
      from_date:`${obj.from_date} 00:00:00.000000`,
      to_date: `${obj.to_date} 23:59:59.000000`,
    }
    
    dispatch(giftCashAggregated_v1_select_actions(sortRes, size, pageTab1, data));
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
