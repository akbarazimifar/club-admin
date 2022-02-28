import React, { useState } from "react";
import Tables from "./Tables/Tables";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";

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
      {value === index && <Box>{children}</Box>}
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

const useStyles = makeStyles((theme) => ({
  root: {
    //   flexGrow: 0.8,
    backgroundColor: theme.palette.background.paper,
    marginTop: 0,
    width: "99%",
    borderRadius: 8,
    margin: "auto",
  },
  appBar: {
    backgroundColor: "#1E1E2D",
  },
}));

export default function Index({
  flagFilter,
  setflagTypePage,
  flagTypePage,
  reducerCompetitionsSelect,
  reducerCompetitionsSelectInRange,
  setIdCompetitions,
  apiselectProfile,
  reducerProfile,
  apiselectProfileEmpty,
  apiParticipateInsert,
  idCompetitions,
  apiParticipationsEmpty,
  apiParticipationsSelect,
  reducerParticipations,
  apiParticipateUpdate,
  apiCompetitionDeactivate,
  apiCompetitionActivate,
  setValue,
  value,
  handelRefresh,
  setPageTab1,
  pageTab1,
  sort,
  setSort
}) {
  const classes = useStyles();


  // const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <div className={classes.root} style={{ marginTop: flagFilter ? 15 : 30 }}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="wrapped label tabs example"
            className={classes.appBar}
          >
            <LinkTab label="کلی" href="/drafts" {...a11yProps(0)} />
            <LinkTab label="در حال برگزاری" href="/trash" {...a11yProps(1)} />
          </Tabs>
        </AppBar>

        <TabPanel value={value} index={1}>
          <Tables
            sort={sort}
            setSort={setSort}
            handelRefresh={handelRefresh}
            key={2}
            flagFilter={flagFilter}
            flagTypePage={flagTypePage}
            idCompetitions={idCompetitions}
            setflagTypePage={setflagTypePage}
            data={reducerCompetitionsSelectInRange}
            setIdCompetitions={setIdCompetitions}
            reducerParticipations={reducerParticipations}
            reducerProfile={reducerProfile}
            apiselectProfile={apiselectProfile}
            apiselectProfileEmpty={apiselectProfileEmpty}
            apiParticipateInsert={apiParticipateInsert}
            apiParticipationsEmpty={apiParticipationsEmpty}
            apiParticipationsSelect={apiParticipationsSelect}
            apiParticipateUpdate={apiParticipateUpdate}
            apiCompetitionDeactivate={apiCompetitionDeactivate}
            apiCompetitionActivate={apiCompetitionActivate}
          />
        </TabPanel>

        <TabPanel value={value} index={0}>
          <Tables
            sort={sort}
            setSort={setSort}
            flagPagination={true}
            handelRefresh={handelRefresh}
            setPageTab1={setPageTab1}
            pageTab1={pageTab1}
            key={1}
            flagFilter={flagFilter}
            flagTypePage={flagTypePage}
            idCompetitions={idCompetitions}
            setflagTypePage={setflagTypePage}
            data={reducerCompetitionsSelect}
            setIdCompetitions={setIdCompetitions}
            reducerProfile={reducerProfile}
            reducerParticipations={reducerParticipations}
            apiselectProfileEmpty={apiselectProfileEmpty}
            apiParticipateInsert={apiParticipateInsert}
            apiselectProfile={apiselectProfile}
            apiParticipationsEmpty={apiParticipationsEmpty}
            apiParticipationsSelect={apiParticipationsSelect}
            apiParticipateUpdate={apiParticipateUpdate}
            apiCompetitionDeactivate={apiCompetitionDeactivate}
            apiCompetitionActivate={apiCompetitionActivate}
          />

        </TabPanel>
      </div>
    </div>
  );
}
