import { CUSTOM_ENUM, CustomClass } from '../CustomClass';

async function main<K extends CUSTOM_ENUM>(): Promise<void> {
  const myCustomClass = new CustomClass();
  const bar: K = CUSTOM_ENUM.BAR as K;
  // const sCustomClass = `${myCustomClass}`;
  // const child: WhitelistedChild = new Whitelisted();
  // const sWhitelisted = `${child}`;
  // const sCustomClassConst = `${CustomClass}`;
  const sK = `${bar}`;
  // const sCustomFunction = `${myCustomClass.customFunction}`;
  // const sCustomCalledFunction = `${myCustomClass.customFunction()}`;
  // const sCustomAsyncFunction = `${myCustomClass.asyncFunction}`;
  // const sCustomCalledAsyncFunction = `${myCustomClass.asyncFunction()}`;
  // const sCustomAwaitedCalledAsyncFunction = `${await myCustomClass.asyncFunction()}`;
  // const sMixed = `${await myCustomClass.asyncFunction()}:${myCustomClass.asyncFunction()}`;
  // const sCustomAny = `${myCustomClass.customAny}`;
  // const sCustomArray = `${myCustomClass.customArray}`;
  // const sCustomBool = `${myCustomClass.customBool}`;
  // const sCustomDate = `${myCustomClass.customDate}`;
  // const sCustomNumber = `${myCustomClass.customNumber}`;
  // const sCustomString = `${myCustomClass.customString}`;
  // const sCustomUnknown = `${myCustomClass.customInferred}`;
  // const sCustomEnum = `${myCustomClass.customEnum}`;
}
