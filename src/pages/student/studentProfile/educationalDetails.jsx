// @ts-nocheck

import moment from "moment";
import DeftInput from "../../../components/deftInput/deftInput";
import DeftSelect from "../../../components/dropdown";
import { color } from "../../../themes/color/color";
import { Icon } from "@iconify/react";
import DatePicker from "react-datepicker";
import { FormControl } from "react-bootstrap";
import "react-country-state-city/dist/react-country-state-city.css";
import {
  getBoardList,
  getClearUniversityList,
  getCollageList,
  getCourseList,
} from "../../../store/slice/onBoardingSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { PER_PAGES, sem } from "../../../utils/appEnums";

const index = (props) => {
  const { studentDetail } = props;
  const [formData, setFormData] = useState({});
  const [newCollageFieldIndex, setNewCollageFieldIndex] = useState(null);
  const [newCollageField, setNewCollageField] = useState(false);
  const [newSemester, setSemester] = useState(sem);
  const [activeIndex, setActiveIndex] = useState(null);

  const {

    boardList,
    collageList,
    courseList,
    universityList,
  } = useSelector((state) => state.onBoarding);

  const dispatch = useDispatch();
  const target = useRef(null);
  const [NewCollage, setCollageList] = useState(collageList);
  const [showPopover, setShowPopover] = useState(false);
  const [loading, setLoading] = useState(false);

  const educationLevels = [
    { id: 1, label: "High School" },
    { id: 2, label: "Intermediate" },
    { id: 3, label: "Graduate" },

    { id: 4, label: "Post Graduate" },
  ];

  const [educationEntries, setEducationEntries] = useState([]);
  const [selectedQualification, setSelectedQualification] = useState("");
  const [errors, setErrors] = useState({});

  // this function for add field
  const handleAddQualification = (qualification) => {
    // Check if the qualification already exists

    const entries = educationEntries || []; // Fallback to an empty array
    const exists = entries.some((entry) => entry?.entry_type === qualification);
    // const exists = educationEntries?.some(
    // (entry) => entry?.entry_type === qualification
    // );

    if (!exists) {
      setEducationEntries([
        ...entries,
        {
          entry_type: qualification,
          type:
            qualification === 1
              ? "High School"
              : qualification === 2
              ? "Intermediate"
              : qualification === 3
              ? "Graduate"
              : "Post Graduate",
        },
      ]);
    } else {
      // Optionally, set an error message or notify the user
    }

    setSelectedQualification("");
  };
  useEffect(() => {
    handleAddQualification(3);
  }, [educationEntries, handleAddQualification]);

  useEffect(() => {
    handleCollageList(1);
    const mappedEntries = studentDetail?.accountData?.education_details?.map(
      (item) => {
        if (item.school_type) {
          const boardObj = boardList?.find(
            (board) => board?.value === item?.board_id
          );
          console.log("board obj ===>", boardObj);

          return {
            id: item?._id,
            entry_type: item?.entry_type,
            type:
              item?.entry_type === 1
                ? "High School"
                : item?.entry_type === 2 && "Intermediate",
            percentage: item?.percentage,
            year: item?.passing_year,
            board: boardObj,
          };
        } else {
          const rawCourse = courseList?.find(
            (course) => course?._id === item?.course_id
          );
          console.log("list of university",universityList);
          const courseObj = rawCourse
            ? { value: rawCourse._id, label: rawCourse.name }
            : null;

        
          const collageObj = {
            name: item?.college_data?.college_name,
            id: item?.college_data?._id,
          };
          
          setCollageList(null);

          return {
            id: item._id,
            entry_type: item?.entry_type,
            type: item?.education_level === 1 ? "Graduate" : "Post Graduate",
            course: courseObj,

            percentage: item?.percentage,

            collage: collageObj,

            university: {
              value: item?.university_data?._id,
              label: item?.university_data?.university_name,
            },

            semester: {
              value: item?.semester,
              label: item?.semester,
            },
            start_year: item?.start_year,
            end_year: item?.end_year,
          };
        }
      }
    );
    setEducationEntries(mappedEntries);
    console.log(educationEntries);
  }, [studentDetail]);

  // handle change this function is common for all
  const handleChange = (index, key, value) => {
    const newEntries = [...educationEntries];
    newEntries[index][key] = value;
    setEducationEntries(newEntries);
    setErrors((prevErrors) => ({ ...prevErrors, [`${key}-${index}`]: "" })); // Clear specific error

    // If the key is 'board', ensure it's not null or undefined
    if (key === "board" && value && value.length > 0) {
      newEntries[index].board = value; // Assuming single selection
    }
    if (key === "course") {
      const selectedValue = courseList.find(
        (opt) => opt.value === value?.value
      );
      setSemester(
        selectedValue?.semesters?.map((item) => ({ label: item, value: item }))
      );
    }
    if (key === "collage") {
      console.log(key, index, value);
    }
  };

  const handleUniversityChange = (event, index) => {
    setActiveIndex(index);
    handleCollageList(2);
    const value = event.target.value;
    // let other = [
    // {
    // id: null,
    // name: "Other College",
    // },
    // ];

    // setCollageList(collageList.concat(other));

    if (value) {
      handleChange(index, "university", value);

      const data = {
        page: 1,
        limit: 120,
        search_type: 2,
        search: value,
      };

      dispatch(getCollageList(data));
    } else {
      handleChange(index, "university", "");
      // setFormData((formData) => ({
      // ...formData,
      // collageInputText: "",
      // }));

      handleCollageList(2, "");
    }
  };

  const handleSubmit = (handleNextStep) => {
    let tempErrors = {};
    let isValid = true;

    educationEntries?.forEach((entry, index) => {
      // Check qualification type-specific validations

      // For Graduate and Post Graduate types
      if (entry?.entry_type === 3 || entry?.entry_type === 4) {
        if (!entry?.course) {
          isValid = false;
          tempErrors[`course-${index}`] = "Course is required.";
        }
        if (!entry?.semester) {
          isValid = false;
          tempErrors[`semester-${index}`] = "Semester is required.";
        }
        if (!entry?.start_year) {
          isValid = false;
          tempErrors[`start_year-${index}`] = "Start year is required.";
        }
        if (!entry?.end_year) {
          isValid = false;
          tempErrors[`end_year-${index}`] = "End year is required.";
        } else if (entry.end_year <= entry.start_year) {
          isValid = false;
          tempErrors[`end_year-${index}`] = "Please select valid end year .";
        }
        if (!entry?.percentage) {
          isValid = false;
          tempErrors[`percentage-${index}`] = "Percentage is required.";
        } else {
          // Validate percentage as a number between 1 and 100
          const percentageValue = parseInt(entry.percentage);
          if (
            isNaN(percentageValue) ||
            percentageValue < 1 ||
            percentageValue > 100
          ) {
            isValid = false;
            tempErrors[`percentage-${index}`] =
              "Percentage must be between 1 and 100.";
          }
        }
        if (!entry?.collage?.name) {
          isValid = false;
          tempErrors[`collage-${index}`] = "Collage is required.";
        }
        if (!entry?.university) {
          isValid = false;
          tempErrors[`university-${index}`] = "University is required.";
        }
      } else {
        if (
          !entry?.board &&
          entry?.entry_type !== 3 &&
          entry?.entry_type !== 4
        ) {
          isValid = false;
          tempErrors[`board-${index}`] = "Board is required.";
        }

        if (!entry?.percentage) {
          isValid = false;
          tempErrors[`percentage-${index}`] = "Percentage is required.";
        } else {
          // Validate percentage as a number between 1 and 100
          const percentageValue = parseInt(entry.percentage);
          if (
            isNaN(percentageValue) ||
            percentageValue < 1 ||
            percentageValue > 100
          ) {
            isValid = false;
            tempErrors[`percentage-${index}`] =
              "Percentage must be between 1 and 100.";
          }
        }
        if (!entry?.year) {
          isValid = false;
          tempErrors[`year-${index}`] = "Passing year is required.";
        } else {
          // Optionally, validate year format or range
          const yearValue = new Date(entry.year).getFullYear();
          if (
            isNaN(yearValue) ||
            yearValue < 1900 ||
            yearValue > new Date().getFullYear()
          ) {
            isValid = false;
            tempErrors[`year-${index}`] = "Invalid passing year.";
          }
        }
      }
    });

    setErrors(tempErrors);

    if (!isValid) return; // Stop submission if validation fails

    const requestBody = {
      data: educationEntries?.map((entry) => {
        const baseEntry = {
          id: entry?.id,
          education_type:
            entry?.entry_type === 3 || entry?.entry_type === 4 ? 2 : 1,
          percentage: parseInt(entry?.percentage),

          entry_type: entry?.entry_type,
        };

        // Set college, university, and course for Graduate and Post Graduate
        if (entry?.entry_type === 3 || entry?.entry_type === 4) {
          baseEntry.college = entry?.collage?.id;
          baseEntry.university = entry?.university?.value;
          baseEntry.course = entry?.course?.value;
          baseEntry.education_level = entry?.entry_type === 3 ? 1 : 2;
          baseEntry.start_year = entry?.start_year;
          baseEntry.semester = entry?.semester?.value;
          baseEntry.end_year = entry?.end_year;
          baseEntry.other_college = entry?.other;
        } else {
          baseEntry.school_type = entry?.entry_type === 1 ? 1 : 2;
          baseEntry.board_id = entry.board?.value;
          baseEntry.passing_year = entry?.year;
        }

        return baseEntry;
      }),
      language: "en",
    };
    dispatch(submitEducationData(requestBody, handleNextStep, setLoading));
  };

  const handleGetBoardList = () => {
    const data = {
      page: 1,
      limit: 50,
      search: "",
    };
    dispatch(getBoardList(data));
  };

  const handleCourseList = () => {
    const data = {
      page: 1,
      limit: 20,
      search: "",
    };
    dispatch(getCourseList(data));
  };
  const remainingOptions = educationLevels.filter(
    (level) =>
      !educationEntries?.some((entry) => entry?.entry_type === level?.id)
  );

  // handle collage change
  const handleUniversitySelect = (item, index) => {
    console.log(item, index);
    let collageObj = NewCollage?.find(
      (collage) => collage?.name == item?.target?.innerText
    );
    // setFormData((formData) => ({
    // ...formData,
    // collageInputText: item?.target?.innerText,
    // }));

    handleChange(index, "university", item);
    dispatch(getClearUniversityList());
  };
  const handleCollageList = (type) => {
    const data = {
      page: PER_PAGES?.PAGES,
      limit: PER_PAGES?.PER_Pages,
      search_type: type,
      search: "",
    };
    dispatch(getCollageList(data));
  };
  // this function for collage collage change
  const handleCollageChange = (event, index) => {
    setActiveIndex(index);
    handleCollageList(1);
    const value = event.target.value;
    let other = [
      {
        id: null,
        name: "Other College",
      },
    ];

    setCollageList(collageList.concat(other));

    if (value) {
      handleChange(index, "collage", value);

      const data = {
        page: 1,
        limit: 120,
        search_type: 1,
        search: value,
      };

      dispatch(getCollageList(data));
    } else {
      handleChange(index, "college", "");
      // setFormData((formData) => ({
      // ...formData,
      // collageInputText: "",
      // }));

      handleCollageList(1, "");
    }
  };
  // this function for collage selecting
  const handleCollageSelect = (item, index) => {
    let collageObj = NewCollage?.find(
      (collage) => collage?.name == item?.target?.innerText
    );
    // setFormData((formData) => ({
    // ...formData,
    // collageInputText: item?.target?.innerText,
    // }));
    setNewCollageField((prev) => ({
      ...prev,
      [index]: collageObj?.name === "Other College", // Set to true if 'other collage' is selected
    }));
    const data = {
      name: collageObj?.name,
      id: collageObj?.id,
    };
    handleChange(index, "collage", data);
    setCollageList(null);
  };
  useEffect(() => {
    handleGetBoardList();
    handleCourseList();
  }, [studentDetail]);

  return (
    <>
      {studentDetail?.accountData?.education_details?.length > 0}
      <div className="">
        <h1
          className="text-black font-size-20"
          style={{ fontSize: 24, fontWeight: 700 }}
        >
          Educational Details
        </h1>
 

        {educationEntries?.map((entry, index) => (
          <div key={index}>
            <div className="row align-items-center mt-3">
              <div className="col-12">
                <div className="row align-items-center">
                  <div className="col-lg-3 col-md-3 mb-3">
                    <DeftInput
                      placeholder={entry.type}
                      value={entry.type}
                      readOnly={true}
                    />
                  </div>

                  {entry.entry_type === 1 || entry.entry_type === 2 ? (
                    <>
                      <div className="col-lg-3 col-md-3 mb-3 d-flex align-items-center">
                        <DeftSelect
                          options={boardList}
                          value={entry?.board}
                          disabled={true}
                          onChange={(e) => {
                            const selectedValue = e.target.value;
                            const boardObj = boardList.find(
                              (item) => item?.value === selectedValue
                            );

                            handleChange(index, "board", boardObj);
                          }}
                          error={errors[`board-${index}`]}
                          placeholder="Board"
                          dropdownHeight="200px"
                          multi={false}
                        />
                      </div>
                      <div className="col-lg-3 col-md-3 mb-3">
                        <DeftInput
                          placeholder="Percentage"
                          type="text"
                          maxLength={4}
                          value={entry?.percentage}
                          onChange={(e) => {
                            const value = e?.target?.value;

                            // Use a regular expression to validate the percentage in points (0-100)
                            const regex = /^(100|[1-9]?[0-9])?$/;

                            // If the value is valid according to the regex, update it
                            if (regex.test(value)) {
                              handleChange(index, "percentage", value); // Update percentage value
                            } else {
                              // Optionally, handle the invalid case
                              handleChange(index, "percentage", ""); // Reset to an empty string or provide a default value
                            }
                          }}
                          error={errors[`percentage-${index}`]}
                        />
                      </div>
                      <div className="col-lg-3 col-md-3 mb-3">
                        <DatePicker
                          placeholderText="Passing year"
                          className="w-100"
                          disabled

                          selected={
                            entry?.year ? new Date(`${entry.year}-01-01`) : null
                          }
                          onChange={(date) =>
                            handleChange(
                              index,
                              "year",
                              moment(date).format("YYYY")
                            )
                          }
                          customInput={
                            <FormControl
                              className="example-custom-input border rounded-2"
                              style={{ height: 38 }}
                            />
                          }
                          showYearPicker
                          dateFormat="yyyy"
                        />
                        {errors[`year-${index}`] && (
                          <div className="text-danger">
                            {errors[`year-${index}`]}
                          </div>
                        )}
                      </div>
                    </>
                  ) : entry.entry_type === 3 || entry.entry_type === 4 ? (
                    <>
                      <div className="col-lg-3 col-md-3 mb-3 d-flex align-items-center">
                        
                        <DeftSelect
                          options={courseList?.map((item) => ({
                            label: item?.name,
                            value: item?._id,
                          }))}
                          value={entry?.course?.value}
                          disabled={true}
                          onChange={(event) => {
                            const selectedValue = event.target.value;
                            const courseObj = courseList.find(
                              (item) => item.value === selectedValue
                            );

                            handleChange(index, "course", courseObj);
                          }}
                          placeholder="Course"
                          dropdownHeight="200px"
                          multi={false}
                          error={errors[`course-${index}`]}
                        />
                      </div>
                      <div className="col-lg-3 col-md-3 mb-3">
                        <DatePicker
                          placeholderText="Start Year"
                          className="w-100"
                          disabled

                          selected={
                            entry?.start_year
                              ? new Date(`${entry.start_year}-01-01`)
                              : null
                          }
                          onChange={(date) =>
                            handleChange(
                              index,
                              "start_year",
                              moment(date).format("YYYY")
                            )
                          }
                          customInput={
                            <FormControl
                              className="example-custom-input border rounded-2"
                              style={{ height:38 }}
                            />
                          }
                          showYearPicker
                          dateFormat="yyyy"
                        />
                        {errors[`start_year-${index}`] && (
                          <div className="text-danger">
                            {errors[`start_year-${index}`]}
                          </div>
                        )}
                      </div>
                      <div className="col-lg-3 col-md-3 mb-3">
                        <DatePicker
                          placeholderText="End Year"
                          disabled

                          selected={
                            entry?.end_year
                              ? new Date(`${entry.end_year}-01-01`)
                              : null
                          }
                          onChange={(date) =>
                            handleChange(
                              index,
                              "end_year",
                              moment(date).format("YYYY")
                            )
                          }
                          customInput={
                            <FormControl
                              className="example-custom-input border rounded-2"
                              style={{ height:38 }}
                            />
                          }
                          showYearPicker
                          dateFormat="yyyy"
                        />
                        {errors[`end_year-${index}`] && (
                          <div className="text-danger">
                            {errors[`end_year-${index}`]}
                          </div>
                        )}
                      </div>
                      <div className="col-lg-3 col-md-3 mb-3 d-flex align-items-center">
                        <DeftSelect
                          options={newSemester}
                          disabled={true}
                          error={errors[`semester-${index}`]}

                          value={entry?.semester?.value}
                          onChange={(event) => {
                            const value = event.target.value;
                            const label =
                              event.target.options[event.target.selectedIndex]
                                .text; // Get the label from the selected option

                            const semesterObject = {
                              value: value,
                              label: label,
                            };

                            handleChange(index, "semester", semesterObject);
                          }}
                          placeholder="Semester"
                          dropdownHeight="200px"
                          multi={false}
                        />
                      </div>
                      <div className="col-lg-3 col-md-3 mb-3">
                        <DeftInput
                          placeholder="Percentage"
                          type="text"
                          maxLength={6}
                          readOnly={true}
                          value={entry.percentage}
                          onChange={(e) => {
                            const value = e?.target?.value;

                            // Use a regular expression to validate the percentage in points (0-100)
                            const regex = /^(100|[1-9]?[0-9])?$/;

                            // If the value is valid according to the regex, update it
                            if (regex.test(value)) {
                              handleChange(index, "percentage", value); // Update percentage value
                            } else {
                              // Optionally, handle the invalid case
                              handleChange(index, "percentage", ""); // Reset to an empty string or provide a default value
                            }
                          }}
                          error={errors[`percentage-${index}`]}
                        />
                      </div>
                      <div className="col-lg-3 col-md-3 mb-3">
                        <div className="position-relative">
                          <input
                            type="text"
                            readOnly={true}
                            className="form-control autocomplete-input"
                            placeholder="Collage Name"
                            value={entry?.collage?.name} // Ensure this reflects the form state
                            onChange={(event) =>
                              handleCollageChange(event, index)
                            }
                            autoComplete="off"
                          />
                          {activeIndex === index && NewCollage?.length > 0 && (
                            <div className="autocomplete-suggestions" disabled>
                              {NewCollage.map((item, key) => (
                                <div
                                  key={key}
                                  className="autocomplete-suggestion"
                                  onClick={(event) =>
                                    handleCollageSelect(event, index)
                                  } // Ensure the event is passed correctly
                                >
                                  {item?.name}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        {errors[`collage-${index}`] && (
                          <div className="text-danger">
                            {errors[`collage-${index}`]}
                          </div>
                        )}
                      </div>
                      {newCollageField[index] && (
                        <div className="col-lg-3 col-md-3 mb-3">
                          <>
                            <DeftInput
                              value={entry?.other}
                              placeholder="Enter your Collage Name *"
                              error={errors[`other-${index}`]}
                              onChange={(event) => {
                                const selectedValue = event.target.value; // Get selected value
                                // Log selected value

                                handleChange(index, "other", selectedValue); // Call handleChange
                              }}
                            />
                          </>
                        </div>
                      )}
                      <div className="col-lg-3 col-md-3 mb-3">
                        <div className="position-relative">
                          <input
                            type="text"
                            readOnly={true}
                            className="form-control autocomplete-input"
                            placeholder="University Name"
                            value={entry?.university?.label} // Ensure this reflects the form state
                            onChange={(event) =>
                              handleUniversityChange(event, index)
                            }
                            autoComplete="off"
                          />
                          {activeIndex === index &&
                            universityList?.length > 0 && (
                              <div className="autocomplete-suggestions">
                                {universityList.map((item, key) => (
                               
                                  <div
                                    key={key}
                                    className="autocomplete-suggestion"
                                    onClick={(event) => {
                                      // const selectedValue = event.target.value; // Get selected value
                                      // // Log selected value
                                      // const universityObj = universityList?.find(
                                      //   (item) =>
                                      //     item?.label === event.target.value
                                      // );
                                      // console.log();
                                      handleUniversitySelect(item, index);
                                    }} // Ensure the event is passed correctly
                                  >
                                    
                                    {item?.label}
                                  </div>
                                ))}
                              </div>
                            )}
                        </div>
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
              <div
                className={`${
                  entry.entry_type === 3 ? "d-none" : "col-1 mb-3 d-none "
                }`}
                onClick={() =>
                  setEducationEntries(
                    educationEntries.filter((_, i) => i !== index)
                  )
                }
              >
                <Icon icon="gridicons:cross" className={"fs-5"} />
              </div>
            </div>
            <hr />
          </div>
        ))}

        {/* <div className="d-flex justify-content-start mt-5">
        <Overlay
          style={{ cursor: "pointer" }}
          target={target.current}
          show={showPopover}
          placement="bottom"
        >
          <Popover id={`popover-positioned-bottom`}>
            <Popover.Body>
              <ul style={{ listStyle: "none" }} className={"ps-0 mb-1"}>
                {remainingOptions?.map((level) => (
                  <li
                    key={level}
                    style={{ cursor: "pointer", marginTop: "1rem" }}
                    onClick={() => {
                      setShowPopover(!showPopover);
                      handleAddQualification(level?.id);
                    }}
                  >
                    <h6>{level?.label}</h6>
                  </li>
                ))}
              </ul>
            </Popover.Body>
          </Popover>
        </Overlay>
        {remainingOptions.length > 0 && (
          <span
            className={"font-size-14"}
            ref={target}
            style={{ color: color.blue, cursor: "pointer" }}
            onClick={() => setShowPopover(!showPopover)}
          >
            + &nbsp; Add Qualification
          </span>
        )}
      </div> */}

        {/* <div className="d-flex justify-content-start mt-5 d">
        <Overlay
          style={{ cursor: "pointer" }}
          target={target.current}
          show={showPopover}
          placement="bottom"
        >
          <Popover id={`popover-positioned-bottom`}>
            <Popover.Body>
              <ul style={{ listStyle: "none" }} className={"ps-0 mb-1"}>
                {remainingOptions?.map((level) => (
                  <li
                    key={level}
                    style={{ cursor: "pointer", marginTop: "1rem" }}
                    onClick={() => {
                      setShowPopover(!showPopover);
                      handleAddQualification(level?.id);
                    }}
                  >
                    <h6>{level?.label}</h6>
                  </li>
                ))}
              </ul>
            </Popover.Body>
          </Popover>
        </Overlay>
        {remainingOptions.length > 0 && (
          <span
            className={"font-size-14"}
            ref={target}
            style={{ color: color.blue, cursor: "pointer" }}
            onClick={() => setShowPopover(!showPopover)}
          >
            + &nbsp; Add Qualification
          </span>
        )}
      </div> */}
      </div>

      {studentDetail?.accountData?.education_details?.length == 0 ? (
        <div className="comingSoon" style={{ height: "6rem" }}>
          <h4>No detail added</h4>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default index;
