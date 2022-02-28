import React, { useState } from 'react'
import FilterItems from './FilterItems';
import Header from './Header';
import Tables from './Tables/index';


export default function Index({ data, apiselectCreadit, national_id, setNational_id, stateClubmember }) {

    const [flagFilter, setflagFilter] = useState(false);

    const handleFilter = (date) => {
        if (date) {
            apiselectCreadit({ national_id: national_id, from_date: date })
            return
        }
        apiselectCreadit({ national_id: national_id })
    }

    return (
        <div>
            <Header
                handelShowFilterItems={() => setflagFilter(prev => !prev)}
                apiselectCreadit={apiselectCreadit}
                national_id={national_id}
                setNational_id={setNational_id}
                stateClubmember={stateClubmember}
            />
            <FilterItems
                flagFilter={flagFilter}
                handleFilter={handleFilter}
                national_id={national_id}
            />
            <Tables
                flagFilter={flagFilter}
                data={data}
            />

        </div>
    )
}
