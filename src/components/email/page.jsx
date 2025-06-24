"use client";

import React, { useState } from "react";
import PostNowButton from "../PostNowButton";


function Email() {
  const [formData, setFormData] = useState({
    recipient: "",
    recipientName: "",
    subject: "",
    tone: "Formal",
    description: "",
  });

  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOutput("");
    setLoading(true);

    const { recipient, recipientName, subject, tone, description } = formData;

    const prompt = `
You are an AI email assistant. Write a ${tone.toLowerCase()} email with the following details:
- Recipient Email: ${recipient}
- Greet them as: Dear ${recipientName}
- Subject: ${subject}
- Purpose: ${description}

Make the email well-structured with a clear subject line, opening greeting (using 'Dear ${recipientName}'), body, and a closing. Keep the tone ${tone.toLowerCase()}.
`;

    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "mistralai/mistral-7b-instruct:free",
          messages: [
            {
              role: "system",
              content: "You are a helpful assistant that generates professional, well-written emails based on user input.",
            },
            {
              role: "user",
              content: prompt.trim(),
            },
          ],
        }),
      });

      const data = await res.json();
      if (!data.choices || !data.choices[0]) {
        setOutput("❌ Failed to generate email. Try again.");
      } else {
        setOutput(data.choices[0].message.content.trim());
      }
    } catch (err) {
      console.error(err);
      setOutput("❌ Error connecting to OpenRouter.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 bg-white shadow-xl rounded-xl">
      <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800">✉️ Generate Email with AI</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Recipient Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Recipient Email</label>
          <input
            type="email"
            name="recipient"
            value={formData.recipient}
            onChange={handleChange}
            required
            className="mt-1 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="example@domain.com"
          />
        </div>

        {/* Recipient Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Recipient Name</label>
          <input
            type="text"
            name="recipientName"
            value={formData.recipientName}
            onChange={handleChange}
            required
            className="mt-1 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. Akshay, Mr. Patel"
          />
        </div>

        {/* Subject */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Subject</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="mt-1 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email subject"
          />
        </div>

        {/* Tone */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Tone</label>
          <select
            name="tone"
            value={formData.tone}
            onChange={handleChange}
            className="mt-1 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Formal</option>
            <option>Friendly</option>
            <option>Persuasive</option>
            <option>Concise</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            What should the email be about?
          </label>
          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            required
            className="mt-1 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe the purpose, key points, or background for the email..."
          />
        </div>

        {/* Submit */}
        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200"
          >
            {loading ? "Generating..." : "Generate Email"}
          </button>
        </div>
      </form>

      {/* Output Display */}
      {output && (
  <div className="mt-6 p-4 bg-gray-50 border rounded-lg">
    <h3 className="text-lg font-semibold mb-2 text-blue-600">📧 Suggested Email:</h3>
    <pre className="whitespace-pre-wrap mb-4">{output}</pre>

    <div className="text-right">
      <PostNowButton platform="Gmail" content={output} />
    </div>
  </div>
)}

    </div>
  );
}

export default Email;
