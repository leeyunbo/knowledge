import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.atomic.AtomicLong;
import java.util.concurrent.atomic.LongAdder;

public class Benchmark {

    static final int THREADS = 16;
    static final int OPS_PER_THREAD = 5_000_000;
    static final int WARMUP_OPS = 1_000_000;

    public static void main(String[] args) throws Exception {
        // 워밍업으로 JIT 컴파일 유도
        warmup();

        System.out.println("\n========== 단일 카운터 (Hot Counter) ==========");
        System.out.println("스레드: " + THREADS + ", 스레드당 increment: " + String.format("%,d", OPS_PER_THREAD));

        long atomicMs = benchAtomicLong();
        long adderMs = benchLongAdder();

        long total = (long) THREADS * OPS_PER_THREAD;
        System.out.printf("AtomicLong:    %,8d ms  →  %,12.0f ops/sec%n",
                atomicMs, total * 1000.0 / atomicMs);
        System.out.printf("LongAdder:     %,8d ms  →  %,12.0f ops/sec%n",
                adderMs, total * 1000.0 / adderMs);
        System.out.printf("LongAdder가 %.1fx 빠름%n", (double) atomicMs / adderMs);

        System.out.println("\n========== Hot Key 시나리오 (모든 스레드가 한 키로) ==========");
        System.out.println("스레드: " + THREADS + ", 스레드당 increment: " + String.format("%,d", OPS_PER_THREAD));

        long mergeMs = benchMergeHotKey();
        long longAdderMapMs = benchLongAdderMapHotKey();

        System.out.printf("CHM.merge(Long::sum):           %,8d ms  →  %,12.0f ops/sec%n",
                mergeMs, total * 1000.0 / mergeMs);
        System.out.printf("CHM<K, LongAdder>.increment():  %,8d ms  →  %,12.0f ops/sec%n",
                longAdderMapMs, total * 1000.0 / longAdderMapMs);
        System.out.printf("LongAdder 패턴이 %.1fx 빠름%n", (double) mergeMs / longAdderMapMs);

        System.out.println("\n========== 분산 키 시나리오 (스레드별 다른 키) ==========");
        System.out.println("스레드: " + THREADS + ", 스레드당 increment: " + String.format("%,d", OPS_PER_THREAD));

        long mergeDistMs = benchMergeDistributedKey();
        long longAdderMapDistMs = benchLongAdderMapDistributedKey();

        System.out.printf("CHM.merge(Long::sum):           %,8d ms  →  %,12.0f ops/sec%n",
                mergeDistMs, total * 1000.0 / mergeDistMs);
        System.out.printf("CHM<K, LongAdder>.increment():  %,8d ms  →  %,12.0f ops/sec%n",
                longAdderMapDistMs, total * 1000.0 / longAdderMapDistMs);
    }

    static long benchAtomicLong() throws Exception {
        AtomicLong counter = new AtomicLong();
        CountDownLatch start = new CountDownLatch(1);
        CountDownLatch done = new CountDownLatch(THREADS);

        for (int i = 0; i < THREADS; i++) {
            new Thread(() -> {
                try { start.await(); } catch (InterruptedException e) { return; }
                for (int j = 0; j < OPS_PER_THREAD; j++) {
                    counter.incrementAndGet();
                }
                done.countDown();
            }).start();
        }

        long t0 = System.nanoTime();
        start.countDown();
        done.await();
        long elapsed = (System.nanoTime() - t0) / 1_000_000;

        // 결과 검증
        long expected = (long) THREADS * OPS_PER_THREAD;
        if (counter.get() != expected) throw new AssertionError("AtomicLong wrong: " + counter.get());

        return elapsed;
    }

    static long benchLongAdder() throws Exception {
        LongAdder counter = new LongAdder();
        CountDownLatch start = new CountDownLatch(1);
        CountDownLatch done = new CountDownLatch(THREADS);

        for (int i = 0; i < THREADS; i++) {
            new Thread(() -> {
                try { start.await(); } catch (InterruptedException e) { return; }
                for (int j = 0; j < OPS_PER_THREAD; j++) {
                    counter.increment();
                }
                done.countDown();
            }).start();
        }

        long t0 = System.nanoTime();
        start.countDown();
        done.await();
        long elapsed = (System.nanoTime() - t0) / 1_000_000;

        long expected = (long) THREADS * OPS_PER_THREAD;
        if (counter.sum() != expected) throw new AssertionError("LongAdder wrong: " + counter.sum());

        return elapsed;
    }

