import React, { useState, useEffect } from "react";
import Header from "./Header";
import FilterCourses from "./FilterCourses";
import TableCourses from "./Tables/TableCourses";
import FilterPerson from "./FilterPerson";
import TablePerson from "./Tables/tablePerson";
import { useSelector, useDispatch } from "react-redux";
import { registeration_v1_select_actions } from "./../../../../boot/api/Definitions/EducationCourses/registeration_v1_select/action";
import { Courses_v1_actions_select } from "../../../../boot/api/Definitions/EducationCourses/Courses_v1_select/action";
import { Courses_v1_actions_INSERT } from "../../../../boot/api/Definitions/EducationCourses/Courses_v1_inseart/action";
import { Courses_v1_actions_update } from "../../../../boot/api/Definitions/EducationCourses/Courses_v1_update/action";
import { Courses_v1_actions_deactive } from "../../../../boot/api/Definitions/EducationCourses/Courses_v1_deactive/action";
import { Courses_v1_actions_active } from "../../../../boot/api/Definitions/EducationCourses/Courses_v1_active/action";

let flag = false;

export default function Index() {
  const [flagFilter, setflagFilter] = useState(false);
  const [flagFilterapi, setflagFilterapi] = useState(false);
  const [typePage, setTypePage] = useState("COURSES");
  const [sort, setSort] = useState({});
  const [sort1, setSort1] = useState({});
  const [paginationRegistration, setPaginationRegistration] = React.useState(1);
  const [paginationRegistration1, setPaginationRegistration1] =
    React.useState(1);
  const reducerRegistration = useSelector(
    (state) => state.registeration_v1_select_Reducer
  );

  const dispatch = useDispatch();

  const [stateFilterPerson, setStateFilterPerson] = useState({
    member_national_id: "",
    course_name: "",
    status: "",
    registration_date: "",
  });
  const [FilterCoureses, setFilterCoureses] = useState({
    start_date: "",
    is_active: "",
    category: "",
    _id: "",
  });

  const checkDataFilter = () => {
    let dataExistFilter = {};

    Object.keys(stateFilterPerson)
      .filter((item) => stateFilterPerson[item])
      .forEach((item) => {
        dataExistFilter[item] = stateFilterPerson[item];
      });

    return dataExistFilter;
  };

  const handelChangeFilterPeson = (value, type) => {
    setStateFilterPerson((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleSubmitFilterPerson = () => {
    setPaginationRegistration1(1);
    // let dataExistFilter = checkDataFilter();

    // if (Object.keys(dataExistFilter).length) {
    //   apiCallSelectRegistration();
    //   return;
    // }

    apiCallSelectRegistration();
  };
  ///////////////////////////////////////////////////////////////////////////

  //////////////////////////////api call registration more////////////////////
  const handleClickMore = () => {
    let dataExistFilter = checkDataFilter();

    if (Object.keys(dataExistFilter).length) {
      dispatch(
        registeration_v1_select_actions(
          dataExistFilter,
          reducerRegistration.from + 20
        )
      );
      return;
    }

    dispatch(
      registeration_v1_select_actions({}, reducerRegistration.from + 20)
    );
  };

  //////////////////////////////api call registration////////////////////
  // const apiCallSelectRegistrationFILTER = (data) => {
  //   dispatch(registeration_v1_select_actions(data, 0));
  // };

  const apiCallSelectRegistration = () => {
    let obj = checkDataFilter();
    let { size } = reducerRegistration;
    let { id, ...sortRes } = sort1;

    dispatch(
      registeration_v1_select_actions(
        sortRes,
        size,
        paginationRegistration1,
        obj
      )
    );
  };

  useEffect(() => {
    apiCallSelectRegistration();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    apiCallSelectRegistration();
  }, [flagFilterapi]); //eslint-disable-line react-hooks/exhaustive-deps

  /////////////////////////////////////COURSES///////////////////////////////////////////////////////////

  const [courses, setCourses] = useState([]);

  const Courses_Reducer = useSelector(
    (state) => state.Courses_v1_select_Reducer
  );

  useEffect(() => {
    apiCoursesSelect();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (Courses_Reducer.data.length !== 0) {
      setCourses(Courses_Reducer.data.response.data.results);
    }
  }, [Courses_Reducer.data]); //eslint-disable-line react-hooks/exhaustive-deps

  const apiCoursesSelect = (ref) => {
    let obj = {};

    Object.keys(FilterCoureses).forEach((element) => {
      if (FilterCoureses[element]) {
        obj[element] = FilterCoureses[element];
      }
    });

    let { size } = Courses_Reducer;
    let { id, ...sortRes } = sort;
    if (ref) {
      Courses_v1_actions_select(null, size, paginationRegistration, null);
    } else {
      dispatch(
        Courses_v1_actions_select(sortRes, size, paginationRegistration, obj)
      );
    }
  };

  const apiCoursesInsert = (data) => {
    dispatch(Courses_v1_actions_INSERT(data));
  };

  const apiCoursesUpdate = (data, id) => {
    const { remained_capacity, is_active, ...rest } = data;

    let obj = {
      _id: id,
      ...rest,
    };
    dispatch(Courses_v1_actions_update(obj));
  };

  const apiCoursesActive = (data) => {
    let obj = {
      _id: data,
    };
    dispatch(Courses_v1_actions_active(obj));
  };

  const apiCoursesDeactive = (data) => {
    let obj = {
      _id: data,
    };
    dispatch(Courses_v1_actions_deactive(obj));
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleRefresh = () => {
    let ref = true;
    setPaginationRegistration(1);
    setPaginationRegistration1(1);
    setFilterCoureses({
      start_date: "",
      is_active: "",
    });
    setSort({});
    setFilterCoureses({
      start_date: "",
      is_active: "",
      category: "",
    });

    if (typePage === "COURSES") {
      apiCoursesSelect(ref);
    } else if (typePage === "PERSON") {
      setStateFilterPerson({
        member_national_id: "",
        course_name: "",
        status: "",
        registration_date: "",
      });
      setflagFilterapi(() => !flagFilterapi);
    }
  };

  useEffect(() => {
    if (flag) apiCoursesSelect();

    flag = true;
  }, [sort]);

  useEffect(() => {
    if (flag) apiCallSelectRegistration();

    flag = true;
  }, [sort1]);

  return (
    <div>
      <Header
        handelShowFilterItems={() => setflagFilter((prev) => !prev)}
        typePage={typePage}
        setTypePage={setTypePage}
        apiCoursesInsert={apiCoursesInsert}
        Courses_Reducer={Courses_Reducer}
        handleRefresh={handleRefresh}
        setFilterCoureses={setFilterCoureses}
        FilterCoureses={FilterCoureses}
        stateFilterPerson={stateFilterPerson}
      />

      {typePage === "COURSES" && (
        <>
          <FilterCourses
            setPaginationRegistration={setPaginationRegistration}
            flagFilter={flagFilter}
            apiCoursesSelect={apiCoursesSelect}
            setFilterCoureses={setFilterCoureses}
            FilterCoureses={FilterCoureses}
          />
          <TableCourses
            apiCallSelectRegistration={apiCallSelectRegistration}
            paginationRegistration={paginationRegistration}
            setPaginationRegistration={setPaginationRegistration}
            setSort={setSort}
            sort={sort}
            flagFilter={flagFilter}
            data={courses}
            Courses_Reducer={Courses_Reducer}
            apiCoursesUpdate={apiCoursesUpdate}
            apiCoursesDeactive={apiCoursesDeactive}
            apiCoursesActive={apiCoursesActive}
            apiCoursesSelect={apiCoursesSelect}
            reducerRegistration={reducerRegistration}
          />
        </>
      )}

      {typePage === "PERSON" && (
        <>
          <FilterPerson
            flagFilter={flagFilter}
            stateFilterPerson={stateFilterPerson}
            handelChangeFilterPeson={handelChangeFilterPeson}
            handleSubmitFilterPerson={handleSubmitFilterPerson}
          />
          <TablePerson
            apiCallSelectRegistration={apiCallSelectRegistration}
            setPaginationRegistration1={setPaginationRegistration1}
            paginationRegistration1={paginationRegistration1}
            sort1={sort1}
            setSort1={setSort1}
            flagFilter={flagFilter}
            reducerRegistration={reducerRegistration}
            handleClickMore={handleClickMore}
          />
        </>
      )}
    </div>
  );
}
