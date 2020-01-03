import * as Lint from 'tslint';
import * as tsutils from 'tsutils';
import { isCallExpression, isExpressionStatement, isPropertyAccessExpression, isTemplateExpression } from 'tsutils';
import * as ts from 'typescript';
export class Rule extends Lint.Rules.TypedRule {
    /* tslint:disable:object-literal-sort-keys */
    static metadata: Lint.IRuleMetadata = {
        ruleName: 'primitive-interpolation',
        description: 'expression inside of string interpolation must resolve to a primitive objects',
        descriptionDetails:
            'string interpolation is type-unsafe in that you might forget to await a promise inside it',
        optionsDescription: Lint.Utils.dedent`
            A list of \'string\' names of any additional classes that would be allowed inside the string interpolation.
        `,
        options: {
            type: 'list',
            listType: {
                type: 'array',
                items: { type: 'string' },
            },
        },
        optionExamples: [true, [true, 'BigNumber']],
        rationale: Lint.Utils.dedent`
            String Interpolation, like \`\${myVariable}\` is usually type-unsafe.
            Since every kind of type would be allowed inside the string interpolation.
            Often, such string interpolation would resolve to: "[object Object]" which is rarely the intended behavior.
            This rules, ensure that the variable passed should only be a primitive value: (number|boolean|string)

            You can add a custom-class to be whitelisted inside the options.
        `,
        type: 'functionality',
        typescriptOnly: true,
        requiresTypeInfo: true,
    };
    constructor(options: IWalkerOptions) { super(options); }

    applyWithProgram(sourceFile: ts.SourceFile, program: ts.Program): Lint.RuleFailure[] {
        return this.applyWithFunction(
            sourceFile,
            createWalker(this.getOptions()),
            ['Promise', ...(this.ruleArguments as string[])],
            program,
        );
    }
}

interface IWalkerOptions extends Lint.IOptions {
    ruleArguments: string[];
}

const BLACKLISTED: Set<string> = new Set([
    '__object',
    'Array',
    'Date',
    'Promise',
    'Set',
    'Map',
]);

function hasCallSignatures(type: ts.Type): boolean {
    const callSignatures = type.getCallSignatures();
    if (typeof callSignatures === 'undefined') { return false; }
    return callSignatures.length > 0;
}

function isWhiteListed(type: ts.Type, whitelist: Set<string>): boolean {
    const symbol = type.getSymbol() || { name: '' };
    if (whitelist.has(symbol.name)) { return true; }
    const baseTypes = type.getBaseTypes();
    if (baseTypes === undefined) { return false; }
    const [ baseType ] = baseTypes;
    if (baseType === undefined) { return false; }
    return isWhiteListed(baseType, whitelist);
}

function childOfPrimitive(type: ts.Type): boolean {
    return type.getBaseTypes() === undefined;
}

function createWalker(options: IWalkerOptions): (ctx: Lint.WalkContext<string[]>, program: ts.Program) => void {
    const whitelist = new Set(options.ruleArguments || []);
    return function walkFn(ctx: Lint.WalkContext<string[]>, program: ts.Program): void {
        const tc = program.getTypeChecker();
        return ts.forEachChild(ctx.sourceFile, function cb(node: ts.Node): void {
            const grandParent = (node.parent || {}).parent;
            const jmp = () => ts.forEachChild(node, cb);
            const addFailure = (): void => {
                const symbol = type.symbol || { name: undefined };
                ctx.addFailureAtNode(node, `interpolated variable "${node.getFullText()}" must be a primitive value, got ${symbol.name} instead`);
                return jmp();
            };
            if (grandParent === undefined) { return jmp(); }
            if (!ts.isTemplateExpression(grandParent)) { return jmp(); }
            const type = tc.getTypeAtLocation(node);
            if (type.symbol === undefined) { return jmp(); }
            if (isWhiteListed(type, whitelist)) { return jmp(); }
            if (BLACKLISTED.has(type.symbol.name)) { return addFailure(); }
            if (hasCallSignatures(type)) { return addFailure(); }
            if (childOfPrimitive(type)) { return jmp(); }
            return addFailure();
        });
    };
}
