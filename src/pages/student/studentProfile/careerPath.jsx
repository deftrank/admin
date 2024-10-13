// @ts-nocheck

const index = (props) => {
  const { studentDetail } = props;

  console.log(
    "studentDetail?.college_education == ",
    studentDetail?.accountData?.employability
  );

  return (
    <>
      <div className="comingSoon" style={{ height: "6rem" }}>
        <h4>Launching soon! Stay tuned for more information</h4>
      </div>
    </>
  );
};

export default index;
