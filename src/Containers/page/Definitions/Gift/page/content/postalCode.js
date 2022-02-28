import React, { useEffect, useState } from 'react'
import { Box, TextField } from '@material-ui/core'

export function PostalCode({ data, id, handleClickPostalTrackingCode }) {
    const [state, setstate] = useState("")

    useEffect(() => {
        if (data === "null" || !data) return
        else if (data) setstate(data)
    }, [data])
    return (
        <div style={{display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center'}}>
            <h4 style={{textAlign:'center',margin:'0 0 30px 0'}}>کد رهگیری پستی</h4>
            <TextField
                label="کد رهگیری پستی را وارد کنید"
                type="number"
                id="outlined-number"
                value={state}
                onChange={(e) => setstate(e.currentTarget.value)}
                style={{ width: 250 }}
                InputLabelProps={{
                    shrink: true,
                  }}
            />

            <Box mt={4}>
                <button
                    className="btnsGreen"
                    style={{ marginRight: 0 }}
                    onClick={() => handleClickPostalTrackingCode({ _id: id, postal_tracking_code: state })}
                >
                    ارسال
                </button>
            </Box>
        </div>
    )
}
