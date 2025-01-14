import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';

interface WorkItem {
  id: number;
  title: string;
  description: string;
  image: string;
}

const workItems: WorkItem[] = [
  {
    id: 1,
    title: "Project One",
    description: "Description of project one",
    image: "/path-to-image-1.jpg"
  },
  // Add more work items as needed
];

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
  background: white;
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

const CarouselButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: white;
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  z-index: 2;
  
  &:hover {
    background: #f8f8f8;
  }
  
  &.prev {
    left: 20px;
  }
  
  &.next {
    right: 20px;
  }
`;

const MyComponent: React.FC = () => {
  const [[currentIndex, direction], setPage] = useState([0, 0]);
  const utterancesRepo = process.env.NEXT_PUBLIC_UTTERANCES_REPO;
  const notionPageId = process.env.NOTION_PAGE_ID;

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

  return (
    <div>
      <CarouselContainer>
        <CarouselButton 
          className="prev" 
          onClick={() => paginate(-1)}
          disabled={currentIndex === 0}
        >
          ←
        </CarouselButton>
        
        <AnimatePresence initial={false} custom={direction}>
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
                <h3>{workItems[currentIndex].title}</h3>
                <p>{workItems[currentIndex].description}</p>
              </CarouselContent>
            </CarouselItem>
          </CarouselTrack>
        </AnimatePresence>

        <CarouselButton 
          className="next" 
          onClick={() => paginate(1)}
          disabled={currentIndex === workItems.length - 1}
        >
          →
        </CarouselButton>
      </CarouselContainer>

      <div>
        <p>Utterances Repo: {utterancesRepo}</p>
        <p>Notion Page ID: {notionPageId}</p>
      </div>
    </div>
  );
}

export default MyComponent;
