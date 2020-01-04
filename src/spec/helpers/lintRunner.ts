import * as fs from 'fs';
import { Configuration, Linter, Replacement } from 'tslint';
import { AbstractRule } from 'tslint/lib/rules';
import { createProgram } from 'typescript';

export const helper = (params: { filepath: string, rule: string, whitelists: string[] }) => {
    const { filepath, rule } = params;
    const program = Linter.createProgram('./tsconfig.json');
    const linter = new Linter({fix: false}, program);
    const src = fs.readFileSync(filepath).toString();
    linter.lint(filepath, src, Configuration.parseConfigFile({
        rules: {
            [rule]: {
                options: params.whitelists,
                severity: 'error',
            },
        },
        rulesDirectory: 'src',
    }));
    return linter.getResult();
};

// export const getFixedResult = ({src, rule}) => {
//     const result = helper({src, rule});
//     return Replacement.applyFixes(src, [result.failures[0].getFix()]);
// };
