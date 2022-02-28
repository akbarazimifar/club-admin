import React, { useState, useEffect } from "react";
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;



export default function Exlsx({ data, headers, handleExitExcel, filename }) {


    const [state, setState] = useState({
        head: [],
        data: []
    })

    useEffect(() => {
        if (headers && data) {
            setState({
                head: headers,
                data: data
            }
            )
        }
    }, [data])


    return (
        <>
            <ExcelFile
                filename={filename}
                element={
                    <p onClick={() => handleExitExcel()} >
                        تایید
                     </p>
                }
            >
                <ExcelSheet data={state.data} name={filename}>
                    {
                        
                        state.head.map((item, index) => {
                            return (
                                <ExcelColumn key={index} label={item.label} value={item.key} />
                            )
                        })
                    }

                </ExcelSheet>
            </ExcelFile>
        </>
    )
}

