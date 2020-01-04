export abstract class BaseWhitelist {}
export class FirstWhitelist extends BaseWhitelist {}
export class SecondWhitelist extends FirstWhitelist {}
// tslint:disable-next-line:interface-name
export interface IWhitelist extends SecondWhitelist {
  bar?: string;
}
