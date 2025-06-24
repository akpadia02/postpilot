"use client";
import React, { useState } from "react";

function LinkedIn() {
  const [formData, setFormData] = useState({
    topic: "",
    audience: "Professional",
    objective: "Inform",
    length: "Medium",
  });

  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Save to localStorage
    localStorage.setItem("postpilot_last_prompt", JSON.stringify(formData));

    const userPrompt = `
      Create a ${formData.length.toLowerCase()} LinkedIn post for the topic "${formData.topic}". 
      Target audience: ${formData.audience}. 
      Objective: ${formData.objective.toLowerCase()}. 
      Keep the tone professional and suitable for LinkedIn.
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
              content: "You are a professional assistant that writes effective LinkedIn posts.",
            },
            {
              role: "user",
              content: userPrompt.trim(),
            },
          ],
        }),
      });

      const data = await res.json();

      if (!data.choices || !data.choices[0]) {
        setOutput("❌ Failed to generate post. Please try again later.");
      } else {
        setOutput(data.choices[0].message.content);
      }
    } catch (err) {
      console.error(err);
      setOutput("❌ Error connecting to OpenRouter.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 bg-white shadow-xl rounded-xl">
      <h1 className="text-2xl font-semibold mb-6 text-center text-blue-800">
        💼 Generate LinkedIn Post
      </h1>

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
            className="px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800"
          >
            {loading ? "Generating..." : "Generate LinkedIn Post"}
          </button>
        </div>
      </form>

      {output && (
        <div className="mt-6 p-4 bg-gray-50 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2 text-blue-700">📝 Your Post:</h3>
          <p className="whitespace-pre-wrap">{output}</p>
        </div>
      )}
    </div>
  );
}

export default LinkedIn;
