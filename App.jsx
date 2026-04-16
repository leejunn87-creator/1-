import { useState, useEffect } from "react";

/* ═══════════════════════════════════════════════════
   나를아는, 나만아는 코치 v14
   ✨ Complete Redesign — Aurora Mesh + Bento + Organic
   ═══════════════════════════════════════════════════ */

// ═══ Design System ═══
const C={
  // Primary palette — warm coral to cool violet
  p1:"#7C5CFC",p2:"#A78BFA",p3:"#C4B5FD",
  coral:"#FF6B6B",coralL:"#FFA3A3",
  mint:"#34D399",mintD:"#059669",
  sky:"#38BDF8",
  amber:"#FBBF24",amberD:"#F59E0B",
  rose:"#FB7185",
  // Backgrounds
  bg:"#FAFAF9",bg2:"#F5F3F0",bgDark:"#1C1917",
  // Glass
  glass:"rgba(255,255,255,0.72)",glassBd:"rgba(0,0,0,0.06)",
  // Text
  tx:"#1C1917",txS:"#78716C",txD:"#A8A29E",
  // Gradients
  gHero:"linear-gradient(135deg,#7C5CFC 0%,#A78BFA 40%,#F0ABFC 70%,#FCA5A5 100%)",
  gWarm:"linear-gradient(135deg,#FCA5A5 0%,#FBBF24 100%)",
  gMint:"linear-gradient(135deg,#34D399 0%,#38BDF8 100%)",
  gAurora:"radial-gradient(ellipse at 30% 0%,rgba(124,92,252,.08),transparent 50%),radial-gradient(ellipse at 70% 100%,rgba(251,191,36,.06),transparent 50%),radial-gradient(ellipse at 0% 50%,rgba(52,211,153,.05),transparent 40%),#FAFAF9",
};
const ff="'Noto Sans KR','DM Sans',system-ui,sans-serif";
const G=(x={})=>({background:C.glass,backdropFilter:"blur(16px)",WebkitBackdropFilter:"blur(16px)",border:"1px solid "+C.glassBd,borderRadius:24,boxShadow:"0 1px 3px rgba(0,0,0,.04)",...x});

// ═══ Data (지원금 16개 + 절약정보 25개 + 프리미엄 12개) ═══
const JC=[{id:"office",e:"💼",l:"사무직"},{id:"sales",e:"🤝",l:"영업"},{id:"tech",e:"💻",l:"IT/개발"},{id:"creative",e:"🎨",l:"크리에이티브"},{id:"edu",e:"📚",l:"교육"},{id:"medical",e:"🏥",l:"의료"},{id:"self",e:"🏪",l:"자영업"},{id:"student",e:"🎓",l:"학생"},{id:"labor",e:"🔧",l:"기술직"},{id:"service",e:"🛎",l:"서비스"},{id:"finance",e:"📊",l:"금융"},{id:"other",e:"✨",l:"기타"}];
const JH={office:"예: 기획팀",sales:"예: B2B",tech:"예: 개발자",creative:"예: 디자이너",edu:"예: 교사",medical:"예: 간호사",self:"예: 카페사장",student:"예: 대학3년",labor:"예: 감독",service:"예: 매니저",finance:"예: 애널리스트",other:"자유롭게"};

