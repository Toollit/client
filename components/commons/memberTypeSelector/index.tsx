import React, { useCallback, useEffect, useState } from 'react';
import { Container, MemberTypeContainer, Type } from './styles';

interface MemberTypeProps {
  memberTypeRef: React.MutableRefObject<
    ('developer' | 'designer' | 'pm' | 'anyone')[]
  >;
  memberTypes?: ('developer' | 'designer' | 'pm' | 'anyone')[];
}

/**
 * @props memberTypeRef - Ref to get memberType values
 * @props memberTypes - Previously stored memberTypes values
 */
const MemberTypeSelector = ({
  memberTypeRef,
  memberTypes,
}: MemberTypeProps) => {
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

  const handleProcessedType = useCallback((type: keyof typeof checked) => {
    if (type === 'pm') {
      return type.toUpperCase();
    } else {
      return type.charAt(0).toUpperCase() + type.slice(1);
    }
  }, []);

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
              <label htmlFor={type}>{handleProcessedType(type)}</label>
            </Type>
          );
        })}
      </MemberTypeContainer>
    </Container>
  );
};

export default MemberTypeSelector;
