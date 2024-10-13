// @ts-nocheck


const index = (props) => {
  const { studentDetail } = props;

  console.log(
    "studentDetail?.college_education == ",
    studentDetail?.accountData?.college_education
  );

  console.log(
    "studentDetail?.school_education == ",
    studentDetail?.accountData?.school_education
  );

  return (
    <>
      {studentDetail?.accountData?.college_education?.length > 0
        ? studentDetail?.accountData?.college_education?.map((item) => (
            <div>{item?.education_level}</div>
          ))
        : ""}
      {studentDetail?.accountData?.school_education?.length > 0
        ? studentDetail?.accountData?.school_education?.map((item) => (
            <div>{item?.education_level}</div>
          ))
        : ""}

      {studentDetail?.accountData?.college_education?.length == 0 &&
      studentDetail?.accountData?.school_education?.length == 0 ? (
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
