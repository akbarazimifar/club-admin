import React, { useState, useEffect } from "react";
import Header from "./Header";
import Filter from "./FilterItems";
import Content from "./Content";
import PostSHow from "./PostShow";
import Comments from "./Comments";
import PostReport from "./PostReport";
import PostFilter from "./PostFilter";
import { post_v1_actions_select_filter } from "./../../../boot/api/post-forum/post/post_v1_select_filter/post_v1_actions_select_filter";
import { useDispatch, useSelector } from "react-redux";
import { post_notApproved_v1_actions_select } from "../../../boot/api/post-forum/post/post_v1_select/post_notApproved_v1_actions_select";
import { post_approved_v1_actions_select } from "../../../boot/api/post-forum/post/post_v1_select/post_Approved_v1_actions_select";
import { post_NotVisible_v1_actions_select } from "../../../boot/api/post-forum/post/post_v1_select/post_notVisable_v1_actions_select";
import {
  POST_NOTAPPROVE_V1_SELECT,
  POST_NOTAPPROVE_V1_SELECT_MORE,
  POST_APPROVE_V1_SELECT,
  POST_APPROVE_V1_SELECT_MORE,
  POST_NOTVISIBLE_V1_SELECT,
  POST_NOTVISIBLE_V1_SELECT_MORE,
} from "./../../../boot/api/typeActions";

