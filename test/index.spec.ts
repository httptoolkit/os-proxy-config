import { expect } from 'chai';
import { getSystemProxy } from '../src/index';

describe("SysProxy", () => {
    // Basic test, which assumes these is currently no proxy configured!
    it("can get the system proxy on this platform", async () => {
        expect(await getSystemProxy()).to.equal(undefined);
    });
});