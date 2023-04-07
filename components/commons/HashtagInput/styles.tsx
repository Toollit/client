import styled from '@emotion/styled';

const HashtagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  border: 1px solid #dadde6;
  padding: 0.4rem 0.8rem;
  border-radius: 0.3rem;
`;

const HashtagInputField = styled.input`
  width: 100%;
  border-style: none;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  height: 4rem;
  :focus {
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
  margin: 0.3rem;
  display: flex;
  word-break: break-all;
  align-items: center;
  height: fit-content;
  font-size: 1.4rem;
  padding: 0.4rem 0.8rem;
  border-radius: 0.7rem;
`;

export { HashtagsContainer, HashtagInputField, DeleteButton, Hashtag };
