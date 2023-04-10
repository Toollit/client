import React, { useState, useCallback, MouseEvent } from 'react';
import { CloseIcon } from '@/assets/icons';
import {
  HashtagsContainer,
  HashtagInputField,
  DeleteButton,
  Hashtag,
} from './styles';

interface HashtagInputProps {
  hashtagRef: React.MutableRefObject<string[]>;
}

/**
 * @props hashtagRef - hashtags 값들을 가져오기 위한 ref
 */
const HashtagInput = ({ hashtagRef }: HashtagInputProps) => {
  const [hashtags, setHashtags] = useState<Array<string>>([]);
  const [hashtag, setHashtag] = useState('');

  hashtagRef.current = hashtags;

  const handleHashtag = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.currentTarget.value;
      setHashtag(value);
    },
    [],
  );

  const addHashtag = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        event.preventDefault();

        if (event.nativeEvent.isComposing) return;

        if (hashtag.length < 1) {
          return alert('한글자 이상 입력하세요.');
        }

        if (hashtag.length > 20) {
          return alert('20자 이하로 입력하세요.');
        }

        setHashtags([...hashtags, `#${hashtag}`]);
        setHashtag('');
      }
    },
    [hashtags, hashtag],
  );

  const onDeleteHashtag = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const removeTarget = event.currentTarget.name;

      const filtered = hashtags.filter(
        (skill, index) => removeTarget !== `${skill}-${index}`,
      );

      setHashtags(filtered);
    },
    [hashtags],
  );

  return (
    <>
      <HashtagsContainer>
        {hashtags.map((content, index) => (
          <Hashtag key={`${content}-${index}`}>
            <span>{content}</span>
            <DeleteButton
              name={`${content}-${index}`}
              onClick={onDeleteHashtag}
            >
              <CloseIcon width={20} height={20} />
            </DeleteButton>
          </Hashtag>
        ))}
        <HashtagInputField
          onChange={handleHashtag}
          value={hashtag}
          placeholder='*Enter를 눌러 해시태그를 작성해 주세요.'
          onKeyDown={addHashtag}
        />
      </HashtagsContainer>
    </>
  );
};

export default HashtagInput;
