export const DEFT_RANK_API = {
  //auth
  auth: {
    login: "admin/login",
    otpVerify: "users/verifyOTP",
    generateOTp: "/users/generateOTP",
    register: "users/register",
    setIdentifier: "users/setIdentifier",
    getListOfUserByAdmin: "admin/getListOfUserByAdmin",
    getListOfCompanyByAdmin: "admin/getListOfCompanyByAdmin",
    changePassword: "admin/changePassword",
    getStudentDetailById: "admin/accountDetails",
    deleteUser: "admin/deleteUser",
    suspendUser: "admin/suspendUser",
  },
  //  listing
  list: {
    getCourseList: "constant/courseList",
    getCollageList: "constant/collegeList",
    boardlist: "/constant/boardList",
  },
  //  onBoarding
  onboarding: {
    getProfile: "users/getProfile",
    updateProfile: "users/updateProfile",
    setEducation: "users/upsertEducationalDetails",
  },
};

export const API_RESPONSE = {
  SUCCESS: 1,
  FAILURE: 0,
};
