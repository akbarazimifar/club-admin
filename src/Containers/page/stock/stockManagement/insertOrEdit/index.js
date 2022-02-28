import { Box, TextField, MenuItem } from '@material-ui/core'
import React, { useState, useEffect } from 'react'

const initState =
    { isin: "", back_office_id: "", short_name: "", full_name: "", sector_code: "", sector_name: "", sub_sector_code: "", flow: "", is_active: "TRUE", stock_type: "" }


export default function Index({ data, handleClose, handleSubmitEdit, handleSubmitInsert }) {
    const [state, setState] = useState(initState)

    const handleSubmit = () => {
        // alert("فعلا در دسترس نمی باشد")
        // return

        if (data) {
            if (data.body.back_office_id === "null" || !data.body.back_office_id) {
                let { isin,back_office_id,DC_CREATE_TIME,...otherState } = state
                handleSubmitEdit({ _id: data.id, ...otherState })
            } else {
                let { isin,back_office_id,DC_CREATE_TIME, ...otherState } = state
                handleSubmitEdit({ _id: data.id, ...otherState })
            }
        } else {
            handleSubmitInsert(state)
        }

        handleClose()
    }

    const handleChangeState = (value, type) => {
        setState(prev => ({
            ...prev,
            [type]: value
        }))
    }

    useEffect(() => {
        if (data) {
            let { isin, back_office_id, short_name, full_name, sector_code, sector_name, sub_sector_code, flow, is_active, stock_type } = data.body
            setState(prev => ({
                ...prev,
                isin, back_office_id, short_name, full_name, sector_code, sector_name, sub_sector_code, flow, is_active, stock_type
            }))
        }
    }, [])

    return (
        <div
            style={{ maxWidth: "85vh", backgroundColor: "white", padding: 20, }}
        >
            <div
                style={{ display: "flex", flexWrap: "wrap" }}
            >
                <Box mx={5} my={2}>
                    {
                        <TextField
                            label={"شناسه سهم"}
                            id={state.isin}
                            value={state.isin}
                            onChange={(e) => handleChangeState(e.target.value, "isin")}
                            variant="outlined"
                            size="small"
                            disabled={data ? true : false}
                        />
                    }
                </Box>


                <Box mx={5} my={2}>
                    {
                        <TextField
                            label={"شناسه اتوماسیون"}
                            id={state.back_office_id}
                            value={state.back_office_id}
                            onChange={(e) => handleChangeState(e.target.value, "back_office_id")}
                            variant="outlined"
                            size="small"
                            disabled={!data ? false : data.body.back_office_id === "null" || !data.body.back_office_id ? false : true}
                        // disabled={data ? data.body.back_office_id==="null" || !data.body.back_office_id : false}
                        />
                    }
                </Box>

                <Box mx={5} my={2}>
                    {
                        <TextField
                            label={"نام مخفف"}
                            id={state.short_name}
                            value={state.short_name}
                            onChange={(e) => handleChangeState(e.target.value, "short_name")}
                            variant="outlined"
                            size="small"
                        />
                    }
                </Box>

                <Box mx={5} my={2}>
                    {
                        <TextField
                            label={"نام کامل"}
                            id={state.full_name}
                            value={state.full_name}
                            onChange={(e) => handleChangeState(e.target.value, "full_name")}
                            variant="outlined"
                            size="small"
                        />
                    }
                </Box>

                <Box mx={5} my={2}>
                    {
                        <TextField
                            label={"کد صنعت"}
                            id={state.sector_code}
                            value={state.sector_code}
                            onChange={(e) => handleChangeState(e.target.value, "sector_code")}
                            variant="outlined"
                            size="small"
                        />
                    }
                </Box>

                <Box mx={5} my={2}>
                    {
                        <TextField
                            label={"نام صنعت"}
                            id={state.sector_name}
                            value={state.sector_name}
                            onChange={(e) => handleChangeState(e.target.value, "sector_name")}
                            variant="outlined"
                            size="small"
                        />
                    }
                </Box>

                <Box mx={5} my={2}>
                    {
                        <TextField
                            label={"کد زیرگروه"}
                            id={state.sub_sector_code}
                            value={state.sub_sector_code}
                            onChange={(e) => handleChangeState(e.target.value, "sub_sector_code")}
                            variant="outlined"
                            size="small"
                        />
                    }
                </Box>

                <Box mx={5} my={2}>
                    {
                        <TextField
                            label={"بازار"}
                            id={state.flow}
                            value={state.flow}
                            onChange={(e) => handleChangeState(e.target.value, "flow")}
                            variant="outlined"
                            size="small"
                        />
                    }
                </Box>



                <Box mx={5} my={2}>
                    {
                        <TextField
                            label={"نوع سهام"}
                            id={state.stock_type}
                            value={state.stock_type}
                            onChange={(e) => handleChangeState(e.target.value, "stock_type")}
                            variant="outlined"
                            size="small"
                            style={{ width: 210 }}
                            select
                        >
                            {/* <MenuItem value={"null"}></MenuItem> */}
                            <MenuItem value={"MORTGAGE"}>تسهیلات مسکن</MenuItem>
                            <MenuItem value={"ETF"}>صندوق قابل معامله</MenuItem>
                            <MenuItem value={"BOND"}>اوراق قرضه</MenuItem>
                            <MenuItem value={"OPTION"}>اختیار</MenuItem>
                            <MenuItem value={"IFB"}>فرابورس</MenuItem>
                            <MenuItem value={"TSE"}>بورس</MenuItem>
                            <MenuItem value={"FUTURE"}>آتی</MenuItem>
                            <MenuItem value={"ENERGY"}>انرژی</MenuItem>
                            <MenuItem value={"IME"}>کالا</MenuItem>

                        </TextField>
                    }
                </Box>

                <Box mx={5} my={2}>
                    {
                        <TextField
                            label={"وضعیت"}
                            id={state.is_active}
                            value={state.is_active}
                            onChange={(e) => handleChangeState(e.target.value, "is_active")}
                            variant="outlined"
                            size="small"
                            style={{ width: 210 }}
                            select
                        >
                            <MenuItem value={"TRUE"}>فعال</MenuItem>
                            <MenuItem value={"FALSE"}>غیرفعال</MenuItem>
                        </TextField>
                    }
                </Box>
            </div>

            <Box
                display="flex" justifyContent="end" mt={5}
            >
                <button onClick={handleSubmit} className="btnsGreen">
                    تایید
                </button>

                <button onClick={handleClose} className="btnsRed">
                    انصراف
                </button>
            </Box>
        </div>
    )
}