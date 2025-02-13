export const API_ENDPOINTS = {
  // CLASSROOM: {
  //   BASE: "/v1/classrooms", // Base endpoint for classroom-related operations
  //   VALIDATE_NAME: "/v1/classrooms/validate-name", // Endpoint to validate classroom name
  //   BY_SCHOOL: "/v1/classrooms/schoolId", // Endpoint student by school
  // },
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    ME: "/auth/me",
  },
  exam: {
    BASE: "/exams",
    BY_ID: "/exams/{id}",
  },
  QUESTION: {
    BASE: "/questions",
    BY_ID: "/questions/{id}",
  },
  EXAMQUESTION: {
    BASE: "/exam-questions",
  },
};
