import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import HighlightCard from '../../components/HighlightCard';
import TransactionCard from '../../components/TransactionCard';
import { ITransactionCardProps } from '../../components/TransactionCard/types';
import storageKeys from '../../shared/storageKeys';

import {
  Container,
  Header,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  UserWrapper,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  ListTransactions,
  LogoutButton,
  LoadingContainer,
} from './styles';

export interface DataListProps extends ITransactionCardProps {
  id: string;
}

interface IHighlightProps {
  total: string;
  lastTransaction: string;
}

interface IHighlightData {
  entries: IHighlightProps;
  expensive: IHighlightProps;
  transactionsTotal: IHighlightProps;
}

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<IHighlightData>(
    {} as IHighlightData
  );

  function getLastDate(
    collection: DataListProps[],
    type: 'positive' | 'negative'
  ) {
    const lastTransaction = Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    }).format(
      new Date(
        Math.max.apply(
          Math,
          collection
            .filter((transaction) => transaction.type === type)
            .map((transaction) => new Date(transaction.date).getTime())
        )
      )
    );

    return lastTransaction;
  }

  async function loadData() {
    const response = await AsyncStorage.getItem(storageKeys.transactions);
    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormatted: DataListProps[] = transactions.map(
      (transaction: DataListProps) => {
        if (transaction.type === 'positive') {
          entriesTotal += Number(transaction.amount);
        } else {
          expensiveTotal += Number(transaction.amount);
        }

        const amount = Number(transaction.amount).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });

        const date = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
        }).format(new Date(transaction.date || new Date()));

        return {
          id: transaction.id,
          name: transaction.name,
          amount,
          type: transaction.type,
          category: transaction.category,
          date,
        };
      }
    );

    const resumeTransactions = entriesTotal - expensiveTotal;
    const lastTransactionEntries = getLastDate(transactions, 'positive');
    const lastTransactionExpansive = getLastDate(transactions, 'negative');

    setHighlightData({
      entries: {
        total: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: lastTransactionEntries,
      },
      expensive: {
        total: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: lastTransactionExpansive,
      },
      transactionsTotal: {
        total: resumeTransactions.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: '',
      },
    });

    setData(transactionsFormatted);

    setLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      loadData();

      /*  async function removeAll() {
        await AsyncStorage.removeItem(storageKeys.transactions);
      }

      removeAll(); */
    }, [])
  );

  return (
    <Container>
      {loading ? (
        <LoadingContainer>
          <ActivityIndicator color='orange' size={'large'} />
        </LoadingContainer>
      ) : (
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo
                  source={{
                    uri: 'https://avatars.githubusercontent.com/u/53531333?v=4',
                  }}
                />

                <User>
                  <UserGreeting>Olá,</UserGreeting>
                  <UserName>Denison Ferreira</UserName>
                </User>
              </UserInfo>

              <LogoutButton onPress={() => {}}>
                <Icon name='power' />
              </LogoutButton>
            </UserWrapper>
          </Header>

          <HighlightCards>
            <HighlightCard
              type='up'
              title='Entradas'
              amount={highlightData.entries.total}
              lasTransaction={highlightData.entries.lastTransaction}
            />

            <HighlightCard
              type='down'
              title='Saídas'
              amount={highlightData.expensive.total}
              lasTransaction={highlightData.expensive.lastTransaction}
            />

            <HighlightCard
              type='total'
              title='Total'
              amount={highlightData.transactionsTotal.total}
              lasTransaction='01 à 18 abril'
            />
          </HighlightCards>

          <Transactions>
            <Title>Listagem</Title>

            <ListTransactions
              data={data}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <TransactionCard data={item} />}
            />
          </Transactions>
        </>
      )}
    </Container>
  );
};

export default Dashboard;
