const concurrency = {
  page: "concurrency.html",
  title: "동시성",
  cardDesc: "java.util.concurrent 23개 토픽",
  subtitle: "j.u.c 패키지를 마스터하는 23개 토픽. 별자리처럼 펼쳐두고 글이 발행될 때마다 별을 켭니다.",
  viewBox: "0 0 1000 1100",
  links: [
    [1, 2], [1, 3], [3, 4], [2, 5], [5, 6], [6, 7],
    [8, 9], [9, 10], [9, 11], [9, 12], [12, 13],
    [14, 15], [14, 16], [16, 17], [17, 18],
    [1, 19], [19, 20], [2, 23], [8, 22], [9, 21]
  ],
  groups: [
    {
      id: "A",
      title: "기초 동기화",
      desc: "스레드 간 상호배제와 메모리 가시성. 모든 동시성 도구의 토대.",
      topics: [
        { num: 1, label: "synchronized", title: "synchronized & 모니터 락", desc: "intrinsic lock의 정체. 객체 헤더, biased/lightweight/heavyweight 단계", x: 500, y: 100, ring: 0, status: "done", slug: "2026-05-synchronized-모니터-락", entry: "01-synchronized의-정체.html", episodes: 3 },
        { num: 2, label: "volatile · JMM", title: "volatile & JMM", desc: "가시성 vs 원자성. happens-before. volatile이 못 막는 것", x: 340, y: 220, ring: 0.3, status: "done", slug: "2026-05-volatile-jmm", entry: "01-volatile의-정체.html", episodes: 3 },
        { num: 3, label: "ReentrantLock", title: "ReentrantLock", desc: "synchronized 대비 장점. tryLock, 인터럽트 가능, Condition 객체", x: 660, y: 220, ring: 0.45, status: "done", slug: "2026-05-reentrantlock", entry: "01-reentrantlock의-정체.html", episodes: 3 },
        { num: 4, label: "RW · Stamped", title: "ReadWriteLock / StampedLock", desc: "읽기 多 / 쓰기 少 시나리오. StampedLock의 optimistic read", x: 790, y: 320, ring: 1.05, status: "done", slug: "2026-05-readwritelock-stampedlock", entry: "01-readwritelock.html", episodes: 2 }
      ]
    },
    {
      id: "B",
      title: "락 없는 동시성",
      desc: "CAS 위에 세워진 lock-free의 세계. 락 경합을 우회하는 길.",
      topics: [
        { num: 5, label: "CAS", title: "CAS (Compare-And-Swap)", desc: "CPU 명령어 수준의 원자 연산. ABA 문제와 해결", x: 430, y: 340, ring: 1.5, status: "done", slug: "2026-05-cas-compare-and-swap", entry: "01-cas의-정체.html", episodes: 2 },
        { num: 6, label: "Atomic*", title: "Atomic* 패밀리", desc: "AtomicInteger, AtomicReference, AtomicStampedReference, LongAdder", x: 500, y: 460, ring: 0.75, status: "done", slug: "2026-05-atomic-패밀리", entry: "01-atomic-기본.html", episodes: 2 },
        { num: 7, label: "ConcurrentHashMap", title: "ConcurrentHashMap", desc: "버킷 단위 락 + CAS, weak consistency, compute 류 메서드", x: 630, y: 540, ring: 1.8, status: "done", slug: "2026-05-concurrenthashmap", entry: "01-정체와-진화.html", episodes: 4 }
      ]
    },
    {
      id: "C",
      title: "스레드풀",
      desc: "실무에서 가장 자주 마주치는 영역. 풀 인자 7개의 의미와 사이징 이론.",
      topics: [
        { num: 8, label: "ExecutorService", title: "ExecutorService", desc: "작업 제출 모델. Executors 팩토리의 함정. submit vs execute", x: 180, y: 280, ring: 1.35, status: "done", slug: "2026-05-executorservice", entry: "01-executorservice-정체.html", episodes: 2 },
        { num: 9, label: "ThreadPoolExecutor", title: "ThreadPoolExecutor 7인자", desc: "core/max poolSize, keepAlive, workQueue, ThreadFactory, RejectedExecutionHandler", x: 160, y: 410, ring: 0.6, status: "done", slug: "2026-05-threadpoolexecutor-7인자", entry: "01-7인자-개요.html", episodes: 4 },
        { num: 10, label: "Future", title: "Future / Callable", desc: "get()의 블로킹과 타임아웃. cancel()의 진짜 의미 (인터럽트 시그널)", x: 280, y: 540, ring: 1.65, status: "done", slug: "2026-05-future-callable", entry: "01-future-기본.html", episodes: 2 },
        { num: 11, label: "풀 사이징", title: "풀 사이징 이론", desc: "CPU bound vs I/O bound 공식. Little's Law. 모니터링 지표", x: 100, y: 550, ring: 1.95, status: "done", slug: "2026-05-pool-sizing", entry: "01-cpu-vs-io.html", episodes: 2 }
      ]
    },
    {
      id: "D",
      title: "큐와 생산자/소비자",
      desc: "BlockingQueue 패밀리와 백프레셔의 가장 단순한 형태.",
      topics: [
        { num: 12, label: "BlockingQueue", title: "BlockingQueue 패밀리", desc: "ArrayBQ, LinkedBQ, SynchronousQueue, PriorityBQ, DelayQueue 차이와 선택", x: 380, y: 680, status: "locked" },
        { num: 13, label: "Producer · Consumer", title: "생산자 / 소비자 패턴", desc: "put/take/offer/poll의 의미 차이. 백프레셔의 가장 단순한 형태. graceful shutdown", x: 270, y: 800, status: "locked" }
      ]
    },
    {
      id: "E",
      title: "동기화 도구",
      desc: "Latch, Barrier, Semaphore, Phaser, Exchanger. 스레드 사이를 조율하는 다섯 도구.",
      topics: [
        { num: 14, label: "CountDownLatch", title: "CountDownLatch", desc: "N개 작업이 끝날 때까지 대기. 일회용 카운터", x: 700, y: 680, status: "locked" },
        { num: 15, label: "CyclicBarrier", title: "CyclicBarrier", desc: "N명이 모일 때까지 대기. Latch와 달리 재사용 가능", x: 820, y: 580, status: "locked" },
        { num: 16, label: "Semaphore", title: "Semaphore", desc: "동시 N개만 통과 허용. 자원 풀 제한 / Rate limit 토대", x: 870, y: 740, status: "locked" },
        { num: 17, label: "Phaser", title: "Phaser", desc: "Latch + Barrier 합성. 동적 참여자 등록 가능", x: 910, y: 870, status: "locked" },
        { num: 18, label: "Exchanger", title: "Exchanger", desc: "두 스레드 사이 1:1 데이터 교환점", x: 770, y: 970, status: "locked" }
      ]
    },
    {
      id: "F",
      title: "함정",
      desc: "데드락부터 ThreadLocal 메모리 누수, DCL의 깨진 가정까지. 면접 단골.",
      topics: [
        { num: 19, label: "Deadlock", title: "Deadlock", desc: "4가지 필요 조건. 예방 / 회피 / 탐지의 차이", x: 490, y: 900, ring: 1.2, status: "done", slug: "2026-05-deadlock", entry: "01-deadlock의-4가지-조건.html", episodes: 3 },
        { num: 20, label: "Livelock · Starve", title: "Livelock / Starvation", desc: "영원히 양보만 하다 끝나는 케이스, 우선순위에 밀려 굶는 스레드", x: 580, y: 1000, status: "locked" },
        { num: 21, label: "ThreadLocal", title: "ThreadLocal 함정", desc: "메모리 누수의 고전. 스레드풀과 만나면 더 위험", x: 120, y: 740, ring: 0.9, status: "done", slug: "2026-05-threadlocal-함정", entry: "01-threadlocal의-정체.html", episodes: 2 },
        { num: 22, label: "Interrupted", title: "InterruptedException 처리법", desc: "삼키지 말고 복원하라. interrupt 시그널의 정체", x: 100, y: 900, status: "locked" },
        { num: 23, label: "DCL", title: "Double-Checked Locking", desc: "volatile 없으면 깨지는 이유. 그 유명한 반쪽 초기화", x: 370, y: 970, status: "locked" }
      ]
    }
  ]
};

