type PhantomString<T> = string & { x?: T };

class CustomClass {
  customAny: any = 'hello';
  customArray: string[] = ['hello'];
  customBool: boolean = true;
  customDate: Date = new Date();
  // tslint:disable-next-line:typedef
  customInferred = { fuck: 'that' };
  customNumber: number = 5;
  customString: string = 'hello';

  async asyncFunction(): Promise<PhantomString<'foobar'>> {
    return 'hello';
  }

  customFunction(): string {
    return 'hello';
  }

}

async function main(): Promise<void> {
  const myCustomClass = new CustomClass();
  const sCustomClass = `${myCustomClass}`;
  const sCustomClassConst = `${CustomClass}`;
  const sCustomFunction = `${myCustomClass.customFunction}`;
  const sCustomCalledFunction = `${myCustomClass.customFunction()}`;
  const sCustomAsyncFunction = `${myCustomClass.asyncFunction}`;
  const sCustomCalledAsyncFunction = `${myCustomClass.asyncFunction()}`;
  const sCustomAwaitedCalledAsyncFunction = `${await myCustomClass.asyncFunction()}`;
  const sMixed = `${await myCustomClass.asyncFunction()}:${myCustomClass.asyncFunction()}`;
  const sCustomAny = `${myCustomClass.customAny}`;
  const sCustomArray = `${myCustomClass.customArray}`;
  const sCustomBool = `${myCustomClass.customBool}`;
  const sCustomDate = `${myCustomClass.customDate}`;
  const sCustomNumber = `${myCustomClass.customNumber}`;
  const sCustomString = `${myCustomClass.customString}`;
  const sCustomUnknown = `${myCustomClass.customInferred}`;
}

main();
