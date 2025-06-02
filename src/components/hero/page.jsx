import React from 'react';
import { MessageCircle, Linkedin, Mail, Instagram } from 'lucide-react';
import AboveCard from '../AboveCard';
import Card from '../card';
import { Link } from 'react-router-dom'; // Import Link

function Hero() {
  return (
    <div className="bg-white mt-45">
      <div>
        <AboveCard />
      </div>
      <div className="m-5 flex gap-6 flex-wrap justify-center">
        <Link to="/linkedin">
          <Card
            icon={Linkedin}
            color="bg-blue-500"
            text="Create LinkedIn posts with professional tone, headlines, and clear messaging."
          />
        </Link>
        <Link to="/instagram">
          <Card
            icon={Instagram}
            color="bg-pink-400"
            text="Create Instagram captions and post content tailored to your style and audience."
          />
        </Link>
        <Link to="/whatsapp">
          <Card
            icon={MessageCircle}
            color="bg-green-500"
            text="Generate WhatsApp messages that sound personal, clear, and to the point."
          />
        </Link>
        <Link to="/email">
          <Card
            icon={Mail}
            color="bg-red-400"
            text="Write email content for outreach or follow-ups — quick and polished."
          />
        </Link>
      </div>
    </div>
  );
}

export default Hero;