export default function Index() {
  const [flagFilter, setFlagFilter] = useState(false);
  const [flagContent, setFlagContent] = useState("CONTENT");
  const [post_id, setparent_post_id] = useState(null);
  const dispatch = useDispatch();
  const stateReducerPost = useSelector((state) => state.post_v1_select_Reducer);
  const [stateFilter, setStateFilter] = useState({
    forum_name: "",
    subgroup_name: "",
    is_visible: "",
    author_last_name: "",
    title: "",
    abstract: "",
  });
  const [resultFilter, setResultFilter] = useState({});
  const [direction, setdirection] = useState(null);

  useEffect(() => {
    const res = Object.getOwnPropertyNames(resultFilter);

    if (res.length === 0) {
      callApiPostContent();
    } else {
      callApiPostFilter();
    }
  }, [resultFilter]); //eslint-disable-line react-hooks/exhaustive-deps

  //---------------------handle click more-----------------------------------//
  const handleMorePostApprove = () => {
    const res = Object.getOwnPropertyNames(resultFilter);

    if (res.length === 0) {
      dispatch(
        post_approved_v1_actions_select(
          stateReducerPost.fromApprove + 20,
          POST_APPROVE_V1_SELECT_MORE,
          direction
        )
      );
    } else {
      dispatch(
        post_v1_actions_select_filter(
          stateReducerPost.fromApprove + 20,
          resultFilter,
          "select_approve",
          POST_APPROVE_V1_SELECT_MORE,
          direction
        )
      );
    }
  };

  const handleMorePostNotApprove = () => {
    const res = Object.getOwnPropertyNames(resultFilter);

    if (res.length === 0) {
      dispatch(
        post_notApproved_v1_actions_select(
          stateReducerPost.fromNotApprove + 20,
          POST_NOTAPPROVE_V1_SELECT_MORE,
          direction
        )
      );
    } else {
      dispatch(
        post_v1_actions_select_filter(
          stateReducerPost.fromNotApprove + 20,
          resultFilter,
          "select_reject",
          POST_NOTAPPROVE_V1_SELECT_MORE,
          direction
        )
      );
    }
  };

  const handleMorePostNotVisible = () => {
    const res = Object.getOwnPropertyNames(resultFilter);

    if (res.length === 0) {
      dispatch(
        post_NotVisible_v1_actions_select(
          stateReducerPost.fromNotVisible + 20,
          POST_NOTVISIBLE_V1_SELECT_MORE,
          direction
        )
      );
    } else {
      dispatch(
        post_v1_actions_select_filter(
          stateReducerPost.fromNotVisible + 20,
          resultFilter,
          "select",
          POST_NOTVISIBLE_V1_SELECT_MORE,
          direction
        )
      );
    }
  };
  //---------------------------------------------------------------------------//

  //---------------------select api call in content---------------------------//
  const callApiPostContent = () => {
    let size = 0;
    dispatch(
      post_notApproved_v1_actions_select(size, POST_NOTAPPROVE_V1_SELECT,direction)
    );
    dispatch(post_approved_v1_actions_select(size, POST_APPROVE_V1_SELECT,direction));
    dispatch(
      post_NotVisible_v1_actions_select(size, POST_NOTVISIBLE_V1_SELECT,direction)
    );
  };

  const callApiPostFilter = () => {
    let size = 0;
    dispatch(
      post_v1_actions_select_filter(
        size,
        resultFilter,
        "select_reject",
        POST_NOTAPPROVE_V1_SELECT,
        direction
      )
    );
    dispatch(
      post_v1_actions_select_filter(
        size,
        resultFilter,
        "select_approve",
        POST_APPROVE_V1_SELECT,
        direction
      )
    );
    dispatch(
      post_v1_actions_select_filter(
        size,
        resultFilter,
        "select",
        POST_NOTVISIBLE_V1_SELECT,
        direction
      )
    );
  };
  //---------------------------------------------------------------------------//

  //----------------------content------------------------//
  const [value, setValue] = React.useState(0);
  const handleChangeValue = (event, newValue) => {
    setValue(newValue);
  };
  //----------------------------------------------------//

  //---------------------filter-------------------------//
  const handleChangeFilter = (data, type) => {
    setStateFilter((prev) => ({
      ...prev,
      [type]: data,
    }));
  };

  const handelSubmitFilter = () => {
    let data = {};

    Object.keys(stateFilter)
      .filter((item) => stateFilter[item])
      .forEach((key) => {
        data[key] = stateFilter[key];
      });

    setResultFilter(data);
  };
  //----------------------------------------------//

  const handel_router_back = () => {
    switch (flagContent) {
      case "CONTENT":
        alert("در صفحه اول قرار دارید.");
        break;
      case "POST_SHOW":
        setFlagContent("CONTENT");
        break;
      case "POST_Report":
        setFlagContent("POST_SHOW");
        break;
      case "COMMENTS":
        setFlagContent("POST_SHOW");
        break;

      default:
        break;
    }
  };

  const handleRefresh = () => {
    setResultFilter({});
    // callApiPostContent()
    setFlagContent("CONTENT");
    setdirection(null)
  };

  useEffect(() => {
    if(Object.keys(resultFilter).length !== 0){
        callApiPostFilter()
    }else{
        callApiPostContent()
    }
  }, [direction]);





 


  return (
    <div>
      <Header
        handleRefresh={handleRefresh}
        setFlagFilter={setFlagFilter}
        handel_router_back={handel_router_back}
        // setFlagContent={() => flagContent === "CONTENT" ? setFlagContent("CATEGORY") : setFlagContent("CONTENT")}
      />

      <Filter
        flagFilter={flagFilter}
        setFlagContent={setFlagContent}
        stateFilter={stateFilter}
        handleChangeFilter={handleChangeFilter}
        handelSubmitFilter={handelSubmitFilter}
      />

      {flagContent === "CONTENT" && (
        <Content
          setdirection={setdirection}
          direction={direction}
          flagFilter={flagFilter}
          flagContent={flagContent}
          setFlagContent={setFlagContent}
          setparent_post_id={setparent_post_id}
          value={value}
          setValue={setValue}
          stateReducerPost={stateReducerPost}
          handleChange={handleChangeValue}
          handleMorePostApprove={handleMorePostApprove}
          handleMorePostNotApprove={handleMorePostNotApprove}
          handleMorePostNotVisible={handleMorePostNotVisible}
        />
      )}

      {flagContent === "COMMENTS" && <Comments post_id={post_id} />}

      {flagContent === "POST_SHOW" && (
        <PostSHow setFlagContent={setFlagContent} post_id={post_id} />
      )}
      {flagContent === "POST_Report" && (
        <PostReport setFlagContent={setFlagContent} post_id={post_id} />
      )}

      {flagContent === "POST_FILTER" && <PostFilter flagFilter={flagFilter} />}
    </div>
  );
}
