import React from 'react';
const MyComponent: React.FC = () => {
  // Access environmental variables
  const utterancesRepo = process.env.NEXT_PUBLIC_UTTERANCES_REPO;
  const notionPageId = process.env.NOTION_PAGE_ID;

  // Use FontAwesome icons

  return (
    <div>
      {/* Other content */}
      <div>
        {/* Display environmental variables */}
        <p>Utterances Repo: {utterancesRepo}</p>
        <p>Notion Page ID: {notionPageId}</p>
      </div>
      {/* Use FontAwesome icon */}
    </div>
  );
}

export default MyComponent;
