import { NextRequest, NextResponse } from "next/server";
import { CompletionCopilot, type CompletionRequestBody } from "monacopilot";

const copilot = new CompletionCopilot(undefined, {
  model: async (prompt) => {
    try {
      const res = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" +
        process.env.GEMINI_API_KEY,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  { text: prompt.context || "" },
                  { text: prompt.instruction || "" },
                  { text: prompt.fileContent || "" },
                ],
              },
            ],
          }),
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Gemini API error:", errorText);
        return { text: "" };
      }

      const data = await res.json();
      const completion = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
      console.log("Generated completion:", completion.substring(0, 100));

      return {
        text: completion,
      };
    } catch (error) {
      console.error("Error in model function:", error);
      return { text: "" };
    }
  },
});

export async function POST(req: NextRequest) {
  try {
    const body: CompletionRequestBody = await req.json();

    console.log("Received request body:", body);

    const completion = await copilot.complete({
      body,
    });

    return NextResponse.json(completion);
  } catch (error: any) {
    console.error("Error in completion handler:", error);
    return NextResponse.json({
      error: "Completion failed",
      details: error?.message || String(error)
    }, { status: 500 });
  }
}
