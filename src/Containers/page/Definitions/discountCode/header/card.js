import React , {useEffect} from 'react'
import { makeStyles } from '@material-ui/core'
import CardFile from '../../../../Common/Components/base64Images';


const useStles = makeStyles(() => ({

    card: {
        width: "25%",
        padding: 20,
        backgroundColor: 'white',
        borderRadius:5,
    },
    file: {
        backgroundColor: 'white'
    },
    btns:{
        textAlign:'right'
    }
}));



export default function Index({ value , setValues, handelFile , apiInsertDiscount , setNewButton }) {

    const classes = useStles();

    useEffect(() => {
        
        return () => {
            setValues({ file_name: '', file: '' })
        }
    }, [])//eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className={classes['card']}>
            <div className={classes['file']}>
                <CardFile value={value} setValues={(data) => handelFile(data)} />
            </div>
            <br />
            <div className={classes['btns']}>
                <button className={'btnsGreen'} onClick={()=>apiInsertDiscount()}>تایید</button>
                <button className={'btnsRed'} onClick={()=>setNewButton((prev) => !prev)}>لغو</button>
            </div>
        </div>
    )
}
