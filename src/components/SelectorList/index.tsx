import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { Container, Icon, Title } from './styles';

interface ISelectorListProps extends TouchableOpacityProps {
  title: string;
}

const SelectorList: React.FC<ISelectorListProps> = ({
  title,
  ...rest
}) => {
  return (
    <Container {...rest}>
      <Title>{title}</Title>

      <Icon name="chevron-down" />
    </Container>
  );
}

export default SelectorList;