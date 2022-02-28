import React, { useState, useEffect } from 'react';
import Headers from "./Header";
import FilterItems from "./FilterItems";
import Tables from "./Tables/Tables";
import Box from "@material-ui/core/Box";
import { faq_v1_actions } from "../../../../boot/api/Definitions/faq/faq_v1_select/action";
import { useDispatch, useSelector } from 'react-redux';
import { distinctMethod } from "./../../../Common/method/distinctMethod";


export default function Index() {
    const [flagFilter, setFlagFilter] = useState(false);
    const dispatch = useDispatch();
    const data = useSelector(state => state.faq_v1_select_Reducer);
    const [categotyFAQ, setCategotyFAQ] = useState([]);
    const [state, setState] = useState(null);


    
    const callActionSelect = () => {
        dispatch(faq_v1_actions())
    }

    useEffect(() => {
        callActionSelect();
    }, []) //eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (data.data.response) {
            setCategotyFAQ(distinctMethod(data.data.response.data.results, ['body', 'category']))
        }
    }, [data])



    useEffect(() => {
        setState(data.data.response?.data.results)
    }, [data.data.response])

    const handleFilterData = (dataFilter) => {
   
        
       
        

        let filterData = data.data.response.data.results.filter(item => {
            if (dataFilter === "all") {
                return true
            }
            return (item.body.category === dataFilter)
        })
        setState(filterData)
    }


    return (
        <div>
            <Headers
                handelShowFilterItems={() => setFlagFilter(!flagFilter)}
                callActionSelect={callActionSelect}
            />

            <FilterItems
                flagFilter={flagFilter}
                categotyFAQ={categotyFAQ}
                handleFilterData={handleFilterData}
            />

            <Box
                style={{ width: "96.5%", height: flagFilter ? "60vh" : "80vh", margin: "0 auto", padding: "15px 0" }}
            >
                <Tables
                    data={state}
                    categotyFAQ={categotyFAQ}
                />
            </Box>

        </div>

    )
}