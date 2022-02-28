import React , {useState} from 'react'
import Header from './Header';
import Tables from './Tables/Tables'

export default function Index() {
    const [flagFilter , setFlagFilter] = useState(false)
    return (
        <div >
            <Header handelShowFilterItems={()=>setFlagFilter(!flagFilter)} />
            <Tables />
        </div>
    )
}
