import React from 'react';
import AppLayout from '@/components/appLayout';
import { CloseBtn } from '@/components/commons/button';
import { Container } from './styles';

export interface TermsOfServiceViewProps {
  handleClose: () => void;
}

const TermsOfServiceView = ({ handleClose }: TermsOfServiceViewProps) => {
  return (
    <AppLayout nav={false}>
      <CloseBtn onClick={handleClose} />
      <Container>
        <h3>
          <strong>제1장. 약관 및 계약</strong>
        </h3>
        <p>
          <strong>제1조. 목적</strong>
        </p>
        <p>
          이 이용약관(이하 &rdquo;본 약관&rdquo;이라 합니다)은 Getit(이하
          &rdquo;회사&rdquo;라 합니다)이 제공하는 Getit(getit.kr) 및 Getit 관련
          제반 서비스를 이용자가 이용함에 있어 회사와 이용자 간의 권리, 의무 및
          책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
        </p>
        <p>&nbsp;</p>
        <p>
          <strong>제2조. 용어의 정의</strong>
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          1.&nbsp; 본 약관에서 사용하는 용어의 정의는 다음과 같습니다.
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          a.&nbsp; &nbsp;&ldquo;서비스&rdquo;라 함은 회사가 운영하는
          http://www.getit.kr 및 어플리케이션(이하 &ldquo;사이트 등&rdquo;이라
          합니다)을 포함하여 구현되는 단말기와 상관없이 이용자가 이용할 수 있는
          Getit 서비스 및 Getit 관련 제반 서비스를 의미합니다. 서비스의 자세한
          내용은 제7조에서 정하는 바에 따릅니다.
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          b.&nbsp; &nbsp;&ldquo;회원&rdquo;이란 &ldquo;회사&rdquo;의 서비스에
          접속하여 본 약관에 따라 &ldquo;회사&rdquo;와 이용계약을 체결하고
          &ldquo;회사&rdquo;가 제공하는 서비스를 이용하는 이용자를 말합니다.
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          c.&nbsp; &nbsp;&ldquo;비회원&rdquo;이란 &quot;회원&quot;으로 가입하지
          않고 &quot;회사&quot;가 제공하는 서비스를 이용하는 이용자를 말합니다.
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          d.&nbsp; &nbsp;&ldquo;이용자&rdquo;란 사이트 등에 접속하여 본 약관에
          따라 &ldquo;회사&rdquo;가 제공하는 서비스를 이용하는
          &ldquo;회원&rdquo; 및 &ldquo;비회원&rdquo;을 말합니다.
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          e.&nbsp; &nbsp;&ldquo;이용계약&rdquo;이란 본 약관을 포함하여 서비스
          이용과 관련하여 &ldquo;회사&rdquo;와 &ldquo;회원&rdquo;간에 체결하는
          모든 계약을 말합니다.
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          f.&nbsp; &nbsp;&ldquo;아이디(ID)&rdquo;라 함은 &ldquo;회원&rdquo;의
          식별 및 서비스 이용을 위하여 &ldquo;회원&rdquo;이 가입 시 기입한
          &ldquo;회원&rdquo;의 이메일 주소를 말합니다.
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          g.&nbsp; &nbsp;&ldquo;비밀번호(Password)&rdquo;란 아이디(ID)로
          식별되는 &ldquo;회원&rdquo;의 본인 여부를 검증하기 위하여
          &ldquo;회원&rdquo;이 설정하여 &ldquo;회사&rdquo;에 등록한 고유의
          문자와 숫자의 조합을 말합니다.
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          h.&nbsp; &nbsp;&ldquo;유료서비스&rdquo;라 함은 &ldquo;회사&rdquo;가
          유료로 제공하는 각종 온라인디지털콘텐츠(게시글 작성, 쪽지, 기타 유료
          콘텐츠 등)를 말합니다.
        </p>

        <p style={{ paddingLeft: '8rem' }}>
          i.&nbsp; &nbsp;&ldquo;게시물&rdquo;이라 함은 &ldquo;회원&rdquo;이
          서비스를 이용함에 있어 서비스 상에 게시한 글, 사진, 동영상 및 각종
          파일과 링크를 의미합니다.
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          2.&nbsp; 본 약관에서 사용하는 용어 중 제1항에서 정하지 아니한 것은
          관련법령 및 회사의 정책에서 정하는 바에 따르며, 그 외에는 일반 관례에
          따릅니다.
        </p>
        <p>&nbsp;</p>
        <p>
          <strong>제3조. 약관의 명시와 개정</strong>
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          1.&nbsp; &nbsp;&quot;회사&rdquo;는 본 약관의 내용을 &quot;회원&quot;이
          쉽게 알 수 있도록 서비스 초기 화면 또는 링크로 연결된 화면에
          게시합니다.
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          2.&nbsp; &nbsp;&ldquo;회사&rdquo;는 &ldquo;약관의 규제에 관한
          법률&rdquo;, &ldquo;정보통신망 이용 촉진 및 정보 보호 등에 관한
          법률(이하 &ldquo;정보통신망법&rdquo;이라 합니다)&rdquo;,
          &ldquo;전자상거래 등에서의 소비자보호에 관한 법률(이하
          &ldquo;전자상거래법&rdquo;이라 합니다)&rdquo;,
          &ldquo;개인정보보호법&rdquo;, &ldquo;청소년보호법&rdquo;,
          &quot;전기통신기본법&quot;, &quot;전기통신사업법&quot; 등 관련법령을
          위배하지 않는 범위에서 본 약관을 개정할 수 있습니다.
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          3.&nbsp; &nbsp;&quot;회사&quot;가 본 약관을 개정할 경우에는 적용일자,
          개정내용 및 개정사유를 명시하여 현행약관과 함께 제1항의 방식에 따라 그
          개정약관의 적용일자 7일 전부터 적용일자 전일까지 사이트 게시판에
          공지합니다. 다만, &ldquo;회원&rdquo;에게 불리한 약관의 개정의 경우에는
          최소 30일 전에 사이트의 게시판에 공지하고, 서비스 내 전자우편,
          전자쪽지, 로그인시 동의창 등의 전자적 수단을 통해 개별적으로 명확히
          통지하도록 합니다. 단, 본 약관의 권리, 의무에 영향을 주지 않는
          서비스에 대한 새로운 기능과 관련된 변경이나 법령의 개정 후 법령을
          준수하기 위한 변경은 사전 공지 없이 즉시 발효될 수 있습니다.
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          4.&nbsp; &nbsp;&ldquo;회사&rdquo;가 전 항에 따라 개정약관을 공지 또는
          통지하면서 &ldquo;회원&rdquo;에게 위 기간 내에 의사표시를 하지 않으면
          개정약관 적용에 동의한 것으로 본다는 뜻을 명확하게 공지 또는
          통지하였음에도 &ldquo;회원&rdquo;이 명시적으로 거부의 의사표시를 하지
          아니한 경우 &ldquo;회원&rdquo;이 개정약관에 동의한 것으로 봅니다.
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          5.&nbsp; &ldquo;회원&rdquo;이 개정약관의 적용에 동의하지 않는 경우
          &ldquo;회사&rdquo;는 개정 약관의 내용을 적용할 수 없으며, 이 경우
          &ldquo;회사&rdquo; 또는 &ldquo;회원&rdquo;은 이용계약을 해지할 수
          있습니다.
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          6.&nbsp; &ldquo;회원&rdquo;은 본 약관의 내용을 확인할 의무가 있으며,
          개정된 약관에 동의한 &ldquo;회원&rdquo;이 약관의 변경으로 인하여 입은
          피해 및 &ldquo;회원&rdquo;의 확인 소홀로 개정된 약관의 내용을 알지
          못해 발생하는 피해에 대해서 &ldquo;회사&rdquo;는 책임지지 않습니다.
        </p>
        <p>&nbsp;</p>
        <p>
          <strong>제4조. 약관의 해석</strong>
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          1.&nbsp; 본 약관에서 규정하지 않은 사항은 &quot;약관의 규제에 관한
          법률&quot;, &quot;정보통신망법&quot;, &ldquo;전자상거래법&rdquo;
          &quot;전기통신기본법&quot;, &quot;전기통신사업법&quot;,
          &ldquo;개인정보보호법&rdquo;, &ldquo;청소년보호법&rdquo; 등의
          관계법령에 따라 규율됩니다.
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          2.&nbsp; &ldquo;회사&rdquo;는 필요한 경우 서비스 내의 개별항목에
          대하여 개별약관 또는 운영원칙(이하 &rdquo;정책&rdquo;이라 합니다)를
          정할 수 있으며, &ldquo;회원&rdquo;은 회사의 정책에 대해 회원가입과
          동시에 동의한 것으로 간주합니다. 본 약관과 정책의 내용이 상충되는
          경우에는 정책의 내용을 우선하여 적용합니다.
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          3.&nbsp; &nbsp;&ldquo;회원&rdquo;이 &ldquo;회사&rdquo;와 개별 계약을
          체결하여 서비스를 이용할 경우, &ldquo;회원&rdquo;의 서비스 이용과
          관련된 권리 의무는 순차적으로 개별 계약, 개별 서비스 이용약관, 본
          약관에서 정한 내용에 따라 적용합니다.
        </p>
        <p>&nbsp;</p>
        <p>
          <strong>제5조. 이용계약의 성립</strong>
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          1.&nbsp; 이용계약은 서비스를 이용하고자 하는 자(이하
          &ldquo;이용신청자&rdquo;라 합니다)가 사이트 등을 통해 회원 가입 시 본
          약관과 개인정보 취급방침의 내용에 대해 명시적으로 동의 표시를 하고
          회원 가입 화면에서 회사가 요청하는 사항(예컨대, 이메일주소, 비밀번호
          등을 포함합니다)을 기입하고 회원가입 신청을 &ldquo;회사&rdquo;가
          승낙함으로써 성립합니다.
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          2.&nbsp; 카카오톡, 구글 등 외부 서비스와의 연동을 통한 회원 가입 시
          &ldquo;이용신청자&rdquo;는 본 약관, 개인정보 처리방침 및 서비스 제공을
          위한 &ldquo;회사&rdquo;의 외부 서비스 계정 정보 접근 및 활용에 대한
          동의 표시를 하고, 회원 가입 회면에서 &ldquo;회사&rdquo;가 요청하는
          사항(예컨대, 이메일주소, 비밀번호 등을 포함합니다)을 기입하고 및 회원
          가입 신청을 하여야 하며, &ldquo;회사&rdquo;가 회원가입 신청을
          승낙함으로써 이용계약이 성립합니다.
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          3.&nbsp; &nbsp;&ldquo;회사&rdquo;는 &ldquo;이용신청자&rdquo;가 본 약관
          및 개인정보 처리방침의 내용을 읽고 동의한 것으로 봅니다.
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          4.&nbsp; 제1항과 제2항의 승낙은 &ldquo;회사&rdquo;가 본 약관에 동의한
          &ldquo;이용신청자&rdquo;에게 승낙의 의사가 담긴 이메일 또는 사이트
          등의 회원가입 화면 내에서 통지함으로 이루어지고, 이러한 승낙의 통지가
          &ldquo;이용신청자&rdquo;에게 도달하면 이용계약이 성립합니다.
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          5.&nbsp; &nbsp;&ldquo;회사&rdquo;는 본인 확인을 위하여 필요시
          &ldquo;이용신청자&rdquo;에게 본인 인증을 요구할 수 있습니다. 이 경우
          &ldquo;이용신청자&rdquo;는 휴대폰인증 등 &ldquo;회사&rdquo;가 제공하는
          본인인증방식 중 하나를 선택하여 본인인증 절차를 거쳐야 하며,
          &ldquo;이용신청자&rdquo;가 자신의 실명으로 본인 인증절차를 거치지 않은
          경우, &ldquo;회사&rdquo;에 대하여 회원 또는 이용계약과 관련된 일체의
          권리를 주장할 수 없습니다.
        </p>
        <p>&nbsp;</p>
        <p>
          <strong>제6조. 이용 신청의 승낙과 제한</strong>
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          1.&nbsp; &nbsp;&ldquo;회사&rdquo;는 전 조의 규정에 의한
          &ldquo;이용신청자&rdquo;에 대하여 업무수행 및 서비스 제공을 위한
          설비의 여유, 기술상 지장이 없는 경우 원칙적으로 접수 순서에 따라
          서비스 이용 신청을 승낙합니다.
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          2.&nbsp; &ldquo;회사&rdquo;는 아래 사항에 해당하는 경우에 대해서 이용
          신청을 승낙하지 않거나 사후에 이용계약을 해지할 수 있습니다.
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          a.&nbsp; &nbsp;&ldquo;이용신청자&rdquo;가 회원가입 신청 시 실명을
          사용하지 않거나 타인의 명의를 도용한 경우
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          b.&nbsp; &nbsp;이용계약 신청의 내용을 허위 또는 부정확하게 기재한 경우
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          c.&nbsp; &nbsp;이용이 제한되었던 기록이 있는 자가 이용신청을 하는 경우
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          d.&nbsp; &nbsp;서비스의 위상이나 명예에 부정적인 영향을 줄 수 있는
          경우
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          e.&nbsp; &nbsp;부정한 행위나 과정을 통해 공공질서 및 미풍양속에
          저해되는 활동을 하는 경우
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          f.&nbsp; &nbsp;타인의 명예를 손상시키거나 불이익을 주는 행위를 한 경우
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          g.&nbsp; &nbsp;영리를 추구할 목적으로 서비스를 악용하는 경우
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          h.&nbsp; &nbsp; 서비스의 운영을 고의로 방해한 경우
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          i.&nbsp; &nbsp;이용신청자의 귀책사유로 인하여 승인이 불가능하거나 기타
          규정한 제반 사항을 위반하며 신청하는 경우
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          j. 서비스를 제공하지 않는 국가에서 비정상적이거나 우회적인 방법을 통해
          서비스를 이용하는 경우
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          k.&nbsp; &nbsp;임시 이메일 서비스를 이용하여 회원가입을 하는 경우
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          l.&nbsp; 기타 본 약관에 위배되거나 위법 또는 부당한 이용신청임이
          확인된 경우
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          m.&nbsp; &nbsp;기타 이에 준하는 사유로서 승낙이 부적절하다고 판단되는
          경우
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          3.&nbsp; &rdquo;회사&rdquo;는 아래 사항에 해당하는 경우에 그 신청에
          대하여 승낙제한 사유가 해소될 때까지 승낙을 유보할 수 있습니다.
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          a.&nbsp; &nbsp;&ldquo;회사&rdquo;의 업무수행 및 서비스 제공을 위한
          설비의 여유가 없는 경우
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          b.&nbsp; &nbsp;&ldquo;회사&rdquo;의 업무수행 및 서비스 제공을 위한
          기술상 지장이 있는 경우
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          c.&nbsp; &nbsp;그 밖에 이에 준하는 사유로 이용승낙이 곤란한 경우
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          4.&nbsp; &nbsp;&ldquo;회사&rdquo;는 &ldquo;회원&rdquo;에 대해
          &ldquo;회사&rdquo;의 정책에 따라 등급별로 구분하여 이용시간, 이용횟수,
          서비스 메뉴 등을 세분하여 서비스 이용에 차등을 둘 수 있습니다.
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          5.&nbsp; &nbsp;&ldquo;회사&rdquo;는 &ldquo;회원&rdquo;에 대하여
          &ldquo;영화 및 비디오물의 진흥에 관한 법률&rdquo; 및 &ldquo;청소년
          보호법&rdquo;등에 따른 등급 및 연령 준수를 위해 이용제한이나 등급별
          제한을 할 수 있습니다.
        </p>
        <p>&nbsp;</p>
        <h3>
          <strong>제2장. 정보 및 서비스</strong>
        </h3>
        <p>
          <strong>제7조. 서비스의 이용</strong>
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          1.&nbsp; &nbsp;&ldquo;회사&rdquo;가 제공하는 서비스의 내용은 다음과
          같습니다.
        </p>
        <p style={{ paddingLeft: '8rem' }}>a.&nbsp; &nbsp;온라인 모집 서비스</p>
        <p style={{ paddingLeft: '8rem' }}>
          b.&nbsp; &nbsp;프로젝트 인원 모집 서비스
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          c.&nbsp; 기타 &ldquo;회사&rdquo;가 추가 개발하거나 다른 회사와의
          제휴계약 등을 통해 &ldquo;회원&rdquo;에게 제공하는 일체의 서비스
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          2.&nbsp; &nbsp;&ldquo;회사&rdquo;는 필요한 경우 서비스의 내용을 추가
          또는 변경할 수 있습니다. 단, 이 경우 &ldquo;회사&rdquo;는 추가 또는
          변경내용을 제3조 제3항에서 정하는 약관 개정에 준하는 방법으로
          &ldquo;회원&rdquo;에게 공지해야 합니다.
        </p>
        <p>&nbsp;</p>
        <p>
          <strong>제8조. 서비스 이용</strong>
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          1.&nbsp; &nbsp;&ldquo;회사&ldquo;는 특별한 사유가 없는 한 연중무휴,
          1일 24시간 서비스를 제공합니다. 다만, 일부 서비스 종류나 성질에 따라
          별도로 이용시간을 정할 수 있으며 &ldquo;회사&ldquo;는 그 이용시간을
          &ldquo;회원&ldquo;에게 사전 공지합니다.
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          2.&nbsp; &nbsp;&ldquo;회사&ldquo;는 정보 가공, 자료의 갱신을 위한
          시스템 유지∙보수 작업, 시스템 장애 해결을 위한 보수작업, 정기 PM 작업,
          시스템 교체 작업, 회선 장애, 이용량의 폭주, 제휴사와의 계약 종료,
          정부기관의 명령/규제, 기간통신사업자의 전기통신서비스 제공 중지 등
          서비스를 중단할 합리적인 사유가 발생한 경우, 일시적으로 서비스를
          중단할 수 있습니다. 계획된 작업의 경우 서비스 중단 시간과 작업 내용을
          사전에 공지하되, &ldquo;회사&ldquo;가 사전에 통지할 수 없는 우발적
          장애 발생 등 부득이한 사유가 있는 경우에 한하여 그 내용을 사후에
          공지할 수 있습니다.
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          3.&nbsp; &nbsp;&ldquo;회사&ldquo;는 운영상, 기술상의 상당한 이유가
          있는 경우에 서비스를 변경 또는 종료할 수 있습니다. 이에 관해서는
          &ldquo;회사&ldquo;는 &ldquo;회원&ldquo;에게 통지 내지 공지합니다.
          다만, 예측할 수 없거나 통제할 수 없는 사유로 인해 사전 통지 내지
          공지가 불가능한 경우에는 그러지 않습니다.
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          4.&nbsp; &nbsp;&ldquo;회원&ldquo;은 서비스의 이용에 관하여 관련법률에
          특별한 규정이 없는 한 &ldquo;회사&ldquo;에게 별도의 배상 및 보상을
          청구할 수 없습니다. 단, 유료서비스의 경우에는 제13조에 의합니다.
        </p>
        <p>&nbsp;</p>
        <p>
          <strong>제9조 정보의 제공 및 광고의 게재</strong>
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          1.&nbsp; &nbsp;&ldquo;회사&rdquo;는 &rdquo;회원&rdquo;에게 각종
          상품∙서비스 소개, 홍보 등의 목적을 위한 정보를 우편물, 이메일이나
          어플리케이션 푸쉬 알림, 모바일 장치 IoT 등 신종 기술 및 기기를 이용한
          방법으로 제공할 수 있습니다.
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          2.&nbsp; &nbsp;&rdquo;회사&rdquo;는 서비스와 관련되는 광고를 서비스
          화면, 홈페이지, 이메일 등에 게재할 수 있으며, 광고가 게재된 이메일을
          수신한 &rdquo;회원&rdquo;은 수신거절을 &rdquo;회사&rdquo;에 할 수
          있습니다.
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          3.&nbsp; &nbsp;&rdquo;회사&rdquo;는 사이트 등에 게재되어 있는 제휴사의
          활동에 회원이 참여하거나 교신 또는 거래를 함으로써 발생하는 모든
          손실과 손해에 대해 일체의 책임을 지지 않습니다. 나아가 제휴사의 배너
          또는 링크에 따라 제휴사가 제공하는 페이지로 연결될 경우 해당 페이지는
          &rdquo;회사&rdquo;의 서비스 영역이 아니므로, &rdquo;회사&rdquo;가
          신뢰성, 안정성 등을 보장하지 않으며 그로 인한 &rdquo;회원&rdquo;의
          손해에 대하여도 &rdquo;회사&rdquo;는 책임을 지지 않습니다.
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          4.&nbsp; &nbsp;&rdquo;회원&rdquo;은 서비스 이용 시 사이트 등에
          노출되는 광고 게재에 대해 동의하는 것으로 간주합니다.
        </p>
        <p>&nbsp;</p>
        <h3>
          <strong>제3장. 유료서비스 등</strong>
        </h3>
        <p>
          <strong>제10조. 유료서비스</strong>
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          1.&nbsp; &ldquo;회원&rdquo;이 유료서비스를 이용하기 위해서는
          &ldquo;회사&rdquo;가 제공하는 절차에 의하여 유료서비스에 대한 이용을
          신청(이하 &ldquo;청약&rdquo;이라 합니다)하여야 합니다.&nbsp;
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          2.&nbsp; &nbsp;&ldquo;회사&rdquo;는 아래 사항에 해당하는 경우에는
          &ldquo;회원&rdquo;의 청약을 승낙하지 않거나 사후에 유료서비스
          이용계약을 해지할 수 있습니다.
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          a.&nbsp; &nbsp;실명이 아니거나 타인의 명의를 이용한 경우
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          b.&nbsp; &nbsp;허위의 정보를 기재하거나, &quot;회사&rdquo;가 제시하는
          내용을 기재하지 않은 경우
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          c.&nbsp; &nbsp;미성년자가 청소년보호법 등 관련법에 의해서 이용이
          금지되는 유료 서비스를 이용하고자 하는 경우
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          d.&nbsp; &nbsp;&quot;서비스&quot;의 위상이나 명예에 부정적인 영향을 줄
          수 있는 경우
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          e.&nbsp; &nbsp;&ldquo;유료서비스&quot;에서 제공하는 서비스의 공급량의
          제한의 이유로 &quot;서비스&quot;를 제공할 수 없는 경우
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          f.&nbsp; &nbsp;본 약관에 위배되는 내용을 &ldquo;회사&rdquo;에 요구한
          이력이 있는 &ldquo;회원&rdquo;일 경우
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          g.&nbsp; &nbsp;기타 &ldquo;회원&rdquo;이 제6조 제2항 각 호의 어느
          하나에 해당하는 경우
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          3.&nbsp; &nbsp;&ldquo;회원&rdquo;의 유료서비스 이용에 대한 청약의
          성립시기는 제11조에 따라 해당 유료서비스에 대한 &ldquo;회원&rdquo;의
          결제가 완료된 시점으로 합니다.
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          4.&nbsp; &ldquo;회원&rdquo;는 본 약관 및 개별 안내 페이지에서
          &ldquo;회사&rdquo;가 안내하는 사항을 숙지하여 착오 없이 유료서비스에
          대한 청약을 할 수 있도록 하여야 합니다.
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          5. &ldquo;회원&rdquo;은 오프라인 강의에 관한 결제액에는 오프라인 강의
          주관사의 강의료와 &ldquo;회사&rdquo;의 예약 대행 수수료가 포함된
          것임을 동의합니다.
        </p>
        <p>&nbsp;</p>
        <p>
          <strong>제11조 유료서비스의 결제</strong>
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          1.&nbsp; &ldquo;회원&ldquo;이 유료서비스를 이용하고자 할 경우
          &ldquo;회사&ldquo;는 &ldquo;회원&ldquo;에게 유료서비스 신청 화면에서
          유료서비스의 상세 내용과 요금 정책을 안내하고 &ldquo;회원&ldquo;은
          이용하고자 하는 유료서비스를 선택하고 신용카드 번호, 유효기간,
          보안코드(신용카드 뒷면의 3자리 숫자) 또는 자동이체 계좌번호, 예금주,
          은행명 등 &ldquo;회사&ldquo;가 요청하는 결제정보를 기입하여
          유료서비스를 신청합니다. 이후 &ldquo;회원&ldquo;이 유료서비스 신청 시
          다시 결제정보를 기입하는 불편함을 드리지 않기 위해서
          &ldquo;회사&ldquo;는 &ldquo;회원&ldquo;이 기입한 결제정보를 보관할 수
          있으며, &ldquo;회원&rdquo;은 유료서비스의 결제정보 페이지에서 수시로
          결제정보 추가, 삭제, 수정할 수 있습니다.
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          2.&nbsp; &nbsp;&ldquo;회원&ldquo;이 유료서비스 중 정기 요금제를 신청한
          경우 &ldquo;회원&ldquo;은 &ldquo;회원&ldquo;의 개별 결제 행위 없이도
          &ldquo;회사&ldquo;가 &ldquo;회원&ldquo;이 선택한 정기 요금제에 따라
          해당 주기 동안의 요금을 매결제일에 &ldquo;회원&ldquo;이 기입한
          결제정보로 자동 결제하는 것에 동의합니다.
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          3.&nbsp; &nbsp;&ldquo;회원&rdquo;이 등록한 결제수단이 기간도과,
          계약종료, 유효성, 잔액부족, 한도초과, 회원의 허위 등록, 결제정보
          오기재, 허위기재, 결제정보 삭제 등의 여하한 사유로 결제가 되지 않는
          경우, &ldquo;회사&rdquo;는 이를 미납금으로 처리한 후
          &ldquo;회원&ldquo;이 미납금을 &ldquo;회사&ldquo;에 납부하기 전까지는
          매주 월요일마다 자동결제를 시도하고 &ldquo;회원&ldquo;에게 유료서비스
          제공을 하지 않을 수 있고, 결제가 정상적으로 처리되지 않은 기간이 1월
          이상인 경우에는 &ldquo;회사&ldquo;는 &ldquo;회원&ldquo;의 유료서비스를
          해지할 수 있습니다.
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          4.&nbsp; &nbsp;&ldquo;회원&rdquo;이 지급한 유료서비스에 대한
          이용요금(이하 &ldquo;이용요금&rdquo;이라 합니다)의 과오납 등 사유가
          있는 경우에 &ldquo;회사&rdquo;는 다음 각 호에 해당하는 조치를
          취합니다.
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          a.&nbsp; 과다 납입한 이용요금에 대해서는 과다 납입된 금액을 환급하되,
          다음 달에 청구될 이용요금에서 해당 금액을 차감하여 청구할 수 있습니다.
          단, 체납된 이용요금이 있다면 환급해야 할 이용요금에서 체납된
          이용요금을 우선 공제하고 남은 금액을 반환합니다.
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          b.&nbsp; &nbsp;이용요금을 과소 청구한 경우, &ldquo;회사&rdquo;는
          &rdquo;회원&rdquo;에게 과소 청구된 금액을 합산하여 다음달 이용요금과
          함께 청구하며, 다음달 청구할 이용요금이 없을 경우 이용요금이 과소
          청구되었음을 확인한 즉시 청구합니다.
        </p>
        <p>&nbsp;</p>
        <p>
          <strong>제12조. 청약철회</strong>
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          1.&nbsp; &ldquo;회사&rdquo;의 유료서비스는 청약철회가 가능한 것과
          청약철회가 제한되는 것으로 구분되어 제공되며, 이러한 내용은 본 약관
          또는 &ldquo;회원&rdquo;의 결제 시 고지됩니다.
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          2.&nbsp; 청약철회가 가능한 유료서비스를 결제한 &ldquo;회원&rdquo;은
          결제 시부터 7일 이내에 &ldquo;회사&rdquo;의 고객센터에 청약을 철회할
          수 있습니다.
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          3.&nbsp; &nbsp;&ldquo;회원&rdquo;은 전자상거래법 등 관련법령에서 달리
          정하지 않는 한, 전항의 청약철회 기간이 경과한 유료서비스의 경우 청약을
          철회할 수 없습니다.
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          4.&nbsp; &nbsp;&ldquo;회원&ldquo;은 제2항에서 정하는 기간 내에
          고객센터 등을 통하여 회사에 청약철회를 요청하여야 합니다.
          &ldquo;회사&rdquo;는 제5항 및 제6항에서 정하는 환불 원칙 등에 따라
          &ldquo;회원&rdquo;으로부터 환불 요청을 받은 날로부터 3영업일 이내에
          이용요금의 전부 또는 일부를 환불하여 드립니다.
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          5.&nbsp; &nbsp;&ldquo;회사&rdquo;의 환불 원칙은 다음과 같습니다.
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          a.&nbsp; 포인트 구매일로부터 7일 이내에 포인트 미사용인 경우 전액
          환불이 가능합니다.
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          b.&nbsp; 포인트 구매일로부터 7일이 경과하였거나, 또는 포인트를 사용한
          경우 환불이 불가합니다.
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          c.&nbsp; 포인트를 사용하여 유료 서비스를 이용한 경우, 환불이
          불가합니다.
        </p>

        <p style={{ paddingLeft: '4rem' }}>
          6.&nbsp; &nbsp;다음 각 호의 어느 하나에 해당하는 항목에 대해서는
          &ldquo;회원&rdquo;에 대한 환불이 제한됩니다.
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          a.&nbsp; &ldquo;회원&rdquo;이 관계법령 및 본 약관의 규정을 위반하여
          회사로부터 강제탈퇴 처리가 되는 경우에는 본 조의 환불규정이 적용되지
          않습니다.
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          b.&nbsp; &nbsp;타인으로부터 양도받은(선물받은) 포인트(마일리지)에
          대해서는 환불이 불가능합니다.
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          c.&nbsp; &nbsp;회사가 회원에게 무료로 지급한 포인트(마일리지나)
          할인쿠폰 등으로 인해 회원이 획득하게 된 금액에 대해서는 환불되지
          않습니다.
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          d.&nbsp; &nbsp;&ldquo;회원&rdquo;이 환불 제한의 내용을 제대로 숙지하지
          못해 발생한 피해에 대해서는 회사가 책임을 부담하지 않습니다.
        </p>

        <p>&nbsp;</p>
        <p>
          <strong>제13조. 이용요금의 환불</strong>
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          1.&nbsp; &ldquo;회사&rdquo;는 유료서비스를 결제한
          &ldquo;회원&rdquo;에게 해당 유료서비스를 공급하기 곤란하다는 것을
          알았을 때, 즉시 해당 사실을 해당 &ldquo;회원&rdquo;에게 통보하고
          유료서비스 이용을 취소하여야 하며, &ldquo;회사&rdquo;는 해당
          &ldquo;회원&rdquo;에 대한 통지일로부터 3영업일 이내에 환불 및 환불에
          필요한 조치를 취해야 합니다.
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          2.&nbsp; &nbsp;이용요금의 환불은 &ldquo;회사&rdquo;가 환불을 승인한
          날로부터 3영업일 이내에 대금의 결제와 동일한 방법(신용카드 결제취소,
          계좌이체 등)으로 이루어집니다. 단, 체납된 이용요금이 있거나 회사에게
          배상해야 할 금액이 있다면, 환급해야 할 이용요금에서 체납된 이용요금,
          배상액을 우선 공제하고 남은 금액을 반환합니다.
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          3.&nbsp; &nbsp;신용카드를 통한 결제 대금 환불 시 결제 수단의 전자 결제
          대행 사업자, 전자 결제 대행 또는 중개서비스 사업자의 정책 상 특정
          기간이 지나 동일한 결제수단의 취소가 불가능한 경우에는 환불 정산액으로
          환불이 진행됩니다. 환불정산액의 경우 회원정보 수집 및 내부 프로세스에
          따라 15영업일 이내 처리될 수 있습니다.
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          4.&nbsp; &nbsp;휴대폰소액결제의 경우, 이동통신사 정책에 따라 결제승인
          및 취소는 해당 월 내에만 가능하며 익월로 넘어갈 경우 계좌이체로
          처리됩니다.
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          5.&nbsp; 환불 과정에서 금융수수료가 발생하는 경우, 관련 법률에 따라
          결제금액의 10%를 공제하고 환불할 수 있습니다.
        </p>
        <p>&nbsp;</p>
        <p>
          <strong>제14조 유료서비스의 요금 정책</strong>
        </p>
        <p>
          &ldquo;회사&rdquo;는 이용요금 정책을 &ldquo;회원&ldquo;의 유료서비스
          청약 전까지 &ldquo;회원&ldquo;에게 안내하고, 서비스 내 이용요금 안내
          화면에도 이를 게시하며, 이용요금 정책이 변경되는 경우
          &ldquo;회원&ldquo;에게 서비스 내 알림 기능으로 고지합니다.
          &ldquo;회원&ldquo;은 고지 이후 결제일부터는 변경된 요금 정책이
          적용되는 것에 동의하되(단 이미 결제한 서비스까지는 기존 요금 정책이
          적용됩니다), &ldquo;회원&ldquo;은 언제든지 서비스 탈퇴, 유료서비스에
          대한 해지를 할 수 있습니다(단 이미 결제한 서비스까지는 서비스 탈퇴,
          유료서비스 해지를 할 수 없습니다).
        </p>
        <p>&nbsp;</p>
        <p>
          <strong>제15조. 마일리지</strong>
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          1.&nbsp; &nbsp;&ldquo;회사&rdquo;는 서비스의 효율적 이용 및 운영을
          위해 회원 가입, 충전, 이벤트 당첨 시에 &ldquo;회원&rdquo;에게
          마일리지를 무상으로 제공할 수 있습니다.&nbsp;
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          2.&nbsp; &nbsp;클라이언트 변경, 해킹, 매크로 등 부정한 방법으로
          마일리지를 적립한 경우, 모든 마일리지가 부정적립한 것으로 간주되어
          0으로 정정됩니다.
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          3.&nbsp; 마일리지 적립에 오류가 발생한 경우 &ldquo;회원&rdquo;은 오류
          발생일로부터 30일 이내에 &ldquo;회사&ldquo;에 정정요구를 할 수 있으며,
          &ldquo;회사&ldquo;는 정당한 요구임이 확인된 경우 정정요구일로부터 30일
          이내에 정정하여야 합니다. 단, 서버에 입력된 마일리지 수량과
          &ldquo;회원&ldquo;의 단말기기 상의 마일리지 수량 간에 차이가 나는 경우
          항상 서버의 수치를 기준으로 합니다.
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          4.&nbsp; 마일리지 사용 및 &ldquo;회사&ldquo;가 제공하는 혜택 등은
          &ldquo;회사&ldquo;의 마일리지 운영정책과 제3자와의 제휴관계에 따라
          수시로 변경될 수 있으며, 회사는 마일리지의 영속적인 사용성을 보장하지
          않습니다. &ldquo;회원&ldquo;의 서비스 이용 실적(장기간 로그인 없는
          경우 등), 마일리지의 적립 경위, 마일리지 적립 일자 및 경과시간,
          마일리지의 수량, 지급기준 해당 여부 판단 오류 등 &ldquo;회사&ldquo;가
          정한 마일리지 운영정책으로 정한 소멸기준에 따라 마일리지를 소멸시킬 수
          있습니다.
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          5.&nbsp; &nbsp;마일리지는 재산적 가치가 없으며, &ldquo;회원&ldquo;은
          본인에 한해서만 포인트를 사용할 수 있고, 어떠한 경우에도
          &ldquo;회사&ldquo;에게 이를 현금으로 환급해달라고 요청할 수 없고 이를
          타인에게 양도, 상속, 대여, 담보의 목적으로 처분할 수 없습니다.
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          6.&nbsp; &nbsp;본조에서 정하고 있는 내용 외에 마일리지의 부여, 이용 및
          소멸에 관한 상세한 사항은 &ldquo;회사&rdquo;가 별도로 정한 마일리지
          운영정책을 따르며, 회사는 사이트 등의 화면 내에서 마일리지 운영정책을
          안내합니다.
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          7.&nbsp; &nbsp;마일리지는 회원 탈퇴 시 전부 소멸되며 복구가
          불가능합니다.
        </p>
        <p>&nbsp;</p>
        <h3>
          <strong>제4장. 회원의 권리의무 등</strong>
        </h3>
        <p>
          <strong>제16조. 계정의 관리</strong>
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          1.&nbsp; &ldquo;회원&rdquo;은 회원정보(유료결제정보 포함; 이하 같음)가
          변경되었을 경우에는 즉시 변경 사항을 최신의 정보로 수정하여야 합니다.
          단, 본인 식별을 위해 필요한 실명, 생년월일, 성별, 아이디 등은 수정이
          불가능합니다.
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          2.&nbsp; &rdquo;회원&rdquo;은 아이디 기타 회원정보를 제3자가
          이용하도록 하여서는 안 됩니다. &rdquo;회원&rdquo;이 본인의 아이디 기타
          회원정보를 소홀히 관리하거나 제3자에게 이용을 승낙함으로써 발생하는
          손해에 대하여는 &rdquo;회원&rdquo;에게 책임이 있습니다.
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          3.&nbsp; &rdquo;회원&rdquo;은 아이디 기타 회원정보가 도용되거나
          제3자가 사용하고 있음을 인지한 경우에는 이를 즉시 &rdquo;회사&rdquo;에
          통지하고 &rdquo;회사&rdquo;의 안내에 따라야 합니다.&nbsp;
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          4.&nbsp; &rdquo;회원&rdquo;은 정기적으로 비밀번호를 변경하여야 하며,
          &rdquo;회사&rdquo;는 정기적으로 &rdquo;회원&rdquo;에게 비밀번호의
          변경을 요구할 수 있고, &rdquo;회원&rdquo;이 이에 응하지 않은 경우
          비밀번호 변경 시한이 도과한 이후에는 비밀번호를 변경하지 않는 한
          &rdquo;회원&rdquo;은 서비스를 이용할 수 없습니다. &rdquo;회사&rdquo;는
          &rdquo;회원&rdquo;이 원하는 경우 언제든지 비밀번호를 변경할 수 있도록
          합니다.
        </p>
        <p>&nbsp;</p>
        <p>
          <strong>제17조. 회원의 의무</strong>
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          1.&nbsp; &nbsp;&rdquo;회원&rdquo;은 관련법령과 본 약관의 규정 및
          &rdquo;회사&rdquo;의 서비스 운영정책 등 기타 &rdquo;회사&rdquo;가
          통지하는 사항을 준수해야 하며, 기타 &rdquo;회사&rdquo;의 업무에 지장을
          초래하는 행위를 하여서는 아니됩니다.
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          2.&nbsp; &nbsp;&rdquo;회원&rdquo;은 서비스를 이용하며 얻은 정보를
          &ldquo;회사&rdquo;의 사전 동의 없이 복사, 복제, 번역, 출판, 방송
          기타의 방법으로 사용하거나 이를 타인에게 제공할 수 없습니다.
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          3.&nbsp; &nbsp;&rdquo;회원&rdquo;은 서비스를 본 약관에서 정한 바와
          다른 목적으로 사용해서는 아니되며, 이하 각 호의 서비스 부정이용행위를
          하지 않아야 합니다.&nbsp;
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          a.&nbsp; &nbsp;다른 회원의 아이디를 부정사용하는 경우
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          b.&nbsp; &nbsp;범죄행위를 목적으로 하거나 기타 범죄행위와 관련된 경우
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          c.&nbsp; &nbsp;타인의 명예를 훼손하거나 모욕하는 경우
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          d.&nbsp; &nbsp;타인의 지적재산권 등의 권리를 침해하는 경우
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          e.&nbsp; &nbsp;해킹행위 또는 바이러스의 유포 경우
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          f.&nbsp; &nbsp;타인의 의사에 반하여 광고성 정보 등 일정한 내용을
          계속적으로 전송하는 경우
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          g.&nbsp; &nbsp;서비스의 안정적인 운영에 지장을 주거나 줄 우려가 있다고
          판단되는 경우
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          h.&nbsp; &nbsp;사이트의 정보 및 서비스를 이용한 영리 행위
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          i.&nbsp; &nbsp;서비스 이용 과정에서 허위 내용을 기재하는 행위
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          j.&nbsp; &nbsp;서비스에 게시된 각종 정보의 무단 변경, 삭제 등 훼손
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          k.&nbsp; &nbsp;비정상적인 방법으로 서비스를 이용하거나 회사의 시스템에
          접근하는 행위
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          l.&nbsp; &nbsp;포인트를 부정한 방법으로 적립하거나 사용하는 행위&nbsp;
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          m.&nbsp; &nbsp;타인의 서비스 이용을 방해하는 행위&nbsp;
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          n.&nbsp; &nbsp;허위사실 유포, 위계기타 방법으로 회사의 명예 또는
          신용을 훼손하거나 업무를 방해하는 행위
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          o.&nbsp; &nbsp;서비스 내 게시된 다른 회원에게 회사를 통하지 아니하고
          연락하는 행위
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          p.&nbsp; 서비스 이용을 가장한 아이디어 수집, 사업장 홍보, 물품 판매,
          직업소개, 부업알선, 자금모집&nbsp;
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          q.&nbsp; &nbsp;&ldquo;회원&rdquo;이 이력, 학력을 부정확하거나 또는
          불충분하게 기재, 타인의 상호 및 연락처를 도용 또는 타인을 위장, 기타
          중요한 내용을 사실과 다르게 기재하는 행위
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          r.&nbsp; &nbsp;서비스 이용 과정 중 알게 된 다른 회원에 관한 정보를
          복제, 저장, 편집, 공개, 누설, 통보, 배포, 전송, 게시하는 행위
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          s.&nbsp; &nbsp;기타 미풍양속 및 사회질서를 해하거나 관계법령에
          위반하는 행위
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          4.&nbsp; &ldquo;회사&rdquo;는 &ldquo;회원&ldquo;의 의무를 위반한
          &ldquo;회원&ldquo;, 제6조 제2항의 &ldquo;회원&ldquo;의 이용 신청 거부
          사유가 해당함이 발견된 &ldquo;회원&ldquo;에 대하여
          &ldquo;회사&ldquo;의 판단에 따라 다음과 같은 조치를 할 수 있습니다.
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          a.&nbsp; &nbsp;사전 통보함 없이 임의로 관련 게시물 삭제
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          b.&nbsp; &nbsp;마일리지의 일부 또는 전부의 회수
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          c.&nbsp; &nbsp;일정 기간 동안 서비스 이용 정지
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          d.&nbsp; &nbsp;회사가 입은 손해 전액에 대한 배상 청구
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          e.&nbsp; &nbsp;법 위반 사실에 관한 정부기관 통보, 수사기관 고소, 고발
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          f.&nbsp; &nbsp;이용계약 해지 및 회원 탈퇴 처리
        </p>
        <p>&nbsp;</p>
        <p>
          <strong>제18조. 회원으로서의 의무 등</strong>
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          1.&nbsp; &nbsp;&ldquo;회원&rdquo;은 서비스 내에서 아래와 같은 역할 및
          권한을 가지며 이에 따른 의무를 부담합니다.
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          a.&nbsp; &nbsp;&ldquo;회원&rdquo;은 관련법령과 본 약관을 준수하는 범위
          내에서 프로젝트의 구성원을 설정할 수 있습니다.
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          b.&nbsp; &nbsp;&ldquo;회원&rdquo;은 프로젝트에 참여할 회원들을 초대할
          수 있으며, 프로젝트 참여 신청 대상 중 승인 또는 반려할 수 있고,
          &ldquo;회원&rdquo; 중 프로젝트에 위해가 될 경우 해당 프로젝트에서 강제
          탈퇴시킬 수 있습니다.
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          c.&nbsp; &nbsp;&ldquo;모든 &ldquo;회원&ldquo;은 어떠한 경우에도
          &ldquo;회원&ldquo;의 사전 서면 허락 없이 해당 &ldquo;회원&ldquo;의
          개인정보를 타인에게 공개할 수 없으며, 이를 위반하여 발생하는 모든 법적
          책임은 위반하는 &ldquo;회원&ldquo;에게 있습니다.
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          d.&nbsp; &nbsp;&ldquo;회원&rdquo;은 서비스를 해당 프로젝트를 위한
          합법적인 목적 이외 개인의 영리추구, 불법 또는 사기 등과 같은 서비스
          목적에 합당하지 않은 용도로 이용을 할 수 없습니다.
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          e.&nbsp; &nbsp;&ldquo;회원&rdquo;이 회원을 탈퇴한 경우,
          &ldquo;회원&rdquo;으로서의 모든 권한은 상실됩니다.
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          f.&nbsp; &nbsp;&ldquo;회원&rdquo;은 양질의 환경과 컨텐츠를 제공하기
          위하여 성실히 역할을 수행합니다.
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          2.&nbsp; &nbsp;&ldquo;회원&rdquo;은 서비스 내에서 아래와 같은 역할 및
          권한을 가지며 이에 따른 의무를 부담합니다.
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          a.&nbsp; 본인 이외의 계정으로 서비스에 접근하지 않으며, 타인이 본인의
          계정을 사용하도록 허용하지 않습니다.
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          b.&nbsp; &nbsp;과제나 퀴즈, 설문, 동료 평가 등과 같은 프로젝트 진행 시
          불법 복제, 허위사실 기재 등의 부정행위를 하지 않습니다.
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          c.&nbsp; &nbsp;본인이 참여 중인 프로젝트의 성격에 부합하지 않는
          게시물을 게시하지 않으며, 이를 위반하여 신고된 경우 삭제조치 될 수
          있음에 동의합니다.
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          d.&nbsp; &nbsp;&ldquo;회원&quot; 및 &ldquo;회사&quot;의 명예를
          손상시키거나 업무를 방해하는 행위
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          e.&nbsp; &nbsp; &nbsp;본 약관에 위배되는 내용을 &ldquo;회사&rdquo;에
          요구하는 행위
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          3.&nbsp; 본 조에 따른 &ldquo;회원&rdquo;으로서의 의무에 위반되는 경우,
          &quot;회사&quot;는 해당 &ldquo;회원&rdquo;의 회원 자격을 본 약관에서
          정하는 바에 따라 박탈하고 서비스 접근 또는 참여를 제한할 수 있습니다.
        </p>
        <p>&nbsp;</p>
        <p>
          <strong>제19조. 회원의 게시물 관리</strong>
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          1.&nbsp; &nbsp;&ldquo;회원&ldquo;이 서비스에 등록하는 게시물 등으로
          인하여 본인 또는 타인에게 손해나 기타 문제가 발생하는 경우,
          &ldquo;회원&ldquo;은 이에 대한 전적인 책임을 지게 되며,
          &ldquo;회사&ldquo;는 이에 대하여 어떠한 경우에도 책임을 지지 않습니다.
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          2.&nbsp; &nbsp;&ldquo;회사&ldquo;는 다음 각 호에 해당하는 게시물 등을
          회원의 사전 동의 없이 임시게시 중단, 수정, 삭제, 이동 또는 등록 거부
          등의 관련 조치를 취할 수 있습니다.
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          a.&nbsp; &nbsp;다른 회원 또는 제3자에게 심한 모욕을 주거나 명예를
          손상시키는 내용인 경우
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          b.&nbsp; &nbsp;공공질서 및 미풍양속에 위반되는 내용을 유포하거나
          링크시키는 경우
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          c.&nbsp; &nbsp;불법복제 또는 해킹을 조장하는 내용인 경우
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          d.&nbsp; &nbsp;영리를 목적으로 하는 광고일 경우
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          e.&nbsp; &nbsp;범죄와 결부된다고 객관적으로 인정되는 내용일 경우
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          f.&nbsp; &nbsp;다른 이용자 또는 제3자의 저작권 등 기타 권리를 침해하는
          내용인 경우
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          g.&nbsp; &nbsp;&ldquo;회사&rdquo;의 자체적 판단 아래 해당 게시물이
          서비스의 성격에 부합하지 않는 경우
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          h.&nbsp; &nbsp;기타 관계법령에 위배된다고 판단되는 경우
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          3.&nbsp; &nbsp;&ldquo;회원&ldquo;은 게시물 내용에 사회적 통념에
          어긋나는 문구와 내용 또는 기타 법령에 위반되거나 타인의 명예, 인격권,
          저작권 기타 권리를 침해하거나 그에 준하는 내용이 포함되지 아니하도록
          해야 하며, 작성된 게시물에 이러한 내용이 포함되어 발생하는 모든 문제에
          대한 책임은 &ldquo;회원&ldquo;이 부담합니다
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          4.&nbsp; &nbsp;&ldquo;회사&ldquo;는 게시물 등에 대하여 제3자로부터
          명예훼손, 지적재산권 등의 권리 침해를 이유로 게시중단 요청을 받은 경우
          이를 임시로 삭제할 수 있으며, 이의를 제기한 자와 게시물 등록자 간에
          소송, 합의 등을 통해 당해 게시물에 관한 법적 문제가 종결된 후 이를
          근거로 &ldquo;회사&ldquo;에 신청이 있는 경우에만 상기 임시 삭제된
          게시물은 다시 등록될 수 있습니다.
        </p>
        <p>&nbsp;</p>
        <p>
          <strong>제20조. 정보의 편집 및 삭제</strong>
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          &ldquo;회사&rdquo;는 다음 각 호의 경우, &quot;회원&quot;과 사전 협의를
          통해 이를 추가, 수정, 변경 또는 삭제할 수 있도록 요청할 수 있습니다.
          다만, &quot;회원&quot;이 합리적인 사유 없이 이를 거부하거나, 현저한
          정책 위반 또는 불법성이 명백한 경우 등 사전 협의절차를 거치기에
          부적절하다고 판단될 경우, &quot;회사&rdquo;는 &ldquo;회원&rdquo;의
          사전승인 없이 이를 추가, 수정, 변경 또는 삭제할 수 있으며,
          &quot;회원&quot;에게 사후에 이메일로 통보합니다.
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          a.&nbsp; &nbsp;&quot;회원&quot;이 게시한 컨텐츠가 속한 카테고리 등의
          정보가 적절하지 않다고 판단될 경우
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          b.&nbsp; &nbsp;&quot;회원&quot;이 게시한 게시글 제목, 사진 제목, 회원
          프로필 이미지, 게시글 커버 이미지 등이 &quot;회사&quot;의 정책에
          부합하지 않거나 사회통념상 적절하지 않다고 판단할 경우
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          c.&nbsp; &nbsp;게시글의 내용 또는 게시글에 포함된 내용이
          &quot;회사&rdquo;의 정책에 부합하지 않을 경우
        </p>
        <p>&nbsp;</p>
        <p>
          <strong>제21조. 게시물과 지식재산권 등</strong>
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          1. &ldquo;회사&rdquo;가 작성한 게시물 또는 저작물에 대한 저작권 및
          기타 지식 재산권은 &ldquo;회사&rdquo;에 귀속합니다.
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          2.&nbsp;&quot;회원&quot;이 사이트 등에 제공하거나 게시한 게시물에 대한
          저작권은 &ldquo;회원&rdquo;에게 귀속됩니다. &ldquo;회원&rdquo;은
          자신이 제공하거나 게시한 게시물에 대해 &rdquo;회사&rdquo;의 서비스
          운영, 개선, 홍보를 위한 범위 내에서 무상의 비독점적 사용권을
          &rdquo;회사&rdquo;에 부여합니다. &rdquo;회원&rdquo;이
          &rdquo;회사&rdquo;에게 부여한 사용권은 &rdquo;회사&rdquo;가 사이트
          등을 운영하는 동안 계속 유효하며, &rdquo;회원&rdquo;이 서비스
          이용계약을 해지한 후에도 같습니다. &rdquo;회원&rdquo;은 게시물에 대해
          &rdquo;회사&rdquo;에 사용권을 부여하기 위해 필요한 권리를 보유해야
          합니다. 이러한 권리를 보유하지 않아 발생하는 모든 문제에 대해서는
          &rdquo;회원&rdquo;이 책임을 부담하게 됩니다.
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          3.&nbsp; &nbsp;&quot;회원&quot;은 &quot;회사&quot;가 제공하는 서비스를
          이용함으로써 얻은 정보를 저작권자의 사전 승낙 없이
          녹화ㆍ복제ㆍ편집ㆍ전시ㆍ전송ㆍ배포ㆍ판매ㆍ방송ㆍ공연하는 등의 행위로
          저작권을 침해하여서는 안됩니다.
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          4.&nbsp; &nbsp;&quot;회원&quot;이 사이트 등에 제공하거나 게시하는
          게시물은 검색 엔진 내지 서비스 및 관련 프로모션 등에 노출될 수 있으며,
          해당 노출을 위해 필요한 범위 내에서는 일부 수정, 복제, 편집되어 게시될
          수 있습니다. 이 경우, &ldquo;회사&rdquo;는 저작권법 규정을 준수하며,
          &quot;회원&quot;은 언제든지 고객문의 또는 서비스 내 관리기능을 통해
          해당 게시물에 대해 삭제, 검색결과 제외, 비공개 등의 조치를 취할 수
          있습니다.
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          5.&nbsp; &nbsp;&rdquo;회원&rdquo;이 올린 게시물이 &rdquo;회원&rdquo;의
          동의 없이 타인에 의해 무단, 불법 복제되어 &rdquo;회원&rdquo;뿐 아니라
          &rdquo;회사&rdquo;의 이익에 상충할 경우 &rdquo;회사&rdquo;는
          &rdquo;회원&rdquo;을 대리해 저작권을 행사할 수 있습니다. 단, 이 경우
          &rdquo;회사&rdquo;는 &rdquo;회원&rdquo;에게 개별적 동의를 구합니다.
        </p>
        <p>&nbsp;</p>
        <h3>
          <strong>제5장. 계약 해지 및 이용 제한</strong>
        </h3>
        <p>
          <strong>제22조. 회원의 가입해지, 자료삭제 등</strong>
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          1.&nbsp; &nbsp;&ldquo;회원&rdquo;이 이용계약을 해지하고자 할 경우,
          &rdquo;회사&rdquo;의 고객센터 또는 &rdquo;회원탈퇴&rdquo; 메뉴를 통해
          해지 신청을 합니다. 단, &ldquo;회사&rdquo;는 회원의 회원가입 후
          일정시간 동안에는 서비스 부정이용 방지 등의 사유로 즉시 회원탈퇴를
          제한할 수 있습니다.
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          2.&nbsp; &nbsp;&ldquo;회원&rdquo;이 이용계약을 해지한 경우, 또는
          &rdquo;회사&rdquo;가 이용계약을 해지한 경우, &rdquo;회사&rdquo;는 해지
          즉시 &rdquo;회원&rdquo;의 모든 정보를 파기하며, 동일한
          &rdquo;회원&rdquo;이 신규로 재가입하기까지 일정 기간 제한을 둘 수
          있습니다. 다만, 관련법령 및 개인정보 취급방침에 따라
          &rdquo;회사&rdquo;가 회원정보를 보유할 수 있는 경우는 보유 목적에
          필요한 최소한의 정보를 보관할 수 있습니다.
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          3.&nbsp; &nbsp;&quot;회원&quot;이 이용계약을 해지하는 경우,
          &quot;회원&quot;이 서비스 내에서 직접 작성한 &quot;게시물&quot; 및
          덧글과 같이 본인 계정으로 등록된 게시물 일체 또는 다른 회원에 의해
          담기, 스크랩 등이 되어 재게시 되거나, 공용게시판에 등록된 게시물은
          이용계약 해지만으로 삭제되지 않으므로, &ldquo;회원&rdquo;이 직접
          사전에 삭제 후 이용계약을 해지하여야 합니다.
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          4.&nbsp; &nbsp;&ldquo;회사&rdquo;는 &ldquo;회원&ldquo;이 [1년, 3년,
          5년] 동안 로그인 하지 않는 경우로서 별도 통지일로부터 7일 이내에
          로그인 하지 않은 경우, 해당 &ldquo;회원&ldquo;의 계정을 휴면 처리 또는
          탈퇴 처리 할 수 있습니다. 해당 &ldquo;회원&ldquo;의 계정이 휴먼 처리된
          이후에도 해당 &ldquo;회원&ldquo;이 [1]년 동안 로그인 하지 않는
          경우에는 &ldquo;회사&ldquo;는 &ldquo;회원&ldquo;의 계정을 탈퇴 처리할
          수 있습니다.&nbsp;
        </p>
        <p style={{ paddingLeft: '4rem' }}>&nbsp;</p>
        <p>
          <strong>제23조. 이용제한 등</strong>
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          1.&nbsp; &nbsp;&ldquo;회사&rdquo;는 &ldquo;회원&rdquo;이 본 약관의
          의무를 위반하거나 서비스의 정상적인 운영을 방해한 경우, 경고,
          일시정지, 영구이용정지 등으로 서비스 이용을 제한할 수 있습니다.
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          2.&nbsp; &nbsp;&ldquo;회사&rdquo;는 전항에도 불구하고, 타인의 명의도용
          및 결제도용, 불법프로그램의 제공 및 운영방해, 불법통신 및 해킹,
          악성프로그램의 배포, 접속권한 초과행위 등과 같이 관련법령을 위반한
          경우에는 즉시 영구적으로 서비스 이용을 정지할 수 있습니다. 본 항에
          따른 영구이용정지 시 이에 대해 별도로 보상하지 않습니다.
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          3.&nbsp; &nbsp;&ldquo;회사&rdquo;는 &ldquo;회원&rdquo;이 계속해서
          3개월 이상 로그인하지 않는 경우, 회원정보의 보호 및 운영의 효율성을
          위해 이용을 제한할 수 있습니다.
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          4.&nbsp; &nbsp;&ldquo;회사&rdquo;는 본 조의 이용제한 범위 내에서
          제한의 조건 및 세부내용은 이용제한정책 및 개별 서비스상의 운영정책에서
          정하는 바에 의합니다.
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          5.&nbsp; &nbsp;본 조에 따라 서비스 이용을 제한하거나 계약을 해지하는
          경우에는 &ldquo;회사&rdquo;는 그 사유 및 제한기간 등을
          &ldquo;회원&ldquo;에게 제25조에 따라 알려야 합니다.
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          6.&nbsp; &nbsp;&ldquo;회원&rdquo;은 본 조에 따른 이용제한 등에 대해
          &ldquo;회사&rdquo;가 정한 절차에 따라 이의신청을 할 수 있습니다. 이 때
          이의가 정당하다고 &ldquo;회사&rdquo;가 인정하는 경우
          &ldquo;회사&rdquo;는 즉시 서비스의 이용을 재개합니다.
        </p>
        <p>&nbsp;</p>
        <p>
          <strong>제24조. 부정이용 금지 및 차단</strong>
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          1.&nbsp; &nbsp;&ldquo;회사&ldquo;는 다음 각 호 어느 하나에 해당하는
          경우를 부정 이용행위로 봅니다.
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          a.&nbsp; &nbsp;동일한 ID로 2대 이상의 기기에서 동시접속이 발생하는
          경우
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          b.&nbsp; &nbsp;동일한 ID로 다수의 PC 또는 IP에서 서비스를 이용하는
          경우
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          c.&nbsp; &nbsp;자신의 ID 및 서비스를 타인이 이용하도록 제공하는 경우
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          d.&nbsp; &nbsp;자신의 ID 및 서비스를 타인에게 판매, 대여, 양도하는
          행위 및 이를 광고하는 행위
        </p>

        <p style={{ paddingLeft: '4rem' }}>
          2.&nbsp; &ldquo;회사&ldquo;는 전항에 따른 부정 이용자가 발견되었을
          경우, 다음 각 호에 따른 조치를 취할 수 있습니다.
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          a.&nbsp; &nbsp;[1차 발견 시] 전자우편, 쪽지, 팝업창, 이메일 등을
          통하여 경고합니다.
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          b.&nbsp; [2차 발견 시] 강제 탈퇴 처리되며 &ldquo;회사&rdquo;의 법률
          대리인을 통한 고발조치와 민사소송을 진행하게 됩니다.
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          3.&nbsp; &nbsp;&ldquo;회원&ldquo;은 전항의 조치를 이유로, 서비스
          이용기간의 연장을 요구할 수 없습니다.
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          4.&nbsp; &nbsp;&ldquo;회원&ldquo;은 &ldquo;회사&ldquo;로부터의 본 조
          제2항의 조치에 이의가 있는 경우, &ldquo;회사&ldquo;의 법률 대리인을
          통해 구체적인 자료를 첨부하여 소명할 수 있습니다.
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          5.&nbsp; &nbsp;&ldquo;회사&rdquo;는 다음 각 호의 방법을 통해 부정이용
          식별하고 이를 차단합니다. &ldquo;회원&rdquo;은 부정이용을 차단하기
          위한 &ldquo;회사&rdquo;의 조치에 대하여 일체의 이의를 제기할 수
          없습니다.
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          a.&nbsp; &nbsp;&ldquo;회사&ldquo;는 &ldquo;회원&ldquo;의 서비스 이용
          중에 수집ㆍ확인된 IP정보 등의 자료를 토대로, 서버를 통하여 부정이용
          여부를 분류, 확인합니다.
        </p>
        <p style={{ paddingLeft: '8rem' }}>
          b.&nbsp; &nbsp;&ldquo;회사&ldquo;는 &ldquo;회원&ldquo;이 서비스 이용
          중에 복제프로그램을 실행시키거나 동일한 ID로 동시 접속을 하는 경우,
          서비스 이용 접속을 강제로 종료 시킵니다.
        </p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <h3>
          <strong>제6장. 통지, 손해배상 및 면책 등</strong>
        </h3>
        <p>
          <strong>제25조. 회원에 대한 통지</strong>
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          1.&nbsp; &nbsp;&ldquo;회사&ldquo;가 본 약관에 관하여 회원에 대한
          통지를 하는 경우 본 약관에 별도 규정이 없는 한 서비스 내 전자쪽지,
          로그인시 동의창, &ldquo;회원&ldquo;의 아이디인 이메일주소 등으로 할 수
          있습니다.
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          2.&nbsp; &nbsp;&ldquo;회사&ldquo;는 본 약관에 관한 회원 전체에 대한
          통지의 경우 7일 이상 사이트의 게시판에 게시함으로서 제1항의 통지에
          갈음할 수 있습니다.
        </p>
        <p>&nbsp;</p>
        <p>
          <strong>제26조. 손해배상</strong>
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          1.&nbsp; &nbsp;&ldquo;회사&ldquo;가 제공하는 모든 서비스와 관련하여
          &ldquo;회사&ldquo;의 책임이 있는 사유로 인해 &ldquo;회원&ldquo;에게
          손해가 발생한 경우 &ldquo;회사&ldquo;는 그 손해를 배상합니다.&nbsp;
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          2.&nbsp; &nbsp;&ldquo;회원&ldquo;이 본 약관의 규정에 위반한 행위로
          &ldquo;회사&ldquo; 또는 제3자에게 손해를 입히거나 &ldquo;회원&ldquo;의
          귀책사유로 인해 &ldquo;회사&ldquo; 또는 제3자에게 손해를 입힌 경우에
          &ldquo;회원&ldquo;은 그 손해를 배상하여야 합니다.
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          3.&nbsp; &nbsp;타 회원의 귀책사유로 &ldquo;회원&ldquo;의 손해가 발생한
          경우 &ldquo;회사&ldquo;는 이에 대한 배상 책임이 없습니다.
        </p>
        <p>&nbsp;</p>
        <p>
          <strong>제27조. 면책</strong>
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          1.&nbsp; &nbsp;&ldquo;회사&ldquo;는 &ldquo;회원&ldquo;이 서비스를
          이용하여 기대하는 효과를 얻지 못한 것에 대하여 책임을 지지 않습니다.
          또한, &ldquo;회사&ldquo;는 &ldquo;회사&ldquo;가 제공하는 무료 서비스의
          이용과 관련하여는 &ldquo;회사&ldquo;의 고의 또는 중과실로 인하여
          &ldquo;회원&ldquo;에게 손해가 발생하였더거나 &ldquo;회사&ldquo;가
          관련법률을 위반한 것이 아닌 한 &ldquo;회원&ldquo;에게 어떠한 책임도
          부담하지 않습니다.&nbsp;
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          2.&nbsp; &nbsp;&ldquo;회사&ldquo;는 천재지변 또는 이에 준하는
          불가항력으로 인하여 서비스를 제공할 수 없는 경우 서비스 제공에 관한
          책임이 면제됩니다.
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          3.&nbsp; &nbsp;&ldquo;회사&ldquo;는 회원들 사이의 법률관계, 거래에
          대해서 &ldquo;회원&ldquo;을 포함하여 어느 누구도 대리하지 아니하고
          누구에 대해서도 어떠한 책임도 부담하지 아니합니다.
        </p>
        <p>&nbsp;</p>

        <p>
          <strong>제28조. 분쟁의 해결</strong>
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          1.&nbsp; 회원 간 또는 회원과 제3자 간 발생한 분쟁에 대하여
          &ldquo;회사&ldquo;는 합리적인 범위 내에서 이를 조정할 수 있습니다.
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          2.&nbsp; &nbsp;&ldquo;회사&ldquo;와 &ldquo;회원&ldquo;은 서비스와
          관련하여 발생한 분쟁을 원만하게 해결하기 위하여 필요한 모든 노력을
          해야 합니다.
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          3.&nbsp; &ldquo;회사&ldquo;와 &ldquo;회원&ldquo;간에 발생한 분쟁은
          전자거래기본법에 의해 설치된 전자거래분쟁 조정위원회의 조정절차에 의해
          해결할 수 있습니다.
        </p>
        <p style={{ paddingLeft: '4rem' }}>
          4.&nbsp; 전항의 노력에도 불구하고 &ldquo;회사&ldquo;와
          &ldquo;회원&ldquo;간에 발생한 분쟁에 관한 소송이 제기될 경우, 당사자의
          주소지를 관할하는 법원을 관할법원으로 하여 이를 해결합니다.
        </p>
        <p>&nbsp;</p>
        <p>[부칙]</p>
        <p>본 약관은 2023년 6월 6일부터 적용됩니다.</p>
      </Container>
    </AppLayout>
  );
};

export default TermsOfServiceView;
