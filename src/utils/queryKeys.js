export const authKeys = {
  login: "login",
  signup: "signup",
};
export const userKeys = {
  checkName: "checkName",
};
export const examKeys = {
  exam: "exam",
};
export const classRoomKeys = {
  classrooms: "classrooms",
};

export const studentKeys = {
  students: "students",
};

export const staffKeys = {
  staff: "staff",
};

export const questionKeys = {
  question: "question",
};
export const examQuestionKeys = {
  examQuestion: "examQuestion",
};
export const curriculumKeys = {
  curriculum: "curriculum",
};
export const masterLookupKeys = {
  Lookup: "Lookup",
};
export const classKeys = {
  classes: "classes",
};
export const subjectKeys = {
  subject: "subject",
};

export const groupQuestionKeys = {
  groupQuestion: "groupQuestion",
};
export const examScheduleKeys = {
  examSchedule: "examSchedule",
};
export const examResultKeys = {
  examResult: "examResult",
};
export const studentExamAnswersKeys = {
  studentExamAnswers: ["studentExamAnswers"],

  studentExamAnswersByExamAndStudent: (examId, studentId) => [
    "studentExamAnswers",
    "exam",
    examId,
    "student",
    studentId,
  ],
};
