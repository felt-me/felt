// ── felt · 가계부 v1.1 (James Premium Edition) ──────────────────

const EMOJIS = [
  { emoji: '😞', label: '별로', mult: 0.6 },
  { emoji: '😐', label: '그냥', mult: 0.95 },
  { emoji: '😊', label: '좋아', mult: 1.15 },
  { emoji: '🤩', label: '최고', mult: 1.4 },
];

// James님의 소비 패턴(테니스, 와인/식사, 업무 정산)을 직관적으로 반영하도록 카테고리 라인업 개편 및 싱크
const CATEGORIES = [
  { name: '식사',   icon: '🍽️' }, // 와인 및 다이닝
  { name: '카페',   icon: '☕' },
  { name: '운동',   icon: '🎾' }, // 주 5~6회 테니스 루틴
  { name: '편의점', icon: '🏪' },
  { name: '문화',   icon: '🎬' },
  { name: '쇼핑',   icon: '🛍️' },
  { name: '교통',   icon: '🚇' },
  { name: '업무',   icon: '💼' }, // 세미나 등 사후 정산용 카테고리
  { name: '구독',   icon: '📱' },
  { name: '기타',   icon: '📦' },
];

// ⚡ James 전용 원클릭 루틴 퀵태깅 마스터 데이터
const QUICK_ROUTINES = [
  { name: '실내테니스장 대관', amount: 55000, category: '운동', icon: '🎾', emoji: '🤩', mult: 1.4 },
  { name: '와인 아울렛 결제', amount: 180000, category: '식사', icon: '🍽️', emoji: '🤩', mult: 1.4 },
  { name: '블루보틀 아메리카노', amount: 8500, category: '카페', icon: '☕', emoji: '😊', mult: 1.15 }
];

// ── Storage ──────────────────────────────────────────────
function loadTxs() {
  const raw = localStorage.getItem('felt_txs');
  if (raw) return JSON.parse(raw);
  const sample = makeSample();
  saveTxs(sample);
  return sample;
}

function saveTxs(txs) {
  localStorage.setItem('felt_txs', JSON.stringify(txs));
}

