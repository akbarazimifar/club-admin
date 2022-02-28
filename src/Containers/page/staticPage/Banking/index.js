import React, { useState  , useEffect} from 'react';
import{ useDispatch , useSelector} from 'react-redux';

import Header from "./Header";
import FilterItems from "./FilterItems";
import Tables from './Tables/Tables';
import {ACCOUNTS_v1_actions} from '../../../../boot/api/accounts/accounts_v1_select/action';
import {ACCOUNTS_V1_EDIT_INSERT_DELETE_ACTIONS} from '../../../../boot/api/accounts/accounts_v1_update/action';


export default function Index() {
    const [flagFilter, setflagFilter] = useState(false);
    const [filterTable, setFilterTable] = useState(false); //eslint-disable-line no-unused-vars
    const [filterSreach , SetfilterSreach] = useState(null) 

    let dispatch = useDispatch()
    const accounts_reducer = useSelector(state => state.ACCOUNTS_v1_select_Reducer.data)



    useEffect(()=>{
        api_Call_Select()
    } , [])//eslint-disable-line  react-hooks/exhaustive-deps

    const api_Call_Select  =()=>{
        dispatch(ACCOUNTS_v1_actions())
    }

    const handel_Submit_Edite = (value , index)=>{
        let data = JSON.parse(accounts_reducer.response.data.results[0].body.content);
        let id = accounts_reducer.response.data.results[0].id
        let res =  data.map((items , ind)=>{
                if(ind === index){
                    return value
                }
                return items
            })
        dispatch(ACCOUNTS_V1_EDIT_INSERT_DELETE_ACTIONS(JSON.stringify(res),id))
     
    }

    const handel_Submit_Insert = (value)=>{
    let data = JSON.parse(accounts_reducer.response.data.results[0].body.content);
    let id = accounts_reducer.response.data.results[0].id
       dispatch(ACCOUNTS_V1_EDIT_INSERT_DELETE_ACTIONS(JSON.stringify([ value , ...data]),id))
    }

    const handel_Submit_Delete = (value , index)=>{
        
        let data = JSON.parse(accounts_reducer.response.data.results[0].body.content);
        let id = accounts_reducer.response.data.results[0].id;
        let res =  data.filter((items , ind)=> index !== ind)

        dispatch(ACCOUNTS_V1_EDIT_INSERT_DELETE_ACTIONS(JSON.stringify(res),id))
    }


    
    return (
        <div>
            <Header
                handelShowFilterItems={() => setflagFilter(prev => !prev)}
                flagFilterTable={() => setFilterTable(prev => !prev)}
                handel_Submit_Insert={handel_Submit_Insert}
                api_Call_Select = {api_Call_Select}
            />
            <FilterItems flagFilter={flagFilter}  SetfilterSreach = {SetfilterSreach} accounts_reducer={accounts_reducer} />

            <Tables
                falseFilterTable={setFilterTable}
                flagFilter={flagFilter}
                filterSreach={filterSreach}
                data_reducer= {accounts_reducer ? accounts_reducer.response.data.results : []}
                handel_Submit_Edite={handel_Submit_Edite}
                handel_Submit_Delete={handel_Submit_Delete}
            />
        </div>
    )
}
