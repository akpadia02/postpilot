"use client";

import React, { useState } from "react";
import Sidebar from "../SideBar";

function Email() {
  const [formData, setFormData] = useState({
    recipient: "",
    subject: "",
    tone: "Formal",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Send formData to your backend/AI API
    console.log("Form submitted:", formData);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 bg-white shadow-xl rounded-xl">
      <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800">✉️ Generate Email with AI</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Recipient */}
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
            Generate Email
          </button>
        </div>
      </form>
    </div>
  );
}

export default Email;
