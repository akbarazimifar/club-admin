import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Modal from "./../../../../Common/Components/Modal";
import ModalPassword from "./ModalPassword";
import ModalChangeIntroducing from "./ModalChangeIntroducing";
import AlertDialogSlide from "./../../../../Common/Components/AlertDialogSlide";
import Inputs from "./Inputs";
import Introducing from "./Introducing";
import { useDispatch, useSelector } from "react-redux";
import { profile_v1_action_select_introducing } from "../../../../../boot/api/profile/person/person_v1_select_introducing/action";
import IntroducingMemberId from "./IntroducingMemberId";
import CustomerRegistration from "./CustomerRegistration";
import { getSessionParam } from "./../../../../Common/method/getSessionParam";
import { toFixed } from "./../../../../Common/method/toFixed/index";
import { update_delete_introducer } from "../../../../../boot/api/profile/person/person_v1_deleted_introducing/action";

const useStyles = makeStyles(() => ({
  content: {
    width: "96%",
    margin: "auto",
    display: "flex",
    marginTop: 10,
  },
  right: {
    width: "20%",
    height: "89vh",
    backgroundColor: "white",
    marginRight: 10,
    borderRadius: 10,
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: "50%",
    margin: "30px auto 15px",
    "& img": {
      width: "100%",
      height: "100%",
      borderRadius: "50%",
    },
  },
  fullname: {
    textAlign: "center",
    fontSize: "1.7em",
    fontWeight: "700",
  },
  role: {
    textAlign: "center",
    paddingBottom: 20,
    borderBottom: "1px solid black",
    "& button": {
      fontWeight: "bold",
      padding: "0px 25px",
      borderRadius: 8,
    },
  },
  bonus: {
    marginTop: 40,
    "& p": {
      marginLeft: 40,
      position: "relative",
      fontSize: "1.2em",
      fontWeight: 500,
      "&::after": {
        content: '""',
        width: 11,
        height: 11,
        borderRadius: 3,
        backgroundColor: "red",
        position: "absolute",
        left: -20,
        top: "calc(50% - 5px)",
      },
      "&:first-child": {
        "&::after": {
          backgroundColor: "#1BC5BD",
        },
      },
      "&:nth-child(2)": {
        "&::after": {
          backgroundColor: "#FFA800",
        },
      },
    },
  },
  buttons: {
    textAlign: "center",
    paddingTop: 120,
  },
  left: {
    flexGrow: 1,
    marginleft: 10,
    height: "auto",
    width: "80%",
  },
  box: {
    padding: 20,
    display: "flex",
    backgroundColor: "white",
    flexWrap: "wrap",
    borderRadius: 10,
  },
  boxBottom: {
    padding: "5px 20px",
    backgroundColor: "white",
    flexWrap: "wrap",
    borderRadius: 10,
    marginTop: 10,
    height: 310,
    overflow: "auto",
  },
  itemLeft: {
    width: "calc(25% - 60px)",
    margin: "10px 30px",
    "& > *": {
      margin: 10,
      width: "100%",
    },
  },
}));

