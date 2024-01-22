import React from 'react';

interface StorySectionProps {
  color: string;
  text: string;
}

const colorClasses: { [key: string]: string } = {
  black: 'bg-black',
  gray: 'bg-gray-800',
  blue: 'bg-blue-800	', // adjust this to the specific gray you want
};

const StorySection: React.FC<StorySectionProps> = ({ color, text }) => {
  const colorClass = colorClasses[color] || 'bg-white'; // default to white if color not found

  return (
    <section className={`w-screen h-screen ${colorClass} flex items-center justify-center snap-start`}>
      <p className="text-white text-2xl">{text}</p>
    </section>
  );
};

export default StorySection;