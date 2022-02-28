import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PropTypes from "prop-types";

import TablesAggregates from './TablesAggregates';
import Tables from './Tables';

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
  valueTab,
  setValueTab,
  sort,
  setSort,
  sort_agg,
  setSort_agg,
  pagination,
  setPagination,
  pagination_agg,
  setPagination_agg,
  stateReducerOrederAggregates,
  stateReducerSummaries,
  stateReducerProfile,
  setMamber_id,
  stateReducerOreder,
  apiSelectOrderAggregates,
  apiOrdersSelect,
  setStateFilterDetalis,
  setStateFilterAggregates,

}) {

  const classes = useStyles();


  const handleChange = (event, newValue) => {
    setStateFilterDetalis({})
    setStateFilterAggregates({})
    setValueTab(newValue);
  };
  return (
    <div className={classes.root}>
      <AppBar position="sticky">
        <Tabs
          value={valueTab}
          onChange={handleChange}
          aria-label="wrapped label tabs"
          className={classes.appBar}
        >
          <LinkTab label="تجمیعی" {...a11yProps(0)} />
          <LinkTab label="عمومی" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={valueTab} index={0}>
        <div >
          <TablesAggregates
            flagFilter={flagFilter}
            sort_agg={sort_agg}
            setSort_agg={setSort_agg}
            setMamber_id={setMamber_id}
            pagination_agg={pagination_agg}
            setPagination_agg={setPagination_agg}
            dataReducer={stateReducerOrederAggregates}
            stateReducerSummaries={stateReducerSummaries}
            stateReducerProfile={stateReducerProfile}
            apiSelectOrderAggregates={apiSelectOrderAggregates}
          />
        </div>
      </TabPanel>
      <TabPanel value={valueTab} index={1}>
        <div >
          <Tables
            flagFilter={flagFilter}
            sort={sort}
            setSort={setSort}
            setMamber_id={setMamber_id}
            pagination={pagination}
            setPagination={setPagination}
            dataReducer={stateReducerOreder}
            stateReducerSummaries={stateReducerSummaries}
            stateReducerProfile={stateReducerProfile}
            apiOrdersSelect={apiOrdersSelect}
          />

        </div>
      </TabPanel>
    </div>
  );
}
