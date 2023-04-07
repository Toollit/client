import { mediaQueryMobile } from '@/styles/mediaQuery';
import styled from '@emotion/styled';

const Container = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
  border: 1px solid #dadde6;
`;

const ContainerLabel = styled.div`
  font-size: 1.4rem;
  padding: 0.5rem 0rem 0rem 1.5rem;
`;

const MemberTypeContainer = styled.div`
  display: flex;
  margin-left: 1rem;
`;

const Type = styled.div<{
  memberType: 'developer' | 'designer' | 'pm' | 'anyone';
}>`
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  padding: 1rem 0.5rem;
  cursor: pointer;

  label {
    padding: 0rem 0.5rem;
    cursor: pointer;
  }

  input[type='radio'] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    appearance: none;
    border: 0.2rem solid gray;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;

    :checked {
      background-color: ${(props) => {
        const recruitmentType = props.memberType;

        switch (recruitmentType) {
          case 'developer':
            return '#4dd290';

          case 'designer':
            return '#ffb65a';

          case 'pm':
            return '#fc9557';

          case 'anyone':
            return '#868686';

          default:
            break;
        }
      }};
    }
  }

  ${mediaQueryMobile} {
    font-size: 1.2rem;
  }
`;

export { Container, ContainerLabel, MemberTypeContainer, Type };
