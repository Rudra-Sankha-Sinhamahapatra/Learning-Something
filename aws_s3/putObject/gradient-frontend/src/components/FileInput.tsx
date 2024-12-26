import React from 'react';
import { Upload } from 'lucide-react';

interface FileInputProps {
  onFileSelect: (file: File) => void;
}

export const FileInput: React.FC<FileInputProps> = ({ onFileSelect }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div className="mt-1 relative group">
      <div className="border-2 border-dashed border-white/20 rounded-xl p-6 
        transition-all duration-300 
        group-hover:border-teal-400/50 
        bg-gradient-to-br from-white/5 to-transparent">
        <div className="space-y-3 text-center">
          <Upload className="mx-auto h-12 w-12 text-teal-400 transition-transform group-hover:scale-110 duration-300" />
          <div className="flex text-sm text-[#B0B6C0]">
            <label className="relative cursor-pointer rounded-md font-medium text-teal-400 hover:text-teal-300 focus-within:outline-none">
              <span>Upload a file</span>
              <input
                type="file"
                className="sr-only"
                accept=".pdf,.doc,.docx"
                onChange={handleChange}
              />
            </label>
          </div>
          <p className="text-xs text-[#B0B6C0]">PDF or DOC up to 10MB</p>
        </div>
      </div>
    </div>
  );
};