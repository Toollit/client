import React, { useCallback, useEffect, useState } from 'react';
import { Container, ContainerLabel, MemberTypeContainer, Type } from './styles';
import { ProjectDetail } from '@/apis/getProjectDetailFetcher';

interface MemberTypeProps {
  memberTypeRef: React.MutableRefObject<
    ('developer' | 'designer' | 'pm' | 'anyone')[]
  >;
  content?: ProjectDetail;
}

/**
 * @props memberTypeRef - memberType 값들을 가져오기 위한 ref
 * @props content - 수정할 게시글 컨텐츠. modify 주소에서만 가져온다.
 */
const MemberType = ({ memberTypeRef, content }: MemberTypeProps) => {
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
      const memberTypes = content?.content.memberTypes;
      memberTypes?.forEach((key) => {
        newState[key] = true;
      });
      return newState;
    });
  }, [content]);

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
