import React, { useState } from 'react';
import { Upload, Download, FileType2 } from 'lucide-react';
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
      const { url, key } = await generateUploadUrl(selectedFile);
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
    <div className="min-h-screen bg-gradient-to-br from-[#0D1720] via-[#124A50] to-[#142D3B] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-white tracking-tight mb-4">
            Secure File Transfer
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-200 to-cyan-400 mt-2">
              Made Simple
            </span>
          </h1>
          <p className="text-[#B0B6C0]">
            Upload and share your documents securely with our advanced file transfer system
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <FileType2 className="mx-auto h-12 w-12 text-teal-400" />
            <h2 className="mt-4 text-xl font-semibold text-white">File Upload & Download</h2>
            <p className="mt-1 text-sm text-[#B0B6C0]">Upload PDF or DOC files</p>
          </div>

          <FileInput onFileSelect={handleFileSelect} />

          {selectedFile && (
            <div className="mt-4">
              <p className="text-sm text-[#B0B6C0]">
                Selected file: {selectedFile.name}
              </p>
            </div>
          )}

          <div className="mt-6 space-y-4">
            <button
              onClick={handleUpload}
              disabled={!selectedFile || isLoading}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-lg font-medium 
                hover:from-teal-600 hover:to-cyan-700 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Upload className="h-5 w-5" />
              {isLoading ? 'Uploading...' : 'Upload File'}
            </button>

            <button
              onClick={handleDownload}
              disabled={!objectKey || isLoading}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 bg-white/10 text-white rounded-lg font-medium
                hover:bg-white/20 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="h-5 w-5" />
              Get Download Link
            </button>
          </div>

          <StatusMessage message={uploadStatus} type={statusType} />

          {downloadUrl && (
            <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
              <p className="text-sm text-[#B0B6C0] mb-2">Download URL (expires in 20 seconds):</p>
              <a
                href={downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-teal-400 hover:text-teal-300 break-all transition-colors"
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