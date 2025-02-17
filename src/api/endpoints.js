export const API_ENDPOINTS = {
  // CLASSROOM: {
  //   BASE: "/v1/classrooms", // Base endpoint for classroom-related operations
  //   VALIDATE_NAME: "/v1/classrooms/validate-name", // Endpoint to validate classroom name
  //   BY_SCHOOL: "/v1/classrooms/schoolId", // Endpoint student by school
  // },
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    SIGNUP: "/users",
    LOGOUT: "/auth/logout",
    ME: "/auth/me",
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
