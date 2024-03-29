import React, { useEffect } from 'react'
import { Autocomplete } from '@material-ui/lab'
import { useDispatch, useSelector } from 'react-redux'
import { TextField } from '@material-ui/core'
import { stock_searchsymbol_select_action } from '../../../../boot/api/profile/summaries/stock_searchSymbol_select/action'


export default function Index({ value, setValue, label }) {

    const dispatch = useDispatch()

    const dataReducer = useSelector(state => state.stock_select_searchsymbol_reducer)

    useEffect(() => {
        if (!dataReducer.data.langth) {
            apiSelectSearchSymbol({})
        }
    }, [])

    const apiSelectSearchSymbol = (data) => {
        dispatch(stock_searchsymbol_select_action(data))
    }

    const findIsin = (value) => {

        let isin = dataReducer.data
            .filter((item => item.body.short_name === value))

        if (isin[0]) {
            return {
                isin: isin[0].body.isin,
                short_name: isin[0].body.short_name
            }
        }

        if (!isin[0]) {
            return {
                isin: '',
                short_name: value
            }
        }
    }

    const apiSubmit = (data) => {

        let isin = findIsin(data)
        setValue(isin)

        if (!data) {
            apiSelectSearchSymbol({})
            return
        }

        let _data = {
            full_name: data,
            short_name: data
        }

        apiSelectSearchSymbol(_data)
    }

    const handelChange = (value) => {

        if(!value){
            apiSelectSearchSymbol({})
        }
        
        let isin = findIsin(value)
        setValue(isin)
    }

    return (
        <Autocomplete
            id="combo-box-demo22"
            size="small"
            value={value}
            freeSolo
            options={dataReducer.data.map(item => item?.body?.short_name)}
            onChange={(event, value) =>
                handelChange(value)
            }
            onKeyUp={(event) => apiSubmit(event.target.value)}
            autoSelect={false}
            getOptionLabel={(option) => option}
            renderInput={(params) =>
                <TextField
                    size="small"
                    {...params}
                    label={label ? label :"جستجو نماد(نام مخفف)"}
                    variant="outlined"
                />}
        />
    )
}
