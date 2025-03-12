import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import MainLayout from "./pages/MainLayout";
import ExamManagement from "./pages/exam_management/ExamManagement";
import SignIn from "./pages/auth/signin/SignIn";
import SignUp from "./pages/auth/signup/SignUp";
import UploadTemplate from "./pages/exam_management/UploadTemplate";
import TeacherQuestionPaper from "./pages/exam_management/TeacherQuestionPaper";
import CreateQuestionPaper from "./pages/exam_management/CreateQuestionPaper";
import AddQuestion from "./pages/exam_management/AddQuestion";
import AddQuestionFromBank from "./pages/exam_management/AddQuestionFromBank";
import SelectedQuestionFromBank from "./pages/exam_management/SelectedQuestionFromBank";
import Dashboard from "./pages/dashboard/Dashboard";
import UploadQuestion from "./pages/exam_management/UploadQuestion";
import ReviewQuestions from "./pages/exam_management/ReviewQuestions";
import PublishForm from "./pages/exam_management/PublishForm";
import PreviewPaper from "./pages/exam_management/PreviewPaper";
import ExamminationRule from "./pages/paper/ExamminationRule";
import StudentPaper from "./pages/paper/StudentPaper";
import ComingSoon from "./pages/ComingSoon";
import Theme1 from "./pages/paper_format/Theme1";
import Theme2 from "./pages/paper_format/Theme2";
import ImageReader from "./components/reader/ImageReader";
import PDFTextExtractor from "./components/reader/PDFTextExtractor";
import PreviewGroupPaper from "./pages/exam_management/PreviewGroupPaper";
import QuestionBank from "./pages/exam_management/QuestionBank";
import EnhancedStudentPaper from "./pages/paper/EnhancedStudentPaper";
import StudentQuestionPaper from "./pages/student/StudentQuestionPaper";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const role = useSelector((state) => state.auth?.profile?.roleDto?.name);

  const ExamManagement = () => {
    return role === "student" ? (
      <StudentQuestionPaper />
    ) : (
      <TeacherQuestionPaper />
    );
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/signin"
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <SignIn />
          }
        />
        <Route
          path="/signup"
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <SignUp />
          }
        />
        {/* Protected Routes */}
        {isAuthenticated ? (
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/exam-management" element={<ExamManagement />} />
            <Route path="/question-management" element={<QuestionBank />} />
            <Route path="/upload-questions" element={<UploadQuestion />} />
            <Route path="/preview-questions" element={<ReviewQuestions />} />
            <Route path="/preview-paper" element={<PreviewPaper />} />
            <Route
              path="/preview-group-paper"
              element={<PreviewGroupPaper />}
            />
            <Route path="/paper" element={<ExamminationRule />} />
            <Route path="/student-paper" element={<StudentPaper />} />
            <Route
              path="/student-paper-nosection"
              element={<EnhancedStudentPaper />}
            />
            <Route path="/publish-questions" element={<PublishForm />} />
            <Route
              path="/selected-question-by-bank"
              element={<SelectedQuestionFromBank />}
            />
            <Route
              path="/add-question-by-bank"
              element={<AddQuestionFromBank />}
            />
            <Route
              path="/create-question-paper"
              element={<CreateQuestionPaper />}
            />
            <Route path="/add-question" element={<AddQuestion />} />
            <Route path="/upload" element={<UploadTemplate />} />
            <Route path="/coming-soon" element={<ComingSoon />} />
            <Route path="/question-bank/theme1" element={<Theme1 />} />
            <Route path="/question-bank/theme2" element={<Theme2 />} />
            <Route path="/image-reader" element={<ImageReader />} />
            <Route path="/pdf-text-reader" element={<PDFTextExtractor />} />
            {/* Redirect to default dashboard route */}
            <Route path="/*" element={<Navigate to="/coming-soon" />} />
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Route>
        ) : (
          // Redirect if not logged in
          <Route path="*" element={<Navigate to="/signin" />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
