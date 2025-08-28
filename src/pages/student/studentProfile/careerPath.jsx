// @ts-nocheck

import { useResponsive } from "../../../hooks/useResponsive";

const index = (props) => {
  const { studentDetail } = props;
const {screenType}=useResponsive();
  console.log(
    "studentDetail?.college_educationfdfsd == ",
    studentDetail?.accountData?.skillDetails
  );

  return (
    <>
    <div>
    <h1
          className="text-black font-size-20"
          style={{ fontSize: 24, fontWeight: 700 }}
        >
       Career Path 
        </h1>
        <div className="row">
        {    studentDetail?.accountData?.skillDetails?.map((item, index) => (
          console.log("check",item),
          <div
            key={index} // Use index as key for mapping
            className={`${
              screenType === "MOBILE"
                ? "col-12 pb-3 d-flex justify-content-center"
                : "col-md-4 mb-3"
            }`}
          >
            <div

              className={`rounded-4 d-flex justify-content-center align-items-center  bg-white  px-4 py-4  border-1 border`}
              style={{ width: 200, cursor: "pointer",borderRadius:25 }}
            >
     

                
              <div className="d-flex justify-content-center flex-column gap-2">
                <img
                  src={item?.image}
                  alt={item?.skillName} // Set alt text for accessibility
                  style={{ width: 80, height: 80, objectFit: "contain" }}
                />
                <h6 className="text-center mt-2">{item?.skillName}</h6>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
      
    </>
  );
};

export default index;
