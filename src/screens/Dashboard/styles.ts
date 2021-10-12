import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.BACKGROUND};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.BOLD};
  font-size: 24px;
  font-weight: bold;
  color:  ${({ theme }) => theme.colors.TITLE};
`;