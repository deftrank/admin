// @ts-nocheck
import { createSlice, current } from "@reduxjs/toolkit";
import { DEFT_RANK_API } from "../../service/apiConstant";
// import toast from "react-hot-toast";
import api from "../../service/index";
// import secureLocalStorage from "react-secure-storage";
// import { act } from "preact/test-utils";
// import { stepsArray } from "../../pages/onBoarding/stepperConstant";
import { toast } from "react-toastify";

const slice = createSlice({
  name: "onBoarding",
  initialState: {
    currentStep: 0,
    sucessMessage: "",
    // completedStep: Array(stepsArray.length).fill(false),
    courseList: [],
    collageList: [],
    universityList: [],
    boardList: [],
    userData: {},
    successEducationMessage: "",
    listOfUserByAdmin: [],
    listOfCompanyByAdmin: [],
    userTotalCount: 0,
    compnanyTotalCount: 0,
    studentDetail: null,
    userAccountDetails: null,
    companyCategoryList: [],
    skillListData: [],
    countryListData: [],
    cityListData: null,
    stateListData: null,
    userCount: 0,
    companyCount: 0,
    jobTotalCount: 0,
    jobCount: 0,
    queriesTotalCount: 0,
    queriesCount: 0,
    listOfCompanyByAdmin: [],
    internshipTotalCount: 0,
    listOfJobByAdmin: [],
    listOfInternshipByAdmin: [],
    listOfQueriesTestByAdmin: [],
    adminJobDetails: null,
    jobCtcList: null,
    internshipCtcList: null,
    JobApplicantList: [],
    ticketList: [],
    ticketCount: 0,
    dashboardCount: null,
    badgeListByAdmin: [],
    badgeCountByAdmin: 0,
    planListByAdmin: null,
    planListCount: 0,
    planDetailsByAdmin: null,
    marketingContentList: [],
    marketingContentCount: 0,
    marketingContentDetails: null,
  },
  reducers: {
    onBoardingSuccess: (state, action) => {
      state.currentStep = action.payload?.index;
      state.completedStep[state.currentStep] = action.payload.completed;
    },
    educationSuccess: (state, action) => {
      state.sucessMessage = action.payload;
    },
    courseListSuccess: (state, action) => {
      state.courseList = action.payload;
    },
    collageListSuccess: (state, action) => {
      state.collageList = action.payload;
    },
    getProfileSuccess: (state, action) => {
      state.userData = action.payload?.data;
    },
    setEducationSuccess: (state, action) => {
      state.successEducationMessage = action.payload;
    },
    getBoardListSuccess: (state, action) => {
      state.boardList = action.payload;
    },
    universityListSuccess: (state, action) => {
      state.universityList = action.payload;
    },
    listOfUserByAdminSuccess(state, action) {
      state.userTotalCount =
        action.payload.flag == "empty" ? 0 : action.payload.total_count;
      state.userCount =
        action.payload.flag == "empty" ? 0 : action.payload.count;
      state.listOfUserByAdmin =
        action.payload.flag == "empty" ? [] : action.payload.data;
    },
    listOfCompanyByAdminSuccess(state, action) {
      state.compnanyTotalCount =
        action.payload.flag == "empty" ? 0 : action.payload.total_count;
      state.companyCount =
        action.payload.flag == "empty" ? 0 : action.payload.count;
      state.listOfCompanyByAdmin =
        action.payload.flag == "empty" ? [] : action.payload.data;
    },
    getStudentDetailByIdSuccess(state, action) {
      state.studentDetail = action.payload;
    },
    deleteUserSuccess(state, action) {
      let reqData = action.payload.reqData;
      if (action.payload.suspendType == "company") {
        state.listOfCompanyByAdmin = state.listOfCompanyByAdmin.filter(
          (item) => item.auth_id._id !== reqData
        );
        state.compnanyTotalCount = state.compnanyTotalCount - 1;
      } else {
        state.listOfUserByAdmin = state.listOfUserByAdmin.filter(
          (item) => item.auth_id._id !== reqData
        );
        state.userTotalCount = state.userTotalCount - 1;
      }
    },
    suspendUserSuccess(state, action) {
      const newObjId = action.payload.data.auth_id;

      if (action.payload.suspendType == "company") {
        const suspendIndex = state.listOfCompanyByAdmin?.findIndex(
          (item) => item.auth_id._id === newObjId
        );
        state.listOfCompanyByAdmin[suspendIndex].auth_id.suspend_status =
          action.payload.data.status;
      } else {
        const suspendIndex = state.listOfUserByAdmin?.findIndex(
          (item) => item.auth_id._id === newObjId
        );
        state.listOfUserByAdmin[suspendIndex].auth_id.suspend_status =
          action.payload.data.status;
      }
    },
    accountDetailsSuccess(state, action) {
      state.userAccountDetails = action.payload;
    },
    companyCategoryListSuccess(state, action) {
      state.companyCategoryList = action.payload;
    },
    getSkillListSuccess: (state, action) => {
      state.skillListData = action.payload;
    },
    getCountryListSuccess: (state, action) => {
      state.countryListData = action.payload;
    },

    getCityListSuccess: (state, action) => {
      state.cityListData = action.payload;
    },
    getStateListSuccess: (state, action) => {
      state.stateListData = action.payload;
    },
    clearStateSuccess: (state, action) => {
      state.userAccountDetails = null;
    },
    listOfJobByAdminSuccess(state, action) {
      state.jobTotalCount =
        action.payload.flag == "empty" ? 0 : action.payload.total_count;
      state.jobcompanyCount =
        action.payload.flag == "empty" ? 0 : action.payload.count;
      state.listOfJobByAdmin =
        action.payload.flag == "empty" ? [] : action.payload.data;
    },
    listOfInternshipByAdminSuccess(state, action) {
      console.log("action.payload", action.payload);
      state.internshipTotalCount =
        action.payload?.flag == "empty" ? 0 : action.payload.total_count;
      // state.internshipcompanyCount =
      //   action.payload?.flag == "empty" ? 0 : action.payload.count;
      // console.log("ddd", action.payload.data);
      state.listOfInternshipByAdmin = action.payload.data;
    },
    verifyJobSuccess(state, action) {
      const newObjId = action.payload.data.id;

      if (action.payload.suspendType == "job") {
        const suspendIndex = state.listOfJobByAdmin?.findIndex(
          (item) => item._id === newObjId
        );
        state.listOfJobByAdmin[suspendIndex].is_verified =
          action.payload.data.status;
      }
    },
    verifyInternShipSuccess(state, action) {
      console.log("action ", action.payload);
      const newObjId = action.payload.data.id;

      if (action.payload.suspendType == "internship") {
        const suspendIndex = state.listOfInternshipByAdmin?.findIndex(
          (item) => item._id === newObjId
        );
        state.listOfInternshipByAdmin[suspendIndex].is_verified =
          action.payload.data.status;
      } else {
        const suspendIndex = state.listOfUserByAdmin?.findIndex(
          (item) => item.auth_id._id === newObjId
        );
        state.listOfUserByAdmin[suspendIndex].auth_id.suspend_status =
          action.payload.data.status;
      }
    },
    updateJobStatusSuccess(state, action) {
      const newObjId = action.payload.data.id;

      if (action.payload.suspendType == "internship") {
        const suspendIndex = state.listOfInternshipByAdmin?.findIndex(
          (item) => item._id === newObjId
        );

        state.listOfInternshipByAdmin[suspendIndex].status =
          action.payload.data.status;
      }
      if (action.payload.suspendType == "job") {
        const suspendIndex = state.listOfJobByAdmin?.findIndex(
          (item) => item._id === newObjId
        );

        state.listOfJobByAdmin[suspendIndex].status =
          action.payload.data.status;
      }
    },
    listOfQueriesTestByAdminSuccess(state, action) {
      state.queriesTotalCount =
        action.payload.flag == "empty" ? 0 : action.payload.total_count;
      state.queriesCount =
        action.payload.flag == "empty" ? 0 : action.payload.count;
      state.listOfQueriesTestByAdmin =
        action.payload.flag == "empty" ? [] : action.payload.data;
    },
    jobDetailSuccess(state, action) {
      console.log(action.payload?.data);
      state.adminJobDetails = action.payload?.data;
    },
    getJobCtcLiSuccess: (state, action) => {
      state.jobCtcList = action.payload?.data;
    },
    getInternshipCtcListSuccess: (state, action) => {
      state.internshipCtcList = action.payload?.data;
    },
    getApplicantSuccess: (state, action) => {
      state.JobApplicantList = action.payload?.data;
    },
    getTicketListSuccess: (state, action) => {
      state.ticketList = action.payload?.data;
      state.ticketCount = action.payload?.total_count;
    },
    getDashboardCountSuccess: (state, action) => {
      state.dashboardCount = action.payload.data;
    },
    getBadgeListSuccess: (state, action) => {
      console.log(action.payload);
      state.badgeListByAdmin = action.payload.data;
      state.badgeCountByAdmin = action.payload.total_count; // Corrected this line
    },
    getPlanListSuccess: (state, action) => {
      state.planListByAdmin = action.payload.data;
      state.planListCount = action.payload.total_count; // Corrected this line
    },
    getPlanDetailsSuccess: (state, action) => {
      state.planDetailsByAdmin = action.payload.data;
    },
    getUpdatePlanDetailsSuccess: (state, action) => {
      console.log("here is plan  payload====", action.payload);
      state.planDetailsByAdmin = action.payload.data;
    },
    getMarketingListSuccess: (state, action) => {
      state.marketingContentList = action.payload?.data;
      state.marketingContentCount=action.payload?.totalCount
    },
    getMarketingDetailSuccess:(state, action) => {
      state.marketingContentDetails = action.payload?.data;
   
    },
    getDeleteContentSuccess: (state, action) => {
      const index = state.marketingContentList?.findIndex((item) => item?.id === action.payload.bannerId);
      
      if (index !== -1) {

        state.marketingContentList = [
          ...state.marketingContentList.slice(0, index),
          ...state.marketingContentList.slice(index + 1),
        ];
     
      } else {
  
      }
    },
    changeStatusSuccess: (state, action) => {
      // Find the index of the item in listOfUserByAdmin (as you're modifying this array)
      const index = state.listOfQueriesTestByAdmin?.findIndex((item) => item?.id === action.payload.inquiry_id);
      
      // If the index is valid, update the status
      if (index !== -1) {
        state.listOfQueriesTestByAdmin[index].status = action.payload.status;
      }
    }
    
    
    
  },
});

