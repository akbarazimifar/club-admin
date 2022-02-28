import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PropTypes from "prop-types";
import Table from "./Tables";
import TablesRequest from "./TablesRequest";



const tableHeadStart = [
  { id: 1, label: "ردیف", title: null, active: false },
  { id: 8, label: "نام", title: null, active: false },
  { id: 8, label: "نام خانوادگی", title: null, active: false },
  { id: 8, label: "کدملی", title: null, active: false },
  { id: 2, label: "امتیاز رزرو شده", title: "member_reserved_bonus", active: false },
  { id: 2, label: "امتیاز در درسترس", title: "member_available_bonus", active: false },
  { id: 8, label: "کد تفصیلی", title: null, active: false },
  { id: 3, label: "مقدار", title: "value", active: false },
  { id: 4, label: "تاریخ ایجاد", title: "create_date", active: false },
  { id: 5, label: "تاریخ اعمال", title: "closing_date", active: false },
  { id: 6, label: "وضعیت", title: "status", active: false },
  { id: 7, label: "نوع", title: "bonus_type", active: false },
  { id: 9, label: "توضیحات کاربر", title: "source_description", active: false },
  { id: 9, label: "توضیحات ادمین", title: "internal_description", active: false },
];

const _tableHeadRequest = [
  { id: 1, label: "ردیف", title: null, active: false },
  // { id: 2, label: "امتیاز رزرو شده", title: "member_reserved_bonus", active: false },
  { id: 8, label: "شناسه کاربر", title: null, active: false },
  { id: 3, label: "مقدار", title: "value", active: false },
  { id: 4, label: "تاریخ ایجاد", title: "create_date", active: false },
  // { id: 5, label: "تاریخ اعمال", title: "closing_date", active: false },
  { id: 6, label: "وضعیت", title: "status", active: false },
  { id: 7, label: "نوع", title: "bonus_type", active: false },
  { id: 9, label: "توضیحات کاربر", title: "source_description", active: false },
];

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "96%",
    borderRadius: 8,
    margin: "15px 0 0 2%",
    display: "inline-block",
  },
  appBar: {
    backgroundColor: "#1E1E2D",
  },
  box: {
    width: "85%",
    margin: "auto",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

export default function Index({
  flagFilter,
  data,
  requestReducer,
  apiSubmitSelect,
  apiSubmitRequest,
  valueTab,
  setValueTab,
  sort,
  setSort,
  pagination,
  setPagination,
}) {
  const classes = useStyles();
  const [tableHead, setTableHead] = React.useState(tableHeadStart);
  const [tableHeadRequest, setTableHeadRequest] = React.useState(_tableHeadRequest);

  const handleChange = (event, newValue) => {
    setValueTab(newValue);
    setPagination(1)
  };

  const findStatus = (key) => {

    let addScore = 'اضافه شده :  توسط اتوماسیون'
    let removeScore = 'کسر شده : توسط اتوماسیون'

    switch (key) {

      case "ADD_SCORE_18":
        return addScore
      case "ADD_SCORE_19":
        return addScore
      case "ADD_DAILY_TURNOVER_SCORE":
        return "اضافه شده : تخفیف پله ای "
      case "ADD_SCORE_7":
        return addScore
      case "ADD_SCORE_28":
        return addScore
      case "ADD_SCORE_1":
        return addScore
      case "REMOVE_SCORE_3":
        return removeScore
      case "ADD_اضافه شده : مجموع تخفیف پله ای ":
        return "اضافه شده : مجموع تخفیف پله ای"
      case "ADD_ADD_BIRTH_DATE_BONUS":
        return "اضافه شده : هدیه تولد "
      case "ADD_SCORE_5":
        return addScore
      case "ADD_INTRODUCER_TURNOVER_SCORE":
        return "اضافه شده : امتیاز معرف بابت گردش افراد معرفی شده"
      case "ADD_SCORE_6":
        return addScore
      case "ADD_ADD_CONTINUOUS_LOGINS":
        return "اضافه شده : لاگین متوالی"
      case "ADD_CONTINUOUS_LOGINS":
        return "اضافه شده : لاگین متوالی"
      case "REMOVE_SCORE_11":
        return removeScore
      case "ADD_SCORE_2":
        return addScore
      case "ADD_SCORE_17":
        return addScore
      case "REMOVE_GIFT_REGISTER":
        return "کسر شده : درخواست جوایز"
      case "REMOVE_SCORE_26":
        return removeScore
      case "ADD_SCORE_20":
        return addScore
      case "ADD_COMPETITION_WINNER":
        return "اضافه شده :  شرکت در مسابقه"
      case "ADD_SCORE_29":
        return addScore
      case "REMOVE_COMPETITION_PARTICIPATION":
        return "کسر شده : شرکت در مسابقه"
      case "ADD_SCORE_24":
        return addScore
      case "ADD_SCORE_26":
        return addScore
      case "ADD_SCORE_10":
        return addScore
      case "ADD_SCORE_11":
        return addScore
      case "REMOVE_COMPETITION_CONFLICTS":
        return "کسر شده : اصلاح جایزه مسابقه"
      case "ADD_اضافه شده : تخفیف پله ای روزانه":
        return " اضافه شده :  تخفیف پله ای روزانه"
      case "ADD_SCORE_25":
        return addScore
      case "ADD_COMPETITION_CONFLICTS":
        return "اضافه شده :  اصلاح جایزه مسابقه"
      case "ADD_BY_ADMIN":
        return "اضافه شده :  توسط ادمین"
      case "ADD_SCORE_13":
        return addScore
      case "ADD_MONTHILY_FUTURE_TURNOVER_SCORE":
        return "اضافه شده :  امتیازات معاملاتی آتی"
      case "ADD_SCORE_27":
        return addScore
      case "REMOVE_BY_ADMIN":
        return "کسر شده : توسط ادمین"
      case "ADD_SCORE_12 ":
        return addScore
      case "ADD_SUM_FUTURE_SCORES":
        return "اضافه شده :  امتیازات معاملاتی آتی"
      case "REMOVE__BY_TMP_WORKER":
        return "کسر شده : اسکریپت"
      case "ADD_SCORE_4":
        return addScore
      case "REMOVE_COURSE_REGISTER":
        return "کسر شده : ثبت نام در دوره آموزشی"
      case "ADD__BY_TMP_WORKER":
        return "اضافه شده : اسکریپت"
      case "ADD_SCORE_16":
        return addScore
      case "ADD_COURSE_UNREGISTER":
        return "اضافه شده :  ثبت نام در دوره آموزشی"
      case "ADD_CLUBMEMBER_REGISTRATION":
        return "اضافه شده :  ثبت نام"
      case "REMOVE_BY_ADMIN_RESERVED":
        return "کسر شده :بلاک توسط ادمین  "
      case "ADD_SCORE_15":
        return addScore
      case "ADD_SCORE_14":
        return addScore
      case "ADD_SCORE_8":
        return addScore
      case "ADD_SCORE_9":
        return addScore

      default:
        if (key) {
          let Status_Key = key.split('_')
          if (Status_Key[0]) {
            if (Status_Key[0] === 'ADD') {
              return `${Status_Key[1] ? Status_Key[1] : ''} اضافه شده :`
            }
            if (Status_Key[0] === 'REMOVE') {
              return `${Status_Key[1] ? Status_Key[1] : ''} کسر شده :`
            }
          }
        }

        return key;

    }
  }


  return (
    <div className={classes.root}>
      <AppBar position="sticky">
        <Tabs
          value={valueTab}
          onChange={handleChange}
          aria-label="wrapped label tabs"
          className={classes.appBar}
        >
          <LinkTab label="امتیازات ثبت شده" href="/" {...a11yProps(1)} />
          <LinkTab label="امتیازات زمان بندی شده" href="/" {...a11yProps(0)} />
        </Tabs>
      </AppBar>
      <TabPanel value={valueTab} index={0}>
        <div style={{ height: flagFilter ? "44vh" : "74vh" }}>
          <Table
            data={data}
            apiSubmitSelect={apiSubmitSelect}
            apiSubmitRequest={apiSubmitRequest}
            sort={sort}
            setSort={setSort}
            tableHead={tableHead}
            setTableHead={setTableHead}
            pagination={pagination}
            setPagination={setPagination}
            findStatus={findStatus}
          />
        </div>
      </TabPanel>

      <TabPanel value={valueTab} index={1}>
        <div style={{ height: flagFilter ? "44vh" : "74vh" }}>
          <TablesRequest
            data={requestReducer}
            apiSubmitSelect={apiSubmitSelect}
            apiSubmitRequest={apiSubmitRequest}
            sort={sort}
            setSort={setSort}
            tableHead={tableHeadRequest}
            setTableHead={setTableHeadRequest}
            pagination={pagination}
            setPagination={setPagination}
            findStatus={findStatus}
          />
        </div>
      </TabPanel>
    </div>
  );
}
