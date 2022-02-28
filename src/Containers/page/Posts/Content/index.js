import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Post from "./Post";
import { useDispatch } from "react-redux";
import { post_notApproved_v1_actions_select } from "../../../../boot/api/post-forum/post/post_v1_select/post_notApproved_v1_actions_select";
import { post_approved_v1_actions_select } from "../../../../boot/api/post-forum/post/post_v1_select/post_Approved_v1_actions_select";
import {
  POST_NOTAPPROVE_V1_SELECT,
  POST_APPROVE_V1_SELECT,
} from "./../../../../boot/api/typeActions";
import { post_v1_actions_approve } from "./../../../../boot/api/post-forum/post/post_v1_approve/action";
import { post_v1_actions_remove } from "../../../../boot/api/post-forum/post/post_v1_remove/action";
import { post_v1_actions_enable } from "../../../../boot/api/post-forum/post/post_v1_enable/action";
import CardNoData from "./../../../Common/method/cardNoData/index";
import { ArrowDownwardOutlined, ArrowUpwardOutlined } from "@material-ui/icons";

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
      {value === index && <Box p={3}>{children}</Box>}
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
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    backgroundColor: "white",
    width: "96.5%",
    margin: "30px auto 0",
    overflow: "auto",
  },
  appBar: {
    backgroundColor: "#1E1E2D",
  },
  TabPanel: {
    " & > div": {
      // padding: '5px 24px 0px 0px'
    },
  },
  sortParent: {
    fontSize: 11,
    marginBottom: 5,
    display: "flex",
    justifyContent: "end",
    position:'sticky',
    top:52,
    color:'blue',
    zIndex:1000
  },
}));

export default function Content({
  value,
  flagFilter,
  setFlagContent,
  setparent_post_id,
  stateReducerPost,
  handleChange,
  handleMorePostApprove,
  handleMorePostNotApprove,
  handleMorePostNotVisible,
  setdirection,
  direction,
}) {
  const classes = useStyles();

  const dispatch = useDispatch();

  //------------------------------------------dispatch remove enable----------------------
  const handleRemove = (id) => {
    let size = 0;

    dispatch(
      post_v1_actions_remove(
        id,
        value === 0
          ? post_notApproved_v1_actions_select(size, POST_NOTAPPROVE_V1_SELECT)
          : post_approved_v1_actions_select(size, POST_APPROVE_V1_SELECT)
      )
    );
  };

  const handleEnable = (id) => {
    let size = 0;
    dispatch(
      post_v1_actions_enable(
        id,
        value === 0
          ? post_notApproved_v1_actions_select(size, POST_NOTAPPROVE_V1_SELECT)
          : post_approved_v1_actions_select(size, POST_APPROVE_V1_SELECT)
      )
    );
  };

  //------------------------------------------dispatch approve----------------------
  const handleApprove = (id) => {
    let size = 0;

    dispatch(
      post_v1_actions_approve(id, [
        post_notApproved_v1_actions_select(size, POST_NOTAPPROVE_V1_SELECT),
        post_approved_v1_actions_select(size, POST_APPROVE_V1_SELECT),
      ])
    );
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
    <div
      className={classes.root}
      style={{ height: !flagFilter ? "79vh" : "41vh" }}
    >
      <AppBar position="sticky" className={classes.appBar}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="تایید نشده" {...a11yProps(0)} />
          <Tab label="تایید شده" {...a11yProps(1)} />
          <Tab label="مخفی شده" {...a11yProps(2)} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0} className={classes["TabPanel"]}>
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

        {stateReducerPost.notApprove.length !== 0 &&
          stateReducerPost.notApprove.map((item, ind) => {
            return (
              <Post
                data={item}
                buttons={true}
                index={ind}
                setFlagContent={setFlagContent}
                setparent_post_id={setparent_post_id}
                key={ind}
                handleApprove={handleApprove}
                handleRemove={handleRemove}
                handleEnable={handleEnable}
              />
            );
          })}
        {stateReducerPost.notApprove.length !== 0 ? (
          <p style={{ textAlign: "center", fontWeight: "bold" }}>
            <span
              style={{ cursor: "pointer", color: "#198cf0" }}
              onClick={handleMorePostNotApprove}
            >
              بارگذاری موارد بیشتر...
            </span>
          </p>
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
        {stateReducerPost.approve.length !== 0 &&
          stateReducerPost.approve.map((item, ind) => {
            return (
              <Post
                data={item}
                buttons={false}
                index={ind}
                setFlagContent={setFlagContent}
                setparent_post_id={setparent_post_id}
                key={ind}
                handleRemove={handleRemove}
                handleEnable={handleEnable}
              />
            );
          })}

        {stateReducerPost.approve.length !== 0 ? (
          <p style={{ textAlign: "center", fontWeight: "bold" }}>
            <span
              style={{ cursor: "pointer", color: "#198cf0" }}
              onClick={handleMorePostApprove}
            >
              بارگذاری موارد بیشتر...
            </span>
          </p>
        ) : (
          <CardNoData />
        )}
      </TabPanel>

      <TabPanel value={value} index={2}>
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
        {stateReducerPost.notVisible.length !== 0 &&
          stateReducerPost.notVisible.map((item, ind) => {
            return (
              <Post
                data={item}
                buttons={
                  item.body.approve_date === "1970/01/01 00:00:00.000000"
                    ? true
                    : false
                }
                index={ind}
                setFlagContent={setFlagContent}
                setparent_post_id={setparent_post_id}
                key={ind}
                handleApprove={handleApprove}
                handleRemove={handleRemove}
                handleEnable={handleEnable}
              />
            );
          })}

        {stateReducerPost.notVisible.length !== 0 ? (
          <p style={{ textAlign: "center", fontWeight: "bold" }}>
            <span
              style={{ cursor: "pointer", color: "#198cf0" }}
              onClick={handleMorePostNotVisible}
            >
              بارگذاری موارد بیشتر...
            </span>
          </p>
        ) : (
          <CardNoData />
        )}
      </TabPanel>
    </div>
  );
}
