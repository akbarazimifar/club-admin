import React, { useEffect, useState } from "react";
import Filter from "./Filter";
import Table from "./table";
import Header from "./header";
import { useDispatch, useSelector } from "react-redux";
import { payments_v1_select_actions } from "../../../../boot/api/payments/payments_v1_select/action";

let initState = {
  member_id: "",
  issuer_id: "",
  expiration_date: "",
  code: "",
  category: "",
};

let flag = false


const UsersList = () => {

  const dispatch = useDispatch();

  const [flagFilter, setFlagFilter] = useState(false);
  const [stateFilter, setStateFilter] = useState(initState);
  const [flagApi, setflagApi] = useState(false)
  const [pageTab1, setPageTab1] = useState(1);
  const [sort, setSort] = useState({})

  const data = useSelector((state) => state.payments_v1_select_reducer);

  useEffect(() => {
    apiSelectPayments(pageTab1)
  }, [flagApi])


  // useEffect(() => {
  //   if (flag)
  //     apiSelectPayments(pageTab1)
  //   flag = true
  // }, [pageTab1, sort])//eslint-disable-line react-hooks/exhaustive-deps


  //functions
  const handleRefresh = () => {
    setPageTab1(1)
    setStateFilter(initState);
    setFlagFilter(false)
    setSort({})
    setflagApi(prev => !prev)
  };

  const apiSelectPayments = (from, _obj) => {

    let obj = _obj ? _obj : {};
    let size = data.size;
    let { id, ...sortRes } = sort;

    if (!_obj)
      Object.keys(stateFilter).forEach((element) => {
        if (stateFilter[element]) {
          obj[element] = stateFilter[element];
        }
      });


    dispatch(payments_v1_select_actions(sortRes, size, pageTab1, obj));

  };

  const handleChangeFilter = (data, type) => {
    setStateFilter((prev) => ({
      ...prev,
      [type]: data,
    }));

  };

  const handelSubmitFilter = () => {
    // apiSelectPayments();
    setPageTab1(1)
    setflagApi(prev => !prev)
  };

  const handleNull = (key) => {
    if (key === null || key === "" || key === "null") {
      return "_";
    } else {
      return key;
    }
  };

  const handelReturned_from_bank = (key , flag)=>{
    switch (key) {
      case 'TRUE':
        return 'دارد';
      case 'FALSE':
        if(flag){
          return 'ندارد'
        }
        return <p style={{color:'red'}}>ندارد</p>;
      default:
        return '-';
    }
  }

  const handelIs_verified = (key , flag)=>{
    switch (key) {
      case 'TRUE':
        return 'تایید شده';
      case 'FALSE':
        if(flag){
          return 'تایید نشده'
        }
        return <p style={{color:'red'}}>تایید نشده</p>;
      default:
        return '-';
    }
  }

  const handelTerminal_id = (key)=>{
    switch (key) {
      case 1:
        return 'به پرداخت بانک ملت ';
      case 2:
        return 'ایران کیش';
      case 3:
        return 'بانک سامان';
      default:
        return '-';
    }
  }

  return (
    <>
      <Header
        handleRefresh={handleRefresh}
        setFlagFilter={setFlagFilter}
        stateFilter={stateFilter}
        handelReturned_from_bank={handelReturned_from_bank}
        handelIs_verified={handelIs_verified}
        handleNull={handleNull}
        handelTerminal_id={handelTerminal_id}
      />
      <Filter
        flagFilter={flagFilter}
        stateFilter={stateFilter}
        handleChangeFilter={handleChangeFilter}
        handelSubmitFilter={handelSubmitFilter}
      />

      {
        <Table
          flagFilter={flagFilter}
          data={data}
          apiSelectPayments={apiSelectPayments}
          handleNull={handleNull}
          pageTab1={pageTab1}
          setPageTab1={setPageTab1}
          sort={sort}
          setSort={setSort}
          loading = {data.loading}
          handelReturned_from_bank={handelReturned_from_bank}
          handelIs_verified={handelIs_verified}
          handelTerminal_id={handelTerminal_id}
          setflagApi={setflagApi 
          }
        />
      }

    
    </>
  );
};

export default UsersList;
