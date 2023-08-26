import React from 'react';
import useCheckUserAgent from '@/hooks/useCheckUserAgent';
import {
  NormalButton,
  SubmitButton,
  DisabledButton,
  Text,
  ContentContainer,
} from './styles';

interface Props {
  type: 'normal' | 'submit' | 'disabled';
  width?: number;
  height?: number;
  name?: string;
  text?: string;
  icon?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({ width, height, type, name, text, icon, onClick }: Props) => {
  const { isMobile } = useCheckUserAgent();

  switch (type) {
    case 'normal':
      return (
        <NormalButton
          type='button'
          name={name}
          isMobile={isMobile}
          width={width}
          height={height}
          onClick={onClick}
        >
          <ContentContainer>
            <span>{icon}</span>
            <Text color={'black'}>{text}</Text>
          </ContentContainer>
        </NormalButton>
      );
    case 'submit':
      return (
        <SubmitButton
          type='submit'
          name={name}
          isMobile={isMobile}
          width={width}
          height={height}
          onClick={onClick}
        >
          <ContentContainer>
            <span>{icon}</span>
            <Text color={'white'}>{text}</Text>
          </ContentContainer>
        </SubmitButton>
      );
    case 'disabled':
      return (
        <DisabledButton
          disabled
          name={name}
          isMobile={isMobile}
          width={width}
          height={height}
          onClick={onClick}
        >
          <ContentContainer>
            <span>{icon}</span>
            <Text color={'white'}>{text}</Text>
          </ContentContainer>
        </DisabledButton>
      );

    default:
      return <></>;
  }
};

export default Button;
