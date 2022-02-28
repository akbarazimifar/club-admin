import React from 'react'
import Styles from './index.module.scss';
import Box from "@material-ui/core/Box";
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';



export default function Index({ flagFilter, data, categotyFAQ ,handleFilterData }) {
    const [mainGroup, setMainGroup] = React.useState('');

    return (
        <>
            {
                flagFilter
                    ? (
                        <div className={Styles['filter']}>
                            <Box style={{ paddingRight: 20 }}>
                                <h3 >فیلتر اطلاعات</h3>

                                <FormControl>
                                    <InputLabel
                                        style={{ marginRight: 45 }}
                                        id="demo-simple-select-helper-label">دسته بندی</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        value={mainGroup}
                                        onChange={(event) => {
                                            let { value } = event.target
                                            setMainGroup(value)
                                        }}
                                        style={{ width: 250, marginRight: 30 }}
                                        variant="outlined"
                                    >
                                        <MenuItem value="all">
                                            <em>همه</em>
                                        </MenuItem>
                                        {
                                            categotyFAQ.map((item, ind) => (
                                                (
                                                    <MenuItem key={ind} value={item}>{item}</MenuItem>
                                                )
                                            ))
                                        }
                                    </Select>

                                </FormControl>
                            </Box>

                            <div className={Styles['btns']}>
                                <button 
                                className={"btnBlueFilter"}
                                onClick={()=>handleFilterData(mainGroup)}
                                >بازخوانی</button>
                            </div>
                        </div>

                    )
                    : ""
            }
        </>
    )
}
