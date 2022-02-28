import { FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { profile_v1_action_update } from '../../../../../boot/api/profile/person/person_v1_update/action';
import { dateMiladiToShamsi, dateMiladi } from "./../../../../Common/method/date"
import DatePickerEdit from './../../../../Common/Components/DatePickerEdit';


export default function Inputs({ classes, prevValue, checkCodeBors }) {
    let initData = {
        first_name: "",
        last_name: "",
        national_id: "",
        gender: "",
        is_individual: "",
        phone: "",
        email: "",
        birth_date: "",
        category: "",
        user: "",
        registration_date: "",
        is_active: "",
        automation_id: "",
        ref_code: "",
        shoabs_name: '',
    }
    const [value, setValue] = useState(initData)
    const dispatch = useDispatch()

    const handleChange = (value, type) => {
        setValue(prev => ({
            ...prev,
            [type]: value
        }))
    }

    useEffect(() => {
        setValue(prevValue.body)
    }, [prevValue])

    const handleSubmit = () => {
        var regex = new RegExp('^(\\98)?9\\d{9}$');
        var result = regex.test(value.phone);


        if (!result) {
            alert("شماره همراه 12 رقمی می باشد و باید با 989 شروع شود.")
            return
        }

        let { permission_level, ...data } = value

        dispatch(profile_v1_action_update({ _id: prevValue.id, ...data }))


    }

    return (<>
        <div className={classes[0]}>
            <TextField size="small" id={`profile-edit-first_name`} label="نام" variant="outlined" value={value.first_name} onChange={(e) => handleChange(e.target.value, "first_name")} />
        </div>

        <div className={classes[0]}>
            <TextField size="small" id={`profile-edit-last_name`} label="نام خانوادگی" variant="outlined" value={value.last_name} onChange={(e) => handleChange(e.target.value, "last_name")} />
        </div>



        <div className={classes[0]}>
            <TextField size="small" id={`profile-edit-phone`} label="شماره همراه" variant="outlined" value={value.phone} onChange={(e) => handleChange(e.target.value, "phone")} />
        </div>

        <div className={classes[0]}>
            <TextField size="small" id={`profile-edit-email`} label="ایمیل" variant="outlined" value={value.email} onChange={(e) => handleChange(e.target.value, "email")} />
        </div>


        <div className={classes[0]}>
            <FormControl >
                <InputLabel id="simple-gender-label" style={{ paddingRight: 17 }}>جنسیت</InputLabel>
                <Select
                    id="profile-edit-gender"
                    label="جنسیت"
                    value={value.gender}
                    onChange={(e) => handleChange(e.target.value, "gender")}
                    variant="outlined"
                    size="small"
                    className="auto"
                >
                    <MenuItem value={"1"}>مرد</MenuItem>
                    <MenuItem value={"2"}>زن</MenuItem>
                </Select>
            </FormControl>
        </div>

        <div className={classes[0]}>
            <FormControl >
                <InputLabel id="simple-gender-label" style={{ paddingRight: 17 }}>شخص</InputLabel>
                <Select
                    id="profile-edit-is_individual"
                    label="شخص"
                    value={value.is_individual}
                    onChange={(e) => handleChange(e.target.value, "is_individual")}
                    variant="outlined"
                    size="small"
                    className="auto"
                >
                    <MenuItem value={"TRUE"}>حقیقی</MenuItem>
                    <MenuItem value={"FALSE"}>حقوقی</MenuItem>
                </Select>
            </FormControl>
        </div>

        <div className={classes[0]}>
            <FormControl >
                <InputLabel id="simple-gender-label" style={{ paddingRight: 17 }}>وضعیت حساب کاربری</InputLabel>
                <Select
                    id="profile-edit-is_active"
                    label="وضعیت حساب کاربری"
                    value={value.is_active}
                    onChange={(e) => handleChange(e.target.value, "is_active")}
                    variant="outlined"
                    size="small"
                    className="auto"
                >
                    <MenuItem value={"TRUE"}>فعال</MenuItem>
                    <MenuItem value={"FALSE"}>غیر فعال</MenuItem>
                </Select>
            </FormControl>
        </div>

        <div className={classes[0]}>
            <TextField disabled={true} size="small" id={`profile-edit-national_id`} label="کد ملی" variant="outlined" value={value.national_id} onChange={(e) => handleChange(e.target.value, "national_id")} />
        </div>

        <div className={classes[0]}>
            <TextField size="small" id={`profile-edit-account_code`} label="کد تفصیلی" variant="outlined" value={value.account_code} onChange={(e) => handleChange(e.target.value, "account_code")} />
        </div>

        <div className={classes[0]}>
            <TextField disabled={true} size="small" id={`profile-edit-automation_id`} label="شناسه اتوماسیون" variant="outlined" value={value.automation_id} onChange={(e) => handleChange(e.target.value, "automation_id")} />
        </div>

        <div className={classes[0]}>
            <TextField size="small" id={`profile-edit-automation_club_id`} label="شناسه باشگاه قدیم" variant="outlined" value={value.automation_club_id === "null" ? "-" : value.automation_club_id} onChange={(e) => handleChange(e.target.value, "automation_club_id")} />
        </div>


        <div className={classes[0]}>

            <DatePickerEdit label="تاریخ تولد" value={`${value.birth_date ? value.birth_date.split(' ')[0] : null}`} >
                {data => handleChange(`${dateMiladi(data)} 00:00:00.000000`, "birth_date")}
            </DatePickerEdit>
            {/* <TextField size="small" id={`profile-edit-birth_date`} label="تاریخ تولد" variant="outlined" value={dateMiladiToShamsi(value.birth_date.split(" ")[0])} onChange={(e) => handleChange(e.target.value, "birth_date")} /> */}
        </div>

        <div className={classes[0]}>
            <TextField size="small" id={`profile-edit-user`} label="نام کاربری" variant="outlined" value={value.user} onChange={(e) => handleChange(e.target.value, "user")} />
        </div>

        <div className={classes[0]}>
            <TextField size="small" id={`profile-edit-registration_date`} label="تاریخ ثبت نام" variant="outlined" value={value.registration_date === "1970/01/01 00:00:00.000000" ? "" : dateMiladiToShamsi(value.registration_date.split(" ")[0])} onChange={(e) => handleChange(e.target.value, "registration_date")} />
        </div>

        <div className={classes[0]}>
            <TextField size="small" id={`profile-edit-bourse_code`} label="  کد بورسی اوراق بهادار" variant="outlined" value={checkCodeBors(value.bourse_code)} onChange={(e) => handleChange(e.target.value, "bourse_code")} />
        </div>

        <div className={classes[0]}>
            <TextField size="small" id={`profile-edit-kala_bourse_code`} label="  کد بورسی کالا" variant="outlined" value={checkCodeBors(value.kala_bourse_code)} onChange={(e) => handleChange(e.target.value, "kala_bourse_code")} />
        </div>

        <div className={classes[0]}>
            <TextField size="small" id={`profile-edit-ati_bourse_code`} label="  کد بورسی آتی" variant="outlined" value={checkCodeBors(value.ati_bourse_code)} onChange={(e) => handleChange(e.target.value, "ati_bourse_code")} />
        </div>

        <div className={classes[0]}>
            <TextField size="small" id={`profile-edit-energy_bourse_code`} label="  کد بورسی انرژی" variant="outlined" value={checkCodeBors(value.energy_bourse_code)} onChange={(e) => handleChange(e.target.value, "energy_bourse_code")} />
        </div>

        <div className={classes[0]}>
            <TextField size="small" id={`profile-edit-energy_bourse_code`} label="  کد معرف " variant="outlined" value={checkCodeBors(value.ref_code)} onChange={(e) => handleChange(e.target.value, "ref_code")} />
        </div>



        <div style={{ textAlign: "left", marginLeft: 21, width: "100%" }}>
            <button className="btnsGreen" onClick={handleSubmit}>ویرایش</button>
        </div>
    </>
    )
}
