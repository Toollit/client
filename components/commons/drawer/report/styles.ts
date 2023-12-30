import styled from '@emotion/styled';

const Form = styled.form`
  padding-bottom: ${(props) => props.theme.layout.bottomButtonHeight};
`;

const DefaultInfoContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 2rem 1.5rem;
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
  padding: 4rem 1.5rem 0rem 1.5rem;
`;

const ReasonList = styled.ul`
  list-style: none;
  outline: none;
  font-size: 1.4rem;
  padding: 1rem 1.5rem 0 1.5rem;

  input[type='radio'] {
    appearance: none;
    border-radius: 0;
    width: 2.5rem;
    height: 2.5rem;
    margin-right: 0.8rem;
    cursor: pointer;

    background: url('/static/icons/radio/radio_button_unchecked_FILL0.svg')
      no-repeat center;

    &:checked {
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

const ReasonTextArea = styled.div`
  position: relative;
  margin-top: 0.5rem;
  padding: 1rem 1rem 3rem 1rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  outline: none;
  resize: none;
  font-size: 1.4rem;
  border: 1px solid ${(props) => props.theme.colors.border.base};
  padding: 1rem;
`;

const TextCount = styled.div`
  position: absolute;
  bottom: 0.8rem;
  right: 1rem;
  font-size: 1.4rem;
  color: ${(props) => props.theme.colors.text.gray};
`;

export {
  Form,
  ReportReason,
  ReasonList,
  TextArea,
  DefaultInfoContainer,
  Category,
  Writer,
  Content,
  ReasonTextArea,
  TextCount,
};
