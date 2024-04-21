import styled from "@emotion/styled";
import Link from "next/link";

interface LinkItem {
  id: number;
  name: string;
  to: string;
}

const NavBar: React.FC = () => {
  const links: LinkItem[] = [
    { id: 2, name: "blog", to: "/blog" },
  ];

  return (
    <StyledWrapper className="">
      <ul>
        {links.map((link) => (
          <li key={link.id}>
            <Link href={link.to}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </StyledWrapper>
  );
};

export default NavBar;

const StyledWrapper = styled.nav`
  flex-shrink: 0;
  ul {
    display: flex;
    flex-direction: row;
    li {
      display: block;
      margin-left: 1rem;
      color: ${({ theme }) => theme.colors.gray11};
    }
  }
`;
