import React , {useState} from 'react';
import Header from './Header';
import FilterItems from "./FilterItems";
import TableCustom from "./TableCustom";
import Tables from "./Tables"


export default function Index() {
    const [flagFilter , setFlagFilter] = useState(false)
    return (
        <div>
            <Header handelShowFilterItems={()=>setFlagFilter(!flagFilter)} />
            <FilterItems flagFilter={flagFilter}/>
            <TableCustom />
            <Tables />
        </div>
    )
}
