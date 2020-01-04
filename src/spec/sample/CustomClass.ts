type PhantomString<T> = string & { x?: T };

export enum CUSTOM_ENUM {
  BAR = 'BAR',
  FOO = 'FOO',
}

export class CustomClass {
  customAny: any = 'hello';
  customArray: string[] = ['hello'];
  customBool: boolean = true;
  customDate: Date = new Date();
  customEnum: CUSTOM_ENUM = CUSTOM_ENUM.BAR;
  // tslint:disable-next-line:typedef
  customInferred = { fuck: 'that' };
  customNumber: number = 5;
  customString: string = 'hello';

  async asyncFunction(): Promise<PhantomString<'foobar'>> {
    return 'hello';
  }

  customFunction(): string {
    return `${this.privateFunction()}`;
  }

  stringify(item: string): string {
    return item;
  }

  private privateFunction(): string {
    return 'yes';
  }

}

export function validate(item: string): void {}
