import React from 'react';

import HighlightCard from '../../components/HighlightCard';

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
} from './styles';

const Dashboard: React.FC = () => {
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{ uri: 'https://avatars.githubusercontent.com/u/53531333?v=4' }}
            />

            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Denison Ferreira</UserName>
            </User>
          </UserInfo>

          <Icon name="power" />
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


    </Container>
  )
}

export default Dashboard;