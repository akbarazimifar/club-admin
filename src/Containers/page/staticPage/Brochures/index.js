import React , {useEffect} from 'react';
import Header from "./Header";
import Tables from "./Tables/Tables";
import {useDispatch , useSelector} from 'react-redux';

import {Brochures_v1_select_actions} from '../../../../boot/api/staticPage/Brochures/Brochures_v1_select/action';
import {Brochures_v1_update_actions} from '../../../../boot/api/staticPage/Brochures/Brochures_v1_update/action';


export default function Index() {

    const dispatch = useDispatch();
    const Brochures_reducer = useSelector(state => state.Brochures_v1_select_actions_Reducer.data)

    useEffect(()=>{
        api_call_select()
    },[]) //eslint-disable-line  react-hooks/exhaustive-deps

    const api_call_select = ()=>{
        dispatch(Brochures_v1_select_actions())
    }

    const handelSubmitUpdate = (value , index)=>{
        let id = Brochures_reducer.response.data.results[0].id;

        let data = JSON.parse( Brochures_reducer.response.data.results[0].body.content);
            let res = data.map((items , ind)=>{
                if(ind === index)
                    return value
                return items
            })

            dispatch(Brochures_v1_update_actions(JSON.stringify(res) , id))
    }

    const handelSubmitAdd = (value)=>{
        let id = Brochures_reducer.response.data.results[0].id;
        let data = JSON.parse( Brochures_reducer.response.data.results[0].body.content);
        let res = [value , ...data]

        dispatch(Brochures_v1_update_actions(JSON.stringify(res) , id))
    }

    const handelSubmitDelete = (index)=>{
        let id = Brochures_reducer.response.data.results[0].id;
        let data = JSON.parse( Brochures_reducer.response.data.results[0].body.content);

        let res = data.filter((items , ind)=> ind !== index)

        dispatch(Brochures_v1_update_actions(JSON.stringify(res) , id))

    }

    return (
        <div>
            <Header handelSubmitAdd= {handelSubmitAdd} api_call_select={api_call_select}  />
            <Tables Brochures_reducer={Brochures_reducer} handelSubmitUpdate={handelSubmitUpdate} handelSubmitDelete = {handelSubmitDelete}/>   
        </div>
    )
}
