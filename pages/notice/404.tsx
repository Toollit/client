import Link from 'next/link';
import styled from '@emotion/styled';
import ToollitLogo from '@/assets/images/ToollitLogo';

const Container = styled.div`
  width: 100%;
  max-width: 56rem;
  margin: 0 auto;
  padding: 3rem;
`;

const LogoLink = styled(Link)`
  display: flex;
  color: #000;
  width: fit-content;
  cursor: pointer;
`;

const LogoText = styled.h1`
  font-size: 2.8rem;
  padding-left: 1rem;
`;

const Title = styled.h2`
  font-size: 1.4rem;
  color: #444444;
  padding-top: 3rem;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #444444;
  padding-top: 1rem;
`;

const EmphasizeText = styled.span`
  font-weight: 600;
`;

const SubDescription = styled.p`
  font-size: 1.2rem;
  font-weight: 500;
  padding-top: 2rem;
  padding-bottom: 4rem;
`;

const ReturnLink = styled(Link)`
  color: ${(props) => props.theme.colors.theme};
`;

export default function NotFound() {
  return (
    <Container>
      <LogoLink href={'/'}>
        <ToollitLogo width={4} height={4} />
        <LogoText>Toollit</LogoText>
      </LogoLink>

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
        관련 문의사항은 <EmphasizeText>Toollit 고객센터</EmphasizeText>에
        알려주시면 친절하게 안내해 드리겠습니다.
      </Description>

      <Description>감사합니다.</Description>

      <SubDescription>
        되돌아가기 <ReturnLink href={'/'}>Toollit</ReturnLink>
        <span> 👈</span>
      </SubDescription>
    </Container>
  );
}