function makeSample() {
  // 컴팩트 헬퍼 — 인수 순서: id, date, name, cat, icon, amt, isIncome, emoji, mult
  const tx = (id, date, name, cat, icon, amt, inc, em, m) =>
    ({ id, date, name, category: cat, icon, amount: amt, isIncome: inc, emoji: inc ? '' : em, mult: inc ? 1 : m });
  const I = true, O = false;

  return [
    // ── 2025년 7월 ────────────────────────────────────────────
    tx('m0700','2025-07-01','월급','수입','💰',5000000,I,'',1),
    tx('m0701','2025-07-02','블루보틀 필터커피','카페','☕',8500,O,'🤩',1.4),
    tx('m0702','2025-07-04','실내테니스장 대관','운동','🎾',55000,O,'🤩',1.4),
    tx('m0703','2025-07-05','명동교자 칼국수','식사','🍽️',11000,O,'🤩',1.4),
    tx('m0704','2025-07-06','GS25 삼각김밥','편의점','🏪',3200,O,'😐',0.95),
    tx('m0705','2025-07-08','실내테니스장 대관','운동','🎾',55000,O,'🤩',1.4),
    tx('m0706','2025-07-09','테라로사 핸드드립','카페','☕',12000,O,'🤩',1.4),
    tx('m0707','2025-07-10','와인 아울렛 결제','식사','🍽️',180000,O,'🤩',1.4),
    tx('m0708','2025-07-12','넷플릭스','구독','📱',17000,O,'😊',1.15),
    tx('m0709','2025-07-15','실내테니스장 대관','운동','🎾',55000,O,'🤩',1.4),
    tx('m0710','2025-07-16','블루보틀 라떼','카페','☕',9500,O,'😊',1.15),
    tx('m0711','2025-07-18','무신사 반팔티','쇼핑','🛍️',39000,O,'😊',1.15),
    tx('m0712','2025-07-19','본도시락 닭갈비','식사','🍽️',9500,O,'😊',1.15),
    tx('m0713','2025-07-20','CU 야식','편의점','🏪',5500,O,'😞',0.6),
    tx('m0714','2025-07-22','실내테니스장 대관','운동','🎾',55000,O,'🤩',1.4),
    tx('m0715','2025-07-24','교보문고 에세이','문화','🎬',16800,O,'😊',1.15),
    tx('m0716','2025-07-25','배민 치킨','식사','🍽️',23000,O,'😊',1.15),
    tx('m0717','2025-07-28','지하철 교통카드 충전','교통','🚇',50000,O,'😊',1.15),
    tx('m0718','2025-07-30','블루보틀 콜드브루','카페','☕',10000,O,'😊',1.15),
    // ── 2025년 8월 ────────────────────────────────────────────
    tx('m0800','2025-08-01','월급','수입','💰',5000000,I,'',1),
    tx('m0801','2025-08-02','실내테니스장 대관','운동','🎾',55000,O,'🤩',1.4),
    tx('m0802','2025-08-04','블루보틀 필터커피','카페','☕',8500,O,'🤩',1.4),
    tx('m0803','2025-08-05','이자카야 저녁','식사','🍽️',65000,O,'🤩',1.4),
    tx('m0804','2025-08-06','GS25 음료','편의점','🏪',2800,O,'😐',0.95),
    tx('m0805','2025-08-08','실내테니스장 대관','운동','🎾',55000,O,'🤩',1.4),
    tx('m0806','2025-08-09','테라로사 카푸치노','카페','☕',11000,O,'😊',1.15),
    tx('m0807','2025-08-10','와인 아울렛 결제','식사','🍽️',180000,O,'🤩',1.4),
    tx('m0808','2025-08-12','나이키 운동화','쇼핑','🛍️',139000,O,'🤩',1.4),
    tx('m0809','2025-08-13','메가박스 영화','문화','🎬',15000,O,'🤩',1.4),
    tx('m0810','2025-08-15','실내테니스장 대관','운동','🎾',55000,O,'🤩',1.4),
    tx('m0811','2025-08-17','블루보틀 라떼','카페','☕',9500,O,'😊',1.15),
    tx('m0812','2025-08-19','명동교자 교자만두','식사','🍽️',9000,O,'🤩',1.4),
    tx('m0813','2025-08-20','CU 아이스크림','편의점','🏪',2500,O,'😊',1.15),
    tx('m0814','2025-08-22','실내테니스장 대관','운동','🎾',55000,O,'🤩',1.4),
    tx('m0815','2025-08-23','배민 마라탕','식사','🍽️',19000,O,'😊',1.15),
    tx('m0816','2025-08-25','유튜브프리미엄','구독','📱',14900,O,'😊',1.15),
    tx('m0817','2025-08-27','본도시락 제육','식사','🍽️',8900,O,'😊',1.15),
    tx('m0818','2025-08-29','GS25 삼각김밥','편의점','🏪',3200,O,'😐',0.95),
    // ── 2025년 9월 ────────────────────────────────────────────
    tx('m0900','2025-09-01','월급','수입','💰',5000000,I,'',1),
    tx('m0901','2025-09-02','블루보틀 필터커피','카페','☕',8500,O,'🤩',1.4),
    tx('m0902','2025-09-03','실내테니스장 대관','운동','🎾',55000,O,'🤩',1.4),
    tx('m0903','2025-09-04','본도시락 제육','식사','🍽️',8900,O,'😊',1.15),
    tx('m0904','2025-09-05','GS25 커피','편의점','🏪',2000,O,'😐',0.95),
    tx('m0905','2025-09-06','실내테니스장 대관','운동','🎾',55000,O,'🤩',1.4),
    tx('m0906','2025-09-08','테라로사 핸드드립','카페','☕',12000,O,'🤩',1.4),
    tx('m0907','2025-09-09','세미나 등록비','업무','💼',150000,O,'😊',1.15),
    tx('m0908','2025-09-11','와인 아울렛 결제','식사','🍽️',180000,O,'🤩',1.4),
    tx('m0909','2025-09-13','실내테니스장 대관','운동','🎾',55000,O,'🤩',1.4),
    tx('m0910','2025-09-15','교보문고 소설','문화','🎬',14000,O,'😊',1.15),
    tx('m0911','2025-09-16','무신사 청바지','쇼핑','🛍️',69000,O,'😊',1.15),
    tx('m0912','2025-09-18','배민 족발','식사','🍽️',34000,O,'🤩',1.4),
    tx('m0913','2025-09-19','넷플릭스','구독','📱',17000,O,'😊',1.15),
    tx('m0914','2025-09-20','실내테니스장 대관','운동','🎾',55000,O,'🤩',1.4),
    tx('m0915','2025-09-22','블루보틀 라떼','카페','☕',9500,O,'😊',1.15),
    tx('m0916','2025-09-24','명동교자 칼국수','식사','🍽️',11000,O,'🤩',1.4),
    tx('m0917','2025-09-26','CU 에너지바','편의점','🏪',3200,O,'😐',0.95),
    tx('m0918','2025-09-28','지하철 교통카드 충전','교통','🚇',50000,O,'😊',1.15),
    // ── 2025년 10월 ───────────────────────────────────────────
    tx('m1000','2025-10-01','월급','수입','💰',5000000,I,'',1),
    tx('m1001','2025-10-02','테라로사 카푸치노','카페','☕',11000,O,'😊',1.15),
    tx('m1002','2025-10-03','실내테니스장 대관','운동','🎾',55000,O,'🤩',1.4),
    tx('m1003','2025-10-04','GS25 삼각김밥','편의점','🏪',3200,O,'😐',0.95),
    tx('m1004','2025-10-06','와인 아울렛 결제','식사','🍽️',180000,O,'🤩',1.4),
    tx('m1005','2025-10-07','실내테니스장 대관','운동','🎾',55000,O,'🤩',1.4),
    tx('m1006','2025-10-09','블루보틀 콜드브루','카페','☕',10000,O,'😊',1.15),
    tx('m1007','2025-10-10','명동교자 교자만두','식사','🍽️',9000,O,'🤩',1.4),
    tx('m1008','2025-10-12','메가박스 IMAX','문화','🎬',20000,O,'🤩',1.4),
    tx('m1009','2025-10-14','실내테니스장 대관','운동','🎾',55000,O,'🤩',1.4),
    tx('m1010','2025-10-15','무신사 가을 자켓','쇼핑','🛍️',129000,O,'😊',1.15),
    tx('m1011','2025-10-17','삼겹살 회식','식사','🍽️',35000,O,'🤩',1.4),
    tx('m1012','2025-10-18','테라로사 케이크세트','카페','☕',19000,O,'😊',1.15),
    tx('m1013','2025-10-20','실내테니스장 대관','운동','🎾',55000,O,'🤩',1.4),
    tx('m1014','2025-10-22','배민 치킨','식사','🍽️',23000,O,'😊',1.15),
    tx('m1015','2025-10-24','교보문고 에세이','문화','🎬',16800,O,'😊',1.15),
    tx('m1016','2025-10-25','넷플릭스','구독','📱',17000,O,'😊',1.15),
    tx('m1017','2025-10-27','CU 야식','편의점','🏪',5500,O,'😞',0.6),
    tx('m1018','2025-10-29','블루보틀 필터커피','카페','☕',8500,O,'🤩',1.4),
    // ── 2025년 11월 ───────────────────────────────────────────
    tx('m1100','2025-11-01','월급','수입','💰',5000000,I,'',1),
    tx('m1101','2025-11-03','블루보틀 라떼','카페','☕',9500,O,'😊',1.15),
    tx('m1102','2025-11-04','실내테니스장 대관','운동','🎾',55000,O,'🤩',1.4),
    tx('m1103','2025-11-05','본도시락 닭갈비','식사','🍽️',9500,O,'😊',1.15),
    tx('m1104','2025-11-06','GS25 핫도그','편의점','🏪',2500,O,'😐',0.95),
    tx('m1105','2025-11-07','와인 아울렛 결제','식사','🍽️',180000,O,'🤩',1.4),
    tx('m1106','2025-11-08','실내테니스장 대관','운동','🎾',55000,O,'🤩',1.4),
    tx('m1107','2025-11-10','테라로사 핸드드립','카페','☕',12000,O,'🤩',1.4),
    tx('m1108','2025-11-12','나이키 운동복','쇼핑','🛍️',75000,O,'😊',1.15),
    tx('m1109','2025-11-14','실내테니스장 대관','운동','🎾',55000,O,'🤩',1.4),
    tx('m1110','2025-11-15','배민 마라탕','식사','🍽️',19000,O,'😊',1.15),
    tx('m1111','2025-11-16','윌슨 테니스 라켓','쇼핑','🛍️',320000,O,'🤩',1.4),
    tx('m1112','2025-11-18','무신사 겨울 패딩','쇼핑','🛍️',179000,O,'😊',1.15),
    tx('m1113','2025-11-20','실내테니스장 대관','운동','🎾',55000,O,'🤩',1.4),
    tx('m1114','2025-11-22','메가박스 영화','문화','🎬',15000,O,'🤩',1.4),
    tx('m1115','2025-11-24','블루보틀 콜드브루','카페','☕',10000,O,'😊',1.15),
    tx('m1116','2025-11-25','업무용품 구매','업무','💼',35000,O,'😐',0.95),
    tx('m1117','2025-11-27','명동교자 칼국수','식사','🍽️',11000,O,'🤩',1.4),
    tx('m1118','2025-11-28','넷플릭스','구독','📱',17000,O,'😊',1.15),
    tx('m1119','2025-11-29','CU 라면','편의점','🏪',1800,O,'😞',0.6),
    // ── 2025년 12월 ───────────────────────────────────────────
    tx('m1200','2025-12-01','월급','수입','💰',5000000,I,'',1),
    tx('m1201','2025-12-01','연말 보너스','수입','💰',2000000,I,'',1),
    tx('m1202','2025-12-02','테라로사 카푸치노','카페','☕',11000,O,'😊',1.15),
    tx('m1203','2025-12-03','실내테니스장 대관','운동','🎾',55000,O,'🤩',1.4),
    tx('m1204','2025-12-05','이자카야 연말 모임','식사','🍽️',75000,O,'🤩',1.4),
    tx('m1205','2025-12-06','와인 아울렛 결제','식사','🍽️',280000,O,'🤩',1.4),
    tx('m1206','2025-12-08','실내테니스장 대관','운동','🎾',55000,O,'🤩',1.4),
    tx('m1207','2025-12-10','블루보틀 필터커피','카페','☕',8500,O,'🤩',1.4),
    tx('m1208','2025-12-12','무신사 니트','쇼핑','🛍️',89000,O,'😊',1.15),
    tx('m1209','2025-12-13','명동교자 교자만두','식사','🍽️',9000,O,'🤩',1.4),
    tx('m1210','2025-12-15','실내테니스장 대관','운동','🎾',55000,O,'🤩',1.4),
    tx('m1211','2025-12-17','메가박스 IMAX','문화','🎬',20000,O,'🤩',1.4),
    tx('m1212','2025-12-19','스시 오마카세','식사','🍽️',130000,O,'🤩',1.4),
    tx('m1213','2025-12-20','교보문고 다이어리','문화','🎬',22000,O,'😊',1.15),
    tx('m1214','2025-12-22','실내테니스장 대관','운동','🎾',55000,O,'🤩',1.4),
    tx('m1215','2025-12-24','삼겹살 연말 모임','식사','🍽️',45000,O,'🤩',1.4),
    tx('m1216','2025-12-25','유튜브프리미엄','구독','📱',14900,O,'😊',1.15),
    tx('m1217','2025-12-26','넷플릭스','구독','📱',17000,O,'😊',1.15),
    tx('m1218','2025-12-28','GS25 과자','편의점','🏪',4500,O,'😐',0.95),
    tx('m1219','2025-12-30','블루보틀 라떼','카페','☕',9500,O,'😊',1.15),
    // ── 2026년 1월 ────────────────────────────────────────────
    tx('m2600','2026-01-01','월급','수입','💰',5000000,I,'',1),
    tx('m2601','2026-01-02','테니스 레슨비','운동','🎾',80000,O,'🤩',1.4),
    tx('m2602','2026-01-04','블루보틀 필터커피','카페','☕',8500,O,'🤩',1.4),
    tx('m2603','2026-01-05','나이키 운동화','쇼핑','🛍️',139000,O,'🤩',1.4),
    tx('m2604','2026-01-07','본도시락 제육','식사','🍽️',8900,O,'😊',1.15),
    tx('m2605','2026-01-08','실내테니스장 대관','운동','🎾',55000,O,'🤩',1.4),
    tx('m2606','2026-01-10','테라로사 핸드드립','카페','☕',12000,O,'🤩',1.4),
    tx('m2607','2026-01-11','와인 아울렛 결제','식사','🍽️',180000,O,'🤩',1.4),
    tx('m2608','2026-01-13','GS25 삼각김밥','편의점','🏪',3200,O,'😐',0.95),
    tx('m2609','2026-01-15','실내테니스장 대관','운동','🎾',55000,O,'🤩',1.4),
    tx('m2610','2026-01-17','넷플릭스','구독','📱',17000,O,'😊',1.15),
    tx('m2611','2026-01-19','배민 족발','식사','🍽️',34000,O,'🤩',1.4),
    tx('m2612','2026-01-21','블루보틀 라떼','카페','☕',9500,O,'😊',1.15),
    tx('m2613','2026-01-22','실내테니스장 대관','운동','🎾',55000,O,'🤩',1.4),
    tx('m2614','2026-01-24','교보문고 소설','문화','🎬',14000,O,'😊',1.15),
    tx('m2615','2026-01-25','CU 야식','편의점','🏪',5500,O,'😞',0.6),
    tx('m2616','2026-01-27','명동교자 칼국수','식사','🍽️',11000,O,'🤩',1.4),
    tx('m2617','2026-01-29','실내테니스장 대관','운동','🎾',55000,O,'🤩',1.4),
    // ── 2026년 2월 ────────────────────────────────────────────
    tx('m2700','2026-02-01','월급','수입','💰',5000000,I,'',1),
    tx('m2701','2026-02-03','블루보틀 콜드브루','카페','☕',10000,O,'😊',1.15),
    tx('m2702','2026-02-04','실내테니스장 대관','운동','🎾',55000,O,'🤩',1.4),
    tx('m2703','2026-02-05','명동교자 교자만두','식사','🍽️',9000,O,'🤩',1.4),
    tx('m2704','2026-02-06','GS25 커피','편의점','🏪',2000,O,'😐',0.95),
    tx('m2705','2026-02-07','와인 아울렛 결제','식사','🍽️',180000,O,'🤩',1.4),
    tx('m2706','2026-02-08','실내테니스장 대관','운동','🎾',55000,O,'🤩',1.4),
    tx('m2707','2026-02-10','테라로사 케이크세트','카페','☕',19000,O,'😊',1.15),
    tx('m2708','2026-02-12','배민 마라탕','식사','🍽️',19000,O,'😊',1.15),
    tx('m2709','2026-02-14','실내테니스장 대관','운동','🎾',55000,O,'🤩',1.4),
    tx('m2710','2026-02-15','무신사 셔츠','쇼핑','🛍️',45000,O,'😊',1.15),
    tx('m2711','2026-02-17','메가박스 영화','문화','🎬',15000,O,'🤩',1.4),
    tx('m2712','2026-02-18','세미나 소모품 추가분','업무','💼',42000,O,'😐',0.95),
    tx('m2713','2026-02-20','넷플릭스','구독','📱',17000,O,'😊',1.15),
    tx('m2714','2026-02-22','실내테니스장 대관','운동','🎾',55000,O,'🤩',1.4),
    tx('m2715','2026-02-24','블루보틀 필터커피','카페','☕',8500,O,'🤩',1.4),
    tx('m2716','2026-02-26','삼겹살 회식','식사','🍽️',35000,O,'🤩',1.4),
    tx('m2717','2026-02-27','CU 에너지바','편의점','🏪',3200,O,'😐',0.95),
    // ── 2026년 3월 ────────────────────────────────────────────
    tx('m2800','2026-03-01','월급','수입','💰',5000000,I,'',1),
    tx('m2801','2026-03-02','테라로사 카푸치노','카페','☕',11000,O,'😊',1.15),
    tx('m2802','2026-03-03','실내테니스장 대관','운동','🎾',55000,O,'🤩',1.4),
    tx('m2803','2026-03-04','본도시락 닭갈비','식사','🍽️',9500,O,'😊',1.15),
    tx('m2804','2026-03-05','GS25 삼각김밥','편의점','🏪',3200,O,'😐',0.95),
    tx('m2805','2026-03-07','와인 아울렛 결제','식사','🍽️',180000,O,'🤩',1.4),
    tx('m2806','2026-03-08','실내테니스장 대관','운동','🎾',55000,O,'🤩',1.4),
    tx('m2807','2026-03-10','블루보틀 필터커피','카페','☕',8500,O,'🤩',1.4),
    tx('m2808','2026-03-11','테니스 신발','쇼핑','🛍️',145000,O,'🤩',1.4),
    tx('m2809','2026-03-13','명동교자 칼국수','식사','🍽️',11000,O,'🤩',1.4),
    tx('m2810','2026-03-15','실내테니스장 대관','운동','🎾',55000,O,'🤩',1.4),
    tx('m2811','2026-03-16','국립현대미술관','문화','🎬',4000,O,'😊',1.15),
    tx('m2812','2026-03-18','배민 치킨','식사','🍽️',23000,O,'😊',1.15),
    tx('m2813','2026-03-20','교보문고 에세이','문화','🎬',16800,O,'😊',1.15),
    tx('m2814','2026-03-22','실내테니스장 대관','운동','🎾',55000,O,'🤩',1.4),
    tx('m2815','2026-03-24','블루보틀 라떼','카페','☕',9500,O,'😊',1.15),
    tx('m2816','2026-03-25','넷플릭스','구독','📱',17000,O,'😊',1.15),
    tx('m2817','2026-03-27','CU 야식','편의점','🏪',5500,O,'😞',0.6),
    tx('m2818','2026-03-29','이자카야 저녁','식사','🍽️',65000,O,'🤩',1.4),
    // ── 2026년 4월 ────────────────────────────────────────────
    tx('m2900','2026-04-01','월급','수입','💰',5000000,I,'',1),
    tx('m2901','2026-04-02','블루보틀 필터커피','카페','☕',8500,O,'🤩',1.4),
    tx('m2902','2026-04-03','실내테니스장 대관','운동','🎾',55000,O,'🤩',1.4),
    tx('m2903','2026-04-04','본도시락 제육','식사','🍽️',8900,O,'😊',1.15),
    tx('m2904','2026-04-05','GS25 삼각김밥','편의점','🏪',3200,O,'😐',0.95),
    tx('m2905','2026-04-06','배민 족발','식사','🍽️',34000,O,'🤩',1.4),
    tx('m2906','2026-04-07','실내테니스장 대관','운동','🎾',55000,O,'🤩',1.4),
    tx('m2907','2026-04-09','테라로사 핸드드립','카페','☕',12000,O,'🤩',1.4),
    tx('m2908','2026-04-10','와인 아울렛 결제','식사','🍽️',180000,O,'🤩',1.4),
    tx('m2909','2026-04-12','무신사 반팔티','쇼핑','🛍️',39000,O,'😊',1.15),
    tx('m2910','2026-04-14','실내테니스장 대관','운동','🎾',55000,O,'🤩',1.4),
    tx('m2911','2026-04-15','메가박스 IMAX','문화','🎬',20000,O,'🤩',1.4),
    tx('m2912','2026-04-17','명동교자 교자만두','식사','🍽️',9000,O,'🤩',1.4),
    tx('m2913','2026-04-18','CU 에너지바','편의점','🏪',3200,O,'😐',0.95),
    tx('m2914','2026-04-19','배민 마라탕','식사','🍽️',19000,O,'😊',1.15),
    tx('m2915','2026-04-20','실내테니스장 대관','운동','🎾',55000,O,'🤩',1.4),
    tx('m2916','2026-04-22','블루보틀 라떼','카페','☕',9500,O,'😊',1.15),
    tx('m2917','2026-04-24','교보문고 소설','문화','🎬',14000,O,'😊',1.15),
    tx('m2918','2026-04-25','유튜브프리미엄','구독','📱',14900,O,'😊',1.15),
    tx('m2919','2026-04-26','GS25 음료','편의점','🏪',2800,O,'😐',0.95),
    // ── 2026년 5월 ────────────────────────────────────────────
    tx('m3000','2026-05-01','월급','수입','💰',5000000,I,'',1),
    tx('m3001','2026-05-02','테라로사 카푸치노','카페','☕',11000,O,'😊',1.15),
    tx('m3002','2026-05-03','블루보틀 필터커피','카페','☕',8500,O,'🤩',1.4),
    tx('m3003','2026-05-04','본도시락 닭갈비','식사','🍽️',9500,O,'😊',1.15),
    tx('m3004','2026-05-05','GS25 삼각김밥','편의점','🏪',3500,O,'😐',0.95),
    tx('m3005','2026-05-06','배민 족발','식사','🍽️',34000,O,'🤩',1.4),
    tx('m3006','2026-05-07','실내테니스장 대관','운동','🎾',55000,O,'🤩',1.4),
    tx('m3007','2026-05-09','와인 아울렛 결제','식사','🍽️',180000,O,'🤩',1.4),
    tx('m3008','2026-05-10','명동교자 비빔국수','식사','🍽️',10000,O,'😊',1.15),
    tx('m3009','2026-05-11','CU 라면','편의점','🏪',1800,O,'😞',0.6),
    tx('m3010','2026-05-12','배민 버거세트','식사','🍽️',18500,O,'😐',0.95),
    tx('m3011','2026-05-13','실내테니스장 대관','운동','🎾',55000,O,'🤩',1.4),
    tx('m3012','2026-05-14','메가박스 IMAX','문화','🎬',20000,O,'🤩',1.4),
    tx('m3013','2026-05-16','교보문고 소설','문화','🎬',14000,O,'😊',1.15),
    tx('m3014','2026-05-17','무신사 청바지','쇼핑','🛍️',69000,O,'😊',1.15),
    tx('m3015','2026-05-19','실내테니스장 대관','운동','🎾',55000,O,'🤩',1.4),
    tx('m3016','2026-05-20','블루보틀 콜드브루','카페','☕',10000,O,'😊',1.15),
    tx('m3017','2026-05-21','넷플릭스','구독','📱',17000,O,'😊',1.15),
    tx('m3018','2026-05-22','무신사 운동화','쇼핑','🛍️',89000,O,'🤩',1.4),
    tx('m3019','2026-05-23','배민 쌀국수','식사','🍽️',14000,O,'😊',1.15),
    tx('m3020','2026-05-24','CU 에너지바','편의점','🏪',3200,O,'😐',0.95),
    tx('m3021','2026-05-26','명동교자 만두전골','식사','🍽️',13000,O,'🤩',1.4),
    tx('m3022','2026-05-27','실내테니스장 대관','운동','🎾',55000,O,'🤩',1.4),
    tx('m3023','2026-05-28','테라로사 스콘세트','카페','☕',15000,O,'😊',1.15),
    // ── 2026년 6월 (현재 달, ~9일) ───────────────────────────
    tx('m3100','2026-06-01','월급','수입','💰',5000000,I,'',1),
    tx('m3101','2026-06-02','블루보틀 아메리카노','카페','☕',8500,O,'🤩',1.4),
    tx('m3102','2026-06-03','실내테니스장 대관','운동','🎾',55000,O,'🤩',1.4),
    tx('m3103','2026-06-04','본도시락 제육','식사','🍽️',8900,O,'😊',1.15),
    tx('m3104','2026-06-05','GS25 삼각김밥','편의점','🏪',3200,O,'😐',0.95),
    tx('m3105','2026-06-06','배민 마라탕','식사','🍽️',19000,O,'😊',1.15),
    tx('m3106','2026-06-07','명동교자 칼국수','식사','🍽️',11000,O,'🤩',1.4),
    tx('m3107','2026-06-08','테라로사 핸드드립','카페','☕',12000,O,'🤩',1.4),
    tx('m3108','2026-06-09','CU 야식','편의점','🏪',5500,O,'😞',0.6),
  ];
}

