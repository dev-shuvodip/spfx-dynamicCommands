declare interface ICustomListFormCustomizerStrings {
  Save: string;
  Cancel: string;
  Close: string;
  Title: string;
  RequestID: string;
  ReceivedDate: string;
  Status: string;
  Approved: boolean;
}

declare module 'CustomListFormCustomizerStrings' {
  const strings: ICustomListFormCustomizerStrings;
  export = strings;
}
