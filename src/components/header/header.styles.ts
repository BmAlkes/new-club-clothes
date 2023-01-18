import styled from "styled-components";
import Colors from "../../theme/theme.colors";

const HeaderContainer = styled.div`
  width: 100%;
  background-color: ${Colors.primary};
  display: flex;
  justify-content: space-between;
  padding: 20px;
  color: ${Colors.text.white};
`;

const HeaderTitle = styled.h2`
  font-weight: bold;
  font-size: 1.5rem;
  cursor: pointer;
`;
const HeaderItems = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderItem = styled.div`
  font-weight: 600;
  font-size: 1rem;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:nth-child(1),
  &:nth-child(2),
  &:nth-child(3) {
    margin-right: 40px;
  }
`;

export { HeaderContainer, HeaderItem, HeaderTitle, HeaderItems };