import styled from '@emotion/styled';

const HashtagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  border-radius: 0.8rem;
  border: solid 1px #bcbcbc;
  padding: 0.4rem 0.8rem;
`;

const HashtagInputField = styled.input`
  width: 100%;
  border-style: none;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  padding: 0.6rem 1rem;
  height: fit-content;
  &:focus {
    outline: none;
  }
`;

const DeleteButton = styled.button`
  margin-left: 0.5rem;
  border-style: none;
  background-color: transparent;
  display: flex;
  align-items: center;
  :hover {
    cursor: pointer;
  }
`;

const Hashtag = styled.span`
  background-color: #eff3fa;
  color: #3e4042;
  border-radius: 1.5rem;
  padding: 0.6rem 1rem;
  margin: 0.3rem;
  display: flex;
  word-break: break-all;
  align-items: center;
  height: fit-content;
  font-size: 1.4rem;
`;

export { HashtagsContainer, HashtagInputField, DeleteButton, Hashtag };
