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
  margin-left: 1rem;
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

interface ErrorPageProps {
  statusCode: number;
}

const ErrorNotice = ({ statusCode }: ErrorPageProps) => {
  return (
    <Container>
      <LogoLink href={'/'}>
        <ToollitLogo width={4} height={4} />
        <LogoText>Toollit</LogoText>
      </LogoLink>

      <Title>
        죄송합니다.
        <br />
        현재 서비스 연결상태가 좋지않습니다. 잠시 후 다시 시도해 주세요.
      </Title>

      <Description>
        문제가 지속될 경우{' '}
        <EmphasizeText>contact.toollit@gmail.com</EmphasizeText>으로 알려주시면
        친절하게 안내해 드리겠습니다.
      </Description>

      <Description>감사합니다.</Description>

      <SubDescription>
        되돌아가기 <ReturnLink href='/'>Toollit</ReturnLink>
        <span> 👈</span>
      </SubDescription>
    </Container>
  );
};

export default ErrorNotice;
