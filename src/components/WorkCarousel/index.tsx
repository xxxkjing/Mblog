import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';

interface WorkItem {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface WorkCarouselProps {
  workItems: WorkItem[];
}

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  overflow: hidden;
  padding: 40px 0;
`;

const CarouselTrack = styled(motion.div)`
  display: flex;
  align-items: center;
  width: 100%;
`;

const CarouselItem = styled(motion.div)`
  flex: 0 0 100%;
  padding: 0 20px;
`;

const CarouselContent = styled.div`
  background: ${({ theme }) => 
    theme.scheme === "light" ? "white" : theme.colors.gray4};
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const CarouselImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 12px;
`;

const CarouselTitle = styled.h3`
  color: ${({ theme }) => theme.colors.gray12};
  margin: 16px 0 8px 0;
  font-size: 1.25rem;
  font-weight: 600;
`;

const CarouselDescription = styled.p`
  color: ${({ theme }) => theme.colors.gray11};
  margin: 0;
  line-height: 1.6;
`;

const CarouselButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: ${({ theme }) => 
    theme.scheme === "light" ? "white" : theme.colors.gray4};
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  z-index: 2;
  color: ${({ theme }) => theme.colors.gray11};
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: ${({ theme }) => theme.colors.gray5};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  &.prev {
    left: 20px;
  }
  
  &.next {
    right: 20px;
  }
`;

const WorkCarousel: React.FC<WorkCarouselProps> = ({ workItems }) => {
  const [[currentIndex, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection: number) => {
    const newIndex = currentIndex + newDirection;
    if (newIndex >= 0 && newIndex < workItems.length) {
      setPage([newIndex, newDirection]);
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  if (!workItems || workItems.length === 0) {
    return null;
  }

  return (
    <CarouselContainer>
      {workItems.length > 1 && (
        <CarouselButton 
          className="prev" 
          onClick={() => paginate(-1)}
          disabled={currentIndex === 0}
        >
          ←
        </CarouselButton>
      )}
      
      <CarouselTrack>
        <CarouselItem
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
        >
          <CarouselContent>
            <CarouselImage 
              src={workItems[currentIndex].image} 
              alt={workItems[currentIndex].title} 
            />
            <CarouselTitle>{workItems[currentIndex].title}</CarouselTitle>
            <CarouselDescription>{workItems[currentIndex].description}</CarouselDescription>
          </CarouselContent>
        </CarouselItem>
      </CarouselTrack>

      {workItems.length > 1 && (
        <CarouselButton 
          className="next" 
          onClick={() => paginate(1)}
          disabled={currentIndex === workItems.length - 1}
        >
          →
        </CarouselButton>
      )}
    </CarouselContainer>
  );
};

export default WorkCarousel;