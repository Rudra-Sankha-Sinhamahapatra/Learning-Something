"use client";
import { useChat } from "ai/react";
import Image from "next/image";
import { useRef, useState } from "react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const [files, setFiles] = useState<FileList | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <div className="flex flex-col w-full max-w-md py-24 mx-auto">
        <div className="pb-24">
        {messages.map((msg) => (
          <div key={msg.id} className="my-3">
            {msg.role === "user" ? "User: " : "AI: "}
            {msg.content}
            <div>
              {msg?.experimental_attachments
                ?.filter((attachment) =>
                  attachment?.contentType?.startsWith("image/")
                )
                .map((attachment, index) => (
                  <Image
                    key={`${msg.id}-${index}`}
                    src={attachment.url}
                    width={300}
                    height={200}
                    className="mt-2"
                    alt={attachment.name ?? `attachment-${index}`}
                  />
                ))}
            </div>
          </div>
        ))}
        </div>
        <form
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl space-y-2"
          onSubmit={(event) => {
            handleSubmit(event, {
              experimental_attachments: files,
            });
            setFiles(undefined);

            if (fileInputRef.current) {
              fileInputRef.current.value = "";
            }
          }}
        >
          <input
            type="file"
            className=""
            onChange={(event) => {
              if (event.target.files) {
                setFiles(event.target.files);
              }
            }}
            multiple
            ref={fileInputRef}
          />
          <input
            type="text"
            value={input}
            placeholder="Type something unique"
            onChange={handleInputChange}
            className="w-full p-2"
          />
        </form>
      </div>
    </>
  );
}
