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
    cityListData: [],
    stateListData: [],
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
      state.userTotalCount = action.payload.total_count;
      state.listOfUserByAdmin =
        action.payload.flag == "empty" ? [] : action.payload.data;
    },
    listOfCompanyByAdminSuccess(state, action) {
      state.compnanyTotalCount = action.payload.total_count;
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

export const accountDetails = (data) => async (dispatch) => {
  try {
    const response = await api.post(DEFT_RANK_API.list.accountDetails, data);
    if (response?.status) {
      dispatch(accountDetailsSuccess(response?.data)); // Only pass the relevant data
    } else {
      // toast.error(response?.message);
    }
  } catch (e) {
    console.error(e.message);
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
    // loadingBarRef.current.continuousStart();
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
      // loadingBarRef.current.complete();
    } catch (e) {
      // return toast.error(e.message);
      // loadingBarRef.current.complete();
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
        } else {
          // toast.error(result.message);
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

export const getListOfCompanyByAdmin = (data) => async (dispatch) => {
  // loadingBarRef.current.continuousStart();
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
        // loadingBarRef.current.complete();
      });
  } catch (e) {
    // return toast.error(e.message);
    // loadingBarRef.current.complete();
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
