import java.util.concurrent.CountDownLatch;
import java.util.concurrent.locks.ReentrantLock;

public class Benchmark {

    static final int OPS_PER_THREAD = 5_000_000;
    static final int WARMUP_OPS = 1_000_000;

    public static void main(String[] args) throws Exception {
        warmup();

        // ============ 단일 스레드 (biased lock 영역) ============
        System.out.println("\n========== 단일 스레드 (락 비용 baseline) ==========");
        System.out.println("OPS: " + String.format("%,d", OPS_PER_THREAD));

        long noLock = benchSingleNoLock();
        long syncSingle = benchSingleSynchronized();
        long reentrantSingle = benchSingleReentrantLock();

        long ops = OPS_PER_THREAD;
        System.out.printf("락 없음:               %,8d ms  →  %,12.0f ops/sec%n",
                noLock, ops * 1000.0 / noLock);
        System.out.printf("synchronized:         %,8d ms  →  %,12.0f ops/sec  (%.1fx vs no-lock)%n",
                syncSingle, ops * 1000.0 / syncSingle, (double) syncSingle / noLock);
        System.out.printf("ReentrantLock:        %,8d ms  →  %,12.0f ops/sec  (%.1fx vs no-lock)%n",
                reentrantSingle, ops * 1000.0 / reentrantSingle, (double) reentrantSingle / noLock);

        // ============ 2 스레드 (lightweight 영역) ============
        runMultiThread(2);

        // ============ 4 스레드 ============
        runMultiThread(4);

        // ============ 16 스레드 (heavyweight 영역) ============
        runMultiThread(16);
    }

    static void runMultiThread(int threads) throws Exception {
        System.out.println("\n========== " + threads + " 스레드 경합 ==========");
        System.out.println("스레드: " + threads + ", OPS/스레드: " + String.format("%,d", OPS_PER_THREAD));

        long sync = benchMultiSync(threads);
        long reentrant = benchMultiReentrant(threads);

        long total = (long) threads * OPS_PER_THREAD;
        System.out.printf("synchronized:         %,8d ms  →  %,12.0f ops/sec%n",
                sync, total * 1000.0 / sync);
        System.out.printf("ReentrantLock:        %,8d ms  →  %,12.0f ops/sec%n",
                reentrant, total * 1000.0 / reentrant);
    }

    // ============ 단일 스레드 ============

    static long benchSingleNoLock() {
        long counter = 0;
        long t0 = System.nanoTime();
        for (int i = 0; i < OPS_PER_THREAD; i++) {
            counter++;
        }
        long elapsed = (System.nanoTime() - t0) / 1_000_000;
        if (counter != OPS_PER_THREAD) throw new AssertionError();
        return elapsed;
    }

    static long benchSingleSynchronized() {
        Object lock = new Object();
        long[] counter = { 0 };
        long t0 = System.nanoTime();
        for (int i = 0; i < OPS_PER_THREAD; i++) {
            synchronized (lock) {
                counter[0]++;
            }
        }
        long elapsed = (System.nanoTime() - t0) / 1_000_000;
        if (counter[0] != OPS_PER_THREAD) throw new AssertionError();
        return elapsed;
    }

    static long benchSingleReentrantLock() {
        ReentrantLock lock = new ReentrantLock();
        long[] counter = { 0 };
        long t0 = System.nanoTime();
        for (int i = 0; i < OPS_PER_THREAD; i++) {
            lock.lock();
            try {
                counter[0]++;
            } finally {
                lock.unlock();
            }
        }
        long elapsed = (System.nanoTime() - t0) / 1_000_000;
        if (counter[0] != OPS_PER_THREAD) throw new AssertionError();
        return elapsed;
    }

    // ============ 다중 스레드 ============

    static long benchMultiSync(int threads) throws Exception {
        Object lock = new Object();
        long[] counter = { 0 };
        CountDownLatch start = new CountDownLatch(1);
        CountDownLatch done = new CountDownLatch(threads);

        for (int i = 0; i < threads; i++) {
            new Thread(() -> {
                try { start.await(); } catch (InterruptedException e) { return; }
                for (int j = 0; j < OPS_PER_THREAD; j++) {
                    synchronized (lock) {
                        counter[0]++;
                    }
                }
                done.countDown();
            }).start();
        }

        long t0 = System.nanoTime();
        start.countDown();
        done.await();
        long elapsed = (System.nanoTime() - t0) / 1_000_000;

        long expected = (long) threads * OPS_PER_THREAD;
        if (counter[0] != expected) throw new AssertionError("sync wrong: " + counter[0]);
        return elapsed;
    }

    static long benchMultiReentrant(int threads) throws Exception {
        ReentrantLock lock = new ReentrantLock();
        long[] counter = { 0 };
        CountDownLatch start = new CountDownLatch(1);
        CountDownLatch done = new CountDownLatch(threads);

        for (int i = 0; i < threads; i++) {
            new Thread(() -> {
                try { start.await(); } catch (InterruptedException e) { return; }
                for (int j = 0; j < OPS_PER_THREAD; j++) {
                    lock.lock();
                    try {
                        counter[0]++;
                    } finally {
                        lock.unlock();
                    }
                }
                done.countDown();
            }).start();
        }

        long t0 = System.nanoTime();
        start.countDown();
        done.await();
        long elapsed = (System.nanoTime() - t0) / 1_000_000;

        long expected = (long) threads * OPS_PER_THREAD;
        if (counter[0] != expected) throw new AssertionError("reentrant wrong: " + counter[0]);
        return elapsed;
    }

    static void warmup() {
        Object lock = new Object();
        ReentrantLock rlock = new ReentrantLock();
        long[] c = { 0 };
        for (int i = 0; i < WARMUP_OPS; i++) {
            synchronized (lock) { c[0]++; }
            rlock.lock();
            try { c[0]++; } finally { rlock.unlock(); }
        }
    }
}
