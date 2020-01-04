/**
 * @description
 * should success
 */
import { validate } from './CustomClass';
import { FirstWhitelist, IWhitelist, SecondWhitelist } from './Whitelisted';
async function main(): Promise<void> {
  const whitelisted: IWhitelist = new SecondWhitelist();
  validate(`${whitelisted}`);
}
