import React from 'react';

import IProps from './types';

import {
  Amount,
  Category,
  CategoryName,
  Container,
  Date,
  Footer,
  Icon,
  Title
} from './styles';

const TransactionCard: React.FC<IProps> = ({
  data
}) => {
  return (
    <Container>
      <Title>{data.title}</Title>

      <Amount type={data.type}>
        {data.type === 'negative' && '- '}
        {data.amount}
      </Amount>

      <Footer>
        <Category>
          <Icon name={data.category.icon} />
          <CategoryName>{data.category.name}</CategoryName>
        </Category>

        <Date>{data.date}</Date>
      </Footer>
    </Container>

  )
}

export default TransactionCard;