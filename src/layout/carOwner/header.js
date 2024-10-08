import { Icon } from "@iconify/react";
import React, { useRef, useState } from "react";
import profile from "../../assets/img/default.jpg";
// import { getUserProfile, handleSideBar } from '../../store/slice/auth';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
// import { loginData } from '../../components/constant';
import { Overlay } from "react-bootstrap";
// import { useResponsive } from '../../themes/useResponsive';
// import ChangePassword from '../../components/dialog/changePassword';
// import UpdateProfile from '../../components/dialog/updateProfile';
// import Autocomplete from '../../components/autocomplete';
// import notificationLogo from 'assets/img/owner-icons/Notification.png';
import { Link } from "react-router-dom";
import { useResponsive } from "../../hooks/useResponsive";
// import LogoutDialog from 'components/dialog/logout';
// import { colors } from 'themes/color';
// import { getnotificationListing } from 'store/slice/carUser/notification';
export default function OwnerHeader(props) {
  const {
    title,
    previousPage,
    previousPageUrl,
    currentPage,
    middlePage,
    middlePageUrl,
  } = props;
  const dispatch = useDispatch();
  const { screenType } = useResponsive();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [show, setShow] = useState(false);
  const target = useRef();
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);
  // const { userProfileData } = useSelector((state) => state.auth);
  // const { NotificationsList } = useSelector((state) => state.notification);
  // const { isOpenSideBar } = useSelector((state) => state.auth);
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    // if (loginData) {
    //   dispatch(getUserProfile());
    //   const data = {
    //     page: 1,
    //     limit: 10,
    //     language: 'en'
    //   };
    //   dispatch(getnotificationListing(data));
    // }
  }, []);
  const handleLogout = () => {
    setShowLogoutDialog(true);
  };
  const handleNavigation = (e) => {
    const window = e.currentTarget;
    // if (scroll > window.scrollY) {
    //   console.log('scrolling up');
    // } else if (scroll < window.scrollY) {
    //   console.log('scrolling down');
    // }
    setScroll(window.scrollY);
  };
  useEffect(() => {
    setScroll(window.scrollY);
    window.addEventListener("scroll", (e) => handleNavigation(e));
  }, []);
  useEffect(() => {
    if (scroll > 0) {
      setShow(false);
    }
  }, [scroll]);
  return (
    <>
      {/* <LogoutDialog show={showLogoutDialog} setShow={setShowLogoutDialog} />
      <ChangePassword />
      <UpdateProfile userProfileData={userProfileData} /> */}
      <div
        className={isOpenSideBar ? "" : " fixed-top pt-3 "}
        style={{
          marginLeft: screenType === "MOBILE" ? "" : "312px",
          paddingRight: screenType === "MOBILE" ? "" : "1rem",
        }}
      >
        <div>
          <nav
            className={
              screenType === "MOBILE" ? "navbar px-5" : "navbar pl-3 pr-5"
            }
            style={{
              background: "white",
              margin: "-1.8rem",
              padding: 15,
              paddingTop: "2rem",
            }}
          >
            {screenType === "MOBILE" ? (
              <Icon
                icon="akar-icons:three-line-horizontal"
                height={30}
                onClick={() => {
                  // dispatch(handleSideBar(true));
                }}
              />
            ) : (
              <div
                style={{
                  fontFamily: "Circular Std Bold",
                  color: "#132649",
                  fontSize: 26,
                  paddingLeft: "2rem",
                }}
              >
                {title}
              </div>
            )}
            {previousPage && (
              <div
                style={{ fontFamily: "Circular Std Medium", cursor: "pointer" }}
              >
                <Link
                  to={previousPageUrl}
                  style={{ color: "#63575778", textDecoration: "none" }}
                >
                  {previousPage}
                </Link>
                {middlePage && (
                  <>
                    &nbsp;/&nbsp;
                    <Link
                      to={middlePageUrl}
                      style={{ color: "#63575778", textDecoration: "none" }}
                    >
                      {middlePage}
                    </Link>
                  </>
                )}
                &nbsp;/&nbsp;<span>{currentPage}</span>
              </div>
            )}

            <div className="d-flex">
              <div className="position-relative mt-2">
                <Link
                  className="userNav nav-link"
                  to="/car-owner/notification"
                  style={{ paddingRight: "2rem" }}
                >
                  {/* <img src={notificationLogo} width={25} /> */}
                </Link>
                {/* {NotificationsList?.unreadCount >= 1 && (
                  <span
                    className="position-absolute translate-middle badge rounded-circle p-1"
                    style={{
                      background: 'black',
                      width: 25,
                      height: 25,
                      top: 0,
                      right: 5,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                    <span style={{ fontSize: '0.7rem', color: colors.bt_text }}>
                      {NotificationsList?.unreadCount}
                    </span>
                    <span className="visually-hidden"></span>
                  </span>
                )} */}
              </div>

              <a
                className="userNav nav-link"
                ref={target}
                onClick={() => setShow(!show)}
                style={{ height: 40, width: 40 }}
              >
                <img
                  src={profile}
                  className="rounded-circle shadow-4"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  alt="Avatar"
                />
              </a>
            </div>
            <Overlay target={target.current} show={show} placement="bottom">
              <div
                className="px-3 py-2"
                // {...props}
                style={{
                  position: "absolute",
                  backgroundColor: "white",
                  marginTop: "1rem",
                  color: "black",
                  borderRadius: 10,
                  width: screenType === "MOBILE" ? 230 : 260,
                  //   ...props.style
                }}
              >
                <div
                  className="w-100 d-flex justify-content-between py-3"
                  style={{ cursor: "pointer" }}
                >
                  <div
                    onClick={() => setShow(!show)}
                    type="button"
                    data-toggle="modal"
                    data-target="#exampleModalCenter"
                    className="text-muted text-primary"
                  >
                    Change Password
                  </div>
                  <div>
                    <Icon
                      icon="grommet-icons:next"
                      height={15}
                      color="#757c83"
                    />
                  </div>
                </div>
                <hr />
                <div
                  onClick={handleLogout}
                  className="text-red text-center pb-2"
                  style={{
                    cursor: "pointer",
                    marginTop: "-0.5rem",
                    color: "#FF6767",
                    fontWeight: 600,
                  }}
                >
                  Logout
                </div>
              </div>
            </Overlay>
          </nav>
        </div>
      </div>
    </>
  );
}
