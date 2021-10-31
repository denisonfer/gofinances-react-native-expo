import React from "react";

import HighlightCard from "../../components/HighlightCard";
import TransactionCard from "../../components/TransactionCard";
import { ITransactionCardProps } from "../../components/TransactionCard/types";

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
} from "./styles";

export interface DataListProps extends ITransactionCardProps {
  id: string;
}

const Dashboard: React.FC = () => {
  const data: DataListProps[] = [
    {
      id: "1",
      type: "positive",
      title: "Desenvolvimento do app iDelivery",
      amount: "R$ 10.400,00",
      category: {
        name: "Vendas",
        icon: "dollar-sign",
      },
      date: "01/04/2021",
    },
    {
      id: "2",
      type: "negative",
      title: "Compra do iPhone 13 Pro Max",
      amount: "R$ 10.400,00",
      category: {
        name: "Compras",
        icon: "shopping-bag",
      },
      date: "05/04/2021",
    },
    {
      id: "3",
      type: "positive",
      title: "Desenvolvimento de backend",
      amount: "R$ 7.000,00",
      category: {
        name: "Vendas",
        icon: "dollar-sign",
      },
      date: "16/04/2021",
    },
  ];

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: "https://avatars.githubusercontent.com/u/53531333?v=4",
              }}
            />

            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Denison Ferreira</UserName>
            </User>
          </UserInfo>

          <LogoutButton onPress={() => {}}>
            <Icon name="power" />
          </LogoutButton>
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard
          type="up"
          title="Entradas"
          amount="R$ 17.400,00"
          lasTransaction="Última entrada foi dia 13 de abril"
        />

        <HighlightCard
          type="down"
          title="Saídas"
          amount="R$ 10.400,00"
          lasTransaction="Última saída foi dia 13 de abril"
        />

        <HighlightCard
          type="total"
          title="Total"
          amount="R$ 7.000,00"
          lasTransaction="01 à 18 abril"
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
    </Container>
  );
};

export default Dashboard;