export default slice.reducer;

/**********************ACTIONS************************************************ */
const {
  onBoardingSuccess,
  courseListSuccess,
  universityListSuccess,
  collageListSuccess,
  getProfileSuccess,
  getBoardListSuccess,
  listOfUserByAdminSuccess,
  listOfCompanyByAdminSuccess,
  getStudentDetailByIdSuccess,
  deleteUserSuccess,
  suspendUserSuccess,
  accountDetailsSuccess,
  companyCategoryListSuccess,
  getSkillListSuccess,
  getStateListSuccess,
  getCountryListSuccess,
  getCityListSuccess,
  clearStateSuccess,
  listOfJobByAdminSuccess,
  listOfInternshipByAdminSuccess,
  verifyJobSuccess,
  verifyInternShipSuccess,
  updateJobStatusSuccess,
  listOfQueriesTestByAdminSuccess,
  jobDetailSuccess,
  getJobCtcLiSuccess,
  getInternshipCtcListSuccess,
  getApplicantSuccess,
  getTicketListSuccess,
  getDashboardCountSuccess,
  getBadgeListSuccess,
  getPlanListSuccess,
  getPlanDetailsSuccess,
  getUpdatePlanDetailsSuccess,
  getMarketingListSuccess,
  getDeleteContentSuccess,
  getMarketingDetailSuccess,
  changeStatusSuccess
} = slice.actions;