const SDB=[
{id:"s1",cat:"청년",title:"청년 월세 지원",emoji:"🏠",amount:"월 최대 20만원",desc:"만 19~34세 독립거주 청년에게 월 최대 20만원을 12개월 지원.",dday:5,sb:78,docs:["주민등록등본","임대차계약서","소득증빙서류","통장사본","가족관계증명서"],steps:["복지로 접속","소득 정보 확인","신청서 작성","서류 업로드","심사 대기","승인 시 매월 입금"],tips:["소득 중위 60% 이하 유리","부모와 주소 분리 필요"],link:{url:"https://www.bokjiro.go.kr",label:"복지로 신청"},ageMin:19,ageMax:34,jobs:["ALL"],gender:"ALL"},
{id:"s2",cat:"청년",title:"청년도약계좌",emoji:"💰",amount:"정부 월 2.4만원+비과세",desc:"만 19~34세 월 최대 70만원 납입 시 정부 추가지원. 5년 만기 비과세.",dday:null,sb:92,docs:["신분증","소득확인증명서","주민등록등본"],steps:["은행 앱에서 검색","자격 확인","계좌 개설","자동이체 설정","5년 만기 수령"],tips:["소득 낮을수록 지원 커짐"],link:{url:"https://ylaccount.kinfa.or.kr",label:"청년도약계좌"},ageMin:19,ageMax:34,jobs:["ALL"],gender:"ALL"},
{id:"s3",cat:"청년",title:"청년내일채움공제",emoji:"🚀",amount:"2년 후 1,600만원",desc:"중소기업 취업 후 2년간 300만원 적립 → 1,600만원.",dday:null,sb:85,docs:["근로계약서","4대보험확인서","통장사본"],steps:["워크넷 가입","내일채움공제 신청","월 12.5만원 납입","2년 만기 수령"],tips:["취업 후 6개월 이내 신청"],link:{url:"https://www.work.go.kr/youngtomorrow",label:"내일채움공제"},ageMin:18,ageMax:34,jobs:["ALL"],gender:"ALL"},
{id:"s4",cat:"청년",title:"구직활동지원금",emoji:"💼",amount:"월 50만원 (6개월)",desc:"미취업 청년 월 50만원씩 6개월. 구직활동 2회 이상 시 지급.",dday:3,sb:72,docs:["이력서","구직활동증빙","주민등록등본","통장사본"],steps:["워크넷 신청","구직활동계획서 작성","매월 2회 증빙","수당 신청"],tips:["면접 캡처도 인정"],link:{url:"https://www.work.go.kr",label:"워크넷"},ageMin:18,ageMax:34,jobs:["학생","기타"],gender:"ALL"},
{id:"s5",cat:"청년",title:"국가장학금",emoji:"🎓",amount:"등록금 최대 전액",desc:"소득 1~3구간 전액, 4~6구간 연 390만원.",dday:7,sb:88,docs:["재학증명서","가구원소득서류","주민등록등본"],steps:["장학재단 가입","가구원 동의","소득 산정","신청"],tips:["가구원 동의 빨리 완료"],link:{url:"https://www.kosaf.go.kr",label:"장학재단"},ageMin:18,ageMax:30,jobs:["학생"],gender:"ALL"},
{id:"s6",cat:"청년",title:"디지털일자리사업",emoji:"💻",amount:"월 최대 180만원",desc:"미취업 청년 IT교육비 전액 + 실습 월 180만원.",dday:1,sb:68,docs:["졸업/재학증명서","구직등록확인서"],steps:["HRD-Net 검색","교육기관 선택","6개월 교육","기업 매칭"],tips:["코딩 경험 없어도 가능"],link:{url:"https://www.hrd.go.kr",label:"HRD-Net"},ageMin:18,ageMax:34,jobs:["학생","기타"],gender:"ALL"},
{id:"s7",cat:"자영업",title:"프리랜서 고용보험",emoji:"🛡️",amount:"실업급여 수급 가능",desc:"프리랜서도 고용보험 가입 시 실업급여. 보험료 80% 정부 지원.",dday:null,sb:75,docs:["계약서","소득금액증명원","통장사본"],steps:["근로복지공단 접속","고용보험 가입","보험료 납부","실업 시 급여 신청"],tips:["월소득 80만원 이상 가입 가능"],link:{url:"https://www.comwel.or.kr",label:"근로복지공단"},ageMin:20,ageMax:65,jobs:["자영업","크리에이티브"],gender:"ALL"},
{id:"s8",cat:"자영업",title:"소상공인 정책자금",emoji:"🏦",amount:"최대 1억원 (연 2%대)",desc:"소상공인진흥공단 연 2%대 저금리 최대 1억원.",dday:null,sb:65,docs:["사업자등록증","매출증빙","재무제표"],steps:["진흥공단 접속","자가진단","서류 제출","심사","대출 실행"],tips:["업력 7년 이하 유리"],link:{url:"https://www.semas.or.kr",label:"소상공인진흥공단"},ageMin:25,ageMax:65,jobs:["자영업"],gender:"ALL"},
{id:"s9",cat:"자영업",title:"여성창업 액셀러레이팅",emoji:"👩‍💼",amount:"사업화자금 최대 1억",desc:"여성 창업자 멘토링+사업화자금. 기술기반 우대.",dday:6,sb:55,docs:["사업계획서","사업자등록증"],steps:["여성기업지원센터 공고 확인","사업계획서 접수","서류심사","발표심사","선정 시 지원"],tips:["기술 아이템 가산점"],link:{url:"https://www.wbiz.or.kr",label:"여성기업지원센터"},ageMin:20,ageMax:60,jobs:["자영업","크리에이티브"],gender:"여성"},
{id:"s10",cat:"가족",title:"부모급여",emoji:"👶",amount:"월 100만원",desc:"0~11개월 아이 부모 월 100만원. 12~23개월 월 50만원.",dday:null,sb:95,docs:["출생증명서","부모신분증","통장사본"],steps:["정부24 신청","출생신고와 동시 가능","익월부터 입금"],tips:["출생 후 60일 이내 소급지급"],link:{url:"https://www.gov.kr",label:"정부24"},ageMin:20,ageMax:50,jobs:["ALL"],gender:"ALL"},
{id:"s11",cat:"가족",title:"첫만남이용권",emoji:"🎉",amount:"200만원 바우처",desc:"출생아 1인당 200만원 바우처.",dday:null,sb:97,docs:["출생증명서","부모신분증"],steps:["정부24에서 출생신고 시 신청","카드 수령","국민행복카드 사용"],tips:["쌍둥이 각각 200만원"],link:{url:"https://www.gov.kr",label:"정부24"},ageMin:20,ageMax:50,jobs:["ALL"],gender:"ALL"},
{id:"s12",cat:"가족",title:"아이돌봄서비스",emoji:"👧",amount:"시간당 1,150원~",desc:"만 12세 이하 아동 돌봄. 정부 75~85% 지원.",dday:null,sb:82,docs:["주민등록등본","건강보험료 납부확인서"],steps:["아이돌봄 홈페이지 가입","서비스 유형 선택","돌보미 배정","본인부담금 결제"],tips:["맞벌이 우선배정"],link:{url:"https://idolbom.go.kr",label:"아이돌봄"},ageMin:25,ageMax:55,jobs:["ALL"],gender:"ALL"},
{id:"s13",cat:"생활안정",title:"주거급여",emoji:"🏡",amount:"월 최대 32.7만원",desc:"중위소득 48% 이하 월세지원. 청년 분리지급 가능.",dday:null,sb:70,docs:["임대차계약서","소득재산신고서","주민등록등본"],steps:["복지로 신청","소득재산 조사","선정 후 매월 지급"],tips:["청년 분리지급은 주소 분리 필수"],link:{url:"https://www.bokjiro.go.kr",label:"복지로"},ageMin:19,ageMax:65,jobs:["ALL"],gender:"ALL"},
{id:"s14",cat:"생활안정",title:"에너지바우처",emoji:"⚡",amount:"연 최대 22.3만원",desc:"기초수급자/차상위 냉난방비 바우처.",dday:null,sb:88,docs:["수급자증명서","신분증"],steps:["주민센터 신청","자격 확인","바우처 발급"],tips:["전기요금에도 사용 가능"],link:{url:"https://www.energy.or.kr",label:"에너지바우처"},ageMin:18,ageMax:80,jobs:["ALL"],gender:"ALL"},
{id:"s15",cat:"생활안정",title:"기초연금",emoji:"👴",amount:"월 최대 33.4만원",desc:"만 65세 이상 소득 하위 70% 매월 지급.",dday:null,sb:90,docs:["신분증","통장사본"],steps:["65세 1개월 전부터 신청","국민연금공단 방문","소득재산 조사"],tips:["국민연금과 동시 수급 가능"],link:{url:"https://www.nps.or.kr",label:"국민연금공단"},ageMin:63,ageMax:100,jobs:["ALL"],gender:"ALL"},
{id:"s16",cat:"생활안정",title:"긴급복지 지원",emoji:"🆘",amount:"생계/의료/주거 긴급지원",desc:"갑작스런 위기 시 긴급 생계비/의료비/주거비.",dday:null,sb:80,docs:["위기상황증빙","신분증"],steps:["129 전화상담","주민센터 방문","긴급조사(48시간내)","즉시 지급"],tips:["전화 한 통이면 신청 가능"],link:{url:"https://www.129.go.kr",label:"129 상담센터"},ageMin:18,ageMax:100,jobs:["ALL"],gender:"ALL"},
];

function matchS(p){var age=p?.age||30,jc=p?.jobCat||"기타",gn=p?.gender||"기타";return SDB.filter(function(s){if(age<s.ageMin||age>s.ageMax)return false;if(s.gender!=="ALL"&&!gn.includes(s.gender))return false;if(s.jobs.indexOf("ALL")>=0)return true;for(var i=0;i<s.jobs.length;i++){if(jc.indexOf(s.jobs[i])>=0)return true;}return false;});}
function futD(n){if(n==null)return"";var d=new Date();d.setDate(d.getDate()+n);return(d.getMonth()+1)+"/"+d.getDate();}

var SK={prof:"v14p"};
async function ld(k){try{var r=await window.storage.get(k);return r?JSON.parse(r.value):null}catch(e){return null}}
async function sv(k,d){try{await window.storage.set(k,JSON.stringify(d))}catch(e){}}
var _v=[];function loadV(){if("speechSynthesis"in window)_v=window.speechSynthesis.getVoices();}
function speak(t,cb){if(!("speechSynthesis"in window)){cb?.();return;}var s=window.speechSynthesis;s.cancel();if(!_v.length)loadV();var u=new SpeechSynthesisUtterance(t);u.lang="ko-KR";u.rate=0.9;var ko=_v.filter(function(v){return v.lang&&v.lang.startsWith("ko")});if(ko.length)u.voice=ko[0];var ka=setInterval(function(){s.pause();s.resume()},10000);u.onend=function(){clearInterval(ka);cb?.()};u.onerror=function(){clearInterval(ka);cb?.()};s.speak(u);}
function stopT(){if("speechSynthesis"in window)window.speechSynthesis.cancel();}

