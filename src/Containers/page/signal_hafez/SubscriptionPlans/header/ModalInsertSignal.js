import React, { useState } from 'react'
import { Box, TextField } from '@material-ui/core'

export default function ModalInsertSignal({ setOpen ,handleSubmitInsert}) {
    const [state, setstate] = useState({
        title: "",
        required_bonus: "",
        duration: "",
        description: "",
    })

    const handleChangeValueInsert = (value, type) => {
        setstate(prev => ({
            ...prev, [type]: value
        }))
    }

    const handleSubmit = () => {
        if(!state.title){
            alert("وارد کردن عنوان الزامی است.")
            return
        }
        if(!state.required_bonus){
            alert("وارد کردن امتیاز مورد نیاز الزامی است.")
            return
        }
        if(!state.duration){
            alert("وارد کردن مدت زمان اشتراک الزامی است.")
            return
        }
        if(!state.description){
            alert("وارد کردن توضیحات الزامی است.")
            return
        }
        handleSubmitInsert(state)
        setOpen(false)
    }


    return (
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
                <button className="btnsRed" onClick={() => setOpen(false)}>انصراف</button>
            </Box>

        </Box>
    )
}
