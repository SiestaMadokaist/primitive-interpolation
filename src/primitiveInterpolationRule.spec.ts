import { helper } from './lintRunner';
const rule = 'primitive-interpolation';

describe('primitive-interpolation only allows primitive object inside string interpolation', () => {
    it ('refuse any non-primitive object', async () => {
        const path = `${__dirname}/code/stringInterpolation.ts`;
        const whitelists: string[] = [];
        const result = helper({ filepath: path, rule, whitelists });
        // todo
        expect(result.failures.length).toBe(9);
    });
    it('allows whitelisted type', async () => {
        const path = `${__dirname}/code/stringInterpolation.ts`;
        const whitelists: string[] = ['CustomClass'];
        const result = helper({ filepath: path, rule, whitelists });
        // todo
        expect(result.failures.length).toBe(7);
    });
});
