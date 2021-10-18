import React from "react";

import Button from "../../components/Button";

import { categories } from "../../mock/categories";

import {
  Category,
  Container,
  Footer,
  Header,
  Icon,
  ListCategories,
  Name,
  Separator,
  Title,
} from "./styles";

interface ICategoryData {
  key: string;
  name: string;
}

interface ICategory {
  category: ICategoryData;
  setCategory: (category: ICategoryData) => void;
  closeSelectCategory: () => void;
}

const CategorySelect: React.FC<ICategory> = ({
  category,
  setCategory,
  closeSelectCategory,
}) => {
  return (
    <Container>
      <Header>
        <Title>Categoria</Title>
      </Header>

      <ListCategories
        data={categories}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <Category
            onPress={() => setCategory(item)}
            isActive={category.key === item.key}
          >
            <Icon name={item.icon} />
            <Name>{item.name}</Name>
          </Category>
        )}
        ItemSeparatorComponent={() => <Separator />}
      />

      <Footer>
        <Button onPress={closeSelectCategory} title="Selecionar" />
      </Footer>
    </Container>
  );
};

export default CategorySelect;