// ── State ─────────────────────────────────────────────────
let view = 'home';
let curMonth = new Date();
let listFilter = '전체';

// 🛠️ [버그 수정 1] 초기 category 설정을 '식비' 대신 CATEGORIES에 명확히 존재하는 '식사'로 수정하여 싱크 매핑 완료
let form = { isIncome: false, category: '식사', emoji: '😊', mult: 1.15 };

// ── Utils ─────────────────────────────────────────────────
const fmt = n => Math.round(n).toLocaleString('ko-KR');

// 🛠️ [안정성 보완] 자바스크립트 Date 객체의 UTC 파싱에 따른 날짜 밀림 버그 차단 유틸리티
function safeParseDate(dateStr) {
  return new Date(dateStr.replace(/-/g, '/'));
}

function monthTxs() {
  const y = curMonth.getFullYear(), m = curMonth.getMonth();
  return loadTxs().filter(tx => {
    const d = safeParseDate(tx.date);
    return d.getFullYear() === y && d.getMonth() === m;
  });
}

function txValue(tx) {
  return tx.isIncome ? tx.amount : Math.round(tx.amount * tx.mult);
}

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

function monthStr() {
  return `${curMonth.getFullYear()}년 ${curMonth.getMonth() + 1}월`;
}

function relDate(dateStr) {
  const today = new Date();
  today.setHours(0,0,0,0);
  const d = safeParseDate(dateStr);
  d.setHours(0,0,0,0);
  const diff = Math.floor((today - d) / 86400000);
  if (diff === 0) return '오늘';
  if (diff === 1) return '어제';
  return `${d.getMonth() + 1}월 ${d.getDate()}일`;
}

