import styled from "styled-components";
import logo from "assets/logo.png";
import { Link } from "react-router-dom";

const Nav = styled.nav`
  display: flex;
  box-shadow: 0 2px 4px 1px rgba(0, 0, 0, 0.1);
`;

const BrandContainer = styled.div`
  padding: 8px 12px;
  img {
    max-width: 64px;
  }
`;

export function Navbar() {
  return (
    <Nav>
      <Link to="/">
        <BrandContainer>
          <img src={logo} alt="Cognite" />
        </BrandContainer>
      </Link>
    </Nav>
  );
}
