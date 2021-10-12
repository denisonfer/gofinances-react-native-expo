import React from 'react';

import IProps from './types';

import { Amount, Container, Footer, Header, Icon, LastTransaction, Title } from './styles';

const icon = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle',
  total: 'dollar-sign'
}

const HighlightCard: React.FC<IProps> = ({
  title,
  amount,
  lasTransaction,
  type
}) => {
  return (
    <Container type={type}>
      <Header>
        <Title type={type}>{title}</Title>
        <Icon name={icon[type]} type={type} />
      </Header>

      <Footer>
        <Amount type={type}>{amount}</Amount>
        <LastTransaction type={type}>{lasTransaction}</LastTransaction>
      </Footer>
    </Container>

  );
}

export default HighlightCard;