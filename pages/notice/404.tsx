import Link from 'next/link';
import styled from '@emotion/styled';
import GetitLogo from '@/assets/images/GetitLogo';

const Container = styled.div`
  width: 100%;
  max-width: 56rem;
  margin: 3.6rem auto 0 auto;
`;

const LogoContainer = styled.div`
  display: flex;
  margin-left: 2.5rem;
  width: fit-content;
  cursor: pointer;
`;

const LogoText = styled.h1`
  font-size: 2.8rem;
  margin-left: 1rem;
`;

const ContentContainer = styled.div`
  margin: 3rem 3rem 0 3rem;
`;
const Title = styled.h2`
  font-size: 1.4rem;
  color: #444444;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #444444;
  margin-top: 1rem;
`;

const EmphasizeText = styled.span`
  font-weight: 600;
`;

const SubDescription = styled.p`
  font-size: 1.2rem;
  margin-top: 2rem;
  font-weight: 500;
`;

const Return = styled.a`
  color: ${(props) => props.theme.colors.theme};
`;

export default function NotFound() {
  return (
    <Container>
      <Link href='/'>
        <LogoContainer>
          <GetitLogo width={40} height={40} />
          <LogoText>Getit</LogoText>
        </LogoContainer>
      </Link>
      <ContentContainer>
        <Title>
          죄송합니다.
          <br />
          요청하신 페이지를 찾을 수 없습니다.
        </Title>

        <Description>
          방문하시려는 페이지의 주소가 잘못 입력되었거나, 페이지의 주소가 변경
          혹은 삭제되어 요청하신 페이지를 찾을 수 없습니다.
        </Description>

        <Description>
          입력하신 주소가 정확한지 다시 한번 확인해 주시기 바랍니다.
        </Description>

        <Description>
          관련 문의사항은 <EmphasizeText>Getit 고객센터</EmphasizeText>에
          알려주시면 친절하게 안내해 드리겠습니다.
        </Description>

        <Description>감사합니다.</Description>

        <SubDescription>
          되돌아가기{' '}
          <Link href='/' passHref>
            <Return>Getit</Return>
          </Link>
          <span> 👈</span>
        </SubDescription>
      </ContentContainer>
    </Container>
  );
}