export default function Content({
  data,
  apiUpdateRoll,
  apiUpdatePassword,
  apiUpdateActivation,
  member_id,
}) {
  const styles = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);
  const [openAlertActivation, setOpenAlertActivation] = useState(false);
  const [openModalPassword, setOpenModalPassword] = useState(false);
  const [openModalChangeIntroducing, setOpenChangeIntroducing] =
    useState(false);
  const [roll, setRoll] = useState({ value: "", roll: "" });
  const [state, setState] = useState({});
  const [introducing_member_id, setintroducing_member_id] = useState();
  const [memberid, setmemberid] = useState();
  const [open, setOpen] = useState(false);
  const [pageTab1, setPageTab1] = useState(1);
  const [showDeleteIntroduced, setshowDeleteIntroduced] = useState(false);

  const handleChekCustomer = () => {
    let member_automation_id = getSessionParam("member_automation_id");

    if (member_automation_id === "null" || !member_automation_id) {
      setOpen((prev) => !prev);
      return null;
    }
  };

  useEffect(() => {
    // console.log("setState", state);
    if (Object.keys(state).length) {
      setintroducing_member_id(state.body?.introducing_member_id);
    }
  }, [state]);
  // console.log("setState", introducing_member_id);

  // console.log("setState", state.id);

  const dispatch = useDispatch();

  const ReducerIntruducing = useSelector(
    (state) => state.profile_v1_reducer_intruducing
  );

  let size = ReducerIntruducing.size;
  useEffect(() => {
    if (member_id)
      dispatch(profile_v1_action_select_introducing(member_id, size, pageTab1));
  }, [member_id, pageTab1]); //eslint-disable-line  react-hooks/exhaustive-deps

  const fun_roll = (key) => {
    switch (key) {
      case "ADMIN":
        return { value: "ادمین", roll: "ADMIN" };
      case "OPERATOR":
        return { value: "اپراتور", roll: "OPERATOR" };
      case "MEMBER":
        return { value: "کاربر عادی", roll: "MEMBER" };
      default:
        break;
    }
  };

  useEffect(() => {
    if (data[0]) {
      setState(data[0]);
      setRoll(fun_roll(data[0].body.category));
    }
  }, [data]); //eslint-disable-line  react-hooks/exhaustive-deps

  useEffect(() => {
    setmemberid(state?.id);
  }, [state]);

  if (Object.keys(state).length === 0) {
    return null;
  }

  const checkCodeBors = (data) => {
    if (data === "null" || data === null || data === "FALSE") {
      return "ندارد";
    }
    if (data === "TRUE") {
      return "دارد";
    }
    return data;
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handel_show_alert = (type) => {
    if (type !== data[0].body.category) {
      setRoll(fun_roll(type));
      setOpenAlert(true);
    }
    setAnchorEl(null);
  };

  const handel_Submit_roll = () => {
    apiUpdateRoll(state, roll.roll);
    setOpenAlert(false);
  };

  const handel_Submit_activation = () => {
    let { id } = data[0];
    let { national_id } = data[0].body;
    if (state.body.is_active === "TRUE") {
      let method_type = "deactivate_club_member";
      apiUpdateActivation(method_type, id, national_id);
    } else if (state.body.is_active === "FALSE") {
      let method_type = "activate_club_member";
      apiUpdateActivation(method_type, id, national_id);
    } else {
      alert("دیتا ورودی دارای مشکل می باشد.");
    }

    setOpenAlertActivation(false);
  };

  const handleOkDeleteIntroduced = () => {
    dispatch(update_delete_introducer(memberid))
    setshowDeleteIntroduced(false)
  }

  return (
    <div className={styles.content}>
      <div className={styles.right}>
        <div className={styles.image}>
          <img
            src={
              state.body.profile_picture
                ? `data:image/png;base64,${state.body.profile_picture}`
                : "/assets/images/profile.jpg"
            }
            alt=""
          />
        </div>
        <p className={styles.fullname}>
          {state.body.first_name}
          {"\u00A0"}
          {state.body.last_name}
        </p>

        <div className={styles.role}>
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
            className="btnsGreen"
          >
            {data[0].id ? fun_roll(data[0].body.category).value : ""}
          </Button>

          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => handel_show_alert("MEMBER")}>
              {" "}
              کاربر عادی
            </MenuItem>
            <MenuItem onClick={() => handel_show_alert("OPERATOR")}>
              اپراتور
            </MenuItem>
            <MenuItem onClick={() => handel_show_alert("ADMIN")}>
              ادمین
            </MenuItem>
          </Menu>
        </div>

        <div className={styles.bonus}>
          <p>
            <span>امتیاز قابل استفاده</span>
            {": "}
            <span>
              {toFixed(state.body.available_bonus)}
              {/* {seprateNumberFromComma(state.body.available_bonus)} */}
            </span>
          </p>
          <p>
            <span>امتیاز رزرو شده</span>
            {": "}
            <span>
              {toFixed(state.body.reserved_bonus)}
              {/* {seprateNumberFromComma(state.body.reserved_bonus)} */}
            </span>
          </p>
        </div>

        <div className={styles.buttons}>
          <div>
            <CustomerRegistration
              open={open}
              setOpen={setOpen}
              profile={state}
            />
            <button
              className="btnsGreenBackground"
              onClick={() => handleChekCustomer()}
            >
              فراخوانی اطلاعات از سجام
            </button>
          </div>
          <p>
            <button
              className="btnsGreenBackground"
              onClick={() => setOpenChangeIntroducing(true)}
            >
              ثبت معرف
            </button>

            <button
              className="btnsRedBackground"
              onClick={() => setshowDeleteIntroduced(true)}
            >
              حذف معرف
            </button>

          </p>
          <p>
            <button
              className="btnsYellowBackground"
              onClick={() => setOpenModalPassword(true)}
            >
              تغییر رمز عبور
            </button>
          </p>
          <p>
            <button
              className={
                state.body.is_active === "TRUE"
                  ? "btnsRedBackground"
                  : "btnsGreenBackground"
              }
              onClick={() => setOpenAlertActivation(true)}
            >
              {`حساب کاربری ${state.body.is_active === "TRUE" ? "غیر" : ""
                } فعال شود`}
            </button>
          </p>
        </div>
      </div>

      <div className={styles.left}>
        <div className={styles.box}>
          <Inputs
            classes={[styles.itemLeft]}
            prevValue={state}
            checkCodeBors={checkCodeBors}
          />
        </div>

        <div
          className={styles.boxBottom}
          style={{
            height: "auto",
          }}
        >
          <IntroducingMemberId
            IntroducingMemberId={introducing_member_id}
            classes={[styles.itemLeft]}
          />
        </div>
        <div className={styles.boxBottom}>
          <Introducing
            introducing_member_id={member_id}
            tablebody={ReducerIntruducing}
            pageTab1={pageTab1}
            setPageTab1={setPageTab1}
          />
        </div>
      </div>

      {/* ------------------------modal password---------------------------- */}
      <Modal open={openModalPassword} setOpen={setOpenModalPassword}>
        <ModalPassword
          getData={(password) => apiUpdatePassword(password, state)}
          setClose={setOpenModalPassword}
        />
      </Modal>
      <Modal
        open={openModalChangeIntroducing}
        setOpen={setOpenChangeIntroducing}
      >
        <ModalChangeIntroducing
          memberId={memberid}
          introducingMemberId={state.body.introducing_member_id}
          // getData={(password) => apiUpdatePassword(password, state)}
          setClose={setOpenChangeIntroducing}
        />
      </Modal>

      {/* ------------------------modal roll---------------------------- */}

      {openAlert && (
        <AlertDialogSlide
          flagShow={openAlert}
          handleCloseAlert={setOpenAlert}
          handleOkAlert={handel_Submit_roll}
          data={{
            title: "ویرایش",
            description: `آیا میخواهید کاربر را به ${roll.value} تغییر دهید؟`,
          }}
        />
      )}
      {/* ------------------------modal activation---------------------------- */}

      {
        <AlertDialogSlide
          flagShow={openAlertActivation}
          handleCloseAlert={setOpenAlertActivation}
          handleOkAlert={handel_Submit_activation}
          data={{
            title: "ویرایش",
            description: `آیا میخواهید حساب کاربری ${state.body.is_active === "TRUE" ? "غیر فعال" : "فعال"
              } شود؟`,
          }}
        />
      }
      {/* ------------------------alert delete introduced---------------------------- */}

      {
        <AlertDialogSlide
          flagShow={showDeleteIntroduced}
          handleCloseAlert={setshowDeleteIntroduced}
          handleOkAlert={handleOkDeleteIntroduced}
          data={{
            title: "حذف معرف",
            description: "آیا از حذف معرف اطمینان دارید؟",
          }}
        />
      }
    </div>
  );
}
