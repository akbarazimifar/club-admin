import React from "react";
import { sepratePriceFromComma} from "../../../../../Common/method/seprateNumberFromComma";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  content: {
    width: "96%",
    minHeight: "50px",
    margin: "15px auto",
    display: "flex",
    marginTop: 10,
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "space-between",
  },
  ul: {
    padding: "10px 30px",
    width: "60%",
    listStyleType: "none",
    display: "flex",
    justifyContent: "space-center",
    margin: 0,
  },
  fieldset: {
    border: "0 !important",
    width: "100%",
    height: "45px",
    borderRadius: "5px",
    "& legend": {
      color: "grey",
      fontSize: "12px",
    },
  },

  li: {
    margin: "0 10px",
  },
  text: {
    whiteSpace: "nowrap",
    paddingTop: "3px",
  },
  allRec: {
    border: "0 !important",
    width: "120px",
    height: "45px",
    borderRadius: "5px",
    marginRight: "15px",
    "& legend": {
      color: "grey",
      fontSize: "11px",
    },
  },
  h4: {
    textAlign: "center",
    marginLeft: "12px",
    fontSize: "17px",
  },
  allRecParent: {
    padding: "10px 30px",
  },
}));

const Content = ({ valContent, data}) => {
  const styles = useStyles();

  const dataFild = [
    {
      name: "نام عرضه",
      value: `${valContent.body.stock_name}`,
    },
    {
      name: "حداکثر تعداد",
      value: `${valContent.body.max_quantity}`,
    },
    {
      name: "دامنه قیمت",
      value: `${sepratePriceFromComma(valContent.body.min_price)} تا ${sepratePriceFromComma(
        valContent.body.max_price
      )}`,
    },
  ];

  // const dataRec = [
  //   {
  //     name: "درخواست های تایید شده",
  //     value: `${valContent.body.stock_name}`,
  //   },
  //   {
  //     name: "درخواست های رد شده",
  //     value: `${valContent.body.stock_name}`,
  //   },
  //   {
  //     name: "درخواست های در دست بررسی",
  //     value: `${valContent.body.min_price} تا ${valContent.body.max_price}`,
  //   },
  // ];
  // "تعداد در خواست های تایید شده", "تعداد درخواست های رد شده", "تعداددرخواست های در دست برررسی",

  return (
    <>
      <div className={styles.content}>
        <ul className={styles.ul}>
          {dataFild.map((textFild, index) => (
            <li className={styles.li} key={index}>
              <fieldset className={styles.fieldset}>
                <legend>{textFild.name}:</legend>
                <div className={styles.h4}>{textFild.value}</div>
              </fieldset>
            </li>
          ))}
        </ul>

        <div className={styles.allRecParent}>
          <fieldset className={styles.allRec}>
            <legend>کل درخواست ها :</legend>
            <div className={styles.h4}>{data[0]?.total_count}</div>
          </fieldset>
        </div>
      </div>
    </>
  );
};

export default Content;

// "نام عرضه", "حداکثر تعداد", "دامنه قیمت",
