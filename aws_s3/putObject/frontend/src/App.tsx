import React, { useState } from 'react';
import { Download, FileType2 } from 'lucide-react';
import { generateUploadUrl, uploadToUrl, getDownloadUrl } from './services/api';
import { FileInput } from './components/FileInput';
import { StatusMessage } from './components/StatusMessage';

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [statusType, setStatusType] = useState<'error' | 'success'>('success');
  const [downloadUrl, setDownloadUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [objectKey, setObjectKey] = useState('');

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setUploadStatus('');
    setDownloadUrl('');
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus('Please select a file first');
      setStatusType('error');
      return;
    }

    setIsLoading(true);
    try {
      // Get upload URL
      const { url, key } = await generateUploadUrl(selectedFile);
      
      // Upload file
      await uploadToUrl(url, selectedFile);
      
      setObjectKey(key);
      setUploadStatus('File uploaded successfully!');
      setStatusType('success');
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus('Error uploading file. Please try again.');
      setStatusType('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!objectKey) {
      setUploadStatus('No file has been uploaded yet');
      setStatusType('error');
      return;
    }

    setIsLoading(true);
    try {
      const url = await getDownloadUrl(objectKey);
      setDownloadUrl(url);
    } catch (error) {
      console.error('Download error:', error);
      setUploadStatus('Error getting download URL. Please try again.');
      setStatusType('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-8">
          <div className="text-center">
            <FileType2 className="mx-auto h-12 w-12 text-gray-400" />
            <h2 className="mt-2 text-xl font-semibold text-gray-900">File Upload & Download</h2>
            <p className="mt-1 text-sm text-gray-500">Upload PDF or DOC files</p>
          </div>

          <div className="mt-8">
            <label className="block text-sm font-medium text-gray-700">
              Choose a file
            </label>
            <FileInput onFileSelect={handleFileSelect} />
          </div>

          {selectedFile && (
            <div className="mt-4">
              <p className="text-sm text-gray-500">
                Selected file: {selectedFile.name}
              </p>
            </div>
          )}

          <div className="mt-6 space-y-4">
            <button
              onClick={handleUpload}
              disabled={!selectedFile || isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
            >
              {isLoading ? 'Uploading...' : 'Upload File'}
            </button>

            <button
              onClick={handleDownload}
              disabled={!objectKey || isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400"
            >
              <Download className="h-5 w-5 mr-2" />
              Get Download Link
            </button>
          </div>

          <StatusMessage message={uploadStatus} type={statusType} />

          {downloadUrl && (
            <div className="mt-4">
              <p className="text-sm text-gray-700">Download URL (expires in 20 seconds):</p>
              <a
                href={downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-indigo-600 hover:text-indigo-500 break-all"
              >
                {downloadUrl}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;