const java = {
  page: "java.html",
  title: "Java",
  cardDesc: "객체, JVM, 언어 기능",
  subtitle: null,
  viewBox: "0 0 800 420",
  links: [
    [1, 2], [1, 3], [2, 3], [2, 4],
    [4, 5], [4, 6], [5, 6], [5, 9], [4, 9],
    [7, 8], [7, 9], [8, 9]
  ],
  groups: [
    {
      id: "A",
      title: "객체 / 컬렉션",
      desc: "equals부터 HashMap 내부까지, 객체와 자료구조의 토대",
      topics: [
        { num: 1, label: "equals · hashCode", title: "equals와 hashCode의 함정", desc: "equals만 오버라이드하면 객체가 사라지는 이유, hashCode 계약 세 규칙", x: 180, y: 130, ring: 0, status: "done", slug: "2026-04-equals-hashcode-계약", entry: "01-equals만-오버라이드하면.html", episodes: 3 },
        { num: 2, label: "HashMap", title: "HashMap 내부", desc: "해시 충돌 처리, 리해싱, treeify (8 임계값)", x: 250, y: 270, ring: 1.0, status: "done", slug: "2026-05-hashmap-내부", entry: "01-기본-구조.html", episodes: 4 },
        { num: 3, label: "Collection", title: "Collection 비교", desc: "ArrayList vs LinkedList, HashMap vs TreeMap", x: 110, y: 270, ring: 2.2, status: "done", slug: "2026-05-collection-비교", entry: "01-arraylist-vs-linkedlist.html", episodes: 3 }
      ]
    },
    {
      id: "B",
      title: "JVM",
      desc: "메모리 영역과 GC, 클래스 로딩 메커니즘",
      topics: [
        { num: 4, label: "JVM 메모리", title: "JVM 메모리 구조", desc: "Heap / Metaspace / Stack / Direct Memory", x: 400, y: 130, ring: 1.4, status: "done", slug: "2026-05-jvm-메모리-구조", entry: "01-jvm-메모리-영역-개요.html", episodes: 4 },
        { num: 5, label: "GC", title: "GC 진화사", desc: "Serial → CMS → G1 → ZGC, Shenandoah", x: 470, y: 270, ring: 1.8, status: "done", slug: "2026-05-gc-진화사", entry: "01-gc가-풀려는-문제.html", episodes: 5 },
        { num: 6, label: "ClassLoader", title: "ClassLoader 동작", desc: "부모 위임 모델, Bootstrap / Extension / Application", x: 330, y: 270, status: "locked" }
      ]
    },
    {
      id: "C",
      title: "언어 기능",
      desc: "제네릭, JIT, 문자열 처리 같은 언어 차원의 디테일",
      topics: [
        { num: 7, label: "Generics", title: "Generics와 Type Erasure", desc: "컴파일 타임 타입 검사, 런타임 erasure, 와일드카드", x: 650, y: 130, status: "locked" },
        { num: 8, label: "JIT", title: "JIT 컴파일러", desc: "C1 / C2 / Graal, hot spot 감지와 최적화", x: 720, y: 270, status: "locked" },
        { num: 9, label: "String Pool", title: "String Pool과 String.intern()", desc: "문자열 캐시, == vs equals, intern()의 함정", x: 580, y: 270, status: "locked" }
      ]
    }
  ]
};

