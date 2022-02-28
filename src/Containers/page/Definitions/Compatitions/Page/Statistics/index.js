import React, { useEffect } from 'react'
import Tables from './Tables';
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles({
    root: {
        display: 'flex',
        paddingLeft: 30

    }
})



export default function Index({ flagFilter, idCompetitions, apiParticipationsSelect, reducerParticipations, apiParticipationsEmpty, setPageTab2, pageTab2 }) {

    let classes = useStyles();

    useEffect(() => {
        
        return () => {
            setPageTab2(1)
        }

    }, [])


    return (
        <div>
            {
                reducerParticipations.data.length !== 0 && (
                    <>
                        {
                            reducerParticipations.total && (
                                <div className={classes['root']}>
                                    <p>
                                        تعداد کل شرکت کنندگان :
                         </p>
                                    <p>
                                        {reducerParticipations.total}
                                    </p>
                                </div>
                            )
                        }
                    </>
                )
            }
            <Tables
                setPageTab2={setPageTab2}
                pageTab2={pageTab2}
                flagFilter={flagFilter}
                idCompetitions={idCompetitions}
                apiParticipationsSelect={apiParticipationsSelect}
                apiParticipationsEmpty={apiParticipationsEmpty}
                reducerParticipations={reducerParticipations}
            />
        </div>
    )
}
