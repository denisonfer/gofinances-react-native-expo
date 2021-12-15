import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VictoryPie } from 'victory-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';

import HistoryCard from '../../components/HistoryCard';
import storageKeys from '../../shared/storageKeys';
import { categories } from '../../mock/categories';

import {
  ButtonMonthSelect,
  ChartContainer,
  Container,
  Content,
  Header,
  IconMonthSelect,
  Month,
  MonthSelect,
  Title,
} from './styles';

interface ITransactionData {
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string;
}
interface ICategoryData {
  key: string;
  name: string;
  total: number;
  totalFormatted: string;
  color: string;
  percent: string;
}

const Resume: React.FC = () => {
  const { colors } = useTheme();
  const [totalByCategories, setTotalByCategories] = useState<ICategoryData[]>(
    []
  );

  async function loadData() {
    const response = await AsyncStorage.getItem(storageKeys.transactions);
    const transactions = response ? JSON.parse(response) : [];

    const expensives = transactions.filter(
      (expensive: ITransactionData) => expensive.type === 'negative'
    );

    const expensivesTotal = expensives.reduce(
      (acc: number, exp: ITransactionData) => acc + Number(exp.amount),
      0
    );

    const totalByCategory: ICategoryData[] = [];

    categories.forEach((category) => {
      let categorySum = 0;

      expensives.forEach((expensive: ITransactionData) => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      });

      if (categorySum > 0) {
        const percent = `${((categorySum / expensivesTotal) * 100).toFixed(
          0
        )}%`;

        totalByCategory.push({
          key: category.key,
          name: category.name,
          total: categorySum,
          totalFormatted: categorySum.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }),
          color: category.color,
          percent,
        });
      }
    });

    setTotalByCategories(totalByCategory);
  }

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  return (
    <Container>
      <Header>
        <Title>Resumo</Title>
      </Header>

      <Content
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: useBottomTabBarHeight(),
        }}
      >
        <MonthSelect>
          <ButtonMonthSelect>
            <IconMonthSelect name='chevron-left' />
          </ButtonMonthSelect>

          <Month>Dezembro</Month>

          <ButtonMonthSelect>
            <IconMonthSelect name='chevron-right' />
          </ButtonMonthSelect>
        </MonthSelect>

        <ChartContainer>
          <VictoryPie
            data={totalByCategories}
            colorScale={totalByCategories.map((category) => category.color)}
            x='percent'
            y='total'
            style={{
              labels: {
                fontSize: RFValue(18),
                fontWeight: 'bold',
                fill: colors.SHAPE,
              },
            }}
            labelRadius={100}
          />
        </ChartContainer>

        {totalByCategories.map((item: ICategoryData) => (
          <HistoryCard
            key={item.key}
            color={item.color}
            title={item.name}
            amount={item.totalFormatted}
          />
        ))}
      </Content>
    </Container>
  );
};

export default Resume;
