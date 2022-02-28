import React from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";


import FilterAggregates from './filterAggregates';
import FilterDetalis from './filterDetalis';

const useStyles = makeStyles((theme) => ({
  filter: {
    width: "96.5%",
    height: "auto",
    backgroundColor: "white",
    margin: "auto",
    marginTop: "-5px",
    border: "1px solid rgba(0, 0, 0, 0.2)",
    borderRadius: "5px",
  },
  buttons: {
    textAlign: "right",
    marginTop: 25,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  grid: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: 'wrap'
  },
}));

// handelchangeStateFilterDetalis={handelchangeStateFilterDetalis}
// handelchangeStateFilterAggregates={handelchangeStateFilterAggregates}
// stateFilterDetalis={stateFilterDetalis}
// stateFilterAggregates={stateFilterAggregates}

export default function Index({
  valueTab,
  flagFilter,
  stateFilterDetalis,
  stateFilterAggregates,
  handelchangeStateFilterAggregates,
  handelchangeStateFilterDetalis,
  apiOrdersSelect,
  apiSelectOrderAggregates,
}) {

  let dispatch = useDispatch();
  const classes = useStyles();


  const handleSubmit = () => {
    if (valueTab === 0) {
      apiSelectOrderAggregates()
    }
    if (valueTab === 1) {
      apiOrdersSelect()
    }
  };

  return (
    <>
      {flagFilter ? (
        <div className={classes["filter"]}>
          <Box p={1}>
            <h3>فیلتر اطلاعات</h3>
          </Box>
          {valueTab === 0 && (
            <FilterAggregates
              stateFilterAggregates={stateFilterAggregates}
              handelchangeStateFilterAggregates={handelchangeStateFilterAggregates}
            />
          )}
          {valueTab === 1 && (
          <FilterDetalis
          stateFilterDetalis={stateFilterDetalis}
          handelchangeStateFilterDetalis={handelchangeStateFilterDetalis}
          />
          )}
          <Box p={2}>
            <div className={classes.buttons}>
              <button onClick={handleSubmit} className="btnBlueFilter">
                بازخوانی{" "}
              </button>
            </div>
          </Box>
        </div>
      ) : (
          ""
        )}
    </>
  );
}
