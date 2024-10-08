import { Link, Outlet } from "react-router-dom";
import signup_modal from "../../assets/img/signup-modal.png";
import defaultImage from "../../assets/img/default.jpg";
import { useResponsive } from "../../hooks/useResponsive";

export default function AuthLayout() {
  const { screenType } = useResponsive();
  const userImage = [
    { src: defaultImage },
    { src: defaultImage },
    { src: defaultImage },
  ];

  return (
    <div className=" d-flex flex-wrap pe-0  ps-0overflow-hidden">
      <div className="col-md-12 col-lg-5 d-flex align-items-center bg-white">
        <div className="container px-lg-0 px-sm-5">
          <Outlet />
        </div>
      </div>
      <div
        className={`col-md-7 p-0 ${
          screenType == "MOBILE" || screenType == "TABLET" ? "d-none" : ""
        }`}
      >
        <div
          className="layout-bg position-relative"
          style={{
            backgroundImage: `url(${signup_modal})`,
            backgroundSize: "cover", // Optional: to cover the entire div
            height: "100vh", // Adjust height as needed
          }}
        >
          <h1 className="text-end text-white" style={{ fontWeight: 800 }}>
            Deft Rank
          </h1>
          <div className="container d-flex align-items-center position-absolute bottom-0 translate-middle-x start-50">
            <div className="mb-3" style={{ padding: "0rem 7rem" }}>
              <h1 className="font-size-50 text-start text-white">
                India's finest companies hire on AdeptRank
              </h1>
              <h6 className="font-size-20 text-start text-white">
                India's finest companies trust Adept Rank to hire.
              </h6>
              <div className="d-flex">
                <span className="text-white">
                  {userImage.map((item, i) => (
                    <img
                      key={i} // Add a unique key for each image
                      src={item.src}
                      alt=""
                      style={{
                        width: 32,
                        height: 25,
                        marginLeft: i > 0 ? "-0.5rem" : "",
                      }}
                      className="rounded-circle me-1"
                    />
                  ))}
                  3k+ people joined us
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