    static long benchMergeHotKey() throws Exception {
        ConcurrentHashMap<String, Long> map = new ConcurrentHashMap<>();
        CountDownLatch start = new CountDownLatch(1);
        CountDownLatch done = new CountDownLatch(THREADS);

        for (int i = 0; i < THREADS; i++) {
            new Thread(() -> {
                try { start.await(); } catch (InterruptedException e) { return; }
                for (int j = 0; j < OPS_PER_THREAD; j++) {
                    map.merge("hot-key", 1L, Long::sum);
                }
                done.countDown();
            }).start();
        }

        long t0 = System.nanoTime();
        start.countDown();
        done.await();
        long elapsed = (System.nanoTime() - t0) / 1_000_000;

        long expected = (long) THREADS * OPS_PER_THREAD;
        if (map.get("hot-key") != expected) throw new AssertionError("merge wrong: " + map.get("hot-key"));

        return elapsed;
    }

    static long benchLongAdderMapHotKey() throws Exception {
        ConcurrentHashMap<String, LongAdder> map = new ConcurrentHashMap<>();
        map.put("hot-key", new LongAdder());

        CountDownLatch start = new CountDownLatch(1);
        CountDownLatch done = new CountDownLatch(THREADS);

        for (int i = 0; i < THREADS; i++) {
            new Thread(() -> {
                try { start.await(); } catch (InterruptedException e) { return; }
                LongAdder adder = map.get("hot-key");
                for (int j = 0; j < OPS_PER_THREAD; j++) {
                    adder.increment();
                }
                done.countDown();
            }).start();
        }

        long t0 = System.nanoTime();
        start.countDown();
        done.await();
        long elapsed = (System.nanoTime() - t0) / 1_000_000;

        long expected = (long) THREADS * OPS_PER_THREAD;
        if (map.get("hot-key").sum() != expected) throw new AssertionError("LongAdder wrong");

        return elapsed;
    }

    static long benchMergeDistributedKey() throws Exception {
        ConcurrentHashMap<String, Long> map = new ConcurrentHashMap<>();
        CountDownLatch start = new CountDownLatch(1);
        CountDownLatch done = new CountDownLatch(THREADS);

        for (int i = 0; i < THREADS; i++) {
            final int tid = i;
            new Thread(() -> {
                try { start.await(); } catch (InterruptedException e) { return; }
                String myKey = "thread-" + tid;
                for (int j = 0; j < OPS_PER_THREAD; j++) {
                    map.merge(myKey, 1L, Long::sum);
                }
                done.countDown();
            }).start();
        }

        long t0 = System.nanoTime();
        start.countDown();
        done.await();
        return (System.nanoTime() - t0) / 1_000_000;
    }

    static long benchLongAdderMapDistributedKey() throws Exception {
        ConcurrentHashMap<String, LongAdder> map = new ConcurrentHashMap<>();
        for (int i = 0; i < THREADS; i++) {
            map.put("thread-" + i, new LongAdder());
        }

        CountDownLatch start = new CountDownLatch(1);
        CountDownLatch done = new CountDownLatch(THREADS);

        for (int i = 0; i < THREADS; i++) {
            final int tid = i;
            new Thread(() -> {
                try { start.await(); } catch (InterruptedException e) { return; }
                LongAdder adder = map.get("thread-" + tid);
                for (int j = 0; j < OPS_PER_THREAD; j++) {
                    adder.increment();
                }
                done.countDown();
            }).start();
        }

        long t0 = System.nanoTime();
        start.countDown();
        done.await();
        return (System.nanoTime() - t0) / 1_000_000;
    }

    static void warmup() {
        AtomicLong al = new AtomicLong();
        LongAdder la = new LongAdder();
        ConcurrentHashMap<String, Long> mergeMap = new ConcurrentHashMap<>();
        ConcurrentHashMap<String, LongAdder> adderMap = new ConcurrentHashMap<>();
        adderMap.put("k", new LongAdder());

        for (int i = 0; i < WARMUP_OPS; i++) {
            al.incrementAndGet();
            la.increment();
            mergeMap.merge("k", 1L, Long::sum);
            adderMap.get("k").increment();
        }
    }
}
