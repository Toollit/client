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

const ErrorCode = styled.h2`
  margin-top: 2rem;
  font-size: 1.4rem;
  color: #444444;
`;

const Return = styled.a`
  color: ${(props) => props.theme.colors.theme};
`;

interface ErrorPageProps {
  statusCode: number;
}

const ErrorNotice = ({ statusCode }: ErrorPageProps) => {
  return (
    <Container>
      <Link href='/'>
        <LogoContainer>
          <GetitLogo width={4} height={4} />
          <LogoText>Getit</LogoText>
        </LogoContainer>
      </Link>
      <ContentContainer>
        <Title>
          죄송합니다.
          <br />
          현재 서비스 연결상태가 좋지않습니다. 잠시 후 다시 시도해 주세요.
        </Title>

        <Description>
          문제가 지속될 경우{' '}
          <EmphasizeText>getit.help.contact@gmail.com</EmphasizeText>으로
          알려주시면 친절하게 안내해 드리겠습니다.
        </Description>

        <Description>감사합니다.</Description>

        {/* Error code:
            - SSEC(server side error code)
            - CSEC(client side error code)
        */}
        <ErrorCode>Error Code: {statusCode ? 'SSEC' : 'CSEC'}</ErrorCode>

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
};

export default ErrorNotice;
