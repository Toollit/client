import React, { FC } from 'react';
import AppLayout from '@/components/appLayout';
import { Container } from './styles';

export interface ViewProps {
  handleClose: () => void;
}

const PrivacyView: FC<ViewProps> = ({ handleClose }) => {
  return (
    <AppLayout
      type='close'
      handleClose={handleClose}
      boundary={true}
      footer={false}
    >
      <Container>
        <div>
          <h2>
            <strong>개인정보처리방침</strong>
          </h2>
          <p>
            Toollit (이하 &quot;회사&quot;)는 개인정보를 소중하게 생각하고
            개인정보를 보호하기 위하여 최선을 다하고 있습니다.
            &quot;회사&quot;는 본 개인정보처리방침을 통하여 이용자가 제공하는
            개인정보가 어떠한 용도와 방식으로 이용되고 있으며 개인정보보호를
            위해 어떠한 조치가 취해지고 있는지 알려드리고자 합니다. 본
            개인정보처리방침은 정부의 법률 및 지침 변경이나 &quot;회사&quot;의
            내부 방침 변경 등으로 인하여 수시로 변경될 수 있으며, 변경될 경우
            변경된 개인정보처리방침을 &quot;회사&quot;가 제공하는 서비스
            페이지에 공지하도록 하겠습니다.&nbsp;
          </p>
          <p>&nbsp;</p>
          <p>
            &quot;회사&quot;의 개인정보처리방침은 다음과 같은 내용을 포함하고
            있습니다.&nbsp;
          </p>

          <p style={{ paddingLeft: '4rem' }}>
            1. 개인정보의 수집 및 이용 목적, 항목 및 수집방법&nbsp;
          </p>
          <p style={{ paddingLeft: '4rem' }}>
            2. 개인정보의 제공 및 처리위탁&nbsp;
          </p>
          <p style={{ paddingLeft: '4rem' }}>
            3. 개인정보 수집&middot;이용의 거부 시 불이익
          </p>
          <p style={{ paddingLeft: '4rem' }}>
            4. 개인정보 보유 및 이용기간&nbsp;
          </p>
          <p style={{ paddingLeft: '4rem' }}>5. 개인정보의 파기절차 및 방법</p>
          <p style={{ paddingLeft: '4rem' }}>
            6. 회원의 권리와 행사 방법&nbsp;
          </p>
          <p style={{ paddingLeft: '4rem' }}>
            7. 개인정보 자동 수집 장치의 설치/운영 및 거부에 관한 사항&nbsp;
          </p>
          <p style={{ paddingLeft: '4rem' }}>
            8. 개인정보 보호를 위한 기술적/관리적 대책&nbsp;
          </p>
          <p style={{ paddingLeft: '4rem' }}>
            9. 개인정보 관리 책임자의 성명, 연락처, 부서&nbsp;
          </p>
          <p style={{ paddingLeft: '4rem' }}>10. 고지의 의무&nbsp;</p>
          <p>&nbsp;</p>
          <h3>
            <strong>1. 개인정보 수집의 이용 목적, 항목 및 수집방법</strong>
          </h3>
          <p style={{ paddingLeft: '4rem' }}>
            1. &ldquo;개인정보&rdquo;란 생존하는 개인에 관한 정보로서 당해
            개인을 식별할 수 있는 정보(당해 정보만으로는 특정 개인을 식별할 수
            없더라도 다른 정보와 용이하게 결합하여 식별할 수 있는 것을
            포함합니다)를 말합니다.&nbsp;
          </p>
          <p style={{ paddingLeft: '4rem' }}>
            2. &quot;회사&quot;는 수집된 개인정보를 다음의 목적을 위해
            활용합니다.&nbsp;
          </p>
          <p style={{ paddingLeft: '8rem' }}>
            a. 회원가입 및 의사소통에 관한 사항: 회원 본인확인, 부정 가입방지,
            가입 의사확인, 연령확인, 고충상담 및 처리, 공지사항 안내, 약관 위반
            회원에 대한 이용제한 조치, 서비스의 원활한 운영에 지장을 미치는 행위
            및 서비스 부정이용 행위 제재, 회원 가입 거절 사유 유무의 확인, 분쟁
            조정을 위한 기록보존, 불만처리 등 민원처리 등&nbsp;
          </p>
          <p style={{ paddingLeft: '8rem' }}>
            b. 콘텐츠 및 서비스 제공에 관한 사항: 각종 맞춤 서비스 제공, 캐시
            결제, 개인 및 법인사업자의 서비스 이용 및 판매대금 정산, 금융거래 시
            본인 인증 및 금융서비스 등&nbsp;
          </p>
          <p style={{ paddingLeft: '8rem' }}>
            c. 유료 서비스 요금 및 판매대금 정산 및 환불&nbsp;
          </p>
          <p style={{ paddingLeft: '8rem' }}>
            d. 서비스 개선 및 이용에 관한 통계 조사 등, 신규 서비스 개발,
            통계학적 특성에 따른 서비스 제공 및 광고 게재, 서비스의 유효성 확인,
            접속빈도 파악, 회원의 서비스 이용에 대한 통계 분석 등 서비스 분석 및
            서비스 이용환경 개선
          </p>
          <p style={{ paddingLeft: '8rem' }}>
            e. 회원으로부터 이에 대한 별도의 동의를 얻은 경우에 한하여, 이벤트
            정보 및 참여기회 제공, 광고성 정보 제공 및 참여기회 제공
          </p>
          <p style={{ paddingLeft: '4rem' }}>
            3. &quot;회사&quot;는 위에 명시한 목적을 위해 다음과 같은 개인정보를
            수집하고 있습니다.&nbsp;
          </p>

          <ul>
            <li style={{ listStyle: 'none' }}>
              <ul>
                <li style={{ listStyle: 'none', paddingLeft: '8rem' }}>
                  <ul>
                    <li style={{ listStyle: 'initial' }}>
                      통합회원가입시
                      <ul>
                        <li
                          style={{ listStyle: 'initial', marginLeft: '4rem' }}
                        >
                          필수: 이메일, 비밀번호
                          {/* 본인확인값(DI, CI)&nbsp; */}
                        </li>
                      </ul>
                    </li>
                    <li>
                      <ul>
                        <li
                          style={{ listStyle: 'initial', marginLeft: '4rem' }}
                        >
                          선택 : 국가, 관심사, 경력, 수상 및 대외활동, 보유스킬,
                          자격증, 외국어능력, 자기소개, 홈페이지 등
                        </li>
                      </ul>
                    </li>
                    <li style={{ listStyle: 'initial' }}>
                      유료서비스 결제시
                      <ul>
                        <li
                          style={{ listStyle: 'initial', marginLeft: '4rem' }}
                        >
                          필수 : 이름, 이메일, 휴대폰번호, 본인확인값(DI, CI) 및
                          기타 결제 관련 정보
                        </li>
                        <li style={{ marginLeft: '4rem' }}>
                          서비스 이용 과정 중 자동 생성 수집 정보
                          <ul>
                            <li>
                              IP Address, MAC 주소, 쿠키, 세션, 방문일시, 서비스
                              이용기록, 불량(부정) 이용기록, 기기정보(OS, 단말기
                              모델, 이동통신사 정보, 하드웨어 ID, 서비스 이용에
                              대한 기본 통계), 어플리케이션 설치 및 사용이력
                            </li>
                            <li>
                              회원의 휴대전화 단말기의 연락처 기능에 접근할 수
                              있음.
                            </li>
                            <li>
                              IOS 운영체제 휴대폰을 사용하는 회원의 경우 사용자
                              식별을 위하여 UUID에 접근할 수 있음.
                            </li>
                            <li>
                              회원의 휴대전화 단말기의 카메라, 사진첩, 마이크
                              기능(IOS) 또는
                              저장공간(사진/미디어/파일)(Android)에 접근할 수
                              있음.
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>

          <p style={{ paddingLeft: '4rem' }}>
            4. &quot;회사&quot;는 이용자의 개인정보의 수집할 경우 반드시
            이용자의 동의를 얻어 수집하며, 이용자의 기본적 인권을 침해할 우려가
            있는 인종, 출신지, 본적지, 사상, 정치적 성향, 범죄기록, 건강상태
            등의 정보는 이용자의 동의 또는 법령의 규정에 의한 경우 이외에는
            수집하지 않습니다.&nbsp;
          </p>
          <p style={{ paddingLeft: '4rem' }}>
            5. &quot;회사&quot;는 회원 가입을 만 14세 이상인 경우에 가능하도록
            하며 개인정보의 수집&middot;이용에 법정대리인의 동의가 필요한 만
            14세 미만 아동의 개인정보는 수집하지 않습니다.&nbsp;
          </p>
          <p>&nbsp;</p>
          <h3>
            <strong>2. 개인정보의 제공 및 처리위탁</strong>
          </h3>
          <p>
            <strong>1. 개인정보의 제공&nbsp;</strong>
          </p>
          <p style={{ paddingLeft: '4rem' }}>
            a. &quot;회사&quot;는 이용자의 개인정보를 &ldquo;1. 개인정보의 수집
            및 이용 목적, 항목 및 수집 방법&quot;에서 고지한 범위 내에서
            사용하며, 원칙적으로 이용자의 개인정보를 제공하지 않습니다. 다만
            아래의 경우에는 예외로 합니다.&nbsp;
          </p>
          <p style={{ paddingLeft: '4rem' }}>
            i. 이용자가 사전에 동의한 경우&nbsp;
          </p>

          <p style={{ paddingLeft: '4rem' }}>
            ii. 법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와
            방법에 따라 수사기관의 요구가 있는 경우&nbsp;
          </p>
          <p>&nbsp;</p>
          <p>
            <strong>2. 개인정보 처리의 위탁</strong>
          </p>
          <p style={{ paddingLeft: '4rem' }}>
            a. &quot;회사&quot;는 원활한 업무 처리를 위해서 아래와 같이
            개인정보를 위탁하고 있으며, 관계 법령에 따른 위탁계약 시 개인정보가
            안전하게 관리될 수 있도록 필요한 사항을 규정하고 있습니다. 회사의
            개인정보 위탁처리 기관 및 위탁업무 내용은 아래와 같습니다.
            위탁기간은 회원의 탈퇴시 또는 위탁계약 종료시까지입니다.
          </p>
          <p>&nbsp;</p>
          <p style={{ paddingLeft: '4rem' }}>i. 국내 위탁 업체</p>
          <table
            style={{
              boxSizing: 'inherit',
              borderCollapse: 'collapse',
              borderSpacing: '0rem',
              width: '81.6rem',
            }}
          >
            <thead style={{ boxSizing: 'inherit' }}>
              <tr style={{ boxSizing: 'inherit' }}>
                <th
                  style={{
                    boxSizing: 'inherit',
                    padding: '0.5em 0.75em',
                    textAlign: 'left',
                    verticalAlign: 'top',
                    color: '#363636',
                    border: '1px solid #d2cdcd',
                    backgroundColor: '#ced4da',
                  }}
                >
                  제공받은 자
                </th>
                <th
                  style={{
                    boxSizing: 'inherit',
                    padding: '0.5em 0.75em',
                    textAlign: 'left',
                    verticalAlign: 'top',
                    color: '#363636',
                    border: '1px solid #d2cdcd',
                    backgroundColor: '#ced4da',
                  }}
                >
                  제공하는 목적
                </th>
              </tr>
            </thead>
            <tbody style={{ boxSizing: 'inherit' }}>
              <tr style={{ boxSizing: 'inherit' }}>
                <td
                  style={{
                    boxSizing: 'inherit',
                    padding: '0.5em 0.75em',
                    verticalAlign: 'top',
                    border: '1px solid #d2cdcd',
                  }}
                >
                  아마존웹서비시즈코리아(유)
                </td>
                <td
                  style={{
                    boxSizing: 'inherit',
                    padding: '0.5em 0.75em',
                    verticalAlign: 'top',
                    border: '1px solid #d2cdcd',
                  }}
                >
                  서비스 제공을 위한 인프라 관리
                </td>
              </tr>
            </tbody>
          </table>
          <p>&nbsp;</p>
          <p style={{ paddingLeft: '4rem' }}>ii. 국외 위탁업체</p>
          <table
            style={{
              boxSizing: 'inherit',
              borderCollapse: 'collapse',
              borderSpacing: '0rem',
              width: '81.6rem',
            }}
          >
            <thead style={{ boxSizing: 'inherit' }}>
              <tr style={{ boxSizing: 'inherit' }}>
                <th
                  style={{
                    boxSizing: 'inherit',
                    padding: '0.5em 0.75em',
                    textAlign: 'left',
                    verticalAlign: 'top',
                    color: '#363636',
                    border: '1px solid #d2cdcd',
                    backgroundColor: '#ced4da',
                  }}
                >
                  제공업체
                </th>
                <th
                  style={{
                    boxSizing: 'inherit',
                    padding: '0.5em 0.75em',
                    textAlign: 'left',
                    verticalAlign: 'top',
                    color: '#363636',
                    border: '1px solid #d2cdcd',
                    backgroundColor: '#ced4da',
                  }}
                >
                  업체 연락처
                </th>
                <th
                  style={{
                    boxSizing: 'inherit',
                    padding: '0.5em 0.75em',
                    textAlign: 'left',
                    verticalAlign: 'top',
                    color: '#363636',
                    border: '1px solid #d2cdcd',
                    backgroundColor: '#ced4da',
                  }}
                >
                  이전 목적
                </th>
                <th
                  style={{
                    boxSizing: 'inherit',
                    padding: '0.5em 0.75em',
                    textAlign: 'left',
                    verticalAlign: 'top',
                    color: '#363636',
                    border: '1px solid #d2cdcd',
                    backgroundColor: '#ced4da',
                  }}
                >
                  이전되는 개인정보 항목
                </th>
                <th
                  style={{
                    boxSizing: 'inherit',
                    padding: '0.5em 0.75em',
                    textAlign: 'left',
                    verticalAlign: 'top',
                    color: '#363636',
                    border: '1px solid #d2cdcd',
                    backgroundColor: '#ced4da',
                  }}
                >
                  이전 국가
                </th>
                <th
                  style={{
                    boxSizing: 'inherit',
                    padding: '0.5em 0.75em',
                    textAlign: 'left',
                    verticalAlign: 'top',
                    color: '#363636',
                    border: '1px solid #d2cdcd',
                    backgroundColor: '#ced4da',
                  }}
                >
                  이용 기간
                </th>
                <th
                  style={{
                    boxSizing: 'inherit',
                    padding: '0.5em 0.75em',
                    textAlign: 'left',
                    verticalAlign: 'top',
                    color: '#363636',
                    border: '1px solid #d2cdcd',
                    backgroundColor: '#ced4da',
                  }}
                >
                  이전 일시 및 방법
                </th>
              </tr>
            </thead>
            <tbody style={{ boxSizing: 'inherit' }}>
              <tr style={{ boxSizing: 'inherit' }}>
                <td
                  style={{
                    boxSizing: 'inherit',
                    padding: '0.5em 0.75em',
                    verticalAlign: 'top',
                    border: '1px solid #d2cdcd',
                  }}
                >
                  <p>Amazon Web Servises Inc.</p>
                  <p>(AWS Server)</p>
                </td>
                <td
                  style={{
                    boxSizing: 'inherit',
                    padding: '0.5em 0.75em',
                    verticalAlign: 'top',
                    border: '1px solid #d2cdcd',
                  }}
                >
                  aws-korea-privacy@amazon.com
                </td>
                <td
                  style={{
                    boxSizing: 'inherit',
                    padding: '0.5em 0.75em',
                    verticalAlign: 'top',
                    border: '1px solid #d2cdcd',
                  }}
                >
                  데이터 저장을 위한 클라우드 서버 이용
                </td>
                <td
                  style={{
                    boxSizing: 'inherit',
                    padding: '0.5em 0.75em',
                    verticalAlign: 'top',
                    border: '1px solid #d2cdcd',
                  }}
                >
                  서비스 이용 기록 또는 수집된 개인정보
                </td>
                <td
                  style={{
                    boxSizing: 'inherit',
                    padding: '0.5em 0.75em',
                    verticalAlign: 'top',
                    border: '1px solid #d2cdcd',
                  }}
                >
                  미국, 일본 등
                </td>
                <td
                  style={{
                    boxSizing: 'inherit',
                    padding: '0.5em 0.75em',
                    verticalAlign: 'top',
                    border: '1px solid #d2cdcd',
                  }}
                >
                  이용자의 서비스 가입기간 동안 보유
                </td>
                <td
                  style={{
                    boxSizing: 'inherit',
                    padding: '0.5em 0.75em',
                    verticalAlign: 'top',
                    border: '1px solid #d2cdcd',
                  }}
                >
                  서비스 이용 시점에 네트워크를 통한 전송
                </td>
              </tr>
            </tbody>
          </table>
          <p>&nbsp;</p>
          <p>&nbsp;</p>
          <p>
            <strong>3. 개인정보 수집&middot;이용의 거부 시 불이익</strong>
          </p>
          <p>
            회원은 개인정보 수집&middot;이용에 관한 동의를 거부할 권리가
            있습니다. 다만, 회원이 개인정보의 수집&middot;이용에 관한 동의를
            거부할 경우 불가피하게 아래와 같은 불이익이 발생합니다.
          </p>
          <p style={{ paddingLeft: '4rem' }}>
            a. 회원이 회원 가입 신청 시 회사가 수집&middot;이용(마켓팅,
            프로모션, 광고 목적 수집&middot;이용 제외)하고자 하는 개인정보의
            수집&middot;이용을 거부하는 경우에는 회원의 회원 가입 또는 서비스
            이용이 불가능합니다.
          </p>
          <p style={{ paddingLeft: '4rem' }}>
            b. 회원의 서비스 이용 과정에서 회사가 수집&middot;이용 또는 접근하는
            개인정보 또는 휴대전화기능의 수집&middot;이용 또는 접근을 거부하는
            경우 해당 회원에 대한 서비스의 제공 및 기술 지원이 제한될 수
            있습니다.
          </p>
          <p>&nbsp;</p>
          <p>
            <strong>4. 개인정보 보유 및 이용기간</strong>
          </p>
          <p style={{ paddingLeft: '4rem' }}>
            1. &quot;회사&quot;는 회원 가입 시 제공한 정보를 회원 가입시점부터
            탈퇴 신청이 접수된 날까지 보관할 수 있습니다. 단, 개인정보 도용
            등으로 인한 원치 않는 회원탈퇴 등에 대비하기 위해 회원탈퇴 요청 후
            [7]일간 개인정보를 보존하고, 서비스의 부정한 이용으로 인한 분쟁을
            방지하기 위한 내부 방침에 따라 서비스의 부정이용기록, 즉 이용약관 및
            &ldquo;회사&rdquo;의 정책에 위배되는 행위를 한 회원의 개인정보는
            1년간 보존합니다.&nbsp;
          </p>
          <p style={{ paddingLeft: '4rem' }}>
            2. 단, 관계법령의 규정에 의하여 보존할 필요가 있는 경우
            &quot;회사&quot;는 아래와 같이 관계법령에서 정한 일정한 기간 동안
            회원정보를 보관합니다&nbsp;
          </p>
          <p style={{ paddingLeft: '8rem' }}>
            a. 개별적으로 회원의 동의를 받은 경우에는 약속한 보유기간&nbsp;
          </p>
          <p style={{ paddingLeft: '8rem' }}>
            b. 보존근거: 전자상거래 등에서의 소비자보호에 관한 법률,
            통신비밀보호법 등 관련법령
          </p>
          <p style={{ paddingLeft: '8rem' }}>c. 보존기간:&nbsp;</p>
          <p style={{ paddingLeft: '12rem' }}>
            i. 계약 또는 청약철회 등에 관한 기록(전자상거래법): 5년&nbsp;
          </p>
          <p style={{ paddingLeft: '12rem' }}>
            ii. 대금결제 및 재화 등의 서비스 등의 공급에 관한
            기록(전자상거래법): 5년&nbsp;
          </p>
          <p style={{ paddingLeft: '12rem' }}>
            iii. 소비자의 불만 또는 분쟁처리에 관한 기록(전자상거래법):
            3년(다만, 민사, 형사, 행정상의 절차가 진행 중에 있는 경우에는 그
            절차가 종료될 때까지)&nbsp;
          </p>
          <p style={{ paddingLeft: '12rem' }}>
            iv. 표시/광고에 관한 기록(전자상거래법): 6개월
          </p>
          <p style={{ paddingLeft: '12rem' }}>
            v. 세법이 규정하는 모든 거래에 관한 장부 및 증빙서류(국세기본법):
            5년
          </p>
          <p style={{ paddingLeft: '12rem' }}>
            vi. 전자금융 거래에 관한 기록(전자금융거래법): 5년
          </p>
          <p style={{ paddingLeft: '12rem' }}>
            iv. 접속에 관한 기록(통신비밀보호법): 3개월&nbsp;
          </p>
          <p style={{ paddingLeft: '4rem' }}>&nbsp;</p>
          <p>
            <strong>5. 개인정보의 파기절차 및 방법</strong>
          </p>
          <p style={{ paddingLeft: '4rem' }}>
            1. 회사는 개인정보 보유 및 이용 기간이 경과하면 다음과 같은 방법으로
            지체 없이 파기합니다.&nbsp;
          </p>
          <p style={{ paddingLeft: '8rem' }}>
            a. 전자적 파일 형태인 경우: 복원이 불가능한 방법으로 영구 삭제
          </p>
          <p style={{ paddingLeft: '8rem' }}>
            b. 인쇄물, 서면, 그 밖의 기록매체인 경우: 파쇄 또는 소각
          </p>
          <p style={{ paddingLeft: '4rem' }}>
            2. 회사는 위 기준과 별도로 1년간 서비스를 이용하지 않은 회원의
            개인정보는 휴면 계정으로 전환하여 별도로 분리하여 보관하거나 삭제할
            수 있습니다.&nbsp;
          </p>
          <p>&nbsp;</p>
          <p>
            <strong>6. 회원의 권리와 행사 방법</strong>
          </p>
          <p style={{ paddingLeft: '4rem' }}>
            1. 회원은 언제든지 다음의 사항에 관하여 개인정보 열람, 수정 및 회원
            탈퇴를 요구할 수 있습니다. 다만 회원이 회원가입 및 서비스 제공에
            필요한 개인정보 등에 대한 동의를 철회하는 경우 회원탈퇴 및 서비스
            해지가 불가피하게 되거나 서비스를 제공받지 못하게 될 수 있습니다.
          </p>
          <p style={{ paddingLeft: '8rem' }}>
            a. &quot;회사&quot;가 보유하고 있는 회원의 개인정보&nbsp;
          </p>
          <p style={{ paddingLeft: '8rem' }}>
            b. &quot;회사&quot;가 이용자의 개인정보를 이용하거나 제3자에게
            제공한 내역&nbsp;
          </p>
          <p style={{ paddingLeft: '8rem' }}>
            c. &quot;회사&quot;에게 개인정보수집ㆍ이용ㆍ제공 등의 동의를 한
            내역&nbsp;
          </p>
          <p style={{ paddingLeft: '4rem' }}>
            2. 회원은 &quot;회사&quot; 서비스에서 직접 자신의 정보를 열람,
            정정을 할 수 있으며, 별도로 개인정보보호책임자에게 서면, 전화,
            이메일 등을 통하여 개인정보의 열람, 정정을 요청할 수 있습니다.&nbsp;
          </p>
          <p style={{ paddingLeft: '4rem' }}>
            3. 회원은 언제든지 자신의 개인정보처리의 정지를 요구할 수
            있습니다.&nbsp;
          </p>
          <p style={{ paddingLeft: '4rem' }}>
            4. 회원은 언제든지 회원가입 시 개인정보의 수집, 이용, 제공 등에 대해
            동의하신 의사표시를 철회(회원탈퇴)할 수 있습니다.&nbsp;
          </p>
          <p style={{ paddingLeft: '4rem' }}>
            5. 회원이 &quot;회사&quot; 서비스에서 본인 확인 절차를 거친 후 직접
            동의철회(회원탈퇴)를 하거나, 별도로 개인정보보호책임자에게 서면,
            전화 또는 이메일 등을 통하여 연락하면 지체 없이 이용자의 개인정보를
            파기하는 등 필요한 조치를 취합니다. 단, 동의철회(회원탈퇴)가
            있더라도 관계법령에 따라 최소한의 정보가 보관됩니다.&nbsp;
          </p>
          <p>&nbsp;</p>
          <p>
            <strong>
              7. 개인정보 자동 수집 장치의 설치/운영 및 거부에 관한 사항
            </strong>
          </p>
          <p style={{ paddingLeft: '4rem' }}>
            1. &quot;회사&quot;는 회원의 정보를 수시로 저장하고 불러오는
            &quot;쿠키&quot;(cookie)와 세션(session)를 사용합니다.
            &quot;쿠키&quot;는 웹사이트 이용 시 서버가 사용자의 웹브라우저에
            보내는 작은 데이터 꾸러미로 회원의 컴퓨터의 하드디스크에 저장됩니다.
            세션(session)은 서비스 운영에 이용되는 서버가 회원의 접속시간 동안에
            회원의 정보를 서버에 저장하는 것을 의미합니다. &quot;회사&quot;는
            다음과 같은 목적을 위해 &quot;쿠키&quot;와 &ldquo;세션&rdquo;를
            사용합니다.&nbsp;
          </p>
          <p style={{ paddingLeft: '4rem' }}>
            2. &ldquo;쿠키&rdquo;와 &ldquo;세션&rdquo;은 이용자가 설정한 환경을
            유지하도록 함으로써 편리한 사용을 도우며, 이용자의 방문 기록, 이용
            형태, 관심 분야를 알게 해줌으로써 이를 통한 최적화된 맞춤 서비스를
            제공하고 서비스 개선의 척도로 활용됩니다.
          </p>
          <p style={{ paddingLeft: '4rem' }}>
            3. 이용자는 &quot;쿠키&quot; 설치에 대한 선택권을 가지고 있으며
            웹브라우저에서 옵션을 설정함으로써 모든 &quot;쿠키&quot;를
            허용하거나, &quot;쿠키&quot;가 저장될 때마다 확인을 거치거나, 아니면
            모든 &quot;쿠키&quot;의 저장을 거부할 수 있습니다. 다만, 쿠키 설치를
            거부할 경우 로그인이 필요한 일부 서비스를 이용하는 것에 어려움이
            있을 있습니다. 쿠키 설치 허용 여부를 지정하는 방법은 다음과
            같습니다.
          </p>
          <p style={{ paddingLeft: '8rem' }}>
            i. Chrome 웹 브라우저 &gt; 우측 상단 메뉴 [설정] &gt; [사이트 설정]
            &gt; [쿠키] 설정
          </p>
          <p style={{ paddingLeft: '8rem' }}>
            ii. Safari 웹 브라우저 &gt; [설정] &gt; [Safari] &gt; [쿠키 차단]
            &gt; 설정&nbsp;
          </p>
          <p style={{ paddingLeft: '4rem' }}>
            4. 이용자는 &ldquo;세션&rdquo; 설치에 대한 선택권을 가지고 있지
            않으며, 로그인이 필요한 서비스 이용 시 서버에 자동으로
            &ldquo;세션&rdquo;이 생성됩니다.
          </p>
          <p style={{ paddingLeft: '4rem' }}>
            5. 회사는 회원이 스마트폰, 태블릿 PC의 [연락처 기능, 카메라 및
            사진첩 기능, 위치 서비스 기능]에 회사가 접근하는 것을 원하지 않을
            경우 회원 스스로 접근을 차단할 수 있는 기술적 수단을 제공해
            드립니다(즉, 회원이 휴대전화에서 [**] 앱(App)의 위 각 기능에 대한
            접근을 차단 또는 비활성화하면 됩니다.)
          </p>
          <p>&nbsp;</p>
          <p>
            <strong>8. 개인정보 보호를 위한 기술적/관리적 대책</strong>
          </p>
          <p style={{ paddingLeft: '4rem' }}>
            1. 회원의 개인정보는 비밀번호에 의해 철저히 보호되고 있으며 본인이
            제공한 이메일주소에 매칭되는 비밀번호는 본인만이 알고 있습니다.
            따라서 개인정보의 확인 및 변경도 비밀번호를 알고 있는 본인에
            의해서만 가능합니다.&nbsp;
          </p>
          <p style={{ paddingLeft: '4rem' }}>
            2. 회원은 본인의 비밀번호를 누구에게도 알려주면 안됩니다. 이를 위해
            &quot;회사&quot;에서는 기본적으로 PC에서의 사용을 마치신 후
            온라인상에서 로그아웃(LOG-OUT)하고 웹 브라우저를 종료하도록
            권장합니다.&nbsp;
          </p>
          <p style={{ paddingLeft: '4rem' }}>
            3. &quot;회사&quot;의 개인정보 보호를 위한 기술적/관리적 대책 및
            물리적 조치는 다음과 같습니다.&nbsp;
          </p>
          <p style={{ paddingLeft: '8rem' }}>
            a. 수집한 개인정보 중 비밀번호 등 본인임을 인증하는 정보에 대한
            암호화 장치&nbsp;
          </p>
          <p style={{ paddingLeft: '8rem' }}>
            b. 컴퓨터 바이러스에 의한 개인정보의 침해를 막기 위한 백신소프트웨어
            설치, 갱신, 점검 조치&nbsp;
          </p>
          <p style={{ paddingLeft: '8rem' }}>
            c. 개인정보 시스템에 대한 접근권한 설정, 관리 및 침입차단 시스템
            등을 이용한 접근 통제장치&nbsp;
          </p>
          <p style={{ paddingLeft: '8rem' }}>
            d. 개인정보 취급자에 대한 지정과 권한의 설정 및 교육, 개인정보의
            안전한 관리&nbsp;
          </p>
          <p>&nbsp;</p>
          <p>
            <strong>9. 개인정보보호책임자의 성명, 연락처, 부서</strong>
          </p>
          <p>
            회사의 서비스를 이용하시면서 발생한 모든 개인정보보호 관련 민원,
            불만처리 등에 관한 사항을 개인정보 보호책임자 및 고객센터로 문의하실
            수 있고, 회사는 이용자의 문의에 신속하고 성실하게
            답변하겠습니다.&nbsp;
          </p>
          <ul>
            <li>이 름: 이승원&nbsp;</li>
            <li>소 속: Toollit&nbsp;</li>
            {/* <li>연락처: 010-0000-0000&nbsp;</li> */}
            <li>E-mail: {process.env.NEXT_PUBLIC_CONTACT_EMAIL}&nbsp;</li>
          </ul>
          <p>&nbsp;</p>
          <p>
            기타 개인정보침해에 관한 상담이 필요한 경우에는 한국정보보호진흥원,
            대검찰청 인터넷범죄수사센터, 경찰청 사이버테러대응센터 등으로
            문의하실 수 있습니다.&nbsp;
          </p>
          <ul>
            <li>한국정보보호진흥원 (1336)&nbsp;</li>
            <li>대검찰청 인터넷범죄수사센터 (02-3480-3600)&nbsp;</li>
            <li>경찰청 사이버테러대응센터 (02-392-0330)&nbsp;</li>
          </ul>
          <p>&nbsp;</p>
          <p>
            <strong>10. 고지의 의무</strong>
          </p>
          <p>
            회사는 개인정보처리방침이 변경되는 경우에는 &ldquo;회사&rdquo;의
            사이트 &ldquo;공지사항&rdquo;을 통하여 변경 및 시행의 시기, 변경
            내용을 공지합니다. 변경된 개인정보처리방침은 게시된 날로부터 7일
            후부터 효력이 발생합니다.&nbsp;
          </p>
          <p>&nbsp;</p>
          <ul>
            <li>시행일자 : 2023년 6월 6일</li>
          </ul>
          <p>&nbsp;</p>
          <p>&nbsp;</p>
        </div>
      </Container>
    </AppLayout>
  );
};

export default PrivacyView;
