import { createSlice, current } from "@reduxjs/toolkit";
import { DEFT_RANK_API } from "../../service/apiConstant";
// import toast from "react-hot-toast";
import api from "../../service/index";
// import secureLocalStorage from "react-secure-storage";
// import { act } from "preact/test-utils";
import { stepsArray } from "../../pages/onBoarding/stepperConstant";
const slice = createSlice({
  name: "onBoarding",
  initialState: {
    currentStep: 0,
    sucessMessage: "",
    completedStep: Array(stepsArray.length).fill(false),
    courseList: [],
    collageList: [],
    universityList: [],
    boardList: [],
    userData: {},
    successEducationMessage: "",
    listOfUserByAdmin: [],
    listOfCompanyByAdmin: [],
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
      console.log("university", action.payload);
    },
    listOfUserByAdminSuccess(state, action) {
      state.listOfUserByAdmin = action.payload.data;
    },
    listOfCompanyByAdminSuccess(state, action) {
      state.listOfCompanyByAdmin = action.payload.data;
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
      const transformedList =
        response?.data?.data?.map((course) => ({
          label: `${course?.full_name} (${course?.name})`,
          value: course?._id,
        })) || []; // Default to an empty array if there's no data

      dispatch(courseListSuccess(transformedList)); // Only pass the relevant data
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
      console.log(data?.search_type);
      if (data?.search_type == 1) {
        const transformedList =
          response?.data?.data?.map((college) => ({
            label: college.college_name,
            value: college._id,
          })) || [];
        dispatch(collageListSuccess(transformedList));
      } else {
        const transformedList =
          response?.data?.data?.map((college) => ({
            label: college.university_name,
            value: college._id,
          })) || [];
        dispatch(universityListSuccess(transformedList));
      }
    } else {
      // toast.error(response?.message);
    }
  } catch (e) {
    console.error(e.message);
    // toast.error("An error occurred while fetching the college list."); // Optional error message
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
export const updateProfile = (data) => async (dispatch) => {
  try {
    const response = await api.patch(
      `${DEFT_RANK_API.onboarding.updateProfile}`,
      data
    );

    if (response?.status === 200) {
      dispatch(getProfileSuccess(response?.data));
    } else {
      // toast.error(response?.message);
    }
  } catch (e) {
    console.error(e);
    // toast.error(e.message || "An error occurred while updating the profile.");
  }
};

export const getListOfUserByAdmin = (data, navigate) => async (dispatch) => {
  // dispatch(apiFetching());
  try {
    await api
      .post(DEFT_RANK_API.auth.getListOfUserByAdmin, data)
      .then((response) => {
        let result = response.data;
        if (result.status) {
          dispatch(listOfUserByAdminSuccess(result));
        } else {
          // toast.error(result.message);
        }
      });
  } catch (e) {
    // return toast.error(e.message);
  }
};

export const getListOfCompanyByAdmin = (data, navigate) => async (dispatch) => {
  // dispatch(apiFetching());
  try {
    await api
      .post(DEFT_RANK_API.auth.getListOfCompanyByAdmin, data)
      .then((response) => {
        let result = response.data;
        console.log("result -- ", result?.data);
        if (result.status) {
          dispatch(listOfCompanyByAdminSuccess(result));
        } else {
          // toast.error(result.message);
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
