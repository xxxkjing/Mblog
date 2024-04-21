// pages/index.tsx
import { NextPage } from "next";
import IndexLayout from "src/layouts/indexLayout";

const IndexPage: NextPage = () => {
  return (
    <IndexLayout>
      <div>
        <h1>Welcome to my website!</h1>
        {/* Add your page content here */}
      </div>
    </IndexLayout>
  );
};

export default IndexPage;
