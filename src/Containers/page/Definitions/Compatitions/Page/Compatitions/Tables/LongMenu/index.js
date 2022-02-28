import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ModalAnswer from '../ModalAnswer';
import ModalAnswerEdit from '../ModalAnswerEdit';
import AlertDialogSlide from "./../../../../../../../Common/Components/AlertDialogSlide";
import { Button, Switch } from '@material-ui/core';



const ITEM_HEIGHT = 48;





export default function LongMenu({
    title,
    idCompetitions,
    setflagTypePage,
    setIdCompetitions,
    data,
    apiselectProfile,
    reducerProfile,
    apiselectProfileEmpty,
    apiParticipateInsert,
    apiParticipationsEmpty,
    apiParticipationsSelect,
    reducerParticipations,
    apiParticipateUpdate,
    apiCompetitionDeactivate,
    apiCompetitionActivate,
    handelRefresh,
    flagTypePage

}) {


    const options = [
        { title: 'شرکت در مسابقه (شخص دیگر )', value: 'modalAnswer' },
        { title: 'ویرایش پاسخ(شخص دیگر)', value: 'modalAnswerEdit' },
        { title: 'آمار مسابقه', value: 'statistics' },
        {
            title:
                data.body.is_active === 'TRUE'
                    ? 'غیر فعال کردن'
                    : 'فعال کردن',
            value: 'modalDelete'
        },
    ];


    const [anchorEl, setAnchorEl] = useState(null);
    const [flagModalAnswer, setflagModalAnswer] = useState(false)
    const [flagModaAnswerEdit, setflagModaAnswerEdit] = useState(false)
    const [ensureDelete, setEnsureDelete] = useState(false);

    const open = Boolean(anchorEl);

    // const [state, setState] = React.useState({
    //     checkedA: true,
    //     checkedB: true,
    // });


    const handleChangeSwitch = (event) => {
        // setState({ ...state, [event.target.name]: event.target.checked });
        setEnsureDelete(true)
    };



    const handleClick = (event, title) => {
        setAnchorEl(event.currentTarget);

        handleClose()
        setIdCompetitions(data.id)


        options.forEach((option, index) => {


            if (title === option.title) {

                switch (option.value) {
                    case 'statistics':
                        setflagTypePage(option.value)
                        break;

                    case 'modalAnswer':
                        setflagModalAnswer(true)
                        break

                    case 'modalAnswerEdit':
                        setflagModaAnswerEdit(true)
                        break

                    case 'modalDelete':
                        setEnsureDelete(true)
                        break

                    default:
                        break;
                }

            }
        })


    };


    const handleClose = () => {
        setAnchorEl(null);
    };


    // const handelRouterPage = (value) => {

    //     handleClose()
    //     setIdCompetitions(data.id)

    //     switch (value) {

    //         case 'statistics':
    //             setflagTypePage(value)
    //             break;

    //         case 'modalAnswer':
    //             setflagModalAnswer(true)
    //             break

    //         case 'modalAnswerEdit':
    //             setflagModaAnswerEdit(true)
    //             break

    //         case 'modalDelete':
    //             setEnsureDelete(true)
    //             break

    //         default:
    //             break;
    //     }

    // }


    const handelDelete = () => {
        setEnsureDelete(false)

        let obj = {
            _id: data.id
        }
        
        if (data.body.is_active === 'TRUE') {
            apiCompetitionDeactivate(obj)
        }
        
        if (data.body.is_active === 'FALSE') {
            apiCompetitionActivate(obj)
        }
        handelRefresh(flagTypePage)

    }


    return (
        <div>
            
                <>
                    {title === "آمار مسابقه" ? (
                        <Button
                            aria-label="more"
                            aria-controls="long-menu"
                            aria-haspopup="true"
                            onClick={(event) => handleClick(event, title)}
                            className="btnsCompatition"
                            style={{ borderRadius: 8, marginRight: 5, fontSize: 10 }}
                        >
                            {title}

                        </Button>
                    ) : (
                        <>
                            {title === "نمایش" && (
                                <Switch
                                    size="small"
                                    checked={data.body.is_active === 'TRUE' ? true: false}
                                    onChange={handleChangeSwitch}
                                    color="primary"
                                    name="checkedB"
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                />
                            )}
                        </>
                    )}
                </>
            

            {/* <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '30ch',
                    },
                }}
            >
                {options.map((option, index) => (
                    <MenuItem key={index} selected={option === 'Pyxis'} onClick={() => handelRouterPage(option.value)}>
                        {option.title}
                    </MenuItem>
                ))}
            </Menu> */}

            {
                flagModalAnswer && (
                    <ModalAnswer
                        data={data}
                        reducerProfile={reducerProfile}
                        flagModalAnswer={flagModalAnswer}
                        apiselectProfile={apiselectProfile}
                        setflagModalAnswer={setflagModalAnswer}
                        apiselectProfileEmpty={apiselectProfileEmpty}
                        apiParticipateInsert={apiParticipateInsert}
                        idCompetitions={idCompetitions}
                    />
                )
            }

            {
                flagModaAnswerEdit && (
                    <ModalAnswerEdit
                        data={data}
                        flagModaAnswerEdit={flagModaAnswerEdit}
                        setflagModaAnswerEdit={setflagModaAnswerEdit}
                        apiParticipationsEmpty={apiParticipationsEmpty}
                        apiParticipationsSelect={apiParticipationsSelect}
                        reducerParticipations={reducerParticipations}
                        idCompetitions={idCompetitions}
                        apiselectProfileEmpty={apiselectProfileEmpty}
                        apiParticipateUpdate={apiParticipateUpdate}



                    />
                )
            }

            <AlertDialogSlide
                flagShow={ensureDelete}
                handleCloseAlert={setEnsureDelete}
                handleOkAlert={() => handelDelete()}
                data={dataAlertDialogSlide}
            />

        </div>
    );
}


const dataAlertDialogSlide = {
    title: "ویرایش",
    description: "از ویرایش این رکورد اطمینان دارید؟",
}



{/* {title === "آمار مسابقه" ? "آمار مسابقه" : title === "ویرایش پاسخ(شخص دیگر)" ? "ویرایش پاسخ(شخص دیگر)" : title === "شرکت در مسابقه (شخص دیگر )" ? "شرکت در مسابقه (شخص دیگر )" : title === "غیر فعال کردن" ? "غیر فعال کردن": title === "فعال کردن" && data.body.is_active !== 'TRUE' ? "فعال کردن" : null} */ }