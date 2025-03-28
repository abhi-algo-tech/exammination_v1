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
    ANSWER_BY_ID: "/exams/answers",
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
  EXAMQUESTIONANSWER: {
    BASE: "/student-exam-answers",
    UPSERT: "/student-exam-answers/upsert",
    GET_BY_EXAM_AND_STUDENT: "/student-exam-answers/exam",
  },
  GROUPQUESTION: {
    BASE: "/group-questions",
    BY_ID: "/group-questions/{id}",
  },
  EXAMGROUPQUESTION: {
    BASE: "/exam-group-questions",
    UPSERT: "/exam-group-questions/add-or-update",
  },
  EXAMSCHEDULE: {
    BASE: "/exam-schedules",
    BY_SEARCH: "/exam-schedules/search",
  },
  EXAMRESULTS: {
    BASE: "/exam-results",
    CREATE: "/exam-results/create",
  },

  DOCUMENT: {
    BASE: "/documents",
    UPLOAD: "/documents/upload",
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
