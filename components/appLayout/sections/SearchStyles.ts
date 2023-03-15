import styled from '@emotion/styled';

export interface ImageSize {
  width: string;
  height: string;
}

const Container = styled.div`
  padding-top: 12rem;
  display: flex;
  flex-direction: column;

  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
`;

const SearchLogoContainer = styled.div`
  position: relative;
  max-width: 52.8rem;
  width: 100%;
  /* padding: 0.1rem; */
  height: 5.2rem;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  /* background-color: yellow; */
`;

const SearchFormContainer = styled.div`
  position: relative;
  border: 1px solid #4dd290;
  width: 100%;
  height: 100%;
  align-items: center;
  border-radius: 2.5rem;
`;

const LogoContainer = styled.div`
  position: absolute;
  height: 5.2rem;
`;

const LogoLink = styled.a`
  font-size: 4.2rem;
  font-weight: 600;
  color: #4dd290;
  line-height: 4.5rem;
  padding: 1rem;
  text-decoration: none;
`;

const Title = styled.span`
  position: absolute;
  clip: rect(0 0 0 0);
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
`;

const SearchInputContainer = styled.div`
  height: 100%;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  font-size: 1.8rem;
  :focus {
    outline: none;
  }
  padding-left: 5.1rem;
  border-radius: 2.5rem;
  border: none;
`;

const MicContainer = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  padding: 0.8rem 0.5rem;
  width: 4.4rem;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
`;

const SearchForm = styled.form`
  height: 100%;
`;

export {
  Container,
  SearchLogoContainer,
  LogoContainer,
  LogoLink,
  Title,
  SearchForm,
  SearchInputContainer,
  SearchInput,
  SearchFormContainer,
  MicContainer,
};
