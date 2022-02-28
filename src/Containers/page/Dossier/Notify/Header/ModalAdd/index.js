import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import { dateMiladi } from "./../../../../../Common/method/date";
import { convertDigitToEnglish } from "./../../../../../Common/method/convertDigitToEnglish";
import { notify_v1_actions_insert } from '../../../../../../boot/api/Dossier/Notify/Notify_v1_insert/action';
import { CLUB_MEMBER_SELECT_EMPTY } from '../../../../../../boot/api/typeActions';



const useStyles = makeStyles((theme) => ({
    root: {
        width: 1000,
        backgroundColor: "white",
        height: 500,
        borderRadius: 10,
        padding: 15,
        position: "relative"
    },
    button: {
        marginRight: theme.spacing(1),
    },
    completed: {
        display: 'inline-block',
    },
    instructions: {
        margin: "20px 40px",

    },
    buttonStepper: {
        position: "absolute",
        bottom: 30,
        right: 50
    },
    textField: {
        margin: 10,
        boxSizing: "border-box"
    }
}));

function getSteps() {
    return ['نوع اعلان', 'متن', 'گیرندگان', "تائید"];
}



export default function HorizontalNonLinearStepper({ handleCloseModal }) {

    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState({});
    const steps = getSteps();
    const dispatch = useDispatch();

    const club_reducer = useSelector(state => state.club_member_v1_reducer)

    const [status, setStatus] = useState('web')
    const [sms, setSms] = React.useState('instant');
    const [email, setEmail] = React.useState('instant');
    const [statusSend, SetstatusSend] = useState('SendToAll')

    const [name, setName] = useState('');
    const [national_id, setNational_id] = useState(null);
    const [content, setContent] = useState({ text: '', html: '' });
    const sender_id = JSON.parse(sessionStorage.getItem("login")).member_id
    const [date, setdate] = useState({
        startDate: null,
        startTime: null,
        endDate: null,
        endTime: null
    })

    const handleChangeDate = (value, type) => {
        setdate(prev => ({
            ...prev,
            [type]: value
        }))
    }

    const getDate = () => {
        let flag = true;

        if (!date.startDate || !date.endDate) {
            flag = false
        }

        if (status === "sms" && sms === "instant") {
            flag = true
        }

        if (status === "email" && email === "instant") {
            flag = true
        }

        if (!flag) return false

        return {
            start_time: convertDigitToEnglish(`${dateMiladi(date.startDate)} ${date.startTime ? date.startTime.format('HH:mm:ss') : "00:00:00"}.000000`),
            end_time: convertDigitToEnglish(`${dateMiladi(date.endDate)} ${date.endTime ? date.endTime.format('HH:mm:ss') : "23:59:59"}.000000`),
        }
    }

    const ckeckData = () => {

        let date = getDate();

        if (!date) {
            alert(' لطفا فیلد تاریخ و ساعت  را پر نمایید')
            return false
        }

        if (statusSend === 'SendToPerson') {
            if (!club_reducer.data.length) {
                alert('کد ملی مورد نظر صحیح نمی باشد')
                return false
            }
        }

        return true
    }

    const handelSubmit = () => {
        let checkDate = ckeckData()
        if (!checkDate) return

        let commenData = {
            name: name,
            sender_id: sender_id,
            sender_first_name: null,
            sender_last_name: null,
            receiver_id: statusSend === 'SendToAll' ? null : club_reducer.data[0].id,
            source: null,
            state: null,
            type: null,
            start_time: null,
            end_time: null,
        }



        switch (status) {
            case 'web':
                let data = {
                    ...commenData,
                    ...getDate(),
                    content: content.html,
                }
                dispatch(notify_v1_actions_insert(data, "insert_web_notification"))
                break;

            case 'sms':
                if (sms === 'instant') {
                    let data = {
                        ...commenData,
                        content: content.text,
                    }
                    dispatch(notify_v1_actions_insert(data, "insert_immediate_sms_notification"))
                }

                if (sms === 'offline') {
                    let data = {
                        ...commenData,
                        content: content.text,
                        ...getDate()
                    }
                    dispatch(notify_v1_actions_insert(data, "insert_offline_sms_notification"))
                }

                break;

            case 'email':
                if (email === 'instant') {
                    let data = {
                        ...commenData,
                        content: content.html,
                    }
                    dispatch(notify_v1_actions_insert(data, "insert_immediate_email_notification"))
                }

                if (email === 'offline') {
                    let data = {
                        ...commenData,
                        ...getDate(),
                        content: content.html,
                    }
                    dispatch(notify_v1_actions_insert(data, "insert_offline_email_notification"))
                }
                break;

            default:
                break;
        }

    }

    function getStepContent(step) {
        switch (step) {
            case 0:
                return <Step1
                    status={status}
                    setStatus={setStatus}
                    sms={sms}
                    setSms={setSms}
                    email={email}
                    setEmail={setEmail}
                    date={date}
                    handleChangeDate={handleChangeDate}
                    name={name}
                    setName={setName}
                />;
            case 1:
                return <Step2
                    status={status}
                    content={content}
                    setContent={setContent}
                />;
            case 2:
                return <Step3
                    statusSend={statusSend}
                    SetstatusSend={SetstatusSend}
                    national_id={national_id}
                    setNational_id={setNational_id}
                    club_reducer={club_reducer}
                />;
            case 3:
                return <Step4
                    status={status}
                    sms={sms}
                    email={email}
                    statusSend={statusSend}
                    club_reducer={club_reducer}
                    date={date}
                    content={content}
                />
            default:
                return 'Unknown step';
        }
    }

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed,
                // find the first step that has been completed
                steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    const handleComplete = () => {

        if (completedSteps() === totalSteps() - 1) {
            handelSubmit()
            handleCloseModal(false)
            return
        }

        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };

    useEffect(() => {
        return function cleanup() {
            dispatch({ type: CLUB_MEMBER_SELECT_EMPTY })
        }
    }, []) //eslint-disable-line react-hooks/exhaustive-deps



    return (
        <div className={classes.root}>
            <Stepper nonLinear activeStep={activeStep}>
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepButton onClick={handleStep(index)} completed={completed[index]}>
                            {label}
                        </StepButton>
                    </Step>
                ))}
            </Stepper>
            <div>
                {
                    allStepsCompleted() ? (
                        <div>
                            <Typography className={classes.instructions}>
                                All steps completed - you&apos;re finished
                         </Typography>
                            <Button onClick={handleReset}>Reset</Button>
                        </div>
                    ) : (
                            <div>
                                <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                                <div className={classes.buttonStepper}>
                                    <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                                        بازگشت
                                   </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}
                                        className={classes.button}
                                    >
                                        بعدی
                              </Button>

                                    {activeStep !== steps.length &&
                                        (completed[activeStep] ? (
                                            <Typography variant="caption" className={classes.completed}>
                                                گام {activeStep + 1} کامل شده
                                            </Typography>
                                        ) : (
                                                <Button variant="contained" color="primary" onClick={handleComplete}>
                                                    {completedSteps() === totalSteps() - 1 ? 'اتمام' : 'کامل شدن'}
                                                </Button>
                                            ))}
                                </div>
                            </div>
                        )}
            </div>
        </div>
    );
}
