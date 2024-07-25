import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { CustomArrowProps } from "react-slick";

const CustomPrevArrow: React.FC<CustomArrowProps> = (props) => {
  const { className, style, onClick } = props;
  return (
    <FaChevronLeft
      className={className}
      style={{
        ...style,
        display: "block",
        color: "black", // Adjust color if needed
        zIndex: 1,
        left: "10px", // Adjust position if needed
      }}
      onClick={onClick}
    />
  );
};

const CustomNextArrow: React.FC<CustomArrowProps> = (props) => {
  const { className, style, onClick } = props;
  return (
    <FaChevronRight
      className={className}
      style={{
        ...style,
        display: "block",
        color: "black", // Adjust color if needed
        zIndex: 1,
        right: "10px", // Adjust position if needed
      }}
      onClick={onClick}
    />
  );
};

export { CustomPrevArrow, CustomNextArrow };