// ── Navigate ──────────────────────────────────────────────
function go(v) {
  view = v;
  document.querySelectorAll('.view').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active'));
  document.getElementById('view-' + v).classList.add('active');
  document.getElementById('nav-' + v).classList.add('active');
  render();
}

function render() {
  if (view === 'home')     renderHome();
  if (view === 'stats')    renderStats();
  if (view === 'list')     renderList();
  if (view === 'calendar') renderCalendar();
  if (view === 'settings') renderSettings();
}

// ── Home ──────────────────────────────────────────────────
function renderHome() {
  const txs = monthTxs();
  const expenses = txs.filter(t => !t.isIncome);
  const income   = txs.filter(t => t.isIncome);

  const totalSpent  = expenses.reduce((s, t) => s + t.amount, 0);
  const totalValue  = expenses.reduce((s, t) => s + txValue(t), 0);
  const totalIncome = income.reduce((s, t) => s + t.amount, 0);
  const valueGain   = totalValue - totalSpent;
  const isPos       = valueGain >= 0;

  const budget   = parseInt(localStorage.getItem('felt_budget') || '2500000');
  const pct      = Math.min((totalSpent / budget) * 100, 100);
  const isOver   = totalSpent > budget;

  const recent = [...txs].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 10);

  document.getElementById('view-home').innerHTML = `
    <div class="app-header">
      <div class="logo">felt<em>·</em></div>
      <div class="header-right">${monthStr()}</div>
    </div>

    <div class="month-nav">
      <button class="month-btn" onclick="prevMonth()">‹</button>
      <div class="month-label">${monthStr()}</div>
      <button class="month-btn" onclick="nextMonth()">›</button>
    </div>

    <div class="value-card">
      <div class="vc-label">이번 달 소비 체감 만족 이득</div>
      <div class="vc-amount ${isPos ? 'positive' : 'negative'}">
        ${isPos ? '+' : ''}${fmt(valueGain)}<span class="unit">원</span>
      </div>
      <div class="vc-detail">
        <span>실제 지출 ${fmt(totalSpent)}원</span>
        <span class="vc-arrow">→</span>
        <span>체감 가치 ${fmt(totalValue)}원</span>
      </div>
    </div>

    <div class="summary-row">
      <div class="pill">
        <div class="pill-label">수입</div>
        <div class="pill-amount green">+${fmt(totalIncome)}</div>
      </div>
      <div class="pill">
        <div class="pill-label">지출</div>
        <div class="pill-amount red">-${fmt(totalSpent)}</div>
      </div>
      <div class="pill">
        <div class="pill-label">잔액</div>
        <div class="pill-amount">${fmt(totalIncome - totalSpent)}</div>
      </div>
    </div>

    <div class="budget-bar-wrap">
      <div class="budget-bar-label">
        <span>예산 대비 지출 ${isOver ? '⚠️ 초과' : ''}</span>
        <span>${fmt(totalSpent)} / ${fmt(budget)}원</span>
      </div>
      <div class="budget-bar-bg">
        <div class="budget-bar-fill ${isOver ? 'over' : ''}" style="width:${pct}%"></div>
      </div>
    </div>

    <div class="section" style="margin-bottom: 8px;">
      <div class="section-title">⚡ 루틴 지출 원클릭 태깅</div>
      <div style="display: flex; gap: 8px; overflow-x: auto; padding-bottom: 6px; scrollbar-width: none; -ms-overflow-style: none;">
        <style>/* 웹킷 브라우저 스크롤바 숨김 데코 */ .section::-webkit-scrollbar { display: none; }</style>
        ${QUICK_ROUTINES.map(r => `
          <button onclick="addRoutineTx('${r.name}', ${r.amount}, '${r.category}', '${r.icon}', '${r.emoji}', ${r.mult})" 
                  style="background: var(--surface); border: 1px solid rgba(255,255,255,0.06); color: var(--text); padding: 11px 14px; border-radius: 14px; font-size: 12px; white-space: nowrap; cursor: pointer; display: flex; align-items: center; gap: 6px; transition: background 0.15s;"
                  onmouseover="this.style.background='var(--surface2)'"
                  onmouseout="this.style.background='var(--surface)'">
            <span>${r.icon}</span> <strong>${r.name}</strong> <span style="color: var(--green); font-weight: 700;">${fmt(r.amount)}원</span>
          </button>
        `).join('')}
      </div>
    </div>

    <div class="section">
      <div class="section-title">
        최근 거래
        <a onclick="go('list')">전체 보기</a>
      </div>
      <div class="tx-list">
        ${recent.length === 0 ? emptyState('📭', '거래 내역이 없어요', '+ 버튼으로 첫 거래를 추가해보세요') : recent.map(txRow).join('')}
      </div>
    </div>
  `;
}