//  stepper currentIndex
export const handleCurrentIndex = (data) => async (dispatch) => {
  dispatch(onBoardingSuccess(data));
};

// get course list
export const getCourseList = (data) => async (dispatch) => {
  try {
    const response = await api.post(DEFT_RANK_API.list.getCourseList, data);
    if (response?.status) {
      dispatch(courseListSuccess(response?.data?.data)); // Only pass the relevant data
    } else {
      // toast.error(response?.message);
    }
  } catch (e) {
    console.error(e.message);
  }
};

export const accountDetails = (data, loadingBarRef) => async (dispatch) => {
  loadingBarRef.current.continuousStart();
  try {
    const response = await api.post(DEFT_RANK_API.list.accountDetails, data);
    if (response?.status) {
      dispatch(accountDetailsSuccess(response?.data)); // Only pass the relevant data
    } else {
      // toast.error(response?.message);
    }
    loadingBarRef.current.complete();
  } catch (e) {
    console.error(e.message);
    loadingBarRef.current.complete();
  }
};

export const getCollageList = (data) => async (dispatch) => {
  try {
    const response = await api.post(DEFT_RANK_API.list.getCollageList, data);

    if (response?.status) {
      dispatch(collageListSuccess(response?.data?.data));
    } else {
      // toast.error(response?.message);
    }
  } catch (e) {
    console.error(e.message);
    // toast.error("An error occurred while fetching the college list."); // Optional error message
  }
};

