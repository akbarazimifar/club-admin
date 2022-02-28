import React, { useEffect, useState } from 'react';
import Header from "./Header";
import Box from "@material-ui/core/Box";
import TextField from '@material-ui/core/TextField';

import { useDispatch, useSelector } from 'react-redux';
import { education_video_v1_select_actions } from "../../../../boot/api/staticPage/education_video/education_video_v1_select/action";
import { education_video_v1_update_actions } from "../../../../boot/api/staticPage/education_video/education_video_v1_update/action";





export default function Index() {
    const dispatch = useDispatch();
    const data = useSelector(state => state.education_video_v1_select_Reducer);
    const [value, setValue] = useState("");


    const apiCallSelect = () => {
        dispatch(education_video_v1_select_actions())
    }

    useEffect(() => {
        apiCallSelect()
    }, []) //eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (data?.data.response?.data.results[0])
            setValue(data?.data.response?.data.results[0].body.content)

    }, [data])


    const handleSubmitUpdate = () => {

        let { id } = data?.data.response?.data.results[0]

        dispatch(education_video_v1_update_actions(value, id))
    }

    return (
        <div>
            <Header 
            handleRefresh={apiCallSelect}
            />

            <div
                className={"boxCustom"}
            >
                <Box
                    display="flex"
                >
                    <Box
                        width="400px"
                    >
                        <TextField
                            id="standard-select-currency"
                            label={"دسته بندی"}
                            value={value}
                            onChange={(event) => {
                                let { value } = event.target;
                                setValue(value)
                            }}
                            helperText=""
                            size="small"
                            fullWidth
                            variant="outlined"
                        />
                    </Box>

                    <Box
                        mt={0}
                    >
                        <button
                            className="btnsGreen"
                            onClick={handleSubmitUpdate}
                        >
                            ذخیره
                    </button>
                    </Box>
                </Box>
            </div>
        </div>
    )
}
