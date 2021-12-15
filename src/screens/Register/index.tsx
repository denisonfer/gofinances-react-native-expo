import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';
import uuid from 'react-native-uuid';
import * as yup from 'yup';

import Button from '../../components/Button';
import ButtonTypeTransaction from '../../components/ButtonTypeTransaction';
import InputForm from '../../components/InputForm';
import SelectorList from '../../components/SelectorList';

import CategorySelect from '../CategorySelect';

import {
  Container,
  Fields,
  Form,
  Header,
  Title,
  TransactionTypes,
} from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import storageKeys from '../../shared/storageKeys';

interface IFormData {
  name: string;
  amount: string;
}

const dataKey = storageKeys.transactions;
const schema = yup.object().shape({
  name: yup.string().required('Campo nome é obrigatório'),
  amount: yup
    .number()
    .transform((_, originalValue) => Number(originalValue.replace(/,/, '.')))
    .positive('O valor não pode ser negativo')
    .typeError('Informe um valor válido')
    .required('Campo valor é obrigatório'),
});

const Register: React.FC = () => {
  const { navigate } = useNavigation();
  const [category, setCategory] = useState({
    key: 'category',
    name: 'categoria',
  });
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleTypeTransactionSelected = useCallback(
    (type: 'positive' | 'negative') => {
      setTransactionType(type);
    },
    []
  );

  const handleOpenSelectCategoryModal = useCallback(() => {
    setCategoryModalOpen(true);
  }, []);

  const handleCloseSelectCategoryModal = useCallback(() => {
    setCategoryModalOpen(false);
  }, []);

  const handleRegister = useCallback(
    async (form: IFormData) => {
      if (!transactionType) return Alert.alert('Selecione o tipo da transação');

      if (category.key === 'category')
        return Alert.alert('Selecione a categoria da transação');

      const newTransaction = {
        id: String(uuid.v4()),
        name: form.name,
        amount: form.amount,
        type: transactionType,
        category: category.key,
        date: new Date(),
      };

      try {
        const data = await AsyncStorage.getItem(dataKey);
        const currentData = data ? JSON.parse(data) : [];
        const dataFormatted = [...currentData, newTransaction];

        await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

        reset();
        setTransactionType('');
        setCategory({
          key: 'category',
          name: 'categoria',
        });
        navigate('Listagem');
      } catch (error) {
        console.warn('error', error);
        Alert.alert('Não foi possível salvar');
      }
    },
    [transactionType, category]
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              name='name'
              control={control}
              placeholder='Nome'
              autoCapitalize='sentences'
              error={errors.name && errors.name.message}
            />

            <InputForm
              name='amount'
              control={control}
              placeholder='Preço'
              keyboardType='numeric'
              error={errors.amount && errors.amount.message}
            />

            <TransactionTypes>
              <ButtonTypeTransaction
                type='up'
                title='Entrada'
                onPress={() => handleTypeTransactionSelected('positive')}
                isActive={transactionType === 'positive'}
              />

              <ButtonTypeTransaction
                type='down'
                title='Saída'
                onPress={() => handleTypeTransactionSelected('negative')}
                isActive={transactionType === 'negative'}
              />
            </TransactionTypes>

            <SelectorList
              onPress={handleOpenSelectCategoryModal}
              title={category.name}
            />
          </Fields>

          <Button title='Enviar' onPress={handleSubmit(handleRegister)} />
        </Form>

        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default Register;
