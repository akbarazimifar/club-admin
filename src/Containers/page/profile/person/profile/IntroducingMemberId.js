import { TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { introduction_v1_select_action } from "../../../../../boot/api/profile/person/person_v1_introducing_details/action";
import { useDispatch, useSelector } from "react-redux";

function IntroducingMemberId({
  IntroducingMemberId,
  classes,
}) {
  const dispatch = useDispatch();


  useEffect(() => {
    if (IntroducingMemberId ) {
      dispatch(introduction_v1_select_action(IntroducingMemberId));
    }
  }, [IntroducingMemberId]);

  const state = useSelector((state) => state.introduction_v1_select_reducer);

  const [data, setdata] = useState({
    first_name: "",
    last_name: "",
    national_id: "",
    phone: "",
  });

  useEffect(() => {
    if (state.data.length) {
      setdata(state.data[0]?.body);
    } else {
      setdata({
        first_name: "",
        last_name: "",
        national_id: "",
        phone: "",
      });
    }
  }, [state.data]);


  return (
    <div>
      <h3>اطلاعات معرف</h3>
      <div style={{ display: "flex" }}>
        <div className={classes[0]}>
          <TextField
            disabled={true}
            size="small"
            label="نام"
            variant="outlined"
            value={data?.first_name}
            //   onChange={(e) => handleChange(e.target.value, "kala_bourse_code")}
          />
        </div>

        <div className={classes[0]}>
          <TextField
            disabled={true}
            size="small"
            label="نام خانوادگی"
            variant="outlined"
            value={data?.last_name}
            //   onChange={(e) => handleChange(e.target.value, "ati_bourse_code")}
          />
        </div>

        <div className={classes[0]}>
          <TextField
            disabled={true}
            size="small"
            label="کدملی"
            variant="outlined"
            value={data?.national_id}
            //   onChange={(e) => handleChange(e.target.value, "energy_bourse_code")}
          />
        </div>
        <div className={classes[0]}>
          <TextField
            disabled={true}
            size="small"
            label="تلفن همراه"
            variant="outlined"
            value={data?.phone}
            //   onChange={(e) => handleChange(e.target.value, "energy_bourse_code")}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(IntroducingMemberId)