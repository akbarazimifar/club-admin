import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';


export default function RadioButtonsGroup({ flag, children, activeChange }) {
  const [value, setValue] = React.useState(flag === "FALSE" ? "نمایندگی" : "شعبه");

  const handleChange = (event) => {
    if(activeChange){
      setValue(event.target.value);
      children(event.target.value === 'شعبه' ? "TRUE" : "FALSE")
    }
  };


  return (
    <FormControl component="fieldset">
      <RadioGroup
        aria-label="gender"
        name="gender1"
        value={value}
        onChange={handleChange}
        style={{ flexDirection: activeChange ? 'row' : 'column' }}
      >
        <FormControlLabel value="شعبه" control={<Radio />} label="شعبه" />
        <FormControlLabel value="نمایندگی" control={<Radio />} label="نمایندگی" />
      </RadioGroup>
    </FormControl>
  );
}