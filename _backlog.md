# 백엔드 면접 대비 — 시리즈 백로그

**범례**: `[ ]` TODO · `[~]` 진행중 · `[x]` 완료 · ★ 면접 단골

---

## P0 — ★ 시리즈만 먼저 (~45 시리즈, ~130편)

### Java 언어
- [x] ★ `equals` / `hashCode` 계약 — 위반 시 무슨 일이 (3편)
- [x] ★ HashMap 내부 — 해시 충돌, 리해싱, treeify (4편)
- [ ] ★ Collection 비교 — ArrayList vs LinkedList, HashMap vs TreeMap (3편)

### JVM 내부
- [x] ★ JVM 메모리 구조 — Heap / Metaspace / Stack / Direct Memory (4편)
- [x] ★ GC 진화사 — Serial → ZGC, Shenandoah (5편)
- [ ] ★ ClassLoader 동작 — 부모 위임 모델 (3편)

### 동시성 (Level 2 — j.u.c 별자리 23개)

> **Single source**: 진행 상태는 `concurrency.html`의 노드 `data-state`(locked/progress/done)와 이 섹션 체크박스를 동시 갱신.
> 별자리 페이지 링크: [/concurrency.html](./concurrency.html)

#### Group A — 기초 동기화 (파랑)
- [x] ★ 1. `synchronized` & 모니터 락 — 객체 헤더, biased/lightweight/heavyweight (3편)
- [x] ★ 2. `volatile` & JMM — 가시성 vs 원자성, happens-before (3편)
- [ ] ★ 3. `ReentrantLock` — tryLock, 인터럽트 가능, Condition (3편)
- [ ] 4. `ReadWriteLock` / `StampedLock` — optimistic read (2편)

#### Group B — 락 없는 동시성 (보라)
- [ ] ★ 5. CAS (Compare-And-Swap) — CPU 명령어, ABA 문제 (2편)
- [ ] ★ 6. `Atomic*` 패밀리 — `AtomicInteger`부터 `LongAdder`까지 (2편)
- [ ] ★ 7. 동시성 컬렉션 — `ConcurrentHashMap` 내부, `COWArrayList`, `ConcLinkedQueue` (3편)

#### Group C — 스레드풀 (초록)
- [ ] 8. `ExecutorService` — Runnable vs Callable, `Executors` 팩토리 함정 (2편)
- [ ] ★ 9. `ThreadPoolExecutor` 7인자 — core/max, queue, RejectedHandler (4편)
- [ ] 10. `Future` / `Callable` — `get()` 블로킹, `cancel()`의 진짜 의미 (2편)
- [ ] ★ 11. 풀 사이징 이론 — CPU vs I/O bound, Little's Law (2편)

#### Group D — 큐와 생산자/소비자 (주황)
- [ ] 12. `BlockingQueue` 패밀리 — Array/Linked/Synchronous/Priority/Delay (2편)
- [ ] 13. 생산자/소비자 패턴 — put/take/offer/poll, graceful shutdown (2편)

#### Group E — 동기화 도구 (핑크)
- [ ] 14. `CountDownLatch` — N개 끝날 때까지 대기 (1편)
- [ ] 15. `CyclicBarrier` — N명 모일 때까지 (재사용) (1편)
- [ ] 16. `Semaphore` — 동시 N개만 통과 (Rate limit 토대) (1편)
- [ ] 17. `Phaser` — Latch+Barrier 합성, 동적 참여자 (1편)
- [ ] 18. `Exchanger` — 두 스레드 1:1 데이터 교환 (1편)

#### Group F — 함정 (회색)
- [ ] ★ 19. Deadlock — 4조건, 예방/회피/탐지 (3편)
- [ ] 20. Livelock / Starvation — 굶는 스레드 (1편)
- [ ] ★ 21. `ThreadLocal` 함정 — 메모리 누수, 스레드풀과 상극 (2편)
- [ ] 22. `InterruptedException` 처리법 — 삼키지 말고 복원 (1편)
- [ ] 23. Double-Checked Locking — `volatile` 없으면 깨지는 이유 (1편)

### DB
- [x] ★ 트랜잭션 격리 수준 deep dive (5편)
- [x] ★ 인덱스 — B-Tree부터 Covering까지 (4편)
- [x] ★ MVCC와 잠금 (3편)
- [x] ★ N+1과 fetch 전략 (3편)
- [ ] ★ 정규화 vs 반정규화 (2편)

### Spring 코어 internals
- [x] ★ Bean 생명주기 완전 분해 (4편)
- [x] ★ AOP 내부 동작 — Advisor / Pointcut / Weaving (4편)
- [x] ★ 프록시 — JDK Dynamic vs CGLIB (3편)
- [x] ★ DI 방식 — 생성자 / 세터 / 필드 (2편)

### Spring 모듈/기능
- [x] ★ Transaction Propagation 7가지 (4편)
- [x] ★ `@Transactional` self-invocation 함정 (2편)

### 네트워크
- [x] ★ HTTP 메소드와 멱등성 (2편)
- [x] ★ HTTP 상태코드 — 헷갈리는 경계 (2편)
- [x] ★ TCP 3-way / 4-way handshake — TIME_WAIT까지 (3편)
- [ ] ★ TCP vs UDP — 어디서 어느 것 (2편)

### 보안
- [ ] ★ OAuth 2.0 / OIDC — Authorization Code부터 PKCE (4편)
- [x] ★ JWT 구조와 함정 — 무효화 어떻게 (3편)
- [x] ★ Session vs JWT — 언제 어느 것 (2편)

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

### 동시성 (Level 3+ — L2 별자리 끝낸 뒤)
- [ ] CompletableFuture (3편) — Level 3
- [ ] ForkJoinPool 내부 — work-stealing, compensation thread (3편) — Level 3
- [ ] `parallelStream` 함정 — commonPool 공유의 위험 (2편) — Level 3
- [ ] Reactor `Schedulers` — parallel/boundedElastic/single 차이 (3편) — Level 4
- [ ] Virtual Thread (Project Loom) — 풀 사이징의 종말 (3편) — Level 5
- [ ] Structured Concurrency — 자식 스레드 생명주기 (2편) — Level 5

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
- [x] HTTP Connection Pool 튜닝 (3편)
- [x] Keep-Alive와 idle timeout (2편)

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
