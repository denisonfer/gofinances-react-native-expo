import styled from 'styled-components/native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.BACKGROUND};
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
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
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${RFValue(18)}px;
`;

export const Content = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
`;

export const ChartContainer = styled.View`
  width: 100%;
  align-items: center;
`;

export const MonthSelect = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-top: 24px;
`;

export const ButtonMonthSelect = styled(BorderlessButton)``;

export const IconMonthSelect = styled(Feather)`
  font-size: ${RFValue(24)}px;
`;

export const Month = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${RFValue(20)}px;
`;
