import React, { useState, useCallback, MouseEvent, useEffect } from 'react';
import { CloseIcon } from '@/assets/icons';
import {
  HashtagsContainer,
  HashtagInputField,
  DeleteButton,
  Hashtag,
} from './styles';
import { useRouter } from 'next/router';

interface HashtagInputProps {
  hashtagRef: React.MutableRefObject<string[]>;
  hashtags?: string[];
  placeholder?: string;
}

/**
 * @props hashtagRef - hashtags 값들을 가져가기 위한 ref
 * @props hashtags - 기존에 저장된 hashtag 값들
 * @props placeholder - 사용자에게 제공될 placeholder
 */
const HashtagInput = ({
  hashtagRef,
  hashtags,
  placeholder,
}: HashtagInputProps) => {
  const router = useRouter();
  const pathname = router.asPath;

  const [hashtagList, setHashtagList] = useState<Array<string>>([]);
  const [newHashtag, setNewHashtag] = useState('');

  hashtagRef.current = hashtagList;

  const handleHashtag = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.currentTarget.value;
      setNewHashtag(value);
    },
    [],
  );

  const addHashtag = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        event.preventDefault();

        if (event.nativeEvent.isComposing) return;

        if (newHashtag.length < 1) {
          return alert('한글자 이상 입력하세요.');
        }

        if (newHashtag.length > 20) {
          return alert('20자 이하로 입력하세요.');
        }

        const isExistedHashtag = hashtagList.includes(newHashtag);

        if (isExistedHashtag) {
          return alert('중복된 해시태그 입니다.');
        }

        setHashtagList([...hashtagList, newHashtag]);
        setNewHashtag('');
      }
    },
    [hashtagList, newHashtag],
  );

  const onDeleteHashtag = useCallback(
    (event: MouseEvent<HTMLSpanElement>) => {
      const removeTarget = event.currentTarget.id;

      const filtered = hashtagList.filter(
        (skill) => removeTarget !== `${pathname}/${skill}`,
      );

      setHashtagList(filtered);
    },
    [hashtagList, pathname],
  );

  useEffect(() => {
    if (hashtags) {
      setHashtagList([...hashtags]);
    }
  }, [hashtags]);

  return (
    <>
      <HashtagsContainer>
        {hashtagList.map((hashtag) => (
          <Hashtag key={`${pathname}/${hashtag}`}>
            <span>{`#${hashtag}`}</span>
            <DeleteButton
              id={`${pathname}/${hashtag}`}
              onClick={onDeleteHashtag}
            >
              <CloseIcon width={20} height={20} />
            </DeleteButton>
          </Hashtag>
        ))}
        <HashtagInputField
          onChange={handleHashtag}
          value={newHashtag}
          placeholder={placeholder}
          onKeyDown={addHashtag}
        />
      </HashtagsContainer>
    </>
  );
};

export default HashtagInput;
