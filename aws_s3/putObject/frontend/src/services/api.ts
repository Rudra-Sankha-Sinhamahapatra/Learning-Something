import axios from 'axios';
import { UploadResponse, DownloadResponse } from '../types/file';

const API_BASE_URL = 'http://localhost:3000';

export const generateUploadUrl = async (file: File) => {
  const response = await axios.post<UploadResponse>(`${API_BASE_URL}/generatePutURL`, {
    contentType: file.type,
    fileData: file.name
  });
  return response.data;
};

export const uploadToUrl = async (url: string, file: File) => {
  await axios.put(url, file, {
    headers: {
      'Content-Type': file.type
    }
  });
};

export const getDownloadUrl = async (key: string) => {
  const response = await axios.post<DownloadResponse>(`${API_BASE_URL}/getObject`, {
    objectName: key
  });
  return response.data.url;
};