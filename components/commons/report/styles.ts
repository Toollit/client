import styled from '@emotion/styled';

const Container = styled.div`
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: calc(100vw - 4rem);
  margin: 2rem auto 0 2rem;
  /* padding-bottom: 12rem; */
`;

const DefaultInfoContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;
`;

const Category = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  word-break: keep-all;
`;
const Writer = styled.p`
  font-size: 1.4rem;
  margin-left: 1.5rem;
`;
const Content = styled.p`
  font-size: 1.4rem;
  margin-left: 1.5rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const ListTitle = styled.div`
  font-size: 1.6rem;
  font-weight: 500;
  margin-top: 4rem;
`;

const ListGroup = styled.ul`
  margin-top: 1rem;
  list-style: none;
  outline: none;
  font-size: 1.4rem;

  input[type='radio'] {
    appearance: none;
    border-radius: 0;
    width: 2.5rem;
    height: 2.5rem;
    min-width: 2rem;
    margin-right: 0.8rem;
    font-size: 1.4rem;

    background: url('/static/icons/radio/radio_button_unchecked_FILL0.svg')
      no-repeat center;

    :checked {
      background: url('/static/icons/radio/radio_button_checked_FILL0_theme.svg')
        no-repeat center;
      color: red;
    }
  }

  label {
    display: flex;
    align-items: center;
  }
`;

const TextInputContainer = styled.div`
  position: relative;
  margin-top: 0.5rem;
  border: 1px solid ${(props) => props.theme.colors.border.base};
  padding: 1rem 1rem 3rem 1rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  border: none;
  outline: none;
  resize: none;
  font-size: 1.4rem;
`;

const TextCount = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  font-size: 1.4rem;
  color: ${(props) => props.theme.colors.text.gray};
`;

export {
  Container,
  Form,
  ListTitle,
  ListGroup,
  TextArea,
  DefaultInfoContainer,
  Category,
  Writer,
  Content,
  TextInputContainer,
  TextCount,
};
