import React, { useEffect, useState } from "react";
import { color } from "../../../themes/color/color";
import DeftSelect from "../../../component/dropdown";
import DeftInput from "../../../component/deftInput/deftInput";
import { Icon } from "@iconify/react/dist/iconify.js";
import { OverlayTrigger, Popover } from "react-bootstrap";
import StepperButton from "../../../component/stepperButton";
import { useDispatch, useSelector } from "react-redux";
import {
  getBoardList,
  getCollageList,
  getCourseList,
  submitEducationData,
} from "../../../store/slice/onBoardingSlice";
import { sem } from "../../../component/jsonData";

export default function EducationDetails() {
  // @ts-ignore
  const { currentStep, boardList, collageList, courseList,universityList } = useSelector(
    (state) => state.onBoarding
  );
  const dispatch = useDispatch();

  const educationLevels = [
    "High School",
    "Intermediate",
    "Graduate",
    "Post Graduate",
  ];

  const [educationEntries, setEducationEntries] = useState([]);
  const [selectedQualification, setSelectedQualification] = useState("");
  const [errors, setErrors] = useState({});

  const handleAddQualification = (qualification) => {
    // Check if the qualification already exists
    const exists = educationEntries.some(entry => entry.type === qualification);
    
    if (!exists) {
      setEducationEntries([
        ...educationEntries,
        {
          type: qualification,
        },
      ]);
    } else {

      // Optionally, set an error message or notify the user
    }
  
    setSelectedQualification("");
  };
  

  const handleChange = (index, key, value) => {
    const newEntries = [...educationEntries];
    newEntries[index][key] = value;
    setEducationEntries(newEntries);
    setErrors("")
  };

  const handleSubmit = () => {
    let tempErrors = {};
    let isValid = true;

    educationEntries.forEach((entry, index) => {
      if (!entry.board) {
        isValid = false;
        tempErrors[`board-${index}`] = "Board is required.";
        return;
      }
      if (!entry.percentage) {
        isValid = false;
        tempErrors[`percentage-${index}`] = "Percentage is required.";
        return;
      }
      if (!entry.year) {
        isValid = false;
        tempErrors[`year-${index}`] = "Passing year is required.";
        return;
      }

      if (entry.type !== "Graduate" && entry.type !== "Post Graduate") {
        if (!entry.board) {
          isValid = false;
          tempErrors[`board-${index}`] = "Board is required.";
          return;
        }
      } else {
        if (!entry.course) {
          isValid = false;
          tempErrors[`course-${index}`] = "Course is required.";
          return;
        }
        if (!entry.semester) {
          isValid = false;
          tempErrors[`semester-${index}`] = "Semester is required.";
          return;
        }
        if (!entry.college) {
          isValid = false;
          tempErrors[`college-${index}`] = "College is required.";
          return;
        }
        if (!entry.university) {
          isValid = false;
          tempErrors[`university-${index}`] = "University is required.";
          return;
        }
      }
    });

    setErrors(tempErrors);

    const requestBody = {
      data: educationEntries.map(entry => {
        const baseEntry = {
          education_type: entry.type === "Graduate" ? 1 : entry.type === "High School" ? 2 : 3,
          percentage: parseInt(entry.percentage, 10), // Assuming percentage needs to be a number
          passing_year: new Date(entry.year).getFullYear(),
   
        };
    
        // Set the board only if it exists
      
    
        // For Graduate and Post Graduate types, set college, university, and course
        if (entry.type === "Graduate" || entry.type === "Post Graduate") {
          baseEntry.college = entry.college && entry.college.length > 0 ? entry.college[0].value : null;
          baseEntry.university = entry.university && entry.university.length > 0 ? entry.university[0].value : null;
          baseEntry.course = entry.course && entry.course.length > 0 ? entry.course[0].value : null;
          if(entry.type=="Graduate"){
            baseEntry.education_level=1
          }
          else{
            baseEntry.education_level=2
          }
        } else {
          // For High School, we set college and university to null as they aren't applicable
        
          if(entry.type=="High School"){
            baseEntry.school_type=1
            baseEntry.board_id= entry.board && entry.board.length > 0 ? entry.board[0].value : null;
          }
          else{
            baseEntry.school_type=2
            baseEntry.board_id= entry.board && entry.board.length > 0 ? entry.board[0].value : null;
          }
          
        }
    
        return baseEntry;
      }),
      language: "en"
    };
dispatch(submitEducationData(requestBody))

  
  };

  const handleCollageList = (type) => {
    const data = {
      page: 1,
      limit: 20,
      search_type: type,
      search: "",
    };
    dispatch(getCollageList(data));
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

  useEffect(() => {
    handleGetBoardList();
    handleCollageList(1);
    handleCollageList(2);
    handleCourseList();
  }, []);

  return (
    <div className="container">
      <h1
        className="text-black font-size-20"
        style={{ fontSize: 24, fontWeight: 700 }}
      >
        Educational Details
      </h1>
      <p
        className="font-size-14"
        style={{ color: color.secondaryGray, fontWeight: 500 }}
      >
        Enter your qualification details for us to serve you better
      </p>

      {educationEntries.map((entry, index) => (
        <div key={index}>
          {entry.type === "Graduate" || entry.type === "Post Graduate" ? (
            <>
              <div className="row align-items-center mt-3">
                <div className="col-11">
                  <div className="row">
                    <div className="col-lg-3 col-md-3 mb-3">
                      <DeftInput
                        placeholder={entry?.type}
                        value={entry?.type}
                        readOnly={true}
                      />
                    </div>
                    <div className="col-lg-3 col-md-3 mb-3">
                      <DeftSelect
                        options={courseList}
                        value={entry.course}
                        onChange={(value) =>
                          handleChange(index, "course", value)
                        }
                        placeholder="Course"
                        dropdownHeight="200px"
                        multi={false}
                        error={errors[`course-${index}`]}
                      />
                    </div>
                    <div className="col-lg-3 col-md-3 mb-3">
                      <DeftInput
                      error={errors[`year-${index}`]}
                        placeholder="Passing year"
                        type="date"
                        value={entry.year}
                        onchange={(e) =>
                          handleChange(index, "year", e.target.value)
                        }
                      />
                     
                    </div>
                    <div className="col-lg-3 col-md-3 mb-3">
                      <DeftSelect
                        options={sem}
                        error={errors[`semester-${index}`]}
                        value={entry.semester}
                        onChange={(value) =>
                          handleChange(index, "semester", value)
                        }
                        placeholder="Semester"
                        dropdownHeight="200px"
                        multi={false}
                      />
                      
                    </div>
                    <div className="col-lg-3 col-md-3 mb-3">
                      <DeftInput
                        placeholder="Percentage"
                        type="number"
                        value={entry.percentage}
                        onchange={(e) =>
                          handleChange(index, "percentage", e.target.value)
                        }
                        error={errors[`percentage-${index}`]}
                      />
                      
                    </div>
                    <div className="col-lg-3 col-md-3 mb-3">
                      <DeftSelect
                        options={collageList}
                        value={entry.college}
                        onChange={(value) =>
                          handleChange(index, "college", value)
                        }
                        placeholder="College"
                        dropdownHeight="200px"
                        multi={false}
                        error={errors[`college-${index}`] }
                      />
                     
                    </div>
                    <div className="col-lg-3 col-md-3 mb-3">
                      <DeftSelect
                        options={universityList}
                        value={entry.university}
                        onChange={(value) =>
                          handleChange(index, "university", value)
                        }
                        error={errors[`university-${index}`]}
                        placeholder="University"
                        dropdownHeight="200px"
                        multi={false}
                      />
                     
                    </div>
                  </div>
                </div>
                <div
                  className="col-1"
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
            </>
          ) : (
            <>
              <div className="row align-items-center mt-3">
                <div className="col-11">
                  <div className="row">
                    <div className="col-lg-3 col-md-3 mb-3">
                      <DeftInput
                        placeholder={entry.type}
                        value={entry.type}
                        readOnly={true}
                      />
                    </div>
                    <div className="col-lg-3 col-md-3 mb-3">
                      <DeftSelect
                        options={boardList}
                        value={entry.board}
                        onChange={(value) =>
                          handleChange(index, "board", value)
                        }
                        error={errors[`board-${index}`] }
                        placeholder="Board"
                        dropdownHeight="200px"
                        multi={false}
                      />
                      
                    </div>
                    <div className="col-lg-3 col-md-3 mb-3">
                      <DeftInput
                        placeholder="Percentage"
                        type="number"
                        value={entry.percentage}
                        onchange={(e) =>
                          handleChange(index, "percentage", e.target.value)
                        }
                        error={errors[`percentage-${index}`]}
                      />
                     
                    </div>
                    <div className="col-lg-3 col-md-3 mb-3">
                      <DeftInput
                        placeholder="Passing year"
                        type="date"
                        value={entry.year}
                        error={errors[`year-${index}`]}
                        onchange={(e) =>
                          handleChange(index, "year", e.target.value)
                        }
                      />
                      
                    </div>
                  </div>
                </div>
                <div
                  className="col-1"
                  onClick={() =>
                    setEducationEntries(
                      educationEntries.filter((_, i) => i !== index)
                    )
                  }
                >
                  <Icon icon="gridicons:cross" className={"fs-5"} />
                </div>

                <hr
                  style={{ height: 1, color: color.secondaryGray }}
                  className={"py-2"}
                />
              </div>
            </>
          )}
        </div>
      ))}

      <div className="d-flex justify-content-start mt-5">
        <OverlayTrigger
          style={{ cursor: "pointer" }}
          trigger="click"
          placement="bottom"
          overlay={
            <Popover id={`popover-positioned-bottom`}>
              <Popover.Body>
                <ul style={{ listStyle: "none" }} className={"ps-0 mb-1"}>
                  {educationLevels.map((level) => (
                    <li
                      key={level}
                      style={{ cursor: "pointer" }}
                      onClick={() => handleAddQualification(level)}
                    >
                      <h6>{level}</h6>
                    </li>
                  ))}
                </ul>
              </Popover.Body>
            </Popover>
          }
        >
          <span
            className={"font-size-14"}
            style={{ color: color.blue, cursor: "pointer" }}
          >
            + &nbsp; Add Qualification
          </span>
        </OverlayTrigger>
      </div>

      <div className="mt-5">
        <StepperButton
          currentStepIndex={currentStep}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
