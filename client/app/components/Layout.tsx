import AnimatedVideo from './AnimatedVideo';
import TitleBand from './TitleBand';

interface LayoutProps {
  pageName: string;
  highRes: boolean;
  setHighRes: (value: boolean) => void;
  isAboutHovered: boolean; // Add this line
  setIsAboutHovered: (value: boolean) => void; // Add this line
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ pageName, highRes, setHighRes, isAboutHovered, setIsAboutHovered, children }) => {

  return (
      <div className='dark:bg-black bg-white'>
        <TitleBand pageName={pageName} highRes={highRes} setHighRes={setHighRes} onAboutHover={setIsAboutHovered} />
        {children}
      </div>
  );
};

export default Layout;