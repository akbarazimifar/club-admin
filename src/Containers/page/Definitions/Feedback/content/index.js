import React, { useEffect } from "react";
import style from "./index.module.scss";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Accordion from "./Accordion";
import { useState } from "react";
import { Pagination } from "@material-ui/lab";
import CardNoData from "../../../../Common/method/cardNoData";
import { ArrowDownwardOutlined, ArrowUpwardOutlined } from "@material-ui/icons";

//SUBMITTED پاسخ داده نشده
//ANSWERED پاسخ داده شده
const SUBMITTED = "SUBMITTED";
const ANSWERED = "ANSWERED";

let i = 0;

const useStyles = makeStyles((theme) => ({
  tabs: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    backgroundColor: theme.mainColor,
  },
  stickyPagination: {
    textAlign: "center",
    fontWeight: "bold",
    margin: "0px auto",
    position: "sticky",
    bottom: 0,
    /* left: 0; */
    backgroundColor: "whitesmoke",
    padding: "5px 0",
    display: "flex",
    justifyContent: "center",
    direction: "ltr",
  },
  sortParent: {
    fontSize: 11,
    marginBottom: 5,
    display: "flex",
    justifyContent: "end",
    position: "sticky",
    top: 52,
    color: "blue",
    zIndex: 1000,
  },
}));

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Index({
  flagFilter,
  state,
  SubmitReponse,
  value,
  setValue,
  dataReducer,
  setPageTab1,
  pageTab1,
  setdirection,
  direction,
}) {
  const classes = useStyles();
  //   const [value, setValue] = React.useState(0);
  const [submitted, setSubmitted] = useState([]);
  const [answered, setAnswered] = useState([]);

  useEffect(() => {
    let resSubmitted = state.filter((item) => item.body.status === SUBMITTED);
    setSubmitted(resSubmitted);

    let resAnswered = state.filter((item) => item.body.status === ANSWERED);
    setAnswered(resAnswered);
  }, [state]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setdirection(null);
  };

  const handleChangePagination = (event, value) => {
    setPageTab1(value);
  };

  const ArrowDirection = () => {
    if (!direction) {
      return null;
    }
    if (direction === "asc") {
      return <ArrowUpwardOutlined style={{ fontSize: 15 }} />;
    }
    if (direction === "desc") {
      return <ArrowDownwardOutlined style={{ fontSize: 15 }} />;
    }
  };

  const handleSortClick = () => {
    if (!direction) {
      setdirection("asc");
    }
    if (direction === "asc") {
      setdirection("desc");
    }
    if (direction === "desc") {
      setdirection(null);
    }
  };

  return (
    <div className={style.box} style={{ height: flagFilter ? "59vh" : "80vh" }}>
      <div className={classes.tab}>
        <AppBar position="sticky" className={classes.appBar}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="پاسخ داده نشده" {...a11yProps(0)} />
            <Tab label="پاسخ داده شده" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <div className={classes.sortParent}>
            <span style={{ display: "flex", alignItems: "center" }}>
              <p
                onClick={handleSortClick}
                style={{ cursor: "pointer", margin: 0 }}
              >
                مرتب سازی براساس تاریخ
              </p>
              <ArrowDirection />
            </span>
          </div>
          {dataReducer.data.map((item, ind) => (
            <>
              <Accordion
                type={SUBMITTED}
                key={ind}
                data={item}
                index={ind}
                SubmitReponse={SubmitReponse}
                i={++i}
              />
            </>
          ))}
          {dataReducer.data.length !== 0 ? (
            <div className={classes.stickyPagination}>
              <Pagination
                shape="rounded"
                variant="outlined"
                count={Math.ceil(dataReducer.total / dataReducer.size)}
                page={pageTab1}
                onChange={handleChangePagination}
              />
            </div>
          ) : (
            <CardNoData />
          )}
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div className={classes.sortParent}>
            <span style={{ display: "flex", alignItems: "center" }}>
              <p
                onClick={handleSortClick}
                style={{ cursor: "pointer", margin: 0 }}
              >
                مرتب سازی براساس تاریخ
              </p>
              <ArrowDirection />
            </span>
          </div>
          {dataReducer.data2.map((item, ind) => (
            <Accordion
              type={ANSWERED}
              key={ind}
              data={item}
              index={ind}
              SubmitReponse={SubmitReponse}
              i={++i}
            />
          ))}
          {dataReducer.data2.length !== 0 ? (
            <div className={classes.stickyPagination}>
              <Pagination
                shape="rounded"
                variant="outlined"
                count={Math.ceil(dataReducer.total / dataReducer.size)}
                page={pageTab1}
                onChange={handleChangePagination}
              />
            </div>
          ) : (
            <CardNoData />
          )}
        </TabPanel>
      </div>
    </div>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
