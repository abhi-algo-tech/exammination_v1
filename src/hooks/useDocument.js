// hooks/useDocument.js
import { useState, useEffect } from "react";
import DocumentService from "../services/DocumentService";

export const useDocuments = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const response = await DocumentService.getAllDocuments();
      setDocuments(response.data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return { documents, loading, error, fetchDocuments };
};

export const useDocumentUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const uploadDocument = async (file, moduleName, documentData) => {
    setUploading(true);
    try {
      const response = await DocumentService.uploadDocument(
        file,
        moduleName,
        documentData
      );
      return response;
    } catch (err) {
      setUploadError(err.message);
    }
    setUploading(false);
  };

  return { uploadDocument, uploading, uploadError };
};