// ⚡ [신규 기능 백엔드 로직] 루틴 단추 터치 시 오늘 날짜로 즉시 트랜잭션 주입하는 핸들러
function addRoutineTx(name, amount, category, icon, emoji, mult) {
  const d = new Date();
  const date = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  
  const tx = {
    id: uid(),
    date,
    name,
    category,
    icon,
    amount,
    isIncome: false,
    emoji,
    mult
  };
  
  const txs = loadTxs();
  txs.push(tx);
  saveTxs(txs);
  render(); // 실시간 가계부 화면 리프레시 반영
}

// ── List ──────────────────────────────────────────────────
function renderList() {
  const all = monthTxs().sort((a, b) => b.date.localeCompare(a.date));
  const cats = ['전체', '수입', ...CATEGORIES.map(c => c.name)];

  const filtered = listFilter === '전체' ? all
    : listFilter === '수입' ? all.filter(t => t.isIncome)
    : all.filter(t => t.category === listFilter);

  const totalFiltered = filtered.filter(t => !t.isIncome).reduce((s, t) => s + t.amount, 0);
  const valueFiltered = filtered.filter(t => !t.isIncome).reduce((s, t) => s + txValue(t), 0);
  const gainFiltered  = valueFiltered - totalFiltered;
  const isPos = gainFiltered >= 0;

  document.getElementById('view-list').innerHTML = `
    <div class="app-header">
      <div class="logo">felt<em>·</em></div>
      <div class="header-right">거래 내역</div>
    </div>

    <div class="month-nav">
      <button class="month-btn" onclick="prevMonth()">‹</button>
      <div class="month-label">${monthStr()}</div>
      <button class="month-btn" onclick="nextMonth()">›</button>
    </div>

    <div class="list-filter">
      ${cats.map(c => `<button class="filter-chip ${c === listFilter ? 'active' : ''}" onclick="setFilter('${c}')">${c}</button>`).join('')}
    </div>

    ${listFilter !== '수입' && filtered.filter(t => !t.isIncome).length > 0 ? `
    <div style="margin:0 16px 16px;background:var(--surface);border-radius:14px;padding:13px 16px;border:1px solid rgba(255,255,255,0.04);">
      <div style="font-size:12px;color:var(--text2);margin-bottom:4px;">선택 카테고리 가치 이득</div>
      <div style="font-size:20px;font-weight:800;color:${isPos ? 'var(--green)' : 'var(--red)'};">${isPos ? '+' : ''}${fmt(gainFiltered)}원</div>
      <div style="font-size:12px;color:var(--text2);margin-top:3px;">지출 ${fmt(totalFiltered)}원 → 가치 ${fmt(valueFiltered)}원</div>
    </div>
    ` : ''}

    <div class="section">
      <div class="tx-list">
        ${filtered.length === 0
          ? emptyState('🔍', '거래 내역이 없어요', '다른 카테고리를 선택하거나 거래를 추가해보세요')
          : filtered.map(txRow).join('')}
      </div>
    </div>
  `;
}

