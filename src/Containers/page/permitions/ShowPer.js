import React, { useEffect, useState } from "react";
import { makeStyles, TextField } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { permitions_v1_actions } from "../../../boot/api/permitions/action";
import { CLUB_MEMBER_SELECT_RESET } from "../../../boot/api/typeActions";
import { PREMISSON_DATA } from "./PREMISSON_DATA";

const useStyles = makeStyles(() => ({
  textarea: {
    // resize: "both",
    height: 400,
    direction: "rtl",
  },
  btns: {
    marginTop: "200px",
    display: "flex",
    justifyContent: "start",
    width: "80%",
  },
}));

export function ShowPer({ data, resetData, setData }) {
  const classes = useStyles();
  const [value, setvalue] = useState("");
  const [national_id, setNational_id] = useState("");
  // const [data, setData] = useState();
  const dispatch = useDispatch();

  const reducerSelect = useSelector((state) => state.clubmember_select_reducer);
  let info = reducerSelect.data[0]?.body;

 

  const handleSubmit = () => {
    if (!national_id) {
      alert("کد ملی را وارد کنید");
      return;
    }
    dispatch(permitions_v1_actions(national_id, value));
    handleRiset();
  };

  const handleRiset = () => {
    setNational_id("");
    resetData();
    dispatch({ type: "CLUB_MEMBER_SELECT_RESET" });
  };

  const handleSubmitNationId = () => {
    dispatch({ type: CLUB_MEMBER_SELECT_RESET });
    setData(PREMISSON_DATA);
    dispatch(permitions_v1_actions(national_id, null, "true"));
    // if(info?.permitted_methods){
    //   handelChangeReducer(true,info.permitted_methods)
    // }
  };

  useEffect(() => {
    let res = "CLUB ";
    data.forEach((element) => {
      if (element.active) {
        res += `${element.id} `;
      } else {
        element.children
          .filter((child) => child.active)
          .forEach((child) => {
            res += `${child.id} `;
          });
      }
    });
    setvalue(res);
  }, [data]);

  const permitted_methodsChild = (value) => {
    if (!value) {
      return "CLUB null";
    }

    let member_permitted_methods_split = value.split(" ");

    let regexRes = "";
    member_permitted_methods_split
      .filter((item, ind) => ind !== 0)
      .forEach((item, ind) => {
        if (ind === 0) {
          regexRes += `(${item.replace("\\", "\\\\")})`;
          return;
        }
        regexRes += `|(${item.replace("\\", "\\\\")})`;
      });

    let res = regexRes;
    return res;
  };

  const permitted_methods = (value) => {
    if (!value) {
      return "CLUB null";
    }

    let member_permitted_methods_split = value.split(" ");

    let regexRes = "";
    member_permitted_methods_split
      .filter((item, ind) => ind !== 0)
      .forEach((item, ind) => {
        if (ind === 0) {
          regexRes += `(${item.split("\\.")[0]})`;
          return;
        }
        regexRes += `|(${item.split("\\.")[0]})`;
      });

    // console.log("regexResregexRes" , regexRes);
    return regexRes;
  };

  const handle = (info) => {

    let regexFindParent = permitted_methods(info);
    let regexFind = permitted_methodsChild(info);

    let resAll = data.map((parent) => {

      if (parent.id === 'CLUBMEMBER\\.permisson_manager CLUBMEMBER\\.update' )
        if (!info.includes('CLUBMEMBER\\.permisson_manager CLUBMEMBER\\.update') )
             return parent

          if (parent.id.match(regexFindParent)) {
            if (parent.id.match(regexFind)) {
              let children = parent.children.map((child) => ({
                ...child,
                active: true,
              }));
              let res = { ...parent, active: true, children: children };
              return res;
            } else {
              let children = parent.children.map((item) =>
                item.id.match(regexFind) ? { ...item, active: true } : item
              );
              return { ...parent, children: children };
            }
          }
      return parent;
    });

    setData(resAll);
  };


  useEffect(() => {
    if (info?.permitted_methods) {

      handle(info.permitted_methods);

    }
  }, [info?.permitted_methods]); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <TextField
        id="outlined-textarea-permitions"
        label="کدملی"
        // placeholder="رشته دسترسی ها"
        variant="outlined"
        // inputProps={{ className: classes.textarea }}
        style={{ width: "50%", marginBottom: 20 }}
        value={national_id}
        onChange={(e) => setNational_id(e.target.value)}
      />
      <button
        className="btnsGreen"
        style={{ marginTop: "10px" }}
        onClick={handleSubmitNationId}
      >
        باز خوانی کاربر
      </button>
      {info && (
        <div style={{ width: "79%" }}>
          <ul style={{ columns: "1", display: "flex", listStyle: "none" }}>
            <li>
              <fieldset
                style={{
                  border: "0",
                  width: "100px",
                  height: "45px",
                  borderRadius: "5px",
                }}
              >
                <legend style={{ fontSize: "12px", color: "grey" }}>نام</legend>
                <span style={{ paddingRight: "10px" }}>
                  {info ? info.first_name : "_"}
                </span>
              </fieldset>
            </li>
            <li>
              {" "}
              <fieldset
                style={{
                  border: "0",
                  width: "100px",
                  height: "45px",
                  borderRadius: "5px",
                }}
              >
                <legend style={{ fontSize: "12px", color: "grey" }}>
                  نام خانوادگی
                </legend>
                <span style={{ paddingRight: "10px" }}>
                  {info ? info.last_name : "_"}
                </span>
              </fieldset>
            </li>
            <li>
              {" "}
              <fieldset
                style={{
                  border: "0",
                  width: "100px",
                  height: "45px",
                  borderRadius: "5px",
                }}
              >
                <legend style={{ fontSize: "12px", color: "grey" }}>
                  شماره موبایل
                </legend>
                <span style={{ paddingRight: "10px" }}>
                  {info ? info.phone.replace("98", "0") : "_"}
                </span>
              </fieldset>
            </li>
          </ul>
        </div>
      )}

      <TextField
        id="outlined-textarea-permitions"
        label="رشته دسترسی ها"
        // placeholder="رشته دسترسی ها"
        multiline
        variant="outlined"
        inputProps={{ className: classes.textarea }}
        style={{ width: "80%" }}
        value={value}
        onChange={(e) => setvalue(e.target.value)}
      />

      <div className={classes.btns}>
        <button
          className={info ? "btnsGreen" : "btnsGreen disabledItems"}
          style={info ? { opacity: 1 } : { opacity: 0.5 }}
          onClick={handleSubmit}
        >
          ذخیره
        </button>
        <button className="btnsRed" onClick={handleRiset}>
          ریست
        </button>
      </div>
    </div>
  );
}
