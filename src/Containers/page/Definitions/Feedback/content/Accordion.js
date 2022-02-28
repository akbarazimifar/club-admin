import React, { Fragment, useState, useRef } from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import style from "./index.module.scss";
import TextAreaSubmited from "./TextAreaSubmited";
import { Box, Modal, Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";

const SUBMITTED = "SUBMITTED";
const ANSWERED = "ANSWERED";

const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  backgroundColor: "white",
  boxShadow: 24,
  borderRadius: 7,
  padding: 10,
  height: 300,
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  flexDirection: "column",
};

let toDigitEnglish = (data) => {
  return data.replace(/([۰-۹])/g, (token) =>
    String.fromCharCode(token.charCodeAt(0) - 1728)
  );
};

const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",

    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

export default function CustomizedAccordions({ data, type, SubmitReponse, i }) {
  let refNationalId = useRef(null);
  const dispatch = useDispatch();

  const [expanded, setExpanded] = useState(`panel${i}`); //eslint-disable-line no-unused-vars
  const [response, setResponse] = useState("");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleSubmitReponse = () => {
    if (!response) {
      alert("لطفا متن جواب را پر کنین");
      return;
    }

    let todayDate = new Date().toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    let time = new Date().toLocaleTimeString("fa-IR", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    let date = time.split(":");

    let digit = (data) => {
      let length = data.length;
      if (length === 1) {
        return "0" + data;
      }
      return data;
    };

    let dataAndTime = `${todayDate} ${
      digit(date[0]) + ":" + digit(date[1]) + ":" + digit(date[2])
    }.000000`;

    let dataUpdate = {
      _id: data.id,
      response: response,
      response_date: toDigitEnglish(dataAndTime),
    };

    SubmitReponse(dataUpdate);
    handleClose();
  };

  const handleEditAnswer = () => {
    handleOpen();
  };

  const handelCopyNationaId = (event) => {
    event.stopPropagation();

    let copyText = refNationalId.current;
    copyText.select();
    copyText.setSelectionRange(0, 99999);

    document.execCommand("copy");
    dispatch({
      type: "ALERT",
      payload: {
        status: true,
        textAlert: "کد ملی کپی شد",
        typeAlert: "success",
      },
    });
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Fragment key={i}>
      <div>
        <Accordion
          square
          // expanded={expanded === `panel${i }`}
          onChange={handleChange(`panel${i}`)}
        >
          <AccordionSummary
            className={style.boxQuestion}
            aria-controls={`panel${i}ad-content-11111`}
            id={`panel${i}d-header-11111`}
          >
            <div>
              <div className={style.boxQuestionHead}>
                <div>
                  <span>{data.body.member_first_name}</span>
                  &nbsp;
                  <span>{data.body.member_last_name}</span>
                </div>

                <div className={style.textCenterCustom}>
                  <input
                    type={"text"}
                    ref={refNationalId}
                    value={data.body.member_national_id}
                    className={style["nationa_id"]}
                  />

                  <svg
                    style={{ width: 30, height: 30 }}
                    onClick={(event) => handelCopyNationaId(event)}
                  >
                    <use xlinkHref="/sprite.svg#copy"></use>
                  </svg>
                </div>

                <div style={{ direction: "ltr" }}>
                  {data.body.feedback_date.split(".")[0]}
                </div>
              </div>

              <div className={style.boxQuestionBody}>
                <div>{data.body.feedback}</div>
              </div>
            </div>
          </AccordionSummary>

          <AccordionDetails style={{ padding: 10 }}>
            {
              //eslint-line-disable

              type === SUBMITTED && (
                <div className={style.answerTextaria}>
                  <TextAreaSubmited>
                    {(data) => setResponse(data)}
                  </TextAreaSubmited>

                  <button
                    className={style.button}
                    onClick={handleSubmitReponse}
                  >
                    ارسال پاسخ
                  </button>
                </div>
              )
            }

            {type === ANSWERED && (
              <div className={style.answerDone}>
                <div style={{ marginBottom: 10 }}>
                  <span>{data.body.responser_first_name}</span>
                  &nbsp;
                  <span>{data.body.responser_last_name}</span>
                </div>

                <div>{data.body.response}</div>

                <div className={style.answerDoneFooter}>
                  <div>
                    <span></span>
                    <span>کد پیگیری:</span>
                    <span>{data.body.tracking_code}</span>
                  </div>
                  <div>
                    <span>تاریخ ثبت:</span>
                    <span style={{ direction: "ltr", display: "inline-block" }}>
                      {data.body.response_date.split(".")[0]}
                    </span>
                  </div>
                  <div>
                    <span>وضعیت:</span>
                    <span>بررسی شده</span>
                  </div>
                  <button className="btnsYellow" onClick={handleEditAnswer}>
                    ویرایش پاسخ
                  </button>
                </div>
              </div>
            )}
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box style={styleModal}>
                <h3>ویرایش پاسخ</h3>
                <textarea
                  rows="6"
                  cols="81"
                  style={{ resize: "none", width: "90%" }}
                  onChange={(e) => setResponse(e.target.value)}
                  placeholder="متن خود را وارد کنید"
                />

                <button className="btnsGreen" onClick={handleSubmitReponse}>
                  ارسال پاسخ
                </button>
              </Box>
            </Modal>
          </AccordionDetails>
        </Accordion>
      </div>
    </Fragment>
  );
}