// ── Calendar ──────────────────────────────────────────────
function renderCalendar() {
  const txs = monthTxs();
  const y = curMonth.getFullYear(), m = curMonth.getMonth();
  const firstDay   = new Date(y, m, 1).getDay();
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const today       = new Date();

  const daily = {};
  txs.filter(t => !t.isIncome).forEach(t => {
    const d = safeParseDate(t.date).getDate(); // 🛠️ [버그 수정 2] 날짜 파싱 싱크 고정으로 달력 표기 누락 정정
    if (!daily[d]) daily[d] = { spent: 0, value: 0, count: 0 };
    daily[d].spent += t.amount;
    daily[d].value += txValue(t);
    daily[d].count++;
  });

  const wdays = ['일', '월', '화', '수', '목', '금', '토'];

  let cells = '';
  for (let i = 0; i < firstDay; i++) cells += '<div class="cal-cell empty"></div>';
  for (let d = 1; d <= daysInMonth; d++) {
    const isToday = today.getFullYear() === y && today.getMonth() === m && today.getDate() === d;
    const data = daily[d];
    const gain = data ? data.value - data.spent : 0;
    cells += `
      <div class="cal-cell ${isToday ? 'today' : ''}">
        <div class="cal-num">${d}</div>
        ${data ? `<div class="cal-dot ${gain < 0 ? 'red' : ''}"></div>` : ''}
        ${data ? `<div class="cal-mini-amt">${data.spent >= 10000 ? (data.spent / 10000).toFixed(0) + '만' : fmt(data.spent)}</div>` : ''}
      </div>
    `;
  }

  const sortedDays = Object.entries(daily).sort((a, b) => Number(b[0]) - Number(a[0]));

  document.getElementById('view-calendar').innerHTML = `
    <div class="app-header">
      <div class="logo">felt<em>·</em></div>
      <div class="header-right">달력</div>
    </div>

    <div class="month-nav">
      <button class="month-btn" onclick="prevMonth()">‹</button>
      <div class="month-label">${monthStr()}</div>
      <button class="month-btn" onclick="nextMonth()">›</button>
    </div>

    <div class="cal-weekdays">
      ${wdays.map(w => `<div class="cal-weekday">${w}</div>`).join('')}
    </div>
    <div class="cal-grid">${cells}</div>

    <div class="divider"></div>

    <div class="section" style="margin-top:16px;">
      <div class="section-title">일별 요약</div>
      <div class="tx-list">
        ${sortedDays.length === 0
          ? emptyState('📅', '지출 내역이 없어요', '')
          : sortedDays.map(([day, data]) => {
              const gain = data.value - data.spent;
              const isPos = gain >= 0;
              return `
                <div class="tx-item" style="cursor:default;">
                  <div class="tx-icon">📅</div>
                  <div class="tx-body">
                    <div class="tx-top"><div class="tx-name">${m + 1}월 ${day}일</div></div>
                    <div class="tx-meta"><span>${data.count}건의 지출</span></div>
                  </div>
                  <div class="tx-right">
                    <div class="tx-amount expense">-${fmt(data.spent)}원</div>
                    <div class="tx-value-diff ${isPos ? 'positive' : 'negative'}">${isPos ? '+' : ''}${fmt(gain)}</div>
                  </div>
                </div>
              `;
            }).join('')}
      </div>
    </div>
  `;
}

// ── Settings ──────────────────────────────────────────────
function renderSettings() {
  const budget = localStorage.getItem('felt_budget') || '2500000';

  document.getElementById('view-settings').innerHTML = `
    <div class="app-header">
      <div class="logo">felt<em>·</em></div>
    </div>

    <div style="padding:0 16px 24px;">
      <div style="font-size:24px;font-weight:800;margin-bottom:4px;">설정</div>
      <div style="font-size:13px;color:var(--text2);">소비의 가치를 느껴보세요</div>
    </div>

    <div class="settings-section">
      <div class="settings-section-title">예산</div>
      <div class="settings-item">
        <div>
          <div class="settings-label">월 예산 목표</div>
          <div class="settings-sub">홈화면 예산 바에 표시됩니다</div>
        </div>
        <input
          type="number"
          id="budget-input"
          value="${budget}"
          style="background:var(--surface2);border:1.5px solid rgba(255,255,255,0.07);border-radius:10px;padding:9px 12px;color:var(--text);font-size:14px;width:130px;text-align:right;outline:none;font-family:inherit;"
          onchange="saveBudget(this.value)"
          onfocus="this.style.borderColor='var(--green)'"
          onblur="this.style.borderColor='rgba(255,255,255,0.07)'"
        />
      </div>
    </div>

    <div class="settings-section">
      <div class="settings-section-title">이모지 평가 배율</div>
      ${EMOJIS.map(e => `
        <div class="emoji-config-row">
          <span style="font-size:26px;">${e.emoji}</span>
          <span style="color:var(--text2);font-size:13px;">${e.label}</span>
          <span style="color:var(--green);font-weight:800;font-size:16px;">× ${e.mult}</span>
        </div>
      `).join('')}
      <div style="font-size:12px;color:var(--text2);padding:8px 0 4px;line-height:1.6;">
        거래 추가 시 선택한 이모지로 체감 가치를 계산합니다.<br>
        예) 6,500원 × 1.15 = <span style="color:var(--green);">7,475원 가치</span>
      </div>
    </div>

    <div class="settings-section">
      <div class="settings-section-title">데이터</div>
      <div class="settings-item">
        <div>
          <div class="settings-label">샘플 데이터 복원</div>
          <div class="settings-sub">앱 첫 실행 시 데이터로 초기화</div>
        </div>
        <button class="btn-danger" onclick="resetSample()" style="background:rgba(200,255,62,0.1);color:var(--green);">복원</button>
      </div>
      <div class="settings-item">
        <div>
          <div class="settings-label">모든 데이터 삭제</div>
          <div class="settings-sub">되돌릴 수 없습니다</div>
        </div>
        <button class="btn-danger" onclick="clearAll()">초기화</button>
      </div>
    </div>

    <div style="text-align:center;padding:40px 20px 20px;color:var(--text2);font-size:12px;line-height:1.8;">
      felt · 가계부 v1.1<br>
      소비에서 진짜 가치를 찾아보세요
    </div>
  `;
}

