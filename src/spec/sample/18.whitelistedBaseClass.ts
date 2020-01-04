/**
 * @description
 * should success
 */
import { validate } from './CustomClass';
import { BaseWhitelist } from './Whitelisted';
async function main(): Promise<void> {
  validate(`${BaseWhitelist}`);
}
