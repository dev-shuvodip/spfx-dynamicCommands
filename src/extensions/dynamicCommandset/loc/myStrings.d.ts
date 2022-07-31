declare interface IDynamicCommandsetStrings {
  Command1: string;
  Command2: string;
  Command3: string;
  Command4: string;
  Command5: string;
}

declare module 'DynamicCommandsetStrings' {
  const strings: IDynamicCommandsetStrings;
  export = strings;
}