// ── Stats ─────────────────────────────────────────────────
function renderStats() {
  const txs = loadTxs();

  // 최근 12개월 집계
  const months12 = [];
  for (let i = 11; i >= 0; i--) {
    const d = new Date(curMonth.getFullYear(), curMonth.getMonth() - i, 1);
    const y = d.getFullYear(), m = d.getMonth();
    const mExp = txs.filter(tx => {
      const td = safeParseDate(tx.date);
      return !tx.isIncome && td.getFullYear() === y && td.getMonth() === m;
    });
    const spent = mExp.reduce((s, t) => s + t.amount, 0);
    const value = mExp.reduce((s, t) => s + txValue(t), 0);
    months12.push({ label: `${m + 1}월`, spent, value, gain: value - spent });
  }

  // 이번 달 지출
  const curExp = monthTxs().filter(t => !t.isIncome);
  const totalSpent = curExp.reduce((s, t) => s + t.amount, 0);

  // 카테고리별
  const catMap = {};
  curExp.forEach(tx => {
    if (!catMap[tx.category]) catMap[tx.category] = { spent: 0, value: 0, count: 0 };
    catMap[tx.category].spent += tx.amount;
    catMap[tx.category].value += txValue(tx);
    catMap[tx.category].count++;
  });
  const cats = Object.entries(catMap).sort((a, b) => b[1].spent - a[1].spent);

  // 만족도별 금액
  const emMap = { '🤩': 0, '😊': 0, '😐': 0, '😞': 0 };
  curExp.forEach(tx => { if (emMap[tx.emoji] !== undefined) emMap[tx.emoji] += tx.amount; });
  const emTotal = Object.values(emMap).reduce((s, v) => s + v, 0);

  // 베스트 / 워스트
  const withDiff = curExp.map(tx => ({ ...tx, diff: txValue(tx) - tx.amount }));
  const best3  = [...withDiff].sort((a, b) => b.diff - a.diff).slice(0, 3);
  const worst3 = [...withDiff].filter(t => t.diff < 0).sort((a, b) => a.diff - b.diff).slice(0, 3);

  // SVG 트렌드 바 차트
  const maxAbs = Math.max(...months12.map(m => Math.abs(m.gain)), 1);
  const BAR_W = 22, GAP = 7, BASE = 72, MAX_H = 58;
  const svgW = 12 * (BAR_W + GAP) - GAP;

  const bars = months12.map((m, i) => {
    const x    = i * (BAR_W + GAP);
    const h    = Math.max(Math.round(Math.abs(m.gain) / maxAbs * MAX_H), m.gain !== 0 ? 4 : 1);
    const isP  = m.gain >= 0;
    const barY = isP ? BASE - h : BASE;
    const fill = isP ? '#c8ff3e' : '#ff5252';
    const lo   = i === 11 ? '#c8ff3e' : '#4a4a4a';
    const op   = i >= 9 ? '1' : '0.6';
    return `<rect x="${x}" y="${barY}" width="${BAR_W}" height="${h}" fill="${fill}" rx="3" opacity="${op}"/>
<text x="${x + BAR_W / 2}" y="142" fill="${lo}" font-size="8.5" text-anchor="middle" font-family="sans-serif">${m.label}</text>`;
  }).join('\n');

  const svg = `<svg viewBox="0 0 ${svgW} 150" xmlns="http://www.w3.org/2000/svg" style="width:100%;display:block;">
  <line x1="0" y1="${BASE}" x2="${svgW}" y2="${BASE}" stroke="#2e2e2e" stroke-width="1.5"/>
  ${bars}
</svg>`;

  const curGain = months12[11].gain;
  const isPos   = curGain >= 0;

  document.getElementById('view-stats').innerHTML = `
    <div class="app-header">
      <div class="logo">felt<em>·</em></div>
      <div class="header-right">통계</div>
    </div>

    <div class="month-nav">
      <button class="month-btn" onclick="prevMonth()">‹</button>
      <div class="month-label">${monthStr()} 기준</div>
      <button class="month-btn" onclick="nextMonth()">›</button>
    </div>

    <!-- ① 12개월 트렌드 -->
    <div style="padding:0 16px 16px;">
      <div class="section-title">
        최근 12개월 가치 이득 트렌드
      </div>
      <div style="background:var(--surface);border-radius:18px;padding:16px 12px 8px;border:1px solid rgba(255,255,255,0.04);margin-bottom:10px;">
        ${svg}
      </div>
      <div style="display:flex;gap:14px;font-size:11px;color:var(--text2);padding:0 2px;">
        <span><span style="color:var(--green);font-weight:700;">■</span> 이득 (만족 지출)</span>
        <span><span style="color:var(--red);font-weight:700;">■</span> 손해 (아쉬운 지출)</span>
        <span style="margin-left:auto;color:${isPos ? 'var(--green)' : 'var(--red)'};font-weight:800;">이번달 ${isPos ? '+' : ''}${fmt(curGain)}원</span>
      </div>
    </div>

    <div class="divider"></div>

    <!-- ② 카테고리 분석 -->
    <div style="padding:16px 16px 4px;">
      <div class="section-title">이번 달 카테고리 분석</div>
      ${cats.length === 0
        ? emptyState('📭', '이번 달 지출이 없어요', '')
        : cats.map(([name, d]) => {
            const pct    = totalSpent > 0 ? Math.round(d.spent / totalSpent * 100) : 0;
            const diff   = d.value - d.spent;
            const isG    = diff >= 0;
            const icon   = CATEGORIES.find(c => c.name === name)?.icon || '📦';
            return `
              <div style="margin-bottom:16px;">
                <div style="display:flex;align-items:center;margin-bottom:7px;">
                  <span style="font-size:18px;margin-right:8px;">${icon}</span>
                  <span style="font-size:14px;font-weight:600;flex:1;">${name}</span>
                  <span style="font-size:11px;color:var(--text2);margin-right:12px;">${d.count}건</span>
                  <div style="text-align:right;">
                    <div style="font-size:13px;font-weight:700;">${fmt(d.spent)}원</div>
                    <div style="font-size:11px;color:${isG ? 'var(--green)' : 'var(--red)'};">${isG ? '+' : ''}${fmt(diff)}</div>
                  </div>
                </div>
                <div style="display:flex;align-items:center;gap:8px;">
                  <div style="flex:1;height:6px;background:var(--surface2);border-radius:99px;overflow:hidden;">
                    <div style="height:100%;width:${pct}%;background:var(--green);border-radius:99px;"></div>
                  </div>
                  <span style="font-size:11px;color:var(--text2);width:28px;text-align:right;">${pct}%</span>
                </div>
              </div>`;
          }).join('')
      }
    </div>

    <div class="divider"></div>

    <!-- ③ 만족도 분포 -->
    <div style="padding:16px 16px 4px;">
      <div class="section-title">이번 달 소비 만족도</div>
      ${Object.entries(emMap).map(([em, amt]) => {
          const pct = emTotal > 0 ? Math.round(amt / emTotal * 100) : 0;
          const lbl = EMOJIS.find(e => e.emoji === em)?.label || '';
          const op  = em === '🤩' ? 1 : em === '😊' ? 0.75 : em === '😐' ? 0.45 : 0.25;
          return `
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:11px;">
              <span style="font-size:20px;width:26px;text-align:center;">${em}</span>
              <span style="font-size:12px;color:var(--text2);width:32px;">${lbl}</span>
              <div style="flex:1;height:8px;background:var(--surface2);border-radius:99px;overflow:hidden;">
                <div style="height:100%;width:${pct}%;background:var(--green);opacity:${op};border-radius:99px;"></div>
              </div>
              <span style="font-size:12px;color:var(--text2);width:32px;text-align:right;">${pct}%</span>
              <span style="font-size:12px;font-weight:600;width:72px;text-align:right;">${fmt(amt)}원</span>
            </div>`;
        }).join('')}
    </div>

    <div class="divider"></div>

    <!-- ④ 베스트 소비 -->
    <div style="padding:16px 16px 4px;">
      <div class="section-title">이번 달 최고의 소비 Top 3</div>
      ${best3.length === 0
        ? '<div style="color:var(--text2);font-size:13px;padding:8px 0 16px;">데이터 없음</div>'
        : best3.map((tx, i) => `
            <div style="display:flex;align-items:center;gap:12px;padding:11px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
              <div style="font-size:20px;width:26px;text-align:center;">${['🏆','🥈','🥉'][i]}</div>
              <div style="font-size:18px;">${tx.icon}</div>
              <div style="flex:1;min-width:0;">
                <div style="font-size:14px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${tx.name}</div>
                <div style="font-size:11px;color:var(--text2);">${tx.emoji} ${fmt(tx.amount)}원 지출</div>
              </div>
              <div style="color:var(--green);font-weight:800;font-size:14px;white-space:nowrap;">+${fmt(tx.diff)}</div>
            </div>`).join('')}
    </div>

    <div class="divider"></div>

    <!-- ⑤ 워스트 소비 -->
    <div style="padding:16px 16px 32px;">
      <div class="section-title">이번 달 아쉬운 소비</div>
      ${worst3.length === 0
        ? '<div style="color:var(--text2);font-size:13px;padding:8px 0;">아쉬운 소비 없음 👍</div>'
        : worst3.map(tx => `
            <div style="display:flex;align-items:center;gap:12px;padding:11px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
              <div style="font-size:18px;">${tx.icon}</div>
              <div style="flex:1;min-width:0;">
                <div style="font-size:14px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${tx.name}</div>
                <div style="font-size:11px;color:var(--text2);">${tx.emoji} ${fmt(tx.amount)}원 지출</div>
              </div>
              <div style="color:var(--red);font-weight:800;font-size:14px;white-space:nowrap;">${fmt(tx.diff)}</div>
            </div>`).join('')}
    </div>
  `;
}

