import React , {useState} from 'react'
import Tables from './Tables/Tables';
import Header from './Header';
import FilterItems from './FilterItems';


export default function Index() {
    const [flagFilter , setFlagFilter] = useState(false)
    return (
        <div>
            <Header handelShowFilterItems={()=>setFlagFilter(!flagFilter)} />
            <FilterItems flagFilter={flagFilter}/>
            <Tables flagFilter={flagFilter} />
        </div>
    )
}
