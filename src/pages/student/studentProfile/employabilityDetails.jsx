// @ts-nocheck


const index = (props) => {
  const { studentDetail } = props;

  console.log(
    "studentDetail?.college_education == ",
    studentDetail?.accountData?.employability
  );

  return (
    <>
      {studentDetail?.accountData?.employability?.length > 0 ? (
        studentDetail?.accountData?.employability?.map((item) => (
          <div>{item?.employ_type}</div>
        ))
      ) : (
        <div className="comingSoon" style={{ height: "6rem" }}>
          <h4>No detail added</h4>
        </div>
      )}
    </>
  );
};

export default index;
