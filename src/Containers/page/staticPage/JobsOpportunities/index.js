import React, { useState , useEffect } from 'react';
import Header from "./Header";
import Content from './Content';
import {useSelector , useDispatch}  from 'react-redux';
import {JobsOpportunities_v1_select_actions} from '../../../../boot/api/JobsOpportunities/JobsOpportunities_v1_select/action';
import {jobsOpportunities_v1_update_actions} from '../../../../boot/api/JobsOpportunities/JobsOpportunities_v1_update/action';


export default function Index() {
    const [flagFilter, setflagFilter] = useState(false); //eslint-disable-line no-unused-vars

    let dispatch = useDispatch()
    const JobsOpportunities_reducer = useSelector(state => state.JobsOpportunities_v1_select_Reducer.data)

    useEffect(()=>{
        api_call_select()
    } ,[] ) //eslint-disable-line react-hooks/exhaustive-deps

    const api_call_select = ()=>{
        dispatch(JobsOpportunities_v1_select_actions())
    }

    const HandelSubmit = (data)=>{
        let id =JobsOpportunities_reducer.data.response.data.results[0].id
        dispatch(jobsOpportunities_v1_update_actions(JSON.stringify(data), id))
    }


    return (
        <div>
            <Header
                HandelSubmit = {HandelSubmit}
                handelShowFilterItems={() => setflagFilter(prev => !prev)}
                data_Reducer={JobsOpportunities_reducer.data}
                api_call_select = {api_call_select}
            />

            <Content data_Reducer={JobsOpportunities_reducer.data} HandelSubmit={HandelSubmit} />
        </div>
    )
}
