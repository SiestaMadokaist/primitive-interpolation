/**
 * @description
 * should success
 */
import { validate } from './CustomClass';
import { SecondWhitelist } from './Whitelisted';
async function main(): Promise<void> {
  validate(`${SecondWhitelist}`);
}