export const getCompanyCategoryList = (data) => async (dispatch) => {
  try {
    const response = await api.post(
      DEFT_RANK_API.list.getCompanyCategoryList,
      data
    );
    if (response?.status) {
      dispatch(companyCategoryListSuccess(response?.data?.data));
    } else {
      // toast.error(response?.message);
    }
  } catch (e) {
    console.error(e.message);
    // toast.error("An error occurred while fetching the college list."); // Optional error message
  }
};

export const getCountryList = (data) => async (dispatch) => {
  try {
    const response = await api.post(
      `${DEFT_RANK_API.onboarding.getCountryList}`,
      data
    );
    if (response?.status == 200) {
      dispatch(getCountryListSuccess(response?.data?.data));
    }
  } catch (e) {
    console.error(e);
    toast.error(e.message || "An error occurred while updating the profile.");
  }
};

export const getStateList = (data) => async (dispatch) => {
  try {
    const response = await api.post(
      `${DEFT_RANK_API.onboarding.getStateList}`,
      data
    );
    if (response?.status == 200) {
      dispatch(getStateListSuccess(response?.data?.data));
    }
  } catch (e) {
    console.error(e);
    toast.error(e.message || "An error occurred while updating the profile.");
  }
};

//  get city list
export const getCityList = (data) => async (dispatch) => {
  try {
    const response = await api.post(
      `${DEFT_RANK_API.onboarding.getCityList}`,
      data
    );
    if (response?.status == 200) {
      dispatch(getCityListSuccess(response?.data?.data));
    }
  } catch (e) {
    console.error(e);
    toast.error(e.message || "An error occurred while updating the profile.");
  }
};

export const getSkillList = (data) => async (dispatch) => {
  try {
    const response = await api.post(
      `${DEFT_RANK_API.onboarding.mostHiredSkill}`,
      data
    );
    if (response?.status == 200) {
      dispatch(getSkillListSuccess(response?.data?.data));
    }
  } catch (e) {
    console.error(e);
    toast.error(e.message || "An error occurred while updating the profile.");
  }
};

