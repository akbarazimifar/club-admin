import { Box, TextField } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import ModalCustom from "./../../../../Common/Components/Modal";


export default function EditModal({ data, handleSubmitEdit }) {
    const [modalEdit, setmodalEdit] = useState(false)

    const [state, setstate] = useState({
        title: "",
        required_bonus: "",
        duration: "",
        description: "",
    })

    useEffect(() => {
        setstate(data.body)
    }, [data])

    const handleChangeValueInsert = (value, type) => {
        setstate(prev => ({
            ...prev, [type]: value
        }))
    }

    const handleSubmit = () => {
        let res = { ...state, _id: data.id }
        let { is_active, ...otherData } = res
        handleSubmitEdit(otherData)
        setmodalEdit(false)
    }

    return (
        <>
            <button
                className={`btnsBlue`}
                onClick={() => setmodalEdit(true)}
            >
                ویرایش
            </button>

            <ModalCustom open={modalEdit} setOpen={setmodalEdit}>
                <Box p={3}>
                    <Box display="flex">
                        <Box mr={2}>
                            <TextField
                                placeholder="عنوان"
                                fullWidth
                                variant="outlined"
                                value={state.title}
                                onChange={(e) => handleChangeValueInsert(e.target.value, "title")}
                            />
                        </Box>

                        <Box mr={2}>
                            <TextField
                                placeholder="امتیاز مورد نیاز"
                                fullWidth
                                variant="outlined"
                                value={state.required_bonus}
                                onChange={(e) => handleChangeValueInsert(e.target.value, "required_bonus")}
                            />
                        </Box>

                        <Box>
                            <TextField
                                placeholder="مدت زمان اشتراک"
                                fullWidth
                                variant="outlined"
                                value={state.duration}
                                onChange={(e) => handleChangeValueInsert(e.target.value, "duration")}
                            />
                        </Box>
                    </Box>

                    <Box mt={2}>
                        <Box>
                            <TextField
                                placeholder="توضیحات"
                                fullWidth
                                variant="outlined"
                                value={state.description}
                                onChange={(e) => handleChangeValueInsert(e.target.value, "description")}
                            />
                        </Box>
                    </Box>

                    <Box mt={4} textAlign="end">
                        <button className="btnsGreen" onClick={handleSubmit}>ثبت</button>
                        <button className="btnsRed" onClick={() => setmodalEdit(false)}>کنسل</button>
                    </Box>

                </Box>
            </ModalCustom>
        </>
    )
}
