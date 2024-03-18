import React from 'react';

interface AnchorElementProps {
  anchor: string;
}

const AnchorElement: React.FC<AnchorElementProps> = ({ anchor }) => {
  return (
    <div id={anchor} className='short'>
    </div>
  );
};

export default AnchorElement;
