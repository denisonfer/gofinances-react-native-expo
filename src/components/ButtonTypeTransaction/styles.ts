import styled, { css } from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { RectButton } from "react-native-gesture-handler";

interface ITypesIconProps {
  type: "up" | "down";
}

interface IContainerProps {
  isActive: boolean;
  type: "up" | "down";
}

export const Container = styled(RectButton)<IContainerProps>`
  flex-direction: row;
  width: 48%;
  align-items: center;
  justify-content: center;
  border: 1.5px solid ${({ theme }) => theme.colors.TEXT};
  border-radius: 5px;
  padding: 16px 0;

  ${({ theme, isActive, type }) =>
    isActive &&
    type === "up" &&
    css`
      background-color: ${theme.colors.SUCCESS_LIGHT};
      border-width: 0;
    `};
  ${({ theme, isActive, type }) =>
    isActive &&
    type === "down" &&
    css`
      background-color: ${theme.colors.ATTENTION_LIGHT};
      border-width: 0;
    `};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${RFValue(14)}px;
`;

export const Icon = styled(Feather)<ITypesIconProps>`
  font-size: ${RFValue(24)}px;
  margin-right: 12px;
  color: ${({ theme, type }) =>
    type === "down" ? theme.colors.ATTENTION : theme.colors.SUCCESS};
`;
