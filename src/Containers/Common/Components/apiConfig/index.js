import axios from "axios";

const axiosCustom = (_config, _data) => {
  const { token, member_id } = JSON.parse(sessionStorage.getItem("login"))
    ? JSON.parse(sessionStorage.getItem("login"))
    : { token: null, member_id: null };

  let config = {
    // baseURL: "http://192.168.73.64:4238/GradDB/V1/",
    baseURL: getUrl(),
    // baseURL: "http://192.168.39.207:7001/GradDB/V1/",
    method: "post",
    headers: { "content-type": "application/json" },
    ..._config,
    data: {
      // api_key: "d025488f-8ec6-4434-afbe-b6a5343815a7",
      api_key: "f8f8a4bc-62d4-4917-881b-1254004f0c0c",
      token,
      member_id,
      ..._data,
      // table: "",
      // method_type: "login",
      // data: {
      //     "user": "ERFAN",
      //     "pass": "ERF1234"
      // }
    },
  };
  // console.log("config", config);
  return axios(config);
};

function getUrl() {
  let protocol = window.location.protocol;
  let hostName = window.location.hostname;

  if (!protocol || !hostName || hostName === "localhost") {
    //   return "http://clubadmin.mobinsb.net/GradDB/V1/"
    return "http://192.168.231.31:7001/GradDB/V1/";
  }

  return `${protocol}//${hostName}/GradDB/V1/`;
}

export default axiosCustom;
