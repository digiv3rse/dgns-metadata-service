import avaTest, { ExecutionContext, TestFn } from 'ava';
import { TestContext } from '../mock/interface';

function requireUncached(module: string) {
    delete require.cache[require.resolve(module)];
    return require(module);
}

const test = avaTest as TestFn<TestContext>;

test.after('cleanup', t => {
    delete process.env.NETWORK
    delete process.env.HOST
    delete process.env.ENV
});

test('should get SERVER_URL as given custom host', async (t: ExecutionContext<TestContext>) => {
    const DGNS = 'app.dgns.domains';
    process.env.NETWORK = "local"
    process.env.HOST = DGNS
    process.env.ENV = "main"
    const { SERVER_URL } = requireUncached('../src/config');
    t.is(SERVER_URL, `https://${DGNS}`);
});
