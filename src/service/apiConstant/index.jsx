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
    registerCompany: "admin/registerCompany",
    updateCompanyProfile: "admin/updateCompanyProfile",
  },
  //  listing
  list: {
    getCourseList: "constant/courseList",
    getCollageList: "constant/collegeList",
    boardlist: "/constant/boardList",
    accountDetails: "admin/accountDetails",
    getCompanyCategoryList: "constant/getCompanyCategoryList",
  },
  //  onBoarding
  onboarding: {
    getProfile: "users/getProfile",
    updateProfile: "admin/updateProfile",
    setEducation: "users/upsertEducationalDetails",
    mostHiredSkill: "constant/getCompanySkillsList",
    getCountryList: "constant/getCountriesList",
    getCityList: "constant/getCitiesList",
    getStateList: "constant/getStatesList",
  },
  jobs: {
    getListOfJobByAdmin: "admin/admin-job-list",
  },
};

export const API_RESPONSE = {
  SUCCESS: 1,
  FAILURE: 0,
};
