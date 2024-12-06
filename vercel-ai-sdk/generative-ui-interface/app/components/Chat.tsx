"use client";

import { useChat } from "ai/react";
import { Weather } from "@/components/weather/index";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="flex flex-col w-full max-w-md h-screen mx-auto py-4 px-3">
      <div className="flex-1 overflow-y-auto mb-2">
        {messages.map((message) => (
          <div key={message.id} className="mb-4">
            <div className="font-semibold">
              {message.role === "user" ? "User:" : "AI:"}
            </div>
            <div className="whitespace-pre-wrap">{message.content}</div>
            <div>
              {message.toolInvocations?.map((toolInvocation) => {
                const { toolName, toolCallId, state } = toolInvocation;

                if (state === "result") {
                  if (toolName === "displayWeather") {
                    const { result } = toolInvocation;
                    return (
                      <div key={toolCallId}>
                        <Weather {...result} />
                      </div>
                    );
                  }
                } else {
                  return (
                    <div key={toolCallId}>
                      {toolName === "displayWeather" ? (
                        <div>Loading Weather...</div>
                      ) : null}
                    </div>
                  );
                }
              })}
            </div>
          </div>
        ))}
      </div>

      <form
        className="flex items-center gap-2 border-t border-gray-300 pt-2"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          onChange={handleInputChange}
          value={input}
          className="flex-1 p-2 border border-gray-300 rounded shadow-sm"
          placeholder="Enter a message"
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
        >
          Send
        </button>
      </form>
    </div>
  );
}
