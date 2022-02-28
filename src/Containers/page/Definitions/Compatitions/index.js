import React, { useState, useEffect } from "react";
import Header from "./Header";
import FilterCompatitions from "./Page/Compatitions/FilterItems";
import FilterStatistics from "./Page/Statistics/FilterItems";
import { useSelector, useDispatch } from "react-redux";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

import Compatitions from "./Page/Compatitions";
import Statistics from "./Page/Statistics";
import Separation from "./Page/Separation";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

import {
  PARTICIPATIONS_V1_EMPTY,
  PARTICIPATIONS_ById_V1_EMPTY,
  COMPETITIONS_PROFILE_V1_EMPTY,
} from "../../../../boot/api/typeActions";
import { competitions_v1_actions_select } from "../../../../boot/api/Definitions/Compatitions/competitions_v1_select/action";
import { competitions_v1_actions_select_in_range } from "../../../../boot/api/Definitions/Compatitions/competitions_v1_select_in_range/action";
import { performance_v1_actions_select_by_id } from "../../../../boot/api/Definitions/Compatitions/performance_v1_select_by_id/action";
import { participations_v1_actions_select } from "../../../../boot/api/Definitions/Compatitions/participations_v1_select/action";
import { competitions_profile_v1_action_select } from "../../../../boot/api/Definitions/Compatitions/person_v1_select/action";
import { participate_v1_actions_insert } from "../../../../boot/api/Definitions/Compatitions/participate_v1_insert/action";
import { participate_v1_actions_update } from "../../../../boot/api/Definitions/Compatitions/participation_v1_update/action";
import { competition_v1_actions_deactivate } from "../../../../boot/api/Definitions/Compatitions/competitions_v1_deactive/action";
import { competition_v1_actions_activate } from "../../../../boot/api/Definitions/Compatitions/compatition_v1_active/action";

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
    width: "100%",
    borderRadius: 8,
    margin: "auto",
  },
  appBar: {
    backgroundColor: "#1E1E2D",
  },
}));

let flag = false;

