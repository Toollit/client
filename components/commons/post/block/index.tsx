import React, { useState } from 'react';

import {
  Container,
  ImageContainer,
  ProjectImage,
  ContentContainer,
  RecruitmentTypeContainer,
  RecruitmentType,
  Title,
  Skill,
  RecruitDetailContainer,
  PostDetailInfoContainer,
  RecruitCompleteContent,
  RecruitNumber,
  FavoriteIcon,
  FavoriteIconText,
  ViewIcon,
  ViewIconText,
} from './styles';
import project3 from 'public/static/images/project3.jpg';

type RecruitmentType = 'developer' | 'designer' | 'pm' | 'anyone';

const BlockPost: React.FC<{}> = ({}) => {
  const [recruitmentType, setRecruitType] = useState<RecruitmentType[]>([
    'developer',
    'designer',
    'pm',
    'anyone',
  ]);
  return (
    <Container>
      <ImageContainer>
        <ProjectImage
          src={project3}
          alt='default project image'
          layout='fill'
        />
      </ImageContainer>
      <ContentContainer>
        <RecruitmentTypeContainer>
          {recruitmentType.map((type, index) => {
            return (
              <RecruitmentType key={type + index} type={type}>
                {type}
              </RecruitmentType>
            );
          })}
        </RecruitmentTypeContainer>
        <div>
          <Title>
            Getit project 인원 구합니다. Lorem ipsum dolor sit amet, c
          </Title>
          <Skill>#react, #figma</Skill>
        </div>
      </ContentContainer>
      <RecruitDetailContainer>
        <RecruitCompleteContent>
          모집완료 <RecruitNumber>0 / 8</RecruitNumber>
        </RecruitCompleteContent>
        <PostDetailInfoContainer>
          <div>
            <FavoriteIcon />
            <FavoriteIconText>123</FavoriteIconText>
          </div>
          <div>
            <ViewIcon />
            <ViewIconText>30245</ViewIconText>
          </div>
        </PostDetailInfoContainer>
      </RecruitDetailContainer>
    </Container>
  );
};

export default BlockPost;
