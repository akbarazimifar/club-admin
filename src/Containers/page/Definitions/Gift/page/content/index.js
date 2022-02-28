import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import Card from "./Card";
import Table from "./Tables";
import CardNoData from "./../../../../../Common/method/cardNoData";
import { Pagination } from "@material-ui/lab";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
    borderRadius: 8,
    margin: "15px auto 0 auto",
    display: "inline-block",
    overflow: "auto",
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
    overflow: "auto",
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
      {value === index && (
        <Box>
          <div>{children}</div>
        </Box>
      )}
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

let flag = false;

export default function Index({
  flagFilter,
  callApiGift,
  callApiRegistration,
  setflagTypePage,
  stateReducerGift,
  apiGiftUpdate,
  apiGiftActive,
  apiGiftDeactivate,
  stateReducerRegistration,
  setStateFilterRegistration,
  apiCallFinalize,
  apiCallUnregister,
  checkPhysical,
  apiCallFinalizeSystem,
  apiCallSystemUnregister,
  sort,
  setSort,
  paginationRegistration,
  setPaginationRegistration,
  setpaginationGift,
  paginationGift,
  setValueTab,
  valueTab,
  selectMultiRow,
  setSelectMultiRow,
  handleClickPostalTrackingCode
}) {
  const classes = useStyles();
  const { push } = useHistory()

  const handleChange = (event, newValue) => {
    setValueTab(newValue);

    setSort({})

    if (newValue === 0) setflagTypePage("GIFT");
    if (newValue === 1) {
      setflagTypePage("REQUEST_LIST");
      push({
        state: null
      })
    }
  };

  const handleChangePagination = (event, value) => {
    setpaginationGift(value);
  };

  //////////////////////////sent id gift to regitration//////////////////////////
  const handleOrderInGift = (data) => {
    setValueTab(1)
    setflagTypePage("REQUEST_LIST");

    push({
      pathname: "/Gift",
      state: { gift_id: data }
    })
  }
  /////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (flag) callApiGift(paginationGift);

    flag = true;
  }, [paginationGift]); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div style={{ width: "96%", margin: "auto" }}>
      <AppBar position="sticky">
        <Tabs
          value={valueTab}
          onChange={handleChange}
          aria-label="wrapped label tabs"
          className={classes.appBar}
        >
          <LinkTab label="لیست جوایز" href="/" {...a11yProps(1)} />
          <LinkTab label="لیست درخواست ها" href="/" {...a11yProps(0)} />
        </Tabs>
      </AppBar>

      <TabPanel value={valueTab} index={0}>
        <div
          className={classes.root}
          style={{ height: flagFilter ? "51.5vh" : "74vh" }}
        >
          {stateReducerGift.data.length ? (
            <>
              <div className={classes.box}>
                {stateReducerGift.data.map((item, ind) => (
                  <Card
                    key={ind}
                    data={item}
                    apiGiftUpdate={apiGiftUpdate}
                    apiGiftActive={apiGiftActive}
                    apiGiftDeactivate={apiGiftDeactivate}
                    handleOrderInGift={handleOrderInGift}
                  />
                ))}
              </div>
              <div className={classes.stickyPagination}>
                <Pagination
                  shape="rounded"
                  variant="outlined"
                  count={Math.ceil(
                    stateReducerGift.total / stateReducerGift.size
                  )}
                  page={paginationGift}
                  onChange={handleChangePagination}
                />
              </div>
            </>
          ) : (
            <CardNoData />
          )}
        </div>
      </TabPanel>
      <TabPanel value={valueTab} index={1}>
        <div
          className={classes.root}
          style={{ height: flagFilter ? "42vh" : "75vh" }}
        >
          <Table
            callApiRegistration={callApiRegistration}
            setStateFilterRegistration={setStateFilterRegistration}
            apiCallSystemUnregister={apiCallSystemUnregister}
            apiCallFinalizeSystem={apiCallFinalizeSystem}
            checkPhysical={checkPhysical}
            data={stateReducerRegistration}
            apiCallFinalize={apiCallFinalize}
            apiCallUnregister={apiCallUnregister}
            classname={[classes.stickyPagination]}
            sort={sort}
            setSort={setSort}
            paginationRegistration={paginationRegistration}
            setPaginationRegistration={setPaginationRegistration}
            selectMultiRow={selectMultiRow}
            setSelectMultiRow={setSelectMultiRow}
            handleClickPostalTrackingCode={handleClickPostalTrackingCode}
          />
        </div>
      </TabPanel>
    </div>
  );
}
