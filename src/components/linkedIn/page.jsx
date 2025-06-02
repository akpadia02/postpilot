"use client";

import React, { useState } from "react";

function LinkedIn() {
  const [formData, setFormData] = useState({
    topic: "",
    audience: "Professional",
    objective: "Inform",
    length: "Medium",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("LinkedIn post form:", formData);
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
          <button className="px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800">
            Generate LinkedIn Post
          </button>
        </div>
      </form>
    </div>
  );
}

export default LinkedIn;
