import styled from '@emotion/styled';
import { css } from '@emotion/react';

const Container = styled.div`
  max-width: 102.4rem;
  width: 100%;
  margin: 0 auto;
`;

const StyledList = styled.li`
  border-bottom: 1px solid #eee;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 1.5rem;
  cursor: pointer;
`;

const Icon = styled.div`
  line-height: 0;
`;

const Text = styled.div`
  line-height: 8rem;
  font-size: 1.4rem;
  padding-left: 1.5rem;
`;

export { StyledList, Container, Item, Icon, Text };
