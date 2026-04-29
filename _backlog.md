# 백엔드 면접 대비 — 시리즈 백로그

**범례**: `[ ]` TODO · `[~]` 진행중 · `[x]` 완료 · ★ 면접 단골

---

## P0 — ★ 시리즈만 먼저 (~45 시리즈, ~130편)

### Java 언어
- [x] ★ `equals` / `hashCode` 계약 — 위반 시 무슨 일이 (3편)
- [ ] ★ HashMap 내부 — 해시 충돌, 리해싱, treeify (4편)
- [ ] ★ Collection 비교 — ArrayList vs LinkedList, HashMap vs TreeMap (3편)

### JVM 내부
- [ ] ★ JVM 메모리 구조 — Heap / Metaspace / Stack / Direct Memory (4편)
- [ ] ★ GC 진화사 — Serial → ZGC, Shenandoah (5편)
- [ ] ★ ClassLoader 동작 — 부모 위임 모델 (3편)

### 동시성
- [ ] ★ volatile / synchronized / atomic — 셋의 차이 (3편)
- [ ] ★ ThreadLocal — 메모리 누수 함정 (2편)
- [ ] ★ ConcurrentHashMap 내부 (3편)
- [ ] ★ ThreadPoolExecutor 튜닝 (4편)

### DB
- [ ] ★ 트랜잭션 격리 수준 deep dive (5편)
- [ ] ★ 인덱스 — B-Tree부터 Covering까지 (4편)
- [ ] ★ MVCC와 잠금 (3편)
- [ ] ★ N+1과 fetch 전략 (3편)
- [ ] ★ 정규화 vs 반정규화 (2편)

### Spring 코어 internals
- [ ] ★ Bean 생명주기 완전 분해 (4편)
- [ ] ★ AOP 내부 동작 — Advisor / Pointcut / Weaving (4편)
- [ ] ★ 프록시 — JDK Dynamic vs CGLIB (3편)
- [ ] ★ DI 방식 — 생성자 / 세터 / 필드 (2편)

### Spring 모듈/기능
- [ ] ★ Transaction Propagation 7가지 (4편)
- [ ] ★ `@Transactional` self-invocation 함정 (2편)

### HTTP / 네트워크
- [ ] ★ HTTP 메소드와 멱등성 (2편)
- [ ] ★ HTTP 상태코드 — 헷갈리는 경계 (2편)
- [ ] ★ TCP 3-way / 4-way handshake — TIME_WAIT까지 (3편)
- [ ] ★ TCP vs UDP — 어디서 어느 것 (2편)

### 보안
- [ ] ★ OAuth 2.0 / OIDC — Authorization Code부터 PKCE (4편)
- [ ] ★ JWT 구조와 함정 — 무효화 어떻게 (3편)
- [ ] ★ Session vs JWT — 언제 어느 것 (2편)

### 분산 시스템
- [ ] ★ CAP 정리 — 실무 적용 (3편)
- [ ] ★ 분산 락 — Redlock 논쟁까지 (3편)
- [ ] ★ Idempotency Key 설계 (2편)

### 캐싱
- [ ] ★ 캐시 전략 — Look-aside / Write-through / Write-behind (3편)
- [ ] ★ 캐시 일관성 패턴 (3편)
- [ ] ★ Cache Stampede 방어 (2편)

### 메시징
- [ ] ★ Kafka 보장 모델 (4편)
- [ ] ★ "Exactly-once"의 환상 (3편)

### Resilience 패턴
- [ ] ★ Retry / Backoff 전략 (3편)
- [ ] ★ Timeout 설계 — Connect / Read / Total (2편)
- [ ] ★ Rate Limiting 알고리즘 — Token / Leaky / Sliding (3편)
- [ ] ★ Circuit Breaker 보강 (기존 시리즈 확장)

### 운영/인프라
- [ ] ★ Load Balancer — L4 vs L7 (2편)
- [ ] ★ Reverse Proxy / API Gateway (3편)
- [ ] ★ Graceful Shutdown 설계 (2편)

### 설계/아키텍처
- [ ] ★ 멱등성 설계 패턴 (3편)
- [ ] ★ REST 원칙과 RESTful 비판 — gRPC와의 비교 (3편)
- [ ] ★ 모놀리스 vs MSA 트레이드오프 (3편)

