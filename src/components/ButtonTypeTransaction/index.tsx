import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { Container, Icon, Title } from './styles';

interface IButtonTypeTransactionProps extends TouchableOpacityProps {
  type: 'up' | 'down';
  title: string;
  isActive: boolean;
}

const icons = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle'
}

const ButtonTypeTransaction: React.FC<IButtonTypeTransactionProps> = ({
  type,
  title,
  isActive,
  ...rest
}) => {
  return (
    <Container isActive={isActive} type={type} {...rest} >
      <Icon name={icons[type]} type={type} />
      <Title>
        {title}
      </Title>
    </Container>)
    ;
}

export default ButtonTypeTransaction;