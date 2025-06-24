"use client";

import React, { useState } from "react";

function WhatsApp() {
  const [formData, setFormData] = useState({
    recipientName: "",
    context: "",
    tone: "Friendly",
    language: "English",
    useEmojis: true,
    length: "Small",
  });

  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setOutput("");

    const { recipientName, context, tone, language, useEmojis, length } = formData;

    const prompt = `
      Write a ${tone.toLowerCase() === "professional" ? "professional" : "friendly and casual"} WhatsApp message 
      in ${language} to ${recipientName || "a recipient"}.
      Context: ${context}.
      Keep the message ${length.toLowerCase()} in length.
      ${useEmojis ? "Use emojis to make it more expressive." : "Avoid emojis."}
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
              content: "You are an assistant that crafts personalized and natural-sounding WhatsApp messages.",
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
        setOutput("❌ Failed to generate message. Please try again.");
      } else {
        setOutput(data.choices[0].message.content);
      }
    } catch (err) {
      console.error(err);
      setOutput("❌ Error reaching OpenRouter.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 bg-white shadow-xl rounded-xl">
      <h1 className="text-2xl font-semibold mb-6 text-center text-green-700">💬 Generate WhatsApp Message</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium">Recipient Name</label>
          <input
            type="text"
            name="recipientName"
            value={formData.recipientName}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            placeholder="e.g. John"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Context</label>
          <textarea
            name="context"
            rows="3"
            value={formData.context}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            placeholder="What's the message about?"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Tone</label>
          <select
            name="tone"
            value={formData.tone}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          >
            <option>Friendly</option>
            <option>Professional</option>
            <option>Apologetic</option>
            <option>Casual</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Language</label>
          <input
            type="text"
            name="language"
            value={formData.language}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            placeholder="e.g. English, Hindi"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Preferred Length</label>
          <select
            name="length"
            value={formData.length}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          >
            <option>Small</option>
            <option>Medium</option>
            <option>Long</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="useEmojis"
            checked={formData.useEmojis}
            onChange={handleChange}
            className="h-4 w-4"
          />
          <label className="text-sm font-medium">Use Emojis</label>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            {loading ? "Generating..." : "Generate WhatsApp Message"}
          </button>
        </div>
      </form>

      {output && (
        <div className="mt-6 p-4 bg-gray-50 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2 text-green-700">📩 Your Message:</h3>
          <p className="whitespace-pre-wrap">{output}</p>

          <div className="text-right mt-4">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(output)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              📲 Open in WhatsApp
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default WhatsApp;
