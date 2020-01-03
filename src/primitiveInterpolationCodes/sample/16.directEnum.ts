/**
 * @description
 * should success
 */
import { CUSTOM_ENUM, validate } from '../CustomClass';
async function main(): Promise<void> {
  validate(`${CUSTOM_ENUM.BAR}`);
}
