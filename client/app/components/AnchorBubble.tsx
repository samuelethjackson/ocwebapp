import React from "react";

interface AnchorBubbleProps {
  section: string;
  title: string;
  handleScroll: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, id: string) => void;
  activeSection: string;
}

const AnchorBubble: React.FC<AnchorBubbleProps> = ({ section, title, handleScroll, activeSection }) => {
  return (
    <a
      href={`#${section}`}
      onClick={(e) => handleScroll(e, section)}
      className={`anchor-bubble ${activeSection === section ? "opacity-100" : "opacity-50"}`}
      data-id={section} // Add the data-id attribute here
    >
      {title}
    </a>
  );
};

export default AnchorBubble;