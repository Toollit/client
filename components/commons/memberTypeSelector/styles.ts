import { mediaQueryMobile } from '@/styles/mediaQuery';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const Container = styled.div`
  width: 100%;
  border: 1px solid ${(props) => props.theme.colors.border.base};
`;

const MemberTypeContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin-left: 1rem;
  min-height: 5rem;
  height: fit-content;
`;

const Type = styled.li<{
  memberType: 'developer' | 'designer' | 'pm' | 'anyone';
}>`
  display: flex;
  align-items: center;
  font-size: 1.4rem;

  input[type='radio'] {
    appearance: none;
    border-radius: 0;
    width: 2.5rem;
    height: 2.5rem;
    cursor: pointer;

    background: url('/static/icons/radio/radio_button_unchecked_FILL0.svg')
      no-repeat center;

    :checked {
      ${(props) => {
        const recruitmentType = props.memberType;

        switch (recruitmentType) {
          case 'developer':
            return css`
              background: url('/static/icons/radio/radio_button_checked_FILL0_developer.svg')
                no-repeat center;
            `;

          case 'designer':
            return css`
              background: url('/static/icons/radio/radio_button_checked_FILL0_designer.svg')
                no-repeat center;
            `;

          case 'pm':
            return css`
              background: url('/static/icons/radio/radio_button_checked_FILL0_pm.svg')
                no-repeat center;
            `;

          case 'anyone':
            return css`
              background: url('/static/icons/radio/radio_button_checked_FILL0_anyone.svg')
                no-repeat center;
            `;

          default:
            break;
        }
      }};
    }
  }

  label {
    padding: 1.5rem 0.3rem;
    cursor: pointer;
  }

  ${mediaQueryMobile} {
    margin-right: 1.5rem;
  }

  /* input[type='radio'] {
    -webkit-appearance: none;
    -moz-appearance: none;
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
  } */
`;

export { Container, MemberTypeContainer, Type };
