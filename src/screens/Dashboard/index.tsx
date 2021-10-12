import React from 'react';

import {
  Container,
  Header,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  UserWrapper,

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
        </UserWrapper>
      </Header>
    </Container>)
}

export default Dashboard;