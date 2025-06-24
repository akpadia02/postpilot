"use client";

import React, { useState } from "react";
import PostNowButton from "../PostNowButton";

function LinkedIn() {
  const [formData, setFormData] = useState({
    topic: "",
    audience: "Professional",
    objective: "Inform",
    length: "Medium",
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

    const { topic, audience, objective, length } = formData;

    const prompt = `
      Write a ${length.toLowerCase()} LinkedIn post.
      Target audience: ${audience}.
      Objective: ${objective}.
      Topic: ${topic}.
      Keep it professional, engaging, and relevant.
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
              content: "You are a professional LinkedIn content writer. Write impactful, valuable posts for working professionals.",
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
        setOutput("❌ Failed to generate post. Try again.");
      } else {
        setOutput(data.choices[0].message.content.trim());
      }
    } catch (error) {
      console.error(error);
      setOutput("❌ Error reaching OpenRouter.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 bg-white shadow-xl rounded-xl">
      <h1 className="text-2xl font-semibold mb-6 text-center text-blue-800">💼 Generate LinkedIn Post</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium">Post Topic</label>
          <input
            type="text"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            placeholder="e.g. AI in Hiring, Career Advice"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Audience</label>
          <select
            name="audience"
            value={formData.audience}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          >
            <option>Professional</option>
            <option>Recruiters</option>
            <option>Freshers</option>
            <option>Tech Enthusiasts</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Objective</label>
          <select
            name="objective"
            value={formData.objective}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          >
            <option>Inform</option>
            <option>Inspire</option>
            <option>Share Experience</option>
            <option>Promote</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Length</label>
          <select
            name="length"
            value={formData.length}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          >
            <option>Short</option>
            <option>Medium</option>
            <option>Long</option>
          </select>
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate LinkedIn Post"}
          </button>
        </div>
      </form>

      {output && (
        <div className="mt-6 p-4 bg-gray-50 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2 text-blue-700">📝 Your LinkedIn Post:</h3>
          <p className="whitespace-pre-wrap mb-4">{output}</p>

          {/* PostNowButton to trigger Chrome extension */}
          <PostNowButton platform="LinkedIn" content={output} />
        </div>
      )}
    </div>
  );
}

export default LinkedIn;
