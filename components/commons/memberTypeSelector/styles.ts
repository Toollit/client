import { mediaQueryMobile } from '@/styles/mediaQuery';
import styled from '@emotion/styled';

const Container = styled.div`
  width: 100%;
  border: 1px solid ${(props) => props.theme.colors.border.base};
`;

const MemberTypeLabel = styled.div`
  font-size: 1.2rem;
  padding: 0.5rem 1rem 0rem 1rem;

  ${mediaQueryMobile} {
    font-size: 1.4rem;
  }
`;

const MemberTypeContainer = styled.div`
  display: flex;
  margin-left: 1rem;
  flex-wrap: wrap;
`;

const Type = styled.div<{
  memberType: 'developer' | 'designer' | 'pm' | 'anyone';
}>`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  cursor: pointer;

  label {
    padding: 1rem 0.5rem;
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
            return props.theme.colors.developer;

          case 'designer':
            return props.theme.colors.designer;

          case 'pm':
            return props.theme.colors.pm;

          case 'anyone':
            return props.theme.colors.anyone;

          default:
            break;
        }
      }};
    }
  }

  ${mediaQueryMobile} {
    font-size: 1.4rem;
  }
`;

export { Container, MemberTypeLabel, MemberTypeContainer, Type };
