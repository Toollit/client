import styled from '@emotion/styled';

const SearchBoxContainer = styled.div`
  background-color: #eff3fa;
  height: 100%;
`;

const SearchBox = styled.div`
  height: 45vh;
  max-width: 102.4rem;
  width: 100%;
  margin: 0 auto;
  padding: 3.2rem 2.2rem 8rem 2.2rem;
`;

const SearchBoxIconInputPositionContainer = styled.div`
  position: relative;
`;

const SearchIconContainer = styled.div`
  position: absolute;
  top: 1rem;
  left: 0.5rem;
  bottom: 0;
`;

const SearchInput = styled.input`
  height: 4.4rem;
  border: none;
  font-size: 1.8rem;
  color: #000;
  width: 100%;
  padding: 0 3.4rem;
  font-weight: 600;
  background-color: #eff3fa;

  &:focus {
    outline: none;
    border-bottom: 1px solid #e8e8ed;
  }
`;

const SearchRecommendation = styled.div`
  margin-top: 4.9rem;
  font-size: 1.7rem;
  color: #86868b;
`;

export {
  SearchBoxContainer,
  SearchBox,
  SearchBoxIconInputPositionContainer,
  SearchIconContainer,
  SearchInput,
  SearchRecommendation,
};
