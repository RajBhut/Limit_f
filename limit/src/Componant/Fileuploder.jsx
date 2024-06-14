import axios from 'axios';
import { useState } from 'react';
export default function FileUploader() {
  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleFileUpload = (e) => {
    if(e.target.files[0]){
      setFile(e.target.files[0]);
      setFileURL(URL.createObjectURL(e.target.files[0]));
      console.log(e.target.files[0]);
    } else {
      console.error("Please select file");
    }
  }

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', fileName);

    try {
      const response = await axios.post('http://localhost:3000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <input type="file" onChange={handleFileUpload} />
      <input type="text" onChange={(e) => setFileName(e.target.value)} placeholder="Enter file name" />
      <button onClick={handleSubmit}>Submit</button>
      {fileURL && file.type.startsWith('image/') ? (
        <img src={fileURL} alt="Preview" style={{maxWidth: '100%', height: 'auto'}} />
      ) : (
        <a href={fileURL} download>Download file</a>
      )}
    </>
  );
}