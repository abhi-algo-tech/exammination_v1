import React, { useState } from "react";
import Tesseract from "tesseract.js";

const ImageReader = () => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      extractText(file);
    }
  };

  const extractText = (file) => {
    setLoading(true);
    Tesseract.recognize(
      file,
      "eng", // Language: English (You can change to other languages)
      {
        logger: (m) => console.log(m), // Log OCR progress
      }
    )
      .then(({ data: { text } }) => {
        setText(text);
        setLoading(false);
      })
      .catch((error) => {
        console.error("OCR Error:", error);
        setLoading(false);
      });
  };

  return (
    <div
      className="container-fluid"
      style={{ textAlign: "center", padding: "20px" }}
    >
      <h2>Image to Text (OCR)</h2>
      <input type="file" accept="image/*" onChange={handleImageUpload} />

      {image && (
        <img
          src={image}
          alt="Uploaded"
          style={{ width: "300px", marginTop: "10px" }}
        />
      )}

      {loading ? (
        <p>Extracting text...</p>
      ) : (
        text && (
          <div className="mt-3">
            <h3>Extracted Text:</h3>
            <p style={{ whiteSpace: "pre-wrap", textAlign: "left" }}>{text}</p>
          </div>
        )
      )}
    </div>
  );
};

export default ImageReader;
