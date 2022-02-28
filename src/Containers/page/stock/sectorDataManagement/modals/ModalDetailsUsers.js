import { makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import CardNoData from "./../../../../Common/method/cardNoData";
import {dateMiladiToShamsi} from "./../../../../Common/method/date";

const useStyles = makeStyles(() => ({
  modalDetail: {
    width: 930,
    borderRadius: 8,
    padding: 50,
    backgroundColor: "whitesmoke",
    maxHeight: "70vh",
    minWidth: 600,
    overflow: "auto",
    display: "flex",
    flexWrap: "wrap",
  },
  content: {
    border: "1px dashed darkgray",
    padding: 15,
  },
  item: {
    width: "40%",
    padding : "3%"
  },
  field: {
    display: "flex"
  },
  lable: {
    direction: "rtl" ,
    color : "gray"
  }
}));

const handleNull = (key) => {
  if (key === null || key === "" || key === "null") {
    return "_";
  } else {
    return key;
  }
};


export default function ModalDetailsUsers({ data }) {
  const classes = useStyles();
  const [state, setstate] = useState(initState)

  useEffect(() => {
    if (data) {
      let obj = {}
      Object.keys(data.body).map(item => {
        if(item === "datetime"){
          let val = dateMiladiToShamsi(data.body[item].split(" ")[0])
          obj[item] = { label: val, value: state[item].value }
          return
        }
        let value = handleNull(data.body[item])
        obj[item] = { label: value, value: state[item].value }
      })
      setstate(obj)
    }
  }, [data])


  if (!data?.body) {
    return (
      <div className={classes["modalDetail"]}>
        <CardNoData />
      </div>
    );
  }

  return (
    <div className={classes.modalDetail}>
      {
        Object.keys(state).map((item, ind) => (
          <div key={ind} className={classes.item}>
            <p className={classes.field}>
              <span>{state[item].value}:</span>
              {'\u00A0'}
              <span className={`${classes.lable}`}>
                {
                  // typeof (state[item].label) === "number" ? parseFloat(state[item].label.toFixed(2)).toLocaleString('en-US') : state[item].label
                  state[item].label
                }
              </span>
            </p>
          </div>
        ))
      }
    </div>
  );
}



let initState = {
  "ins_code": { label: "", value: "شناسه Tse", type: "text" },
  "datetime": { label: "", value: "تاریخ", type: "text" },
  "5_char_latin_symbol": { label: "", value: "5کاراکتر لاتین نماد", type: "text" },
  "18_char_latin_symbol": { label: "", value: "18کاراکتر لاتین نماد", type: "text" },
  "5_char_latin_company_name": { label: "", value: "5کاراکتر لاتین نام شرکت", type: "text" },
  "30_char_persian_company_name": { label: "", value: "نام ۳۰ رقمی فارسی شرکت", type: "text" },
  "18_char_persian_symbol": { label: "", value: "نام مخفف نماد", type: "text" },
  "30_char_persian_symbol": { label: "", value: "نام کامل شرکت", type: "text" },
  "company_isin": { label: "", value: " شناسه شرکت", type: "text" },
  "nominal_price": { label: "", value: "قیمت اسمی", type: "number" },
  "total_company_quantity": { label: "", value: "تعداد سهام", type: "number" },
  "symbol_change_date": { label: "", value: "تاریخ تغییر نماد", type: "number" },
  "today_change_type": { label: "", value: "نوع تغییر امروز نماد", type: "text" },
  "symbol_category_aio": { label: "", value: "نوع نماد یکی از مقادیر aio", type: "text" },
  "symbol_group_code": { label: "", value: "کد گروه نماد", type: "text" },
  "symbol_first_trading_date": { label: "", value: "تاریخ اولین روز معاملاتی نماد", type: "number" },
  "price_scale": { label: "", value: "مقیاس قیمت", type: "number" },
  "market_category": { label: "", value: "دسته بندی بازار", type: "text" },
  "board_code": { label: "", value: "کد تابلو ", type: "number" },
  "sector_code": { label: "", value: "کد صنعت", type: "text" },
  "sub_sector_code": { label: "", value: "کد زیرگروه", type: "text" },
  "settlement_delay": { label: "", value: " تاخیر تسویه حساب", type: "number" },
  "max_permitted_price": { label: "", value: "حداکثر قیمت مجاز", type: "number" },
  "min_permitted_price": { label: "", value: "حداقل قیمت مجاز", type: "number" },
  "base_volume": { label: "", value: "حجم مبنا", type: "number" },
  "symbol_type": { label: "", value: "نوع نماد", type: "number" },
  "tick": { label: "", value: "تیک", type: "number" },
  "min_count": { label: "", value: "حدااقل تعداد", type: "number" },
  "flow": { label: "", value: "بازار", type: "number" },
  "max_permitted_volume": { label: "", value: "حداکثر حجم مجاز", type: "number" },
  "min_permitted_volume": { label: "", value: "حداقل حجم مجاز", type: "number" },
  "isin": { label: "", value: "شناسه نماد", type: "text" },
  "max_daily_index": { label: "", value: "بیشترین مقدار شاخص در طول روز", type: "number" },
  "last_daily_index_value": { label: "", value: "آخرین ارزش شاخص روزانه", type: "number" },
  "min_daily_index_value": { label: "", value: "کمترین ارزش شاخص روزانه", type: "number" },
  "index_value": { label: "", value: "مقدار شاخص بازده نقدي", type: "number" },
  "change_daily_index_value": { label: "", value: "تغییرات روزانه ارزش شاخص", type: "number" },
  "board": { label: "", value: "تابلو", type: "text" }
}
