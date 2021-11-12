export interface Table {
  "correctIndex": string,
  "basicAddress": string,
  entries:
    [
      { index: string, value: string },
      { index: string, value: string },
      { index: string, value: string },
      { index: string, value: string }
    ]
  selectedEntry?:{index:string, value:string},
  correctEntry:{index:string, value:string};
}
