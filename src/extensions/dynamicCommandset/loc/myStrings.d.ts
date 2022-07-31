declare interface IDynamicCommandsetCommandSetStrings {
  Command1: string;
  Command2: string;
  Command3: string;
  Command4: string;
  Command5: string;
}

declare module 'DynamicCommandsetCommandSetStrings' {
  const strings: IDynamicCommandsetCommandSetStrings;
  export = strings;
}
