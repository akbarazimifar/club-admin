/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

const filter = createFilterOptions();

export default function FreeSoloCreateOption(
    { categotyFAQ, forwardValue, categoryDataEdit }
) {
    const [value, setValue] = React.useState(
        categoryDataEdit ? { title: categoryDataEdit } : null
    );
    const [category, setCategory] = useState([])


    useEffect(() => {
        forwardValue(value)
    }, [value]) //eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        let createData = categotyFAQ.map(item => ({
            title: item
        }))

        setCategory(createData)
    }, [categotyFAQ])



    return (
        <Autocomplete
            value={value}
            // defaultValue={categoryDataEdit}
            onChange={(event, newValue) => {
                if (typeof newValue === 'string') {
                    setValue({
                        title: newValue,
                    });
                } else if (newValue && newValue.inputValue) {
                    // Create a new value from the user input
                    setValue({
                        title: newValue.inputValue,
                    });
                } else {
                    setValue(newValue);
                }
            }}
            filterOptions={(options, params) => {
                const filtered = filter(options, params);

                // Suggest the creation of a new value
                if (params.inputValue !== '') {
                    filtered.push({
                        inputValue: params.inputValue,
                        title: `اضافه کردن دسته بندی جدید: "${params.inputValue}"`,
                    });
                }

                return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            id="free-solo-with-text-demo"
            options={category}
            getOptionSelected={(option, value) => {
                return option.title === value.title
            }}
            getOptionLabel={(option) => {
                // Value selected with enter, right from the input
                if (typeof option === 'string') {
                    return option;
                }
                // Add "xxx" option created dynamically
                if (option.inputValue) {
                    return option.inputValue;
                }
                // Regular option
                return option.title;
                // return option;
            }}
            renderOption={(option) => option.title}
            //   renderOption={(option) => option}
            style={{ width: 300 }}
            freeSolo
            renderInput={(params) => (
                <TextField {...params} label="دسته بندی ها" variant="outlined" />
            )}
        />
    );
}

