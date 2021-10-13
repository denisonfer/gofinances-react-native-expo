import React, { useState, useCallback } from 'react';

import Button from '../../components/Button';
import ButtonTypeTransaction from '../../components/ButtonTypeTransaction';
import Input from '../../components/Input';
import SelectorList from '../../components/SelectorList';

import { Container, Fields, Form, Header, Title, TransactionTypes } from './styles';

const Register: React.FC = () => {
  const [transactionType, setTransactionType] = useState('');

  const handleTypeTransactionSelected = useCallback((type: 'up' | 'down') => {
    setTransactionType(type)
  }, [])

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input placeholder="Nome" />

          <Input placeholder="Preço" />

          <TransactionTypes>
            <ButtonTypeTransaction
              type="up"
              title="Entrada"
              onPress={() => handleTypeTransactionSelected('up')}
              isActive={transactionType === 'up'}
            />

            <ButtonTypeTransaction
              type="down"
              title="Saída"
              onPress={() => handleTypeTransactionSelected('down')}
              isActive={transactionType === 'down'}
            />
          </TransactionTypes>

          <SelectorList title="Categoria" />

        </Fields>

        <Button title="Enviar" />
      </Form>
    </Container>
  );
}

export default Register;