const seriesTitles = {
  "2026-04-circuit-breaker-실전-패턴": "CircuitBreaker 깊게 파기",
  "2026-04-equals-hashcode-계약": "equals와 hashCode의 함정",
  "2026-04-transactional-propagation-7가지": "@Transactional Propagation 7가지",
  "2026-04-쿠폰-시스템-redis-정합성": "쿠폰 발급에 Redis를 도입하고 맞닥뜨린 정합성 문제",
  "2026-04-쿠폰-시스템-성능-개선": "쿠폰 발급 시스템의 성능 한계를 뚫은 과정",
  "2026-05-aop-내부-동작": "Spring AOP 내부 동작",
  "2026-05-bean-생명주기": "Spring Bean 생명주기",
  "2026-05-cache-stampede": "Cache Stampede",
  "2026-05-cap-정리": "CAP 정리",
  "2026-05-cas-compare-and-swap": "CAS — Compare And Swap",
  "2026-05-concurrenthashmap": "ConcurrentHashMap",
  "2026-05-cors-깊이-이해": "CORS 깊이 이해",
  "2026-05-deadlock": "Deadlock",
  "2026-05-di-방식": "DI 방식",
  "2026-05-gc-진화사": "GC 진화사",
  "2026-05-hashmap-내부": "HashMap 내부",
  "2026-05-http-1-2-3": "HTTP/1.1 → 2 → 3",
  "2026-05-http-connection-pool": "HTTP Connection Pool 운영",
  "2026-05-http-메소드-멱등성": "HTTP 메소드와 멱등성",
  "2026-05-http-상태코드": "HTTP 상태코드 — 헷갈리는 경계",
  "2026-05-idempotency-key": "Idempotency Key 설계",
  "2026-05-jvm-메모리-구조": "JVM 메모리 구조",
  "2026-05-kafka-보장-모델": "Kafka 보장 모델",
  "2026-05-mvcc와-잠금": "MVCC와 잠금",
  "2026-05-n+1과-fetch-전략": "N+1과 fetch 전략",
  "2026-05-oauth-oidc": "OAuth 2.0 / OIDC",
  "2026-05-synchronized-모니터-락": "synchronized & 모니터 락",
  "2026-05-tcp-backpressure": "TCP Backpressure",
  "2026-05-tcp-연결의-일생": "TCP 연결의 일생",
  "2026-05-threadlocal-함정": "ThreadLocal 함정",
  "2026-05-threadpoolexecutor-7인자": "ThreadPoolExecutor 7인자",
  "2026-05-transactional-self-invocation": "@Transactional self-invocation 함정",
  "2026-05-volatile-jmm": "volatile & JMM",
  "2026-05-분산-락": "분산 락",
  "2026-05-외부-api-failover-다층-방어": "외부 API Failover 다층 방어",
  "2026-05-인덱스-b-tree부터-covering까지": "인덱스 — B-Tree부터 Covering까지",
  "2026-05-인증-session-jwt": "인증 — Session vs JWT",
  "2026-05-캐시-전략": "캐시 전략",
  "2026-05-트랜잭션-격리-수준": "트랜잭션 격리 수준",
  "2026-05-패킷-한-개의-여정": "패킷 한 개의 여정",
  "2026-05-프록시-jdk-vs-cglib": "프록시 — JDK Dynamic vs CGLIB",
  "2026-05-reentrantlock": "ReentrantLock",
  "2026-05-atomic-패밀리": "Atomic* 패밀리",
  "2026-05-readwritelock-stampedlock": "ReadWriteLock / StampedLock",
  "2026-05-executorservice": "ExecutorService",
  "2026-05-future-callable": "Future / Callable",
  "2026-05-tcp-vs-udp": "TCP vs UDP",
  "2026-05-https-tls": "HTTPS / TLS handshake",
  "2026-05-normalization-vs-denormalization": "정규화 vs 반정규화",
  "2026-05-rest-원칙과-비판": "REST 원칙과 비판",
  "2026-05-monolith-vs-msa": "모놀리스 vs MSA",
  "2026-05-web-security": "CSRF / XSS / SQL Injection",
  "2026-05-distributed-transaction": "분산 트랜잭션 (2PC / Saga / Outbox)",
  "2026-05-pool-sizing": "풀 사이징 이론",
  "2026-05-load-balancer": "Load Balancer L4 vs L7",
  "2026-05-idempotency-patterns": "멱등성 설계 패턴",
  "2026-05-collection-비교": "Collection 비교"
};

const cardOnly = {
  spring: { title: "Spring", cardDesc: "코어 internals, 트랜잭션, 부트 동작", page: "spring.html", done: 3, total: 12 },
  db: { title: "DB", cardDesc: "인덱스, 트랜잭션, 락, 모델링", page: "db.html", done: 4, total: 13 },
  network: { title: "네트워크", cardDesc: "TCP, HTTP, TLS, CORS, DNS", page: "network.html", done: 11, total: 12 },
  distributed: { title: "분산 시스템 설계", cardDesc: "Resilience, 분산, 캐싱, 메시징, 아키텍처", page: "distributed.html", done: 7, total: 29 },
  security: { title: "보안", cardDesc: "인증/인가, 웹 보안", page: "security.html", done: 1, total: 5 }
};

function statsFor(category) {
  if (category.groups) {
    const topics = category.groups.flatMap(g => g.topics);
    const done = topics.filter(t => t.status === "done").length;
    const total = topics.length;
    return { done, total, percent: total > 0 ? Math.round(done / total * 100) : 0 };
  }
  return {
    done: category.done,
    total: category.total,
    percent: category.total > 0 ? Math.round(category.done / category.total * 100) : 0
  };
}

function buildCard(key, data) {
  const stats = statsFor(data);
  return {
    key,
    title: data.title,
    cardDesc: data.cardDesc,
    page: data.page,
    done: stats.done,
    total: stats.total,
    percent: stats.percent
  };
}

function buildLinks(category) {
  const map = new Map();
  for (const g of category.groups) {
    for (const t of g.topics) map.set(t.num, t);
  }
  return category.links.map(([from, to]) => {
    const a = map.get(from), b = map.get(to);
    return { from, to, x1: a.x, y1: a.y, x2: b.x, y2: b.y };
  });
}

const fullCategories = { java, concurrency };
for (const [key, cat] of Object.entries(fullCategories)) {
  cat.stats = statsFor(cat);
  cat.linkLines = buildLinks(cat);
}

const cardOrder = ["java", "spring", "db", "network", "concurrency", "distributed", "security"];
const cards = cardOrder.map(key => {
  const data = fullCategories[key] || cardOnly[key];
  return buildCard(key, data);
});

const totals = cards.reduce((acc, c) => ({
  done: acc.done + c.done,
  total: acc.total + c.total
}), { done: 0, total: 0 });
totals.percent = totals.total > 0 ? Math.round(totals.done / totals.total * 100) : 0;

module.exports = {
  java,
  concurrency,
  cards,
  totals,
  seriesTitles
};
