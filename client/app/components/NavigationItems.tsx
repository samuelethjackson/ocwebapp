import React from "react";
import Link from "next/link";
import CloseIcon from "./icons/closeIcon";
import { usePathname } from "next/navigation";

interface NavigationItemProps {
  label: string;
  link: string;
  onAboutHover: (isHovered: boolean) => void;
  setIsAboutHovered: (isHovered: boolean) => void;
}

const NavigationItem: React.FC<NavigationItemProps> = ({
  label,
  link,
  onAboutHover,
  setIsAboutHovered,
}) => {

    const pathname = usePathname();
    const isCurrentPage = pathname === link;

  return (
    <div className="h-6 md:flex center md:w-16">
      {isCurrentPage ? (
        <div className="opacity-100 -mt-0.5">
          <Link href={"/"}>
            <CloseIcon />
          </Link>
        </div>
      ) : (
        <Link
          href={link}
          onMouseEnter={() => {
            onAboutHover(true);
            setIsAboutHovered(true); // Set hover state to true
          }}
          onMouseLeave={() => {
            onAboutHover(false);
            setIsAboutHovered(false); // Set hover state to false
          }}
          className="w-full text-base text-right md:text-left font-normal leading-tight"
        >
          {label}
        </Link>
      )}
    </div>
  );
};

export default NavigationItem;

