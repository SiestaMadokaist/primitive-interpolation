/**
 * @description
 * should success
 */
import { CustomClass, validate } from './CustomClass';
async function main(): Promise<void> {
  const customClass = new CustomClass();
  validate(`${customClass.customBool}`);
}
