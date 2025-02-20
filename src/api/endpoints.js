export const API_ENDPOINTS = {
  // CLASSROOM: {
  //   BASE: "/v1/classrooms", // Base endpoint for classroom-related operations
  //   VALIDATE_NAME: "/v1/classrooms/validate-name", // Endpoint to validate classroom name
  //   BY_SCHOOL: "/v1/classrooms/schoolId", // Endpoint student by school
  // },
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    SIGNUP_USER: "/users",
    LOGOUT: "/auth/logout",
    ME: "/auth/me",
  },
  USER: {
    BASE: "/user",
    BY_ID: "/user/{id}",
    ALL: "/user/all",
    USER_PROFILE: "/user/profile",
    ROLE: "/roles",
    IS_EXIST: "/users/check-name",
  },
  exam: {
    BASE: "/exams",
    BY_ID: "/exams/{id}",
    ALL: "/exams/all",
  },
  QUESTION: {
    BASE: "/questions",
    BY_ID: "/questions/{id}",
    DOWNLOAD_TEMPLATE: "/questions/download-template",
    UPLOAD: "/questions/upload",
  },
  EXAMQUESTION: {
    BASE: "/exam-questions",
    UPSERT: "/exam-questions/add-or-update",
  },
  MASTERLOOKUP: {
    BASE: "/masterlookup",
    BY_ID: "/masterlookup/{id}",
    BY_TYPE: "/masterlookup/type/{type}",
  },
  CURRICULUM: {
    BASE: "/curriculums",
    BY_ID: "/curriculums/{id}",
  },
  CLASSES: {
    BASE: "/classes",
    BY_ID: "/classes/{id}",
  },
  SUBJECT: {
    BASE: "/subjects",
    BY_ID: "/subjects/{id}",
  },
};
