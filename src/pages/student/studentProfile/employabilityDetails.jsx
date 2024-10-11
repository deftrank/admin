import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
          <div>{item?.education_level}</div>
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
