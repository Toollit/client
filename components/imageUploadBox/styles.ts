import styled from '@emotion/styled';
import { css } from '@emotion/react';

const Container = styled.div`
  position: relative;
  width: 15rem;
  height: 15rem;
  border: 1px solid ${(props) => props.theme.colors.border.base};
  border-radius: 1.2rem;
  overflow: hidden;
`;

const DeleteIcon = styled.span`
  position: absolute;
  right: 0;
  top: 0;
  margin: 0.4rem;
  padding: 0.2rem;
  cursor: pointer;
  background-color: #f2f3f6;
  border-radius: 50%;
  line-height: 0;
`;

const AddImageBox = styled.button`
  border: transparent;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.lightGray};
  cursor: pointer;
`;

export { Container, DeleteIcon, AddImageBox };
