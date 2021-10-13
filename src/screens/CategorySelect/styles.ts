import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from "@expo/vector-icons";

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.PRIMARY};
  width: 100%;
  height: ${RFValue(113)}px;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 19px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.SHAPE};
  font-family:  ${({ theme }) => theme.fonts.REGULAR};
  font-size:${RFValue(18)}px;
`;

export const ListCategories = styled(FlatList)`
  flex: 1;
  width: 100%;
`;

export const Category = styled.View`
  background-color: ${({ theme }) => theme.colors.SHAPE};
  padding: ${RFValue(15)}px;
  flex-direction: row;
  align-items: center;

`;

export const Icon = styled(Feather)`
  font-size:${RFValue(20)}px;
  margin-right: 10px;
`;

export const Name = styled.Text`
  color: ${({ theme }) => theme.colors.TEXT};
  font-family:  ${({ theme }) => theme.fonts.REGULAR};
  font-size:${RFValue(14)}px;
`;

export const Separator = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.TEXT};
`;

export const Footer = styled.View`
  width: 100%;
  padding: 24px;
`;