---

## P1 — 비-★ 시리즈 (P0 끝나면)

### Java 언어
- [ ] Generics와 Type Erasure (3편)
- [ ] Optional, Stream — 사용 패턴 (3편)
- [ ] Checked vs Unchecked Exception (2편)
- [ ] Reference 4종 — Strong / Soft / Weak / Phantom (2편)

### JVM 내부
- [ ] JIT 컴파일러 — C1 / C2 / Graal (3편)
- [ ] String Pool과 String.intern() (2편)
- [ ] Java Memory Model 완전 이해 (4편)

### 동시성
- [ ] ReentrantLock vs synchronized — Condition까지 (3편)
- [ ] CompletableFuture (3편)
- [ ] Virtual Thread (Project Loom) (3편)
- [ ] Race / Deadlock / Livelock — 종류와 진단 (3편)

### DB
- [ ] 낙관적 락 vs 비관적 락 vs CAS (3편)
- [ ] Lock 종류 — shared / exclusive / gap / next-key (3편)
- [ ] Deadlock 진단과 회피 (2편)
- [ ] 쿼리 플래너 읽는 법 (3편)
- [ ] HikariCP — Connection Pool 튜닝 (3편)
- [ ] Replication — Master-Slave lag (3편)
- [ ] 분산 트랜잭션 — 2PC, Saga, Outbox (4편)
- [ ] 샤딩과 파티셔닝 (3편)

### Spring 코어 internals
- [ ] BeanPostProcessor vs BeanFactoryPostProcessor (3편)
- [ ] `@Configuration`의 CGLIB 프록시 (2편)
- [ ] ApplicationContext 계층 (3편)
- [ ] DispatcherServlet 요청 처리 흐름 (4편)
- [ ] `SpringApplication.run()` 내부 (3편)
- [ ] AutoConfiguration 평가 순서 (3편)
- [ ] ApplicationEvent / Listener (2편)

### Spring 모듈
- [ ] `@Async` + ThreadPool 분리 (3편)
- [ ] `@Cacheable` 내부 동작 (2편)
- [ ] WebFlux — Reactor 스케줄러 (4편)
- [ ] Spring Security FilterChain (4편)

### HTTP/네트워크
- [ ] HTTP/1.1 → HTTP/2 → HTTP/3 (4편)
- [ ] HTTPS / TLS handshake (3편)
- [ ] DNS 동작 — 재귀 vs 반복 (2편)
- [ ] Cookie / Session / Token — 트레이드오프 (3편)
- [ ] HTTP Connection Pool 튜닝 (3편)
- [ ] Keep-Alive와 idle timeout (2편)

### 보안
- [ ] CSRF / XSS / SQL Injection 방어 (3편)
- [ ] HTTPS / 인증서 체인 (2편)

### 분산 시스템
- [ ] 합의 알고리즘 — Raft 중심 (4편)
- [ ] Replication 전략 (3편)
- [ ] Eventual Consistency 패턴 (3편)
- [ ] Outbox vs CDC (2편)

### 캐싱
- [ ] Redis 자료구조별 실무 활용 (4편)

### 메시징
- [ ] RabbitMQ vs Kafka 사용처 (3편)

### Resilience
- [ ] Bulkhead 패턴 (2편)

### 운영/인프라
- [ ] Health Check 설계 — Liveness vs Readiness (2편)
- [ ] Docker 기본 — 이미지 레이어, COPY 캐시 (3편)
- [ ] 12-Factor App — 실무 적용 (3편)

### 관측성
- [ ] 로깅 / 메트릭 / 트레이싱 — 3축 (3편)
- [ ] 분산 트레이싱 — Span 컨텍스트 전파 (3편)
- [ ] 메트릭 — Counter / Gauge / Histogram 차이 (2편)

### 설계/아키텍처
- [ ] API 버저닝 전략 (2편)
- [ ] Hexagonal Architecture 실전 (3편)
- [ ] DDD 전술 패턴 (4편)

### 테스트
- [ ] 단위 vs 통합 — 어디까지가 단위인가 (3편)
- [ ] Mockito 함정 (3편)
- [ ] 통합 테스트 전략 — Spring Boot Test (4편)
