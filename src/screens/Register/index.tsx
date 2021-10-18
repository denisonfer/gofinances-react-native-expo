import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from "react-native";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Button from "../../components/Button";
import ButtonTypeTransaction from "../../components/ButtonTypeTransaction";
import InputForm from "../../components/InputForm";
import SelectorList from "../../components/SelectorList";

import CategorySelect from "../CategorySelect";

import {
  Container,
  Fields,
  Form,
  Header,
  Title,
  TransactionTypes,
} from "./styles";

interface IFormData {
  name: string;
  amount: string;
}

const schema = yup.object().shape({
  name: yup.string().required("Campo nome é obrigatório"),
  amount: yup
    .number()
    .transform((_, originalValue) => Number(originalValue.replace(/,/, ".")))
    .positive("O valor não pode ser negativo")
    .typeError("Informe um valor válido")
    .required("Campo valor é obrigatório"),
});

const Register: React.FC = () => {
  const [category, setCategory] = useState({
    key: "category",
    name: "categoria",
  });
  const [transactionType, setTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleTypeTransactionSelected = useCallback((type: "up" | "down") => {
    setTransactionType(type);
  }, []);

  const handleOpenSelectCategoryModal = useCallback(() => {
    setCategoryModalOpen(true);
  }, []);

  const handleCloseSelectCategoryModal = useCallback(() => {
    setCategoryModalOpen(false);
  }, []);

  const handleRegister = useCallback(
    (form: IFormData) => {
      if (!transactionType) return Alert.alert("Selecione o tipo da transação");

      if (category.key === "category")
        return Alert.alert("Selecione a categoria da transação");

      const data = {
        name: form.name,
        amount: form.amount,
        transactionType,
        category: category.key,
      };

      console.warn(data);
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
              name="name"
              control={control}
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />

            <InputForm
              name="amount"
              control={control}
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />

            <TransactionTypes>
              <ButtonTypeTransaction
                type="up"
                title="Entrada"
                onPress={() => handleTypeTransactionSelected("up")}
                isActive={transactionType === "up"}
              />

              <ButtonTypeTransaction
                type="down"
                title="Saída"
                onPress={() => handleTypeTransactionSelected("down")}
                isActive={transactionType === "down"}
              />
            </TransactionTypes>

            <SelectorList
              onPress={handleOpenSelectCategoryModal}
              title={category.name}
            />
          </Fields>

          <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
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
