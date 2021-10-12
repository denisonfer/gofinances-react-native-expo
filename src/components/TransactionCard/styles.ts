import styled from 'styled-components/native';
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

interface ITransactionType {
  type: 'positive' | 'negative'
}

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.SHAPE};
  border-radius: 5px;
  padding: 17px 24px;
  margin-bottom: 16px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.TEXT_DARK};
`;

export const Amount = styled.Text<ITransactionType>`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${RFValue(20)}px;
  color: ${({ theme, type }) => type === 'negative'
    ? theme.colors.ATTENTION
    : theme.colors.SUCCESS
  };
  margin-top: 2px;
  
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 19px;
`;

export const Category = styled.View`
  flex-direction: row;
  align-items: center ;
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.TEXT};
`;

export const CategoryName = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.TEXT};
  margin-left: 10px;
  
`;

export const Date = styled.Text`
   font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.TEXT};
`;
