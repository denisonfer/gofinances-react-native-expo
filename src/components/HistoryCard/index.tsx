import React from 'react';

import { Amount, Container, Title } from './styles';

interface IHistoryCardProps {
  color: string;
  title: string;
  amount: string;
}

const HistoryCard = ({ color, title, amount }: IHistoryCardProps) => {
  return (
    <Container color={color}>
      <Title>{title}</Title>
      <Amount>{amount}</Amount>
    </Container>
  );
};

export default HistoryCard;
