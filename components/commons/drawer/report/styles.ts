import styled from '@emotion/styled';

const Form = styled.form`
  padding-bottom: 9rem; // To scroll when covered by overlapping bottom button
`;

const DefaultInfoContainer = styled.div`
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

const ReportReason = styled.div`
  font-size: 1.6rem;
  font-weight: 500;
`;

const ListGroup = styled.ul`
  list-style: none;
  outline: none;
  font-size: 1.4rem;

  input[type='radio'] {
    appearance: none;
    border-radius: 0;
    width: 2.5rem;
    height: 2.5rem;
    margin-right: 0.8rem;
    cursor: pointer;

    background: url('/static/icons/radio/radio_button_unchecked_FILL0.svg')
      no-repeat center;

    :checked {
      background: url('/static/icons/radio/radio_button_checked_FILL0_theme.svg')
        no-repeat center;
    }
  }

  label {
    display: flex;
    align-items: center;
    cursor: pointer;
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
  Form,
  ReportReason,
  ListGroup,
  TextArea,
  DefaultInfoContainer,
  Category,
  Writer,
  Content,
  TextInputContainer,
  TextCount,
};
