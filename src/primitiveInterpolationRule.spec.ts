import { LintResult } from 'tslint';
import { helper } from './lintRunner';
const rule = 'primitive-interpolation';

const testFile = (index: number, fileName: string, whitelists: string[] = []): LintResult => {
    const filepath = `${__dirname}/primitiveInterpolationCodes/sample/${index}.${fileName}.ts`;
    return helper({ filepath, rule, whitelists });
};

const validateHasError = (result: LintResult, nonPrimitiveName: string) => {
    const errorMessage = `got ${nonPrimitiveName} instead`;
    expect(result.failures.length).toBe(1);
    expect(result.failures[0].getFailure()).toContain(errorMessage);
};

describe('primitive-interpolation only allows primitive object inside string interpolation', () => {
    it('refuse customClass', () => {
        const result = testFile(1, 'customClass');
        validateHasError(result, 'CustomClass');
    });
    it('refuse customFunction', () => {
        const result = testFile(2, 'customFunction');
        validateHasError(result, 'customFunction');
    });
    it('accept called customFunction that return primitive values', () => {
        const result = testFile(3, 'calledCustomFunction');
        expect(result.failures.length).toBe(0);
    });
    it('refuse asyncFunction', () => {
        const result = testFile(4, 'asyncFunction');
        validateHasError(result, 'asyncFunction');
    });
    it('refuse called asyncFunction', () => {
        const name = 'calledAsyncFunction';
        const result = testFile(5, name);
        validateHasError(result, 'Promise');
    });
    it('accept awaited called asyncFunction', () => {
        const name = 'awaitedAsyncFunction';
        const result = testFile(6, name);
        expect(result.failures.length).toBe(0);
    });
    it('accept boolean', () => {
        const result = testFile(7, 'customBool');
        expect(result.failures.length).toBe(0);
    });
    it('accept number', () => {
        const result = testFile(8, 'customNumber');
        expect(result.failures.length).toBe(0);
    });
    it('accept string', () => {
        const result = testFile(9, 'customString');
        expect(result.failures.length).toBe(0);
    });
    it('refused object', () => {
        const result = testFile(10, 'customInferredObject');
        validateHasError(result, '__object');
    });
    it('accept enum', () => {
        const result = testFile(11, 'customEnum');
        expect(result.failures.length).toBe(0);
    });
    it('accept nested Interpolation', () => {
        const result = testFile(12, 'nestedInterpolation');
        expect(result.failures.length).toBe(0);
    });
    it('accept mixedSuccess', () => {
        const result = testFile(13, 'mixedSuccess');
        expect(result.failures.length).toBe(0);
    });
    it('refuse mixedFailed', () => {
        const result = testFile(14, 'mixedFailed');
        validateHasError(result, 'Promise');
    });
    it('refuse whitelisted that is not whitelisted', () => {
        const result = testFile(15, 'whitelisted');
        validateHasError(result, 'IWhitelist');
    });
    it('accept whitelisted after being whitelisted', () => {
        const result = testFile(15, 'whitelisted', ['BaseWhitelist']);
        expect(result.failures.length).toBe(0);
    });
});