// ═══ App ═══
export default function App(){
  var _s=useState("loading"),scr=_s[0],setScr=_s[1];var _p=useState(null),prof=_p[0],setProf=_p[1];var _t=useState("home"),tab=_t[0],setTab=_t[1];
  useEffect(function(){if(!document.getElementById("cv14")){var lk=document.createElement("link");lk.rel="stylesheet";lk.href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&family=Noto+Sans+KR:wght@400;500;600;700;800&display=swap";document.head.appendChild(lk);var s=document.createElement("style");s.id="cv14";s.textContent="*{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent}html,body,#root{height:100%;margin:0;overflow:hidden}::-webkit-scrollbar{width:0}input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{-webkit-appearance:none}input[type=number]{-moz-appearance:textfield}@keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}@keyframes wave{0%{height:4px}100%{height:20px}}button:active{transform:scale(.97)!important;transition:transform .1s}.fu{animation:fadeUp .5s ease both}";document.head.appendChild(s);}if("speechSynthesis"in window){loadV();window.speechSynthesis.onvoiceschanged=loadV;}},[]);
  useEffect(function(){var a=true;(async function(){var p=await ld(SK.prof);if(!a)return;if(p){setProf(p);setScr("app")}else setScr("onboarding")})();return function(){a=false}},[]);
  var onB=async function(p){await sv(SK.prof,p);setProf(p);setScr("app")};

  if(scr==="loading")return(<div style={{height:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:C.gAurora,fontFamily:ff}}><div style={{width:80,height:80,borderRadius:24,background:C.gHero,display:"flex",alignItems:"center",justifyContent:"center",animation:"float 3s ease-in-out infinite",boxShadow:"0 20px 60px rgba(124,92,252,.2)"}}><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><path d="M12 19v3"/></svg></div><p style={{marginTop:20,fontSize:17,fontWeight:700,color:C.tx,letterSpacing:"-.3px"}}>나를아는, 나만아는 코치</p></div>);
  if(scr==="onboarding")return <OB onDone={onB}/>;

  var tabs=[{id:"home",ic:"🏠",lb:"홈"},{id:"subsidy",ic:"🏛️",lb:"지원금"},{id:"save",ic:"💡",lb:"절약·정보"},{id:"premium",ic:"👑",lb:"프리미엄"}];
  return(<div style={{display:"flex",flexDirection:"column",height:"100vh",width:"100%",background:C.gAurora,overflow:"hidden",fontFamily:ff,color:C.tx}}>
    <div style={{flex:1,overflowY:"auto",overflowX:"hidden"}}>{tab==="home"&&<HT p={prof}/>}{tab==="subsidy"&&<SubT p={prof}/>}{tab==="save"&&<SaveT/>}{tab==="premium"&&<PremT/>}</div>
    <nav style={{display:"flex",background:"rgba(255,255,255,.85)",backdropFilter:"blur(20px)",borderTop:"1px solid rgba(0,0,0,.06)",padding:"6px 0 10px",flexShrink:0}}>
      {tabs.map(function(t){var act=tab===t.id;return(<button key={t.id} onClick={function(){setTab(t.id)}} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:2,background:"none",border:"none",padding:"6px 0",cursor:"pointer",fontFamily:ff}}>
        <span style={{fontSize:22,transition:"all .2s",transform:act?"scale(1.15)":"scale(1)",filter:act?"none":"grayscale(.8) opacity(.4)"}}>{t.ic}</span>
        <span style={{fontSize:10,fontWeight:act?700:500,color:act?C.p1:C.txD,transition:"all .2s"}}>{t.lb}</span>
      </button>)})}
    </nav>
  </div>);
}

// ═══ Onboarding ═══
function OB({onDone}){
  var s=useState(0),st=s[0],setSt=s[1];var a=useState(""),ag=a[0],sAg=a[1];var g=useState(""),gn=g[0],sGn=g[1];var j=useState(""),jc=j[0],sJc=j[1];var d=useState(""),jd=d[0],sJd=d[1];var e=useState(""),er=e[0],sEr=e[1];
  var fin=function(){if(!ag||+ag<10||+ag>99){sEr("나이를 확인해주세요");return}if(!gn){sEr("성별을 선택해주세요");return}if(!jc){sEr("직업을 선택해주세요");return}if(!jd.trim()){sEr("역할을 입력해주세요");return}onDone({age:+ag,gender:gn,jobCat:JC.find(function(x){return x.id===jc})?.l||jc,job:jd.trim()})};
  var bg={minHeight:"100vh",background:C.gAurora,padding:"24px",fontFamily:ff,color:C.tx,overflowY:"auto"};
  var inp={width:"100%",maxWidth:360,padding:"14px 18px",borderRadius:16,...G({background:"#fff",boxShadow:"0 2px 8px rgba(0,0,0,.04)"}),color:C.tx,fontSize:15,outline:"none",boxSizing:"border-box",fontFamily:ff,border:"1.5px solid "+C.glassBd};
  var pri={width:"100%",maxWidth:360,padding:"16px",borderRadius:20,border:"none",background:C.gHero,color:"#fff",fontSize:16,fontWeight:700,cursor:"pointer",fontFamily:ff,display:"flex",alignItems:"center",justifyContent:"center",minHeight:56,boxShadow:"0 12px 40px rgba(124,92,252,.25)",letterSpacing:"-.2px"};

  if(st===0)return(<div style={bg}><div className="fu" style={{display:"flex",flexDirection:"column",alignItems:"center",paddingTop:60}}>
    <div style={{width:100,height:100,borderRadius:32,background:C.gHero,display:"flex",alignItems:"center",justifyContent:"center",animation:"float 3s ease-in-out infinite",boxShadow:"0 20px 60px rgba(124,92,252,.2)"}}><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><path d="M12 19v3"/></svg></div>
    <h1 style={{fontSize:26,fontWeight:800,marginTop:28,letterSpacing:"-.5px"}}>나를아는, 나만아는 코치</h1>
    <p style={{fontSize:15,color:C.p1,fontWeight:600,marginTop:8}}>안 열면 매일 손해보는 앱</p>
    <p style={{fontSize:14,color:C.txS,textAlign:"center",lineHeight:1.8,marginTop:16,maxWidth:280}}>정부지원금 · 숨은 절약법 · 해외 인사이트<br/>AI가 매일 당신만을 위해 찾아드려요</p>
    <button style={{...pri,marginTop:40}} onClick={function(){setSt(1)}}>시작하기 →</button>
  </div></div>);

  return(<div style={bg}><h2 style={{fontSize:24,fontWeight:800,letterSpacing:"-.5px"}}>프로필 설정</h2><p style={{fontSize:13,color:C.txS,marginTop:6,marginBottom:16}}>맞춤 정보를 위해 딱 한 번만!</p>
    {er&&<div className="fu" style={{padding:"12px 16px",borderRadius:14,background:"#FFF1F0",color:"#E53935",fontSize:13,marginBottom:12,border:"1px solid #FFCDD2"}}>{er}</div>}
    <label style={{fontSize:13,fontWeight:600,color:C.txS,display:"block",marginBottom:6}}>나이</label><input type="number" value={ag} placeholder="25" onChange={function(ev){sAg(ev.target.value);sEr("")}} style={inp}/>
    <label style={{fontSize:13,fontWeight:600,color:C.txS,display:"block",marginBottom:6,marginTop:16}}>성별</label>
    <div style={{display:"flex",gap:10,maxWidth:360}}>{["남성","여성","기타"].map(function(gg){return <button key={gg} onClick={function(){sGn(gg);sEr("")}} style={{flex:1,padding:"13px",borderRadius:16,border:gn===gg?"2px solid "+C.p1:"1.5px solid "+C.glassBd,background:gn===gg?"rgba(124,92,252,.08)":"#fff",color:gn===gg?C.p1:C.txS,fontSize:15,fontWeight:gn===gg?700:500,cursor:"pointer",fontFamily:ff}}>{gg}</button>})}</div>
    <label style={{fontSize:13,fontWeight:600,color:C.txS,display:"block",marginBottom:6,marginTop:16}}>직업</label>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,maxWidth:360}}>{JC.map(function(c){return <button key={c.id} onClick={function(){sJc(c.id);sEr("")}} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4,padding:"12px 4px",borderRadius:16,border:jc===c.id?"2px solid "+C.p1:"1.5px solid "+C.glassBd,background:jc===c.id?"rgba(124,92,252,.08)":"#fff",color:jc===c.id?C.p1:C.txS,fontSize:10,fontWeight:jc===c.id?700:500,cursor:"pointer",fontFamily:ff}}><span style={{fontSize:20}}>{c.e}</span>{c.l}</button>})}</div>
    {jc&&(<><label style={{fontSize:13,fontWeight:600,color:C.txS,display:"block",marginBottom:6,marginTop:16}}>구체적 역할</label><input type="text" value={jd} style={inp} placeholder={JH[jc]||""} onChange={function(ev){sJd(ev.target.value);sEr("")}}/></>)}
    <button style={{...pri,marginTop:28}} onClick={fin}>코칭 시작하기 ✨</button>
    <button onClick={function(){setSt(0)}} style={{display:"block",margin:"14px auto",background:"none",border:"none",color:C.txD,fontSize:14,cursor:"pointer",fontFamily:ff}}>← 이전</button>
  </div>);
}

