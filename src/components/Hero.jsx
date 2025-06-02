import React from 'react'
import {MessageCircle, Linkedin, Mail, Instagram} from 'lucide-react';
import Card from './card';
import AboveCard from './AboveCard';

function Hero() {
  return (
      <div className="bg-white">
      <div>
       <AboveCard />
      </div>
      <div className="m-5 flex gap-6 flex-wrap justify-center">
        <Card
          icon={Linkedin}
          color="bg-blue-500"
          text="Create LinkedIn posts with professional tone, headlines, and clear messaging."
        />
        <Card
          icon={Instagram}
          color="bg-pink-400"
          text="Create Instagram captions and post content tailored to your style and audience."
        />
        <Card
          icon={MessageCircle}
          color="bg-green-500"
          text="Generate WhatsApp messages that sound personal, clear, and to the point."
        />
        <Card
          icon={Mail}
          color="bg-red-400"
          text="Write email content for outreach, follow-ups, or newsletters — quick and polished."
        />
      </div>
    </div>
  )
}

export default Hero
