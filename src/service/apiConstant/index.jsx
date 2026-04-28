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
    forgotPassword: "users/forgot-password",
  },
  dashboard: {
    dashboardCount: "/admin/count",
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
    verifyJob: "admin/verify-job-internship",
    updateJObStatus: "admin/update-job-internship-status",
    getListOfInternshipByAdmin: "admin/admin-internship-list",
    getJobDetails: "/admin/get-job-detail",
    getInternshipDetails: "/admin/get-internship-detail",
    getCtcList: "constant/job-internship-ctc-list",
    getApplicantListByAdmin: "/admin/job-applicant-listByAdmin",
    getInternshipApplicantListByAdmin:
      "/admin/internship-applicant-listByAdmin",
  },
  test: {
    queriesList: "admin/comp-test-listing",
    changeStatus:"/test/update-status",
    xobinAssessmentList: "/admin/xobin-assessment-list",
    studentAssessmentList: "/admin/student-assessment-list",
    deleteCompTestEnquiry: "/admin/delete-comp-test-enquiry"
  },
  ticket: {
    ticketList: "/admin/ticketList",
  },
  badges:{
    badgeList:"/admin/badgeList"
  },
  plans:{
    planList:"/plan/getplan-list-all",
    planDetails:"/plan/getplan-by-id",
    updatePlan:"/plan/update-plan-byId",
    companyConnectList: "/company-connect-plan/get-list-all",
    studentTestCreditsList: "/student-test-credits/get-list-all",
    aiMentorPacksList: "/ai-mentor-packs/get-list-all",
    onDemandTestsList: "/on-demand-tests/get-list-all",
    companyConnectUpdate: "/company-connect-plan/update-by-id",
    studentTestCreditsUpdate: "/student-test-credits/update-by-id",
    aiMentorPacksUpdate: "/ai-mentor-packs/update-by-id",
    onDemandTestsUpdate: "/on-demand-tests/update-by-id",
    transactionList: "/plan/transaction-list",
  },
  marketingContent:{
    getMarketingList:"/admin/getListBanner",
    deleteMarketingContent:"/admin/delete-banner",
    addContent:"/admin/add-banner",
    DetailContent:"/admin/get-banner",
    updateContent:"/admin/update-banner"

  }
  ,docUpload:{

      imagesUpload:"/admin/userImageUpload"
   
  }
};

export const API_RESPONSE = {
  SUCCESS: 1,
  FAILURE: 0,
};