export default function Index() {
  const [FilterCompatition, setFilterCompatitions] = useState(false);
  const [FilterStatistic, setFilterStatistics] = useState(false);
  const [stateFilterCompatitions, setStateFilterCompatitions] = useState({
    start_date: "",
    is_active: "",
  });
  const [stateFilterStatistic, setStateFilterStatistic] = useState({
    member_national_id: "",
    choice_number: "",
  });

  const [flagTypePage, setflagTypePage] = useState("compatitions");
  const [idCompetitions, setIdCompetitions] = useState(null);
  const [value, setValue] = React.useState(0);
  const [value1, setValue1] = React.useState(0);
  const [pageTab1, setPageTab1] = useState(1);
  const [pageTab2, setPageTab2] = useState(1);
  const [sort, setSort] = useState({});
  const [dataSepration, setdataSepration] = useState(null);

  const classes = useStyles();

  const openFilter = () => {
    if (flagTypePage === "compatitions")
      setFilterCompatitions(!FilterCompatition);

    if (flagTypePage === "statistics") setFilterStatistics(!FilterStatistic);
  };

  //////////////////////////////////// compatitions select //////////////////////////////////////

  const dispatch = useDispatch();
  const reducerCompetitionsSelect = useSelector(
    (state) => state.competitions_v1_select_Reducer
  );
  const size = reducerCompetitionsSelect.size;

  useEffect(() => {
    apiCompetitionsSelect({});
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  const apiCompetitionsSelect = (data, fleg_Refresh) => {
    const { id, ...sortRes } = sort;

    if (fleg_Refresh) {
      // dispatch(competitions_v1_actions_select(size, 1, {}, {}));
      setPageTab1(1);
      setSort({});
    }
    dispatch(competitions_v1_actions_select(size, pageTab1, data, sortRes));
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////// compatitions select in range  //////////////////////////////////////
  const reducerCompetitionsSelectInRange = useSelector(
    (state) => state.competitions_v1_select_in_range_Reducer
  );

  useEffect(() => {
    apiCompetitionsSelectInRange({});
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  const apiCompetitionsSelectInRange = (data) => {
    dispatch(competitions_v1_actions_select_in_range(data));
  };
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////// statistics select   //////////////////////////////////////
  const reducerParticipations = useSelector(
    (state) => state.participations_v1_select_Reducer
  );

  const size2 = reducerParticipations.size;

  const apiParticipationsSelect = (data,flagSaveData) => {
    if(flagSaveData){
      setdataSepration(data)
    }
    dispatch(participations_v1_actions_select(size2, pageTab2, data));
  };

  const apiParticipationsEmpty = () => {
    dispatch({ type: PARTICIPATIONS_V1_EMPTY });
  };
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////// Separation select   //////////////////////////////////////
  const reducerPerformanceById = useSelector(
    (state) => state.performance_v1_select_by_id_Reducer
  );

  const apisperformanceSelectById = (data) => {
    dispatch(performance_v1_actions_select_by_id(data));
  };

  const apiParticipationsByIdEmpty = () => {
    dispatch({ type: PARTICIPATIONS_ById_V1_EMPTY });
  };
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////// participate insert   //////////////////////////////////////
  const reducerProfile = useSelector(
    (state) => state.competitions_profile_v1_reducer
  );

  const apiselectProfile = (national_id) => {
    dispatch(competitions_profile_v1_action_select(national_id));
  };

  const apiselectProfileEmpty = () => {
    dispatch({ type: COMPETITIONS_PROFILE_V1_EMPTY });
  };

  const apiParticipateInsert = (data) => {
    dispatch(participate_v1_actions_insert(data));
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////// participate update   /////////////////////////////////////////////

  const apiParticipateUpdate = (data) => {
    dispatch(participate_v1_actions_update(data));
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////// competition deactivate   /////////////////////////////////////////////

  const apiCompetitionDeactivate = (data) => {
    dispatch(competition_v1_actions_deactivate(data));
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////// competition activate   /////////////////////////////////////////////

  const apiCompetitionActivate = (data) => {
    dispatch(competition_v1_actions_activate(data));
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleChange = (event, newValue) => {
    setValue1(newValue);
  };

  const handleExit = () => {
    setflagTypePage("compatitions");
    setValue1(0);
  };

  const handelRefresh = (type) => {
    switch (type) {
      case "compatitions":
        apiCompetitionsSelect({}, true);
        apiCompetitionsSelectInRange({});
        break;
      case "statistics":
        apiParticipationsSelect({
          competition_id: idCompetitions,
        });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    apiCompetitionsSelect();
  }, [pageTab1]);

  useEffect(() => {
    let obj = null;
    if (idCompetitions) {
      if (value1 === 0) {
        obj = {
          competition_id: idCompetitions,
        };
      } else {
        obj = {
          ...dataSepration
        }
      }
      apiParticipationsSelect(obj);
    }
  }, [pageTab2]);


  useEffect(() => {
    setPageTab2(1)
    if(dataSepration?.choice_number){
      setPageTab2(1)
    }
  }, [value1,dataSepration?.choice_number]);

  useEffect(() => {
    if (flag) {
      apiCompetitionsSelect();
    }
    flag = true;
  }, [sort]);

  return (
    <div>
      <Header
        handelRefresh={handelRefresh}
        value={value}
        handelShowFilterItems={() => openFilter()}
        flagTypePage={flagTypePage}
        setflagTypePage={setflagTypePage}
        apiCompetitionsSelect={apiCompetitionsSelect}
        apiCompetitionsSelectInRange={apiCompetitionsSelectInRange}
        apiParticipationsSelect={apiParticipationsSelect}
        idCompetitions={idCompetitions}
        stateFilterStatistic={stateFilterStatistic}
        stateFilterCompatitions={stateFilterCompatitions}
        reducerParticipations={reducerParticipations}
        // FilterStatistic={FilterStatistic}
        // FilterCompatition={FilterCompatition}
      />

      {flagTypePage === "compatitions" && (
        <>
          <FilterCompatitions
            flagFilter={FilterCompatition}
            apiCompetitionsSelect={apiCompetitionsSelect}
            apiCompetitionsSelectInRange={apiCompetitionsSelectInRange}
            setStateFilterCompatitions={setStateFilterCompatitions}
            stateFilterCompatitions={stateFilterCompatitions}
          />
          <Compatitions
            sort={sort}
            setSort={setSort}
            setPageTab1={setPageTab1}
            pageTab1={pageTab1}
            handelRefresh={handelRefresh}
            setValue={setValue}
            value={value}
            idCompetitions={idCompetitions}
            flagFilter={FilterCompatition}
            setflagTypePage={setflagTypePage}
            flagTypePage={flagTypePage}
            setIdCompetitions={setIdCompetitions}
            reducerCompetitionsSelect={reducerCompetitionsSelect}
            reducerCompetitionsSelectInRange={reducerCompetitionsSelectInRange}
            apiselectProfile={apiselectProfile}
            reducerProfile={reducerProfile}
            apiselectProfileEmpty={apiselectProfileEmpty}
            apiParticipateInsert={apiParticipateInsert}
            apiParticipationsEmpty={apiParticipationsEmpty}
            apiParticipationsSelect={apiParticipationsSelect}
            reducerParticipations={reducerParticipations}
            apiParticipateUpdate={apiParticipateUpdate}
            apiCompetitionDeactivate={apiCompetitionDeactivate}
            apiCompetitionActivate={apiCompetitionActivate}
          />
        </>
      )}

      {flagTypePage !== "compatitions" && (
        <>
          <AppBar position="static">
            <Tabs
              value={value1}
              onChange={handleChange}
              aria-label="wrapped label tabs example"
              className={classes.appBar}
            >
              <LinkTab
                label="اطلاعات کلی"
                {...a11yProps(0)}
                onClick={() => setflagTypePage("statistics")}
              />

              {reducerParticipations.data.length && (
                <LinkTab
                  label="اطلاعات تفکیکی"
                  {...a11yProps(1)}
                  onClick={() => setflagTypePage("Separation")}
                />
              )}

              <span
                style={{
                  color: "white",
                  position: "absolute",
                  left: 20,
                  display: "flex",
                  marginTop: 13,
                  cursor: "pointer",
                }}
                onClick={handleExit}
              >
                <span style={{ fontSize: 10, marginTop: 2, color: "#DDDDDD" }}>
                  لیست مسابقات
                </span>
                <ArrowBackIosIcon
                  style={{
                    marginRight: "-5px",
                    marginBottom: "20px",
                    fontSize: 18,
                    color: "#DDDDDD",
                  }}
                />
              </span>
            </Tabs>
          </AppBar>

          <TabPanel value={value1} index={0}>
            {flagTypePage === "statistics" && (
              <>
                <FilterStatistics
                  flagFilter={FilterStatistic}
                  apiParticipationsSelect={apiParticipationsSelect}
                  idCompetitions={idCompetitions}
                  setStateFilterStatistic={setStateFilterStatistic}
                  stateFilterStatistic={stateFilterStatistic}
                />
                <Statistics
                  setPageTab2={setPageTab2}
                  pageTab2={pageTab2}
                  flagFilter={FilterStatistic}
                  idCompetitions={idCompetitions}
                  apiParticipationsEmpty={apiParticipationsEmpty}
                  apiParticipationsSelect={apiParticipationsSelect}
                  reducerParticipations={reducerParticipations}
                />
              </>
            )}
          </TabPanel>

          <TabPanel value={value1} index={1}>
            {flagTypePage === "Separation" && (
              <>
                <Separation
                  setPageTab2={setPageTab2}
                  pageTab2={pageTab2}
                  idCompetitions={idCompetitions}
                  reducerPerformanceById={reducerPerformanceById}
                  apisperformanceSelectById={apisperformanceSelectById}
                  apiParticipationsByIdEmpty={apiParticipationsByIdEmpty}
                  apiParticipationsSelect={apiParticipationsSelect}
                  apiParticipationsEmpty={apiParticipationsEmpty}
                  reducerParticipations={reducerParticipations}
                />
              </>
            )}
          </TabPanel>
        </>
      )}
    </div>
  );
}