// ── TX Row ────────────────────────────────────────────────
function txRow(tx) {
  const val  = txValue(tx);
  const diff = val - tx.amount;
  const isPos = diff >= 0;

  return `
    <div class="tx-item" onclick="confirmDelete('${tx.id}')">
      <div class="tx-icon">${tx.icon}</div>
      <div class="tx-body">
        <div class="tx-top">
          <div class="tx-name">${tx.name}</div>
          ${tx.emoji ? `<div class="tx-emoji">${tx.emoji}</div>` : ''}
        </div>
        <div class="tx-meta">
          <span>${relDate(tx.date)}</span>
          ${tx.category ? `<span class="tx-cat">${tx.category}</span>` : ''}
        </div>
      </div>
      <div class="tx-right">
        <div class="tx-amount ${tx.isIncome ? 'income' : 'expense'}">
          ${tx.isIncome ? '+' : '-'}${fmt(tx.amount)}원
        </div>
        ${!tx.isIncome ? `<div class="tx-value-diff ${isPos ? 'positive' : 'negative'}">${isPos ? '+' : ''}${fmt(diff)}</div>` : ''}
      </div>
    </div>
  `;
}

// ── Empty State ───────────────────────────────────────────
function emptyState(icon, title, sub) {
  return `
    <div class="empty-state">
      <div class="empty-icon">${icon}</div>
      <div class="empty-title">${title}</div>
      ${sub ? `<div class="empty-sub">${sub}</div>` : ''}
    </div>
  `;
}

// ── Actions ───────────────────────────────────────────────
function prevMonth() { curMonth = new Date(curMonth.getFullYear(), curMonth.getMonth() - 1, 1); render(); }
function nextMonth() { curMonth = new Date(curMonth.getFullYear(), curMonth.getMonth() + 1, 1); render(); }

function setFilter(cat) { listFilter = cat; renderList(); }

function saveBudget(v) { localStorage.setItem('felt_budget', v); }

function clearAll() {
  if (confirm('모든 거래 내역을 삭제할까요?\n이 작업은 되돌릴 수 없습니다.')) {
    localStorage.removeItem('felt_txs');
    render();
  }
}

function resetSample() {
  if (confirm('샘플 데이터로 초기화할까요?')) {
    saveTxs(makeSample());
    render();
  }
}

function confirmDelete(id) {
  if (confirm('이 거래를 삭제할까요?')) {
    saveTxs(loadTxs().filter(t => t.id !== id));
    render();
  }
}

// ── Modal ─────────────────────────────────────────────────
function openModal() {
  // 🛠️ [버그 수정 3] 오픈 모달 데이터 바인딩 역시 '식사'로 교정하여 무결성 확보
  form = { isIncome: false, category: '식사', emoji: '😊', mult: 1.15 };
  renderModalBody();
  document.getElementById('modal-overlay').classList.add('open');
  setTimeout(() => document.getElementById('form-name').focus(), 100);
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
}

function renderModalBody() {
  const cat = CATEGORIES.find(c => c.name === form.category) || CATEGORIES[0];

  document.getElementById('modal-body').innerHTML = `
    <div class="form-group">
      <label class="form-label">유형</label>
      <div class="type-toggle">
        <button class="type-btn ${!form.isIncome ? 'active-expense' : ''}" onclick="setType(false)">💸 지출</button>
        <button class="type-btn ${form.isIncome  ? 'active-income'  : ''}" onclick="setType(true)">💰 수입</button>
      </div>
    </div>

    <div class="form-group">
      <label class="form-label">내용</label>
      <input id="form-name" class="form-input" type="text" placeholder="${form.isIncome ? '수입 항목 (예: 월급)' : '무엇에 썼나요?'}" />
    </div>

    <div class="form-group">
      <label class="form-label">금액 (원)</label>
      <input id="form-amount" class="form-input" type="number" placeholder="0" inputmode="numeric" />
    </div>

    <div class="form-group">
      <label class="form-label">날짜</label>
      <input id="form-date" class="form-input" type="date" value="${new Date().toISOString().slice(0, 10)}" />
    </div>

    ${!form.isIncome ? `
    <div class="form-group">
      <label class="form-label">카테고리</label>
      <div class="cat-pills">
        ${CATEGORIES.map(c => `
          <button class="cat-pill ${c.name === form.category ? 'selected' : ''}" onclick="setCat('${c.name}')">
            ${c.icon} ${c.name}
          </button>
        `).join('')}
      </div>
    </div>

    <div class="form-group">
      <label class="form-label">소비 만족도</label>
      <div class="emoji-row">
        ${EMOJIS.map(e => `
          <button class="emoji-btn ${e.emoji === form.emoji ? 'selected' : ''}" onclick="setEmoji('${e.emoji}', ${e.mult})">
            <span class="e-icon">${e.emoji}</span>
            <span class="e-mult">×${e.mult}</span>
            <span class="e-label">${e.label}</span>
          </button>
        `).join('')}
      </div>
    </div>
    ` : ''}

    <button class="btn-submit" onclick="submitTx()">추가하기</button>
  `;
}

function setType(isIncome) { form.isIncome = isIncome; renderModalBody(); setTimeout(() => document.getElementById('form-name').focus(), 50); }
function setCat(name) { form.category = name; const cat = CATEGORIES.find(c => c.name === name); form.icon = cat ? cat.icon : '📦'; renderModalBody(); }
function setEmoji(emoji, mult) { form.emoji = emoji; form.mult = mult; renderModalBody(); }

function submitTx() {
  const name   = document.getElementById('form-name').value.trim();
  const amount = parseInt(document.getElementById('form-amount').value);
  const date   = document.getElementById('form-date').value;

  if (!name)              return alert('내용을 입력해주세요');
  if (!amount || amount < 1) return alert('올바른 금액을 입력해주세요');
  if (!date)              return alert('날짜를 선택해주세요');

  const cat = CATEGORIES.find(c => c.name === form.category) || CATEGORIES[0];
  const tx = {
    id: uid(),
    date,
    name,
    category: form.isIncome ? '수입' : form.category,
    icon: form.isIncome ? '💰' : cat.icon,
    amount,
    isIncome: form.isIncome,
    emoji: form.isIncome ? '' : form.emoji,
    mult:  form.isIncome ? 1  : form.mult,
  };

  const txs = loadTxs();
  txs.push(tx);
  saveTxs(txs);
  closeModal();
  render();
}

// ── Init ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  go('home');

  document.getElementById('modal-overlay').addEventListener('click', e => {
    if (e.target.id === 'modal-overlay') closeModal();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
});