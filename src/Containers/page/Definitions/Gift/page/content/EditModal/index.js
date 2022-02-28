import React, { useState, useEffect } from 'react'
import Styles from './index.module.scss';
import CardImages from './CardImages';
import Inputs from './Inputs';


export default function Index({ setNewButton, data, apiGiftUpdate }) {

    const [state, setstate] = useState({
        title: "",
        name: "",
        gift_category: "",
        gift_sub_category: "",
        type: "",
        required_bonus: "",
        remained_capacity: null,
        expiration_time: "",
        image: "",
        is_physical: false,
        description: "",
        detailed_description: "",
        gift_code: "" ,
        is_active: null
    })

    const handelSubmit = () => {
        setNewButton(false)
        let res = {
            ...state,
            is_physical: state.is_physical === true ? "FALSE" : "TRUE",
            
            gift_code : state.gift_code ? state.gift_code : null
        }



        apiGiftUpdate(res, data.id)

    }

    useEffect(() => {
        if (data.body) {
            let res = {
                ...data.body,
                is_physical: data.body.is_physical === "TRUE" ? false : true
            }
            setstate(res)
        }
    }, [data])

    return (
        <div className={Styles['card']}>
            <div className={Styles['modal']}>
                <div className={Styles['cardImges']}>
                    <CardImages stateImages={state} SetStateImages={setstate} />
                </div>
                <div className={Styles['inputs']}>
                    <Inputs state={state} setstate={setstate} />
                </div>
            </div>
            <div className={Styles['btns']}>
                <button className={'btnsGreen'} onClick={() => handelSubmit()} >ذخیره </button>
                <button className={'btnsRed'} onClick={() => setNewButton(false)} >انصراف </button>
            </div>
        </div>
    )
}