// ═══ Home ═══
function HT({p}){
  var _pl=useState(null),pl=_pl[0],sPl=_pl[1];
  var _open=useState(null),openSec=_open[0],setOpen=_open[1];
  var _expItem=useState(null),expItem=_expItem[0],setExpItem=_expItem[1];
  var all=matchS(p);var urgents=all.filter(function(s){return s.dday!=null&&s.dday<=7}).sort(function(a,b){return a.dday-b.dday});
  var d=new Date(),w=["일","월","화","수","목","금","토"];var ds=(d.getMonth()+1)+"월 "+d.getDate()+"일 "+w[d.getDay()]+"요일";
  var h=d.getHours();var gr=h<12?"좋은 아침이에요 ☀️":h<18?"좋은 오후에요 🌤":"편안한 저녁이에요 🌙";
  var sum=Math.floor((p?.age||30)/10)*10+"대 "+(p?.job||"")+"님, 오늘 신청 가능한 지원금 "+all.length+"건이 있어요.";

  var cards=[
    {id:"all",emoji:"🏛️",n:all.length,l:"신청 가능",color:C.p1,bg:"linear-gradient(135deg,#EDE9FE,#F5F3FF)",items:all},
    {id:"urgent",emoji:"🔥",n:urgents.length,l:"마감 임박",color:C.coral,bg:"linear-gradient(135deg,#FFF1F0,#FFE0DE)",items:urgents},
  ];

  var renderList=function(items,color){
    if(items.length===0) return <div style={{padding:20,textAlign:"center"}}><p style={{fontSize:13,color:C.txD}}>해당 항목이 없어요</p></div>;
    return items.map(function(it,i){
      var isExp=expItem===it.id;
      var bc=it.dday!=null&&it.dday<=7?(it.dday<=1?"#EF4444":it.dday<=3?"#F97316":C.amberD):null;
      return <div key={it.id} style={{margin:"6px 0",borderRadius:18,background:"#fff",border:"1.5px solid "+(isExp?color+"40":C.glassBd),overflow:"hidden"}} onClick={function(e){e.stopPropagation();setExpItem(isExp?null:it.id)}}>
        <div style={{padding:"14px 16px",display:"flex",alignItems:"center",gap:12,cursor:"pointer"}}>
          <span style={{fontSize:22}}>{it.emoji}</span>
          <div style={{flex:1,minWidth:0}}>
            <div style={{display:"flex",alignItems:"center",gap:6}}>
              <span style={{fontSize:10,fontWeight:600,color:C.p1}}>{it.cat}</span>
              {bc&&<span style={{padding:"1px 6px",borderRadius:5,background:bc+"15",color:bc,fontSize:9,fontWeight:700}}>D-{it.dday}</span>}
            </div>
            <h4 style={{fontSize:14,fontWeight:700,marginTop:3}}>{it.title}</h4>
            <p style={{fontSize:11,color:C.txS,marginTop:1}}>{it.amount}</p>
          </div>
          <span style={{color:C.txD,fontSize:14}}>{isExp?"▲":"›"}</span>
        </div>
        {isExp&&(<div style={{padding:"0 16px 14px",borderTop:"1px solid "+C.glassBd}}>
          <p style={{fontSize:13,color:C.txS,lineHeight:1.7,marginTop:12}}>{it.desc}</p>
          {it.dday!=null&&<p style={{fontSize:11,color:bc||C.txD,fontWeight:600,marginTop:8}}>📅 마감: {futD(it.dday)}</p>}
          {it.link&&it.link.url&&(<a href={it.link.url} target="_blank" rel="noopener noreferrer" onClick={function(e){e.stopPropagation()}} style={{display:"flex",alignItems:"center",justifyContent:"center",gap:6,padding:"10px",borderRadius:12,background:C.p1+"10",border:"1px solid "+C.p1+"20",textDecoration:"none",marginTop:10}}><span style={{fontSize:12,color:C.p1,fontWeight:700}}>{it.link.label} →</span></a>)}
        </div>)}
      </div>;
    });
  };

  return (<div style={{padding:"16px 20px 24px"}}>
    {/* 헤더 */}
    <div className="fu" style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
      <div><p style={{fontSize:13,color:C.txD,fontWeight:500}}>{ds}</p><h1 style={{fontSize:24,fontWeight:800,marginTop:4,letterSpacing:"-.5px",lineHeight:1.3}}>{gr}</h1></div>
      <div style={{width:44,height:44,borderRadius:16,background:"#fff",border:"1.5px solid "+C.glassBd,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,boxShadow:"0 2px 8px rgba(0,0,0,.04)",cursor:"pointer"}}>⚙️</div>
    </div>

    {/* 히어로 음성 카드 */}
    <div className="fu" style={{animationDelay:".08s",margin:"20px 0",padding:"24px",borderRadius:28,background:C.gHero,cursor:"pointer",position:"relative",overflow:"hidden",boxShadow:"0 16px 48px rgba(124,92,252,.2)"}} onClick={function(){if(pl==="s"){stopT();sPl(null)}else{stopT();sPl("s");speak(sum,function(){sPl(null)})}}}>
      <div style={{position:"absolute",top:-40,right:-40,width:160,height:160,borderRadius:"50%",background:"rgba(255,255,255,.1)"}}/>
      <div style={{position:"absolute",bottom:-20,left:-20,width:100,height:100,borderRadius:"50%",background:"rgba(255,255,255,.06)"}}/>
      <div style={{display:"flex",alignItems:"center",gap:16,position:"relative"}}>
        <div style={{width:56,height:56,borderRadius:20,background:"rgba(255,255,255,.2)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
          {pl==="s"?<div style={{display:"flex",alignItems:"flex-end",gap:3,height:24}}>{[0,1,2,3,4].map(function(i){return <div key={i} style={{width:4,borderRadius:2,background:"#fff",animation:"wave .5s ease-in-out infinite alternate",animationDelay:i*.08+"s"}}/>})}</div>
          :<svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>}
        </div>
        <div style={{flex:1}}>
          <p style={{fontSize:18,fontWeight:800,color:"#fff",letterSpacing:"-.3px"}}>오늘의 AI 코치 요약</p>
          <p style={{fontSize:13,color:"rgba(255,255,255,.8)",marginTop:4}}>탭하면 음성으로 들려드려요 🎧</p>
        </div>
      </div>
    </div>

    {/* 마감 임박 가로 스크롤 */}
    {urgents.length>0&&(<div className="fu" style={{animationDelay:".14s",marginBottom:20}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
        <div style={{padding:"6px 14px",borderRadius:12,background:"linear-gradient(135deg,#FFF1F0,#FFE0DE)",display:"flex",alignItems:"center",gap:6}}><span style={{fontSize:14}}>🔥</span><span style={{fontSize:14,fontWeight:800,color:C.coral}}>마감 임박</span></div>
        <span style={{fontSize:12,color:C.txD}}>D-7 이내</span>
      </div>
      <div style={{display:"flex",gap:12,overflowX:"auto",paddingBottom:6}}>
        {urgents.map(function(it,i){var bc=it.dday<=1?"#EF4444":it.dday<=3?"#F97316":C.amberD;return (
          <div key={"u"+i} className="fu" style={{animationDelay:(.16+i*.06)+"s",flexShrink:0,width:240,borderRadius:24,background:"#fff",border:"1.5px solid "+(it.dday<=1?"#FECACA":it.dday<=3?"#FED7AA":"#FEF3C7"),overflow:"hidden",boxShadow:"0 2px 12px rgba(0,0,0,.04)"}}>
            <div style={{padding:"16px 18px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                <span style={{fontSize:28}}>{it.emoji}</span>
                <span style={{padding:"4px 10px",borderRadius:10,background:bc+"18",color:bc,fontSize:12,fontWeight:800}}>{it.dday===0?"오늘!":"D-"+it.dday}</span>
              </div>
              <p style={{fontSize:11,color:C.p1,fontWeight:600}}>{it.cat}</p>
              <h3 style={{fontSize:15,fontWeight:700,marginTop:3,lineHeight:1.35,letterSpacing:"-.2px"}}>{it.title}</h3>
              <p style={{fontSize:13,color:C.txS,marginTop:4}}>{it.amount}</p>
              <div style={{marginTop:10,fontSize:11,color:bc,fontWeight:600}}>📅 {futD(it.dday)} 마감</div>
            </div>
          </div>
        )})}
      </div>
    </div>)}

    {/* 요약 카드 2x1 (클릭→리스트) */}
    <div className="fu" style={{animationDelay:".22s"}}>
      <h2 style={{fontSize:17,fontWeight:800,marginBottom:14,letterSpacing:"-.3px"}}>한눈에 보기</h2>
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        {cards.map(function(cd){
          var isOpen=openSec===cd.id;
          return <div key={cd.id}>
            <div onClick={function(){setOpen(isOpen?null:cd.id);setExpItem(null)}} style={{borderRadius:isOpen?"24px 24px 0 0":24,background:cd.bg,padding:"20px",cursor:"pointer",position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",top:-20,right:-10,width:80,height:80,borderRadius:"50%",background:cd.color+"10"}}/>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",position:"relative"}}>
                <div>
                  <p style={{fontSize:13,color:cd.color,fontWeight:600}}>{cd.emoji} {cd.l}</p>
                  <p style={{fontSize:32,fontWeight:900,color:cd.color,marginTop:4}}>{cd.n}<span style={{fontSize:14,fontWeight:600}}>건</span></p>
                </div>
                {cd.n>0&&<span style={{fontSize:18,color:cd.color,transition:"transform .3s",transform:isOpen?"rotate(180deg)":"none"}}>▼</span>}
              </div>
            </div>
            {isOpen&&cd.n>0&&(<div style={{background:"#fff",borderRadius:"0 0 24px 24px",border:"1.5px solid "+cd.color+"20",borderTop:"none",padding:"6px 10px 10px",maxHeight:400,overflowY:"auto"}}>
              {renderList(cd.items,cd.color)}
            </div>)}
          </div>;
        })}
      </div>
    </div>

    {/* 오늘의 꿀팁 미리보기 */}
    <div className="fu" style={{animationDelay:".28s",marginTop:20}}>
      <h2 style={{fontSize:17,fontWeight:800,marginBottom:14,letterSpacing:"-.3px"}}>오늘의 꿀팁 💡</h2>
      {[{emoji:"🏥",title:"실손보험 숨은 청구 항목",sub:"연 20~50만원 돌려받기",color:"#FF6B6B"},{emoji:"⚖️",title:"야근 수당 3년치 소급 청구",sub:"모르면 100% 손해",color:"#5B9CF6"}].map(function(tip,i){return (
        <div key={i} className="fu" style={{animationDelay:(.3+i*.06)+"s",marginBottom:10,padding:"16px 18px",borderRadius:20,background:"#fff",border:"1.5px solid "+C.glassBd,display:"flex",alignItems:"center",gap:14,boxShadow:"0 1px 4px rgba(0,0,0,.03)"}}>
          <div style={{width:44,height:44,borderRadius:14,background:tip.color+"12",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{tip.emoji}</div>
          <div style={{flex:1}}><h3 style={{fontSize:14,fontWeight:700}}>{tip.title}</h3><p style={{fontSize:12,color:C.txS,marginTop:2}}>{tip.sub}</p></div>
          <span style={{color:C.txD,fontSize:16}}>›</span>
        </div>
      )})}
    </div>
    <div style={{height:16}}/>
  </div>);
}

// ═══ 지원금 탭 ═══
function SubT({p}){
  var _c=useState("전체"),cat=_c[0],sCat=_c[1];var _e=useState(null),exp=_e[0],sExp=_e[1];var _ch=useState({}),chk=_ch[0],sChk=_ch[1];var _st=useState(null),stps=_st[0],sStps=_st[1];
  var all=matchS(p);var cats=["전체","청년","자영업","가족","생활안정"];var fil=cat==="전체"?all:all.filter(function(s){return s.cat===cat});
  return(<div style={{padding:"16px 20px 24px"}}><h1 className="fu" style={{fontSize:24,fontWeight:800,letterSpacing:"-.5px"}}>🏛️ 지원금 도우미</h1><p className="fu" style={{fontSize:13,color:C.txS,marginTop:4}}>프로필 기반 {all.length}건 매칭</p>
    <div style={{display:"flex",gap:8,marginTop:16,marginBottom:16,overflowX:"auto"}}>{cats.map(function(c){var act=cat===c;var cnt=c==="전체"?all.length:all.filter(function(s){return s.cat===c}).length;return <button key={c} onClick={function(){sCat(c);sExp(null);sStps(null)}} style={{flexShrink:0,padding:"8px 18px",borderRadius:14,border:act?"2px solid "+C.p1:"1.5px solid "+C.glassBd,background:act?"rgba(124,92,252,.08)":"#fff",color:act?C.p1:C.txS,fontSize:13,fontWeight:act?700:500,cursor:"pointer",fontFamily:ff}}>{c} {cnt}</button>})}</div>
    {fil.map(function(it,i){var isE=exp===it.id;var bc=it.dday!=null&&it.dday<=7?(it.dday<=1?"#EF4444":it.dday<=3?"#F97316":C.amberD):null;
      return(<div key={it.id} className="fu" style={{animationDelay:i*.04+"s",marginBottom:12,borderRadius:24,background:"#fff",border:"1.5px solid "+(isE?C.p1+"40":bc?bc+"30":C.glassBd),overflow:"hidden",boxShadow:"0 2px 8px rgba(0,0,0,.03)"}}>
        <div style={{padding:"18px 20px",cursor:"pointer"}} onClick={function(){sExp(isE?null:it.id);sStps(null)}}>
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            <div style={{width:50,height:50,borderRadius:16,background:C.p1+"10",display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,flexShrink:0}}>{it.emoji}</div>
            <div style={{flex:1}}><div style={{display:"flex",alignItems:"center",gap:6}}><span style={{fontSize:11,fontWeight:600,color:C.p1}}>{it.cat}</span>{bc&&<span style={{padding:"2px 8px",borderRadius:6,background:bc+"15",color:bc,fontSize:10,fontWeight:700}}>D-{it.dday}</span>}</div><h3 style={{fontSize:15,fontWeight:700,marginTop:4,letterSpacing:"-.2px"}}>{it.title}</h3><p style={{fontSize:12,color:C.txS,marginTop:2}}>{it.amount}</p></div>
            <span style={{color:C.txD,fontSize:16}}>{isE?"▲":"›"}</span>
          </div>
        </div>
        {isE&&(<div style={{padding:"0 20px 20px",borderTop:"1px solid "+C.glassBd}}>
          <p style={{fontSize:14,color:C.txS,lineHeight:1.8,marginTop:14,marginBottom:14}}>{it.desc}</p>
          <div style={{borderRadius:20,background:"#F8F7FF",padding:"16px",marginBottom:14}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span>📋</span><h4 style={{fontSize:14,fontWeight:700}}>서류 체크리스트</h4></div>
            {it.docs.map(function(doc,di){var ck=!!chk[it.id+"_"+di];return(<div key={di} onClick={function(){var k=it.id+"_"+di;var n=Object.assign({},chk);n[k]=!n[k];sChk(n)}} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",cursor:"pointer",borderBottom:di<it.docs.length-1?"1px solid rgba(0,0,0,.04)":"none"}}><div style={{width:22,height:22,borderRadius:8,border:"2px solid "+(ck?C.mint:C.glassBd),background:ck?C.mint+"15":"#fff",display:"flex",alignItems:"center",justifyContent:"center"}}>{ck&&<span style={{color:C.mint,fontSize:13,fontWeight:900}}>✓</span>}</div><span style={{fontSize:13,color:ck?C.tx:C.txS,textDecoration:ck?"line-through":"none"}}>{doc}</span></div>)})}
          </div>
          <button onClick={function(){sStps(stps===it.id?null:it.id)}} style={{width:"100%",padding:"12px",borderRadius:16,background:stps===it.id?"#F0FFFE":"#fff",color:C.mint,fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:ff,border:"1.5px solid "+(stps===it.id?C.mint+"40":C.glassBd),marginBottom:14,textAlign:"left",display:"flex",alignItems:"center",gap:8}}>🗺️ 단계별 로드맵 {stps===it.id?"▲":"▼"}</button>
          {stps===it.id&&(<div style={{borderRadius:20,background:"#F0FFFE",padding:"16px",marginBottom:14}}>{it.steps.map(function(step,si){return(<div key={si} style={{display:"flex",gap:12,paddingBottom:si<it.steps.length-1?12:0,borderBottom:si<it.steps.length-1?"1px solid rgba(0,0,0,.04)":"none",marginBottom:si<it.steps.length-1?12:0}}><div style={{width:28,height:28,borderRadius:10,background:C.mint+"20",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><span style={{fontSize:12,fontWeight:800,color:C.mintD}}>{si+1}</span></div><p style={{fontSize:13,color:C.txS,lineHeight:1.6}}>{step}</p></div>)})}</div>)}
          {it.tips&&(<div style={{borderRadius:20,background:"#FFFBEB",padding:"16px",marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}><span>💡</span><span style={{fontSize:14,fontWeight:700,color:C.amberD}}>꿀팁</span></div>{it.tips.map(function(tip,ti){return <p key={ti} style={{fontSize:13,color:C.txS,lineHeight:1.6}}>• {tip}</p>})}</div>)}
          {it.link?.url&&(<a href={it.link.url} target="_blank" rel="noopener noreferrer" style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,padding:"14px",borderRadius:18,background:C.gHero,textDecoration:"none",boxShadow:"0 8px 24px rgba(124,92,252,.2)"}}><span style={{fontSize:15,color:"#fff",fontWeight:800}}>🔗 {it.link.label}</span></a>)}
        </div>)}
      </div>)})}<div style={{height:16}}/>
  </div>);
}

// ═══ 절약·정보 탭 ═══
var SVDB=[
  {id:"medical",emoji:"🏥",label:"의료비 절약",color:"#FF6B6B",bg:"#FFF1F0",items:[{title:"같은 수술, 병원마다 가격 3배",content:"비급여 항목은 병원마다 가격이 달라요. 심평원에서 비교 가능. 같은 MRI가 15만원 vs 45만원.",tip:"시술 전 2~3곳 비교"},{title:"실손보험 숨은 청구 항목",content:"스케일링, 침 치료, 물리치료 등 실손 청구 가능. 영수증 모아서 보험사 앱에 올리면 연 20~50만원.",tip:"병원 갈 때마다 영수증 사진"},{title:"제네릭 의약품으로 반값",content:"의사에게 제네릭 처방 요청. 동일 성분 30~60% 저렴. 장기 복용약은 차이 큼.",tip:"만성질환 약은 제네릭으로"},{title:"무료인데 안 받는 검사들",content:"자궁경부암(20세+), 유방촬영(40세+), 대장암(50세+) 전부 무료. 안 받으면 5~30만원.",tip:"건보공단 앱에서 확인"}]},
  {id:"labor",emoji:"⚖️",label:"직장인 노동법",color:"#5B9CF6",bg:"#EFF6FF",items:[{title:"야근 수당 3년치 소급 청구",content:"연장근로 통상임금 50% 가산 의무. 포괄임금제라도 초과 시 청구 가능.",tip:"출퇴근 기록 6개월치 모으기"},{title:"연차 촉진 안 하면 수당 지급",content:"회사가 서면 통보 2회 안 밟으면 미사용 연차 수당 지급 의무.",tip:"촉진 통보서 받았는지 확인"},{title:"퇴직금 중간정산 6가지 사유",content:"무주택 주택구입, 전세금, 6개월 요양, 파산, 임금피크제, 천재지변.",tip:"무주택 전세면 바로 신청 가능"},{title:"직장 괴롭힘 신고 시 회사 의무",content:"즉시 조사+가해자 분리 의무. 신고자 불이익 시 3년 이하 징역.",tip:"증거(메시지,녹음) 미리 확보"}]},
  {id:"finance",emoji:"💳",label:"금융 최적화",color:"#F59E0B",bg:"#FFFBEB",items:[{title:"카드 조합 최적화",content:"카드고릴라에서 소비 분석 후 카드 1~2장 바꾸면 연 30~50만원 차이.",tip:"카드 3장이면 충분"},{title:"대출 갈아타기",content:"0.5% 낮은 상품 갈아타면 1억 기준 연 50만원 절약.",tip:"중도상환수수료 먼저 확인"},{title:"보험 리모델링 월 3만원",content:"보험다모아에서 비교. 30대 전 가입 보험은 리모델링 효과 큼.",tip:"해지보다 감액이 유리할 수 있음"},{title:"연말정산 월별 준비",content:"7~9월 체크카드 비중 늘리기(공제율 2배). 10~12월 IRP 납입.",tip:"분기마다 홈택스 확인"}]},
  {id:"sub",emoji:"📱",label:"구독·요금제",color:"#14B8A6",bg:"#F0FFFE",items:[{title:"알뜰폰으로 월 3만원 절약",content:"같은 망 알뜰폰 월 1.5~3만원. 번호이동 10분. 연 36만원 절약.",tip:"약정 끝났으면 바로 전환"},{title:"관리비 줄이는 항목",content:"인터넷TV 번들 비교, 경차 주차비 할인, 절수기 설치.",tip:"관리비 고지서 항목 체크"},{title:"자동차 보험 비교견적",content:"갱신 1개월 전 보험다모아에서 견적. 연 20~40만원 차이.",tip:"마일리지 특약, 블랙박스 할인 챙기기"}]},
  {id:"edu",emoji:"🎓",label:"무료 교육",color:"#818CF8",bg:"#F5F3FF",items:[{title:"K-MOOC 무료 명문대 강좌",content:"서울대 KAIST 강좌 무료. 수료증 발급. 학점 인정도 가능.",tip:"매주 2시간, 3개월 1개 수료"},{title:"연봉 올리는 자격증",content:"사무직 SQLD, IT AWS, 금융 CFA. HRD-Net 교육비 전액 지원.",tip:"포트폴리오가 더 중요한 직군도 있음"},{title:"해외 무료 강좌",content:"Coursera(구글 수료증), edX(하버드). 수료증만 3~5만원.",tip:"영어자막+번역기로 충분"}]},
  {id:"house",emoji:"🏠",label:"부동산 꿀팁",color:"#8B7CF6",bg:"#F5F3FF",items:[{title:"전세 vs 월세 계산법",content:"보증금 차이 × 전환율(4~5%) ÷ 12 = 월세. 금리 높으면 월세, 낮으면 전세 유리.",tip:"전세대출 금리와 전환율 비교"},{title:"이사 숨은 비용 7가지",content:"중개수수료, 이사비, 도배, 에어컨, 인터넷, 전입신고, 확정일자. 미리 안 하면 100~300만원.",tip:"이사 견적 최소 3곳 비교"}]},
];

function SaveT(){
  var _c=useState(0),ci=_c[0],sCi=_c[1];var _e=useState(null),exp=_e[0],sExp=_e[1];var _pl=useState(null),pl=_pl[0],sPl=_pl[1];
  var cat=SVDB[ci];
  return(<div style={{padding:"16px 20px 24px"}}><h1 className="fu" style={{fontSize:24,fontWeight:800,letterSpacing:"-.5px"}}>💡 절약·정보</h1><p className="fu" style={{fontSize:13,color:C.txS,marginTop:4,marginBottom:16}}>검색해도 안 나오는 돈 되는 정보</p>
    <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:12}}>{SVDB.map(function(c,i){var act=ci===i;return <button key={c.id} onClick={function(){sCi(i);sExp(null)}} style={{flexShrink:0,display:"flex",alignItems:"center",gap:6,padding:"10px 16px",borderRadius:16,border:act?"2px solid "+c.color:"1.5px solid "+C.glassBd,background:act?c.bg:"#fff",color:act?c.color:C.txS,fontSize:13,fontWeight:act?700:500,cursor:"pointer",fontFamily:ff}}><span style={{fontSize:16}}>{c.emoji}</span>{c.label}</button>})}</div>
    {cat.items.map(function(it,i){var isE=exp===cat.id+i;var isP=pl===cat.id+i;return(<div key={cat.id+i} className="fu" style={{animationDelay:i*.05+"s",marginBottom:12,borderRadius:22,background:"#fff",border:"1.5px solid "+(isE?cat.color+"40":C.glassBd),overflow:"hidden",boxShadow:"0 2px 8px rgba(0,0,0,.03)"}}>
      <div style={{padding:"16px 18px",cursor:"pointer",display:"flex",alignItems:"center",gap:14}} onClick={function(){sExp(isE?null:cat.id+i)}}>
        <div style={{width:44,height:44,borderRadius:14,background:cat.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{cat.emoji}</div>
        <h3 style={{flex:1,fontSize:15,fontWeight:700,letterSpacing:"-.2px"}}>{it.title}</h3>
        <span style={{fontSize:16,color:isE?cat.color:C.txD,transition:"transform .3s",transform:isE?"rotate(180deg)":"none"}}>▾</span>
      </div>
      {isE&&(<div style={{padding:"0 18px 18px",borderTop:"1px solid "+C.glassBd}}>
        <p style={{fontSize:14,color:C.txS,lineHeight:1.8,marginTop:14}}>{it.content}</p>
        {it.tip&&<div style={{marginTop:12,padding:"12px 14px",borderRadius:14,background:cat.bg}}><span style={{fontSize:13,color:cat.color,fontWeight:600}}>💡 {it.tip}</span></div>}
        {isP&&<div style={{display:"flex",alignItems:"flex-end",gap:3,height:18,overflow:"hidden",marginTop:12}}>{Array.from({length:24}).map(function(_,j){return <div key={j} style={{width:3,borderRadius:2,background:cat.color,animation:"wave .6s ease-in-out infinite alternate",animationDelay:j*.04+"s",flexShrink:0}}/>})}</div>}
        <button onClick={function(e){e.stopPropagation();if(isP){stopT();sPl(null)}else{stopT();sPl(cat.id+i);speak(it.content+(it.tip?" 꿀팁. "+it.tip:""),function(){sPl(null)})}}} style={{marginTop:12,width:"100%",height:44,borderRadius:14,border:"none",background:isP?C.gHero:"#F5F3FF",color:isP?"#fff":C.p1,fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:ff}}>{isP?"⏸ 정지":"▶️ 음성으로 듣기"}</button>
      </div>)}
    </div>)})}<div style={{height:16}}/>
  </div>);
}

// ═══ 프리미엄 탭 ═══
function PremT(){
  var _c=useState(null),ac=_c[0],sAc=_c[1];var _e=useState(null),exp=_e[0],sExp=_e[1];var _pl=useState(null),pl=_pl[0],sPl=_pl[1];
  var PM=[
    {id:"celeb",emoji:"⭐",label:"셀럽 루틴",color:"#E879F9",bg:"#FDF4FF",items:[
      {t:"일론 머스크의 5시간 수면",tg:"수면 과학",sum:"90분 사이클로 최소 수면, 최대 성과",detail:"폴리페이직 수면. 90분 사이클 끝에서 깨면 4.5시간도 개운. 블루라이트 차단 + 방 온도 18도 + 매일 같은 시각 기상. 스탠포드 연구 기준 수면 질 30% 개선.",kp:["잠들기 1시간 전 기기 끄기","방 온도 18도 유지","기상 후 30분 내 강한 빛"],act:"오늘부터: 핸드폰을 침실 밖에 두고, 내일 아침 창문 열고 햇빛 3분."},
      {t:"르브론 제임스 회복 프로토콜",tg:"운동 과학",sum:"연 150만 달러 관리법 중 일반인 적용 3가지",detail:"운동 후 10분내 단백질 30g, 매일 냉수요법(찬물 샤워 대체), 수면 9시간. 단백질 타이밍만으로 회복 2배.",kp:["운동 직후 단백질 30g","찬물 샤워 2분","수면 8시간 이상"],act:"운동 가방에 프로틴 바 넣기. 샤워 마지막 30초 찬물."},
      {t:"팀 쿡의 새벽 딥워크",tg:"생산성",sum:"남들 자는 시간에 최고의 결정",detail:"새벽 3:45 기상 → 이메일 정리 → 5시 운동 → 7시 전략 결정. 핵심은 방해 없는 90분 블록.",kp:["방해 없는 90분 블록 만들기","이메일은 나중에","오전에 가장 어려운 일"],act:"출근 전 1시간 확보. 가장 중요한 업무 1개만 처리."}]},
    {id:"wealth",emoji:"💎",label:"자산관리",color:"#F59E0B",bg:"#FFFBEB",items:[
      {t:"레이 달리오 올웨더 한국판",tg:"투자 전략",sum:"전천후 전략을 ISA에 적용",detail:"주식30% 장기국채40% 중기국채15% 금7.5% 원자재7.5%. ISA 계좌 비과세 혜택. 20년 연평균 7.5%.",kp:["ISA 계좌 필수","분기 1회 리밸런싱","월 50만원 분배 매수"],act:"이번 주: 증권사 앱에서 ISA 개설(3분)."},
      {t:"비트코인 반감기 전략",tg:"크립토",sum:"과거 3회 데이터 + 한국 세법",detail:"반감기 후 12~18개월 평균 300%+ 상승. 기관 비중 40%로 변동성 축소. 250만원 초과 22% 과세.",kp:["전체 투자금 5~10%만","DCA 정기 분할매수","세금 전략 병행"],act:"전체 투자금 5%를 비트코인에 DCA 매수 시작."},
      {t:"미국 배당주 월 50만원",tg:"패시브 인컴",sum:"SCHD, JEPI 현실적 배당 포트폴리오",detail:"SCHD 연 3.5%. 월50만원에 1.7억 필요. JEPI 7~9%면 8천만원. 매월 100만원 10년이면 가능.",kp:["SCHD 70% + JEPI 30%","배당금 자동 재투자","해외 배당소득세 15%"],act:"해외주식 계좌 개설 후 SCHD 매월 자동매수."}]},
    {id:"global",emoji:"🌍",label:"글로벌 인사이트",color:"#14B8A6",bg:"#F0FFFE",items:[
      {t:"AI 시대 대체불가 역량 5가지",tg:"커리어",sum:"HBR+맥킨지 교차 분석",detail:"문제 프레이밍, 감정적 공감, 도메인+AI 결합, 윤리판단, 창의적 비전. 매주 1시간 AI 도구 실습이 연봉 1000만원 차이.",kp:["좋은 질문 만드는 능력","AI와 협업하는 능력","고객 신뢰 구축"],act:"ChatGPT/Claude에 업무 질문 3개 던져보기. 답을 쓰게 하지 말고 분석을 검증하게."},
      {t:"일본 FIRE족 시사점",tg:"재무 독립",sum:"30대 조기 은퇴 전략을 한국 물가로",detail:"저축률 50%, 인덱스 펀드, 월 100만원 생활비. 한국 월 150만원이면 원금 4.5억 연 4%로 가능.",kp:["4% 룰: 자산의 4% 매년 인출","저축률 50%면 15년","인덱스 펀드 장기 우위"],act:"이번 달 지출 카테고리별 기록. 저축률 30% 목표."},
      {t:"유럽 주 4일제 결과",tg:"일과 삶",sum:"매출 +1.4%, 이직률 -57%의 비결",detail:"영국 61개사 2900명. 회의 60% 줄이고 집중블록 도입. 금요일 오후 노미팅존으로 20% 생산성 향상.",kp:["불필요한 회의 60% 감축","15분 회의 원칙","오전 딥워크 블록"],act:"이번 주 금요일 오후를 노 미팅 존으로 선언."}]},
    {id:"science",emoji:"🧬",label:"과학 건강",color:"#FB7185",bg:"#FFF1F2",items:[
      {t:"스탠포드 수면 최적화 공식",tg:"수면 과학",sum:"후버만 교수 프로토콜 3가지",detail:"기상 30분내 강한 빛 10분. 오후 2시 이후 카페인 끊기(반감기 6시간). 침실 18도. 수면효율 23% 상승.",kp:["아침 햇빛 = 멜라토닌 타이머","카페인 마지노선 오후 2시","침실 18도 + 양말"],act:"내일 아침: 창문 열고 3분. 오늘 점심 후 카페인 끊기."},
      {t:"장내 미생물과 체중",tg:"영양학",sum:"같은 칼로리도 3배 차이나는 이유",detail:"네이처 2024: 장내 미생물 따라 체중 3배 차이. 락토바실러스 가세리 내장지방 감소 입증. 김치 된장 4주면 개선.",kp:["김치 된장 매일 1회","프리바이오틱스(식이섬유)가 핵심","항생제 후 프로바이오틱스 필수"],act:"매일 아침 김치 한 젓가락, 점심 된장국."},
      {t:"간헐적 단식 진짜 효과",tg:"다이어트",sum:"메타분석 + 성별 맞춤 가이드",detail:"16:8 체지방 감소 효과적. 여성은 14:10 시작. 핵심은 저녁 7시 전 식사 마무리. 수면질도 개선.",kp:["여성 14:10 시작","운동일 단식 단축","저녁 7시 전 마감이 핵심"],act:"이번 주 월/수/금만 저녁 7시 전 식사 마무리."}]},
  ];
  return(<div style={{padding:"16px 20px 24px"}}>
    <div className="fu" style={{padding:"24px",borderRadius:28,background:"linear-gradient(135deg,#F5F3FF,#FDF4FF,#FFF1F2)",marginBottom:20,position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:-30,right:-30,width:120,height:120,borderRadius:"50%",background:"rgba(124,92,252,.06)"}}/>
      <h1 style={{fontSize:24,fontWeight:800,letterSpacing:"-.5px"}}>👑 프리미엄 인사이트</h1>
      <p style={{fontSize:14,color:C.txS,marginTop:6}}>해외 고급 소스 기반 초개인화 분석</p>
      <div style={{display:"flex",gap:8,marginTop:14,flexWrap:"wrap"}}>{["📚 HBR","📊 Forbes","🧬 Nature","💎 Bloomberg"].map(function(t){return <span key={t} style={{padding:"4px 12px",borderRadius:10,background:"rgba(0,0,0,.04)",fontSize:12,color:C.txS}}>{t}</span>})}</div>
    </div>
    {PM.map(function(cat,ci){return(<div key={cat.id} className="fu" style={{animationDelay:ci*.06+"s",marginBottom:14}}>
      <div onClick={function(){sAc(ac===cat.id?null:cat.id);sExp(null)}} style={{padding:"18px 20px",borderRadius:ac===cat.id?"24px 24px 0 0":24,background:"#fff",border:"1.5px solid "+(ac===cat.id?cat.color+"40":C.glassBd),cursor:"pointer",boxShadow:"0 2px 8px rgba(0,0,0,.03)"}}>
        <div style={{display:"flex",alignItems:"center",gap:14}}><div style={{width:48,height:48,borderRadius:16,background:cat.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24}}>{cat.emoji}</div><div style={{flex:1}}><p style={{fontSize:16,fontWeight:700,letterSpacing:"-.2px"}}>{cat.label}</p></div><span style={{fontSize:12,color:C.txD}}>{cat.items.length}건</span></div>
      </div>
      {ac===cat.id&&(<div style={{background:"#fff",borderRadius:"0 0 24px 24px",border:"1.5px solid "+cat.color+"40",borderTop:"none",padding:"8px 12px 12px"}}>
        {cat.items.map(function(it,ii){var isE=exp===cat.id+ii;var isP=pl===cat.id+ii;return(<div key={ii} style={{margin:"8px 0",borderRadius:20,background:isE?cat.bg:"#FAFAF9",border:"1.5px solid "+(isE?cat.color+"30":C.glassBd),overflow:"hidden",cursor:"pointer"}} onClick={function(){sExp(isE?null:cat.id+ii)}}>
          <div style={{padding:"16px 18px"}}><span style={{padding:"3px 10px",borderRadius:8,background:cat.color+"15",color:cat.color,fontSize:11,fontWeight:700}}>{it.tg}</span><h3 style={{fontSize:15,fontWeight:700,marginTop:8,letterSpacing:"-.2px"}}>{it.t}</h3><p style={{fontSize:13,color:C.txS,marginTop:4}}>{it.sum}</p></div>
          {isE&&(<div style={{padding:"0 18px 18px",borderTop:"1px solid "+C.glassBd}}>
            <p style={{fontSize:14,color:C.txS,lineHeight:1.8,marginTop:14}}>{it.detail}</p>
            {it.kp&&(<div style={{marginTop:14,borderRadius:16,background:"#fff",padding:"14px",border:"1px solid "+C.glassBd}}><p style={{fontSize:13,fontWeight:700,color:cat.color,marginBottom:8}}>🎯 핵심 포인트</p>{it.kp.map(function(k,ki){return <div key={ki} style={{display:"flex",gap:8,marginBottom:ki<it.kp.length-1?6:0}}><div style={{width:6,height:6,borderRadius:3,background:cat.color,marginTop:6,flexShrink:0}}/><p style={{fontSize:13,color:C.txS,lineHeight:1.5}}>{k}</p></div>})}</div>)}
            {it.act&&(<div style={{marginTop:10,borderRadius:16,background:"#F0FFFE",padding:"14px",border:"1px solid rgba(52,211,153,.15)"}}><p style={{fontSize:13,fontWeight:700,color:C.mintD,marginBottom:6}}>⚡ 실전 적용법</p><p style={{fontSize:13,color:C.txS,lineHeight:1.6}}>{it.act}</p></div>)}
            {isP&&<div style={{display:"flex",alignItems:"flex-end",gap:3,height:18,overflow:"hidden",marginTop:12}}>{Array.from({length:24}).map(function(_,j){return <div key={j} style={{width:3,borderRadius:2,background:cat.color,animation:"wave .6s ease-in-out infinite alternate",animationDelay:j*.04+"s",flexShrink:0}}/>})}</div>}
            <button onClick={function(e){e.stopPropagation();if(isP){stopT();sPl(null)}else{stopT();sPl(cat.id+ii);speak(it.detail+" "+it.act,function(){sPl(null)})}}} style={{marginTop:12,width:"100%",height:44,borderRadius:14,border:"none",background:isP?C.gHero:cat.bg,color:isP?"#fff":cat.color,fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:ff}}>{isP?"⏸ 정지":"▶️ 음성 듣기"}</button>
          </div>)}
        </div>)})}
      </div>)}
    </div>)})}<div style={{height:16}}/>
  </div>);
}
