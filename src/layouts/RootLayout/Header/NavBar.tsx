import Link from "next/link";
import { useRouter } from "next/router";
import styled from "@emotion/styled";

const NavBar = () => {
  const router = useRouter();

  return (
    <Nav>
      <Link href="/" passHref>
        <NavLink isActive={router.pathname === "/"}>Work</NavLink>
      </Link>
      <Link href="/blog" passHref>
        <NavLink isActive={router.pathname === "/blog"}>Blog</NavLink>
      </Link>
    </Nav>
  );
};

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
`;

const NavLink = styled.a<{ isActive: boolean }>`
  padding: 0.5rem 1rem;
  color: ${({ theme, isActive }) => 
    isActive ? theme.colors.gray12 : theme.colors.gray11};
  font-weight: ${({ isActive }) => isActive ? 600 : 400};
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.gray12};
  }
`;

export default NavBar;
