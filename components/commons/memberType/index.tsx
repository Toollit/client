import React, { useCallback, useState } from 'react';
import { Container, ContainerLabel, MemberTypeContainer, Type } from './styles';

interface MemberTypeProps {
  memberTypeRef: React.MutableRefObject<any>;
}

const MemberType = ({ memberTypeRef }: MemberTypeProps) => {
  const [checked, setChecked] = useState({
    developer: false,
    designer: false,
    pm: false,
    anyone: false,
  });

  memberTypeRef.current = checked;

  const handleChecked = useCallback(
    (event: React.MouseEvent<HTMLInputElement>) => {
      // console.log(event.currentTarget.value);

      const target = event.currentTarget.value as
        | 'developer'
        | 'designer'
        | 'pm'
        | 'anyone';

      const newObj = { ...checked, [target]: !checked[target] };

      setChecked(newObj);
    },
    [checked],
  );

  return (
    <Container>
      <ContainerLabel>*모집인원 타입</ContainerLabel>
      <MemberTypeContainer>
        {(Object.keys(checked) as Array<keyof typeof checked>).map((type) => {
          return (
            <Type memberType={type} key={type}>
              <input
                type='radio'
                id={type}
                name={type}
                value={type}
                checked={checked[type]}
                onClick={handleChecked}
              />
              <label htmlFor={type}>
                {type === 'pm'
                  ? type.toUpperCase()
                  : type.charAt(0).toUpperCase() + type.slice(1)}
              </label>
            </Type>
          );
        })}
      </MemberTypeContainer>
    </Container>
  );
};

export default MemberType;
