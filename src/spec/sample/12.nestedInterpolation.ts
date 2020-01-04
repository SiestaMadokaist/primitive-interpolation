/**
 * @description
 * should success
 */
import { CustomClass, validate } from './CustomClass';
async function main(): Promise<void> {
  const customClass = new CustomClass();
  validate(`${customClass.stringify(`${customClass.stringify(`${customClass.customEnum}`)}`)}`);
}
