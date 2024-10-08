import React, { useEffect, useState } from "react";
import c from "../../../../assets/img/courses/C.svg";
import node from "../../../../assets/img/courses/node.svg";
import python from "../../../../assets/img/courses/Python.svg";
import java from "../../../../assets/img/courses/java.svg";
import php from "../../../../assets/img/courses/PHP.svg";
import go from "../../../../assets/img/courses/new.svg";
import { useResponsive } from "../../../../hooks/useResponsive";
import CourseDetailsModal from "../../../../component/modal/courseDetail/courseDetailsModal";
export default function Courses() {
  const { screenType } = useResponsive();
  const [options] = useState({
    chart: {
      height: 350,
      type: 'line',
    },
    title: {
  
      align: 'left',
    },
    xaxis: {
      categories: ['2018', '2019', '2020', '2021', '2022', '2023'],
    },
    stroke: {
      curve: 'smooth',
    },
  });

  const [series] = useState([
    {
      name: 'Series 1',
      data: [30, 40, 35, 50, 49, 60, 70],
    },
  
  ]);

  const [courseDetails,setCourseDetails]=useState(false)
  const Images = [
    {
      src: node,
    },
    {
      src: php,
    },
    {
      src: python,
    },
    {
      src: java,
    },
    {
      src: go,
    },
    {
      src: c,
    },
  ];
  const Programming=[{
    label:"Data Structure"
  },
  {
    label:"Algorithm"
  },
  {
    label:"DBMS"
  },
  {
    label:"OOPS"
  }]
  const openModal=()=>{
setCourseDetails(true)
  }
  useEffect
  (() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="row">
        {Images?.map((item) => {
          return (
            <>
              <div 
                className={` ${
                  screenType == "MOBILE"
                    ? "col-12 pb-3 d-flex justify-content-center"
                    : " col-md-4 mb-3"
                }`}
                key={item}
              >
                <div onClick={openModal}
                  className="border rounded-4 d-flex justify-content-center align-items-center px-4 py-2"
                  style={{ width: 200 ,cursor:"pointer"}}
                >
                  <img
                    src={item?.src}
                    alt=""
                    style={{ width: 80, height: 80, objectFit: "contain" }}
                  />
                </div>
              </div>
            </>
          );
        })}
      </div>
      {courseDetails && <CourseDetailsModal  open={courseDetails} options={options} series={series} Programming={Programming} handleClose={()=>{
        setCourseDetails(false)
      }}/>}
    </>
  );
}
