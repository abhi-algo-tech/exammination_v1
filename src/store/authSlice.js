import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  token: null,
  user: null,
  exam: [],
  profile: [],
  examName: null,
  examType: null,
  curriculum: null,
  class: null,
  division: null,
  subject: null,
  subjectCode: null,
  examDate: null,
  uniquePaperCode: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      state.exam = [];
      state.profile = [];
    },
    setExam: (state, action) => {
      state.exam = action.payload;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setExamForm: (state, action) => {
      const {
        examName,
        examType,
        curriculum,
        class: classType,
        division,
        subject,
        subjectCode,
        examDate,
        uniquePaperCode,
      } = action.payload;
      state.examName = examName;
      state.examType = examType;
      state.curriculum = curriculum;
      state.class = classType;
      state.division = division;
      state.subject = subject;
      state.subjectCode = subjectCode;
      state.examDate = examDate;
      state.uniquePaperCode = uniquePaperCode;
    },
  },
});

export const { login, logout, setExam, setProfile, setExamForm } =
  authSlice.actions;
export default authSlice.reducer;