export const getBoardList = (data) => async (dispatch) => {
  try {
    const response = await api.post(DEFT_RANK_API.list.boardlist, data);

    if (response?.status) {
      console.log(response);
      const transformedList =
        response?.data?.data?.map((board) => ({
          label: `(${board?.name})`,
          value: board._id,
        })) || []; // Default to an empty array if there's no data

      dispatch(getBoardListSuccess(transformedList));
    } else {
      // toast.error(response?.message);
    }
  } catch (e) {
    console.error(e.message);
    // toast.error("An error occurred while fetching the college list."); // Optional error message
  }
};
//  here is get profile data
export const getProfile = () => async (dispatch) => {
  try {
    const response = await api.get(`${DEFT_RANK_API.onboarding.getProfile}/en`);
    if (response?.status) {
      dispatch(getProfileSuccess(response?.data));
    } else {
      // toast.error(response?.message);
    }
  } catch (e) {
    console.error(e.message);
  }
};
export const updateProfile = (data, navigate) => async () => {
  try {
    const response = await api.post(
      `${DEFT_RANK_API.onboarding.updateProfile}`,
      data
    );
    let result = response.data;
    if (result.status) {
      navigate("/students");
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  } catch (e) {
    console.error(e);
    // toast.error(e.message || "An error occurred while updating the profile.");
  }
};

export const getListOfUserByAdmin =
  (data, loadingBarRef) => async (dispatch) => {
    loadingBarRef.current.continuousStart();
    try {
      await api
        .post(DEFT_RANK_API.auth.getListOfUserByAdmin, data)
        .then((response) => {
          let result = response.data;
          if (result.status) {
            dispatch(listOfUserByAdminSuccess(result));
          } else {
            // toast.error(result.message);
            dispatch(listOfUserByAdminSuccess({ flag: "empty" }));
          }
        });
      loadingBarRef.current.complete();
    } catch (e) {
      // return toast.error(e.message);
      loadingBarRef.current.complete();
    }
  };

export const deleteUser =
  (data, setChangePasswordModal, suspendType) => async (dispatch) => {
    // loadingBarRef.current.continuousStart();
    try {
      await api.post(DEFT_RANK_API.auth.deleteUser, data).then((response) => {
        let result = response.data;
        if (result.status) {
          setChangePasswordModal((changePasswordModal) => ({
            ...changePasswordModal,
            show: false,
          }));
          dispatch(
            deleteUserSuccess({
              reqData: data.auth_id,
              suspendType: suspendType,
            })
          );
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
        // loadingBarRef.current.complete();
      });
    } catch (e) {
      // return toast.error(e.message);
      // loadingBarRef.current.complete();
    }
  };

export const suspendUser =
  (data, setChangePasswordModal, suspendType) => async (dispatch) => {
    // dispatch(apiFetching());
    try {
      await api.post(DEFT_RANK_API.auth.suspendUser, data).then((response) => {
        let result = response.data;
        console.log("response == ", response);
        if (result.status) {
          setChangePasswordModal((changePasswordModal) => ({
            ...changePasswordModal,
            show: false,
          }));
          dispatch(
            suspendUserSuccess({ data: data, suspendType: suspendType })
          );
        } else {
          // toast.error(result.message);
        }
      });
    } catch (e) {
      // return toast.error(e.message);
    }
  };

export const getListOfCompanyByAdmin =
  (data, loadingBarRef) => async (dispatch) => {
    loadingBarRef.current.continuousStart();
    try {
      await api
        .post(DEFT_RANK_API.auth.getListOfCompanyByAdmin, data)
        .then((response) => {
          let result = response.data;
          if (result.status) {
            dispatch(listOfCompanyByAdminSuccess(result));
          } else {
            dispatch(listOfCompanyByAdminSuccess({ flag: "empty" }));
          }
          loadingBarRef.current.complete();
        });
    } catch (e) {
      // return toast.error(e.message);
      loadingBarRef.current.complete();
    }
  };

export const getStudentDetailById = (data) => async (dispatch) => {
  // dispatch(apiFetching());
  try {
    await api
      .post(DEFT_RANK_API.auth.getStudentDetailById, data)
      .then((response) => {
        let result = response.data;
        if (result.status) {
          dispatch(getStudentDetailByIdSuccess(result));
        } else {
          // toast.error(result.message);
        }
      });
  } catch (e) {
    // return toast.error(e.message);
  }
};

export const registerCompany = (data, navigate) => async () => {
  // dispatch(apiFetching());
  try {
    await api
      .post(DEFT_RANK_API.auth.registerCompany, data)
      .then((response) => {
        let result = response.data;
        if (result.status) {
          navigate("/company");
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
      });
  } catch (e) {
    // return toast.error(e.message);
  }
};

export const updateCompanyProfile = (data, navigate) => async () => {
  console.log("data -- ", data);
  // dispatch(apiFetching());
  try {
    await api
      .post(DEFT_RANK_API.auth.updateCompanyProfile, data)
      .then((response) => {
        let result = response.data;
        if (result.status) {
          navigate("/company");
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
      });
  } catch (e) {
    // return toast.error(e.message);
  }
};

export const submitEducationData = (data) => async (dispatch) => {
  try {
    const response = await api.post(
      DEFT_RANK_API.onboarding.setEducation,
      data
    );

    if (response?.status) {
      //  dispatch(s)
      // toast.success(response?.message);
    } else {
      // toast.error(response?.message);
    }
  } catch (e) {
    console.error(e.message);
    // toast.error("An error occurred while fetching the college list."); // Optional error message
  }
};

export const clearAllState = () => async (dispatch) => {
  dispatch(clearStateSuccess());
};

export const getListOfJobByAdmin =
  (data, loadingBarRef) => async (dispatch) => {
    loadingBarRef.current.continuousStart();
    try {
      await api
        .post(DEFT_RANK_API.jobs.getListOfJobByAdmin, data)
        .then((response) => {
          let result = response.data;
          if (result.status) {
            dispatch(listOfJobByAdminSuccess(result));
          } else {
            dispatch(listOfJobByAdminSuccess({ flag: "empty" }));
          }
          loadingBarRef.current.complete();
        });
    } catch (e) {
      // loadingBarRef.current.complete();
    }
  };

export const verifyJob =
  (data, setChangePasswordModal, suspendType) => async (dispatch) => {
    // dispatch(apiFetching());
    try {
      await api.post(DEFT_RANK_API.jobs.verifyJob, data).then((response) => {
        let result = response.data;
        if (result.status) {
          setChangePasswordModal((changePasswordModal) => ({
            ...changePasswordModal,
            show: false,
          }));
          if (data?.type == 1) {
            dispatch(
              verifyJobSuccess({ data: data, suspendType: suspendType })
            );
          }
          if (data?.type == 2) {
            dispatch(
              verifyInternShipSuccess({ data: data, suspendType: suspendType })
            );
          }
        } else {
          // toast.error(result.message);
        }
      });
    } catch (e) {
      // return toast.error(e.message);
    }
  };
export const updateJob =
  (data, setChangePasswordModal, suspendType) => async (dispatch) => {
    // dispatch(apiFetching());
    try {
      await api
        .post(DEFT_RANK_API.jobs.updateJObStatus, data)
        .then((response) => {
          let result = response.data;
          if (result.status) {
            setChangePasswordModal((changePasswordModal) => ({
              ...changePasswordModal,
              show: false,
            }));
            dispatch(
              updateJobStatusSuccess({ data: data, suspendType: suspendType })
            );
          } else {
            // toast.error(result.message);
          }
        });
    } catch (e) {
      // return toast.error(e.message);
    }
  };
export const getListOfInternshipByAdmin = (data) => async (dispatch) => {
  try {
    await api
      .post(DEFT_RANK_API.jobs.getListOfInternshipByAdmin, data)
      .then((response) => {
        let result = response.data;
        if (result.status) {
          dispatch(listOfInternshipByAdminSuccess(result));
        } else {
          dispatch(listOfInternshipByAdminSuccess({ flag: "empty" }));
        }
        // loadingBarRef.current.complete();
      });
  } catch (e) {
    // loadingBarRef.current.complete();
  }
};
export const getListOfQueriesTestByAdmin =
  (data, loadingBarRef) => async (dispatch) => {
    // loadingBarRef.current.continuousStart();
    try {
      await api.post(DEFT_RANK_API.test.queriesList, data).then((response) => {
        let result = response.data;
        if (result.status) {
          dispatch(listOfQueriesTestByAdminSuccess(result));
        } else {
          dispatch(listOfQueriesTestByAdminSuccess({ flag: "empty" }));
        }
        // loadingBarRef.current.complete();
      });
    } catch (e) {
      // loadingBarRef.current.complete();
    }
  };
export const getAdminJobDetails = (data) => async (dispatch) => {
  try {
    const response = await api.get(
      `${DEFT_RANK_API.jobs.getJobDetails}/en/${data}`
    );
    if (response?.status) {
      dispatch(jobDetailSuccess(response?.data));
    } else {
      // toast.error(response?.message);
    }
  } catch (e) {
    console.error(e.message);
  }
};
export const getAdminInternShipDetails = (data) => async (dispatch) => {
  try {
    const response = await api.get(
      `${DEFT_RANK_API.jobs.getInternshipDetails}/en/${data}`
    );
    if (response?.status) {
      dispatch(jobDetailSuccess(response?.data));
    } else {
      // toast.error(response?.message);
    }
  } catch (e) {
    console.error(e.message);
  }
};
export const getCtcList = (data) => async (dispatch) => {
  try {
    const response = await api.post(`${DEFT_RANK_API.jobs.getCtcList}`, data);

    if (response?.status) {
      data.type == 1
        ? dispatch(getJobCtcLiSuccess(response?.data))
        : dispatch(getInternshipCtcListSuccess(response?.data));
    } else {
      toast.error(response?.message);
    }
  } catch (e) {
    console.error(e.message);
  }
};
export const getApplicantsByAdmin = (data) => async (dispatch) => {
  try {
    const response = await api.post(
      `${DEFT_RANK_API.jobs.getApplicantListByAdmin}`,
      data
    );

    if (response?.status) {
      dispatch(getApplicantSuccess(response?.data));
    } else {
      toast.error(response?.message);
    }
  } catch (e) {
    console.error(e.message);
  }
};
export const getInternshipApplicantsByAdmin = (data) => async (dispatch) => {
  try {
    const response = await api.post(
      `${DEFT_RANK_API.jobs.getInternshipApplicantListByAdmin}`,
      data
    );

    if (response?.status) {
      dispatch(getApplicantSuccess(response?.data));
    } else {
      toast.error(response?.message);
    }
  } catch (e) {
    console.error(e.message);
  }
};
export const getTicketListByAdmin = (data) => async (dispatch) => {
  try {
    const response = await api.post(`${DEFT_RANK_API.ticket.ticketList}`, data);

    if (response?.status) {
      dispatch(getTicketListSuccess(response?.data));
    } else {
      toast.error(response?.message);
    }
  } catch (e) {
    console.error(e.message);
  }
};
export const getDashboardByAdmin = (data) => async (dispatch) => {
  try {
    const response = await api.post(
      `${DEFT_RANK_API.dashboard.dashboardCount}`,
      data
    );

    if (response?.status) {
      dispatch(getDashboardCountSuccess(response?.data));
    } else {
      toast.error(response?.message);
    }
  } catch (e) {
    console.error(e.message);
  }
};
export const getBadgeListByAdmin = (data) => async (dispatch) => {
  try {
    const response = await api.post(`${DEFT_RANK_API.badges.badgeList}`, data);

    if (response?.status) {
      dispatch(getBadgeListSuccess(response?.data));
    } else {
      toast.error(response?.message);
    }
  } catch (e) {
    console.error(e.message);
  }
};
export const getPlanListByAdmin = () => async (dispatch) => {
  try {
    const response = await api.get(`${DEFT_RANK_API.plans.planList}/en`);
    if (response?.status) {
      dispatch(getPlanListSuccess(response?.data));
    } else {
      // toast.error(response?.message);
    }
  } catch (e) {
    console.error(e.message);
  }
};
export const getChangeStatusOfCompQueryByAdmin = (data) => async (dispatch) => {
  try {
    const response = await api.post(`${DEFT_RANK_API.test.changeStatus}`, data);
    if (response?.status) {
      toast.success(response?.data?.data?.message)
      dispatch(changeStatusSuccess(data))
    } else {
      // toast.error(response?.message);
    }
  } catch (e) {
    console.error(e.message);
  }
};
getUpdatePlanDetailsSuccess;
export const getPlanDetailsByAdmin = (data) => async (dispatch) => {
  try {
    const response = await api.get(
      `${DEFT_RANK_API.plans.planDetails}/${data?.id}/${data?.language}`
    );
    if (response?.status) {
      dispatch(getPlanDetailsSuccess(response?.data));
    } else {
      // toast.error(response?.message);
    }
  } catch (e) {
    console.error(e.message);
  }
};
export const getUpdatePlanDetailsByAdmin =
  (data, requestBody,navigate) => async (dispatch) => {
    try {
      const response = await api.put(
        `${DEFT_RANK_API.plans.updatePlan}/${data?.id}/${data?.language}`,
        requestBody
      );
      if (response?.status) {
        toast.success("Plan Updated Successfully ");
        navigate("/subscription-plans")
        dispatch(getUpdatePlanDetailsSuccess(response?.data));
      } else {
        // toast.error(response?.message);
      }
    } catch (e) {
      console.error(e.message);
    }
  };
export const getMarketingListByAdmin = (data) => async (dispatch) => {
  try {
    const response = await api.post(
      `${DEFT_RANK_API.marketingContent.getMarketingList}`,
      data
    );
    if (response?.status) {
      dispatch(getMarketingListSuccess(response?.data));
    } else {
      // toast.error(response?.message);
    }
  } catch (e) {
    console.error(e.message);
  }
};
export const getMarketingContentDeleteByAdmin =
  (data, setModal) => async (dispatch) => {
    try {
      const response = await api.post(
        `${DEFT_RANK_API.marketingContent.deleteMarketingContent}`,
        data
      );
      if (response?.status) {
        dispatch(getDeleteContentSuccess(data));
        setModal(false);

        toast.success(response?.data?.message);
      } else {
        // toast.error(response?.message);
      }
    } catch (e) {
      console.error(e.message);
    }
  };
export const getMarketingContentAddByAdmin =
  (data, navigation) => async (dispatch) => {
    try {
      const response = await api.post(
        `${DEFT_RANK_API.marketingContent.addContent}`,
        data
      );
      if (response?.status) {
        toast.success(response?.data?.message);
        navigation("/marketing-banner");
      } else {
        // toast.error(response?.message);
      }
    } catch (e) {
      console.error(e.message);
    }
  };
  export const getMarketingContentEditByAdmin =
  (data, navigation) => async (dispatch) => {
    try {
      const response = await api.post(
        `${DEFT_RANK_API.marketingContent.updateContent}`,
        data
      );
      if (response?.status) {
        toast.success(response?.data?.message);
        navigation("/marketing-banner");
      } else {
        // toast.error(response?.message);
      }
    } catch (e) {
      console.error(e.message);
    }
  };
  export const getMarketingContentDetailByAdmin =
  (data) => async (dispatch) => {
    try {
      const response = await api.post(
        `${DEFT_RANK_API.marketingContent.DetailContent}`,
        data
      );
      if (response?.status) {
        console.log(response?.data?.data);
        dispatch(getMarketingDetailSuccess(response?.data))
        // toast.success(response?.data?.message);
        // navigation("/marketing-banner");
      } else {
        // toast.error(response?.message);
      }
    } catch (e) {
      console.error(e.message);
    }
  };
export const getImageUpload = (data, file, setFormData,setData) => async (dispatch) => {
  const formData = new FormData();
  formData.append("file", file, file.name);

  const headers = {
    "Content-Type": "multipart/form-data", // Important for file uploads
    // 'Authorization': 'Bearer YOUR_TOKEN'  // Uncomment if needed
  };

  try {
    // Send the request via ApiClient (assuming you have a configured axios instance or ApiClient)
    const response = await api.post(
      `${DEFT_RANK_API.docUpload.imagesUpload}/${data.foldername}/${data.type}`,
      formData,
      { headers }
    );

    // Check for a successful response
    if (response?.status === 200) {
      if (data?.foldername === "marketingBannerImage") {
        setFormData((prev) => ({
          ...prev,
          image: response?.data?.data[0].fileName,
        }));
        setData(response?.data?.data[0].profileImageUrl)
      }
      if (data?.foldername === "companyProfileImage") {
        setFormData((prev) => ({
          ...prev,
          image: response?.data?.data[0].fileName,
        }));
        setData(response?.data?.data[0].profileImageUrl)
      }

      // Dispatch success action (optional)
      dispatch({
        type: "IMAGE_UPLOAD_SUCCESS", // Customize the action type
        payload: response?.data,
      });

      // Optional: Show a success toast message
      toast.success("Image uploaded successfully!");
    } else {
      // Handle if response is not successful
      console.error(
        "Image upload failed:",
        response?.message || "Unknown error"
      );
      // Optional: Dispatch failure action (if needed)
      dispatch({
        type: "IMAGE_UPLOAD_FAILURE", // Customize the action type
        payload: response?.message || "Unknown error",
      });
      // Optional: Show an error toast message
      toast.error(response?.message || "Failed to upload image.");
    }
  } catch (e) {
    // Catch any network or API errors
    console.error("Error uploading image:", e.message);
    // Dispatch failure action (optional)
    dispatch({
      type: "IMAGE_UPLOAD_FAILURE",
      payload: e.message || "An unexpected error occurred.",
    });
    // Optional: Show an error toast message
    toast.error("An error occurred while uploading the image.");
  }
};
