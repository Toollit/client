import React, { useState, useCallback, MouseEvent, useEffect } from 'react';
import { CloseIcon } from '@/assets/icons';
import {
  HashtagsContainer,
  HashtagInputField,
  DeleteButton,
  Hashtag,
} from './styles';
import { ProjectDetail } from '@/apis/getProjectDetailFetcher';

interface HashtagInputProps {
  hashtagRef: React.MutableRefObject<string[]>;
  content?: ProjectDetail;
}

/**
 * @props hashtagRef - hashtags 값들을 가져오기 위한 ref
 * @props content - 수정할 게시글 컨텐츠. modify 주소에서만 가져온다.
 */
const HashtagInput = ({ hashtagRef, content }: HashtagInputProps) => {
  const [hashtags, setHashtags] = useState<Array<string>>([]);
  const [newHashtag, setNewHashtag] = useState('');

  hashtagRef.current = hashtags;

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

        const isExistedHashtag = hashtags.includes('#' + newHashtag);

        if (isExistedHashtag) {
          return alert('중복된 해시태그 입니다.');
        }

        setHashtags([...hashtags, `#${newHashtag}`]);
        setNewHashtag('');
      }
    },
    [hashtags, newHashtag],
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

  useEffect(() => {
    const hashtags = content?.content.hashtags;
    if (hashtags) {
      setHashtags([...hashtags]);
    }
  }, [content]);

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
          value={newHashtag}
          placeholder='*Enter를 눌러 해시태그를 작성해 주세요.'
          onKeyDown={addHashtag}
        />
      </HashtagsContainer>
    </>
  );
};

export default HashtagInput;
