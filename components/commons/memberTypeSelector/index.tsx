import React, { useCallback, useEffect, useState } from 'react';
import {
  Container,
  MemberTypeLabel,
  MemberTypeContainer,
  Type,
} from './styles';

interface MemberTypeProps {
  memberTypeRef: React.MutableRefObject<
    ('developer' | 'designer' | 'pm' | 'anyone')[]
  >;
  memberTypes?: ('developer' | 'designer' | 'pm' | 'anyone')[];
  label: string;
}

/**
 * @props memberTypeRef - memberType 값들을 가져오기 위한 ref
 * @props memberTypes - 기존에 저장된 memberType 값들
 */
const MemberType = ({ memberTypeRef, memberTypes, label }: MemberTypeProps) => {
  const [checked, setChecked] = useState({
    developer: false,
    designer: false,
    pm: false,
    anyone: false,
  });

  useEffect(() => {
    const checkedValues = Object.keys(checked)
      .filter((key) => checked[key as keyof typeof checked])
      .map((key) => key as keyof typeof checked);

    memberTypeRef.current = checkedValues;
  }, [checked, memberTypeRef]);

  const handleChecked = useCallback(
    (event: React.MouseEvent<HTMLInputElement>) => {
      const target = event.currentTarget.value as keyof typeof checked;

      const newObj = { ...checked, [target]: !checked[target] };

      setChecked(newObj);
    },
    [checked],
  );

  useEffect(() => {
    setChecked((prevState) => {
      const newState = { ...prevState };

      memberTypes?.forEach((key) => {
        newState[key] = true;
      });
      return newState;
    });
  }, [memberTypes]);

  return (
    <Container>
      <MemberTypeLabel>{label}</MemberTypeLabel>
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
                readOnly
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
