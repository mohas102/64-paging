// import { Injectable } from '@angular/core';
// import Rand from "rand-seed";
// import {Table} from "../model/Table";
// import {Task} from "../model/Task";
// import {ToSaved} from "../model/ToSaved";
// import {Router} from "@angular/router";
// import {Observable, timer} from "rxjs";
// import {takeUntil} from "rxjs/operators";
//
//
// @Injectable({
//   providedIn: 'root'
// })
// export class Service {
//   get TIME_LIMIT(): number {
//     return this._TIME_LIMIT;
//   }
//   set TIME_LIMIT(value: number) {
//     this._TIME_LIMIT = value;
//   }
//
//   constructor(private router: Router) { }
//
//   private _completeTask!: Task;
//
//   private _task!: Task;
//
//   set task(value: Task) {
//     this._task = value;
//   }
//
//   get completeTask(): Task {
//     return this._completeTask;
//   }
//
//   get task(): Task {
//     return this._task;
//   }
//
//   getAdressAsAufgeteilt(adresse: string): { "offset": string, "level1": string, "level2": string, "level3": string, "level4": string } {
//     let adressWith64Bit = this.fromHexToBinary(adresse);
//     let offsetAsBinary = adressWith64Bit.slice(64 - 12, 64);
//     let level1AsBinary = adressWith64Bit.slice(64 - 12 - 9, 64 - 12);
//     let level2AsBinary = adressWith64Bit.slice(64 - 12 - 9 - 9, 64 - 12 - 9);
//     let level3AsBinary = adressWith64Bit.slice(64 - 12 - 9 - 9 - 9, 64 - 12 - 9 - 9);
//     let level4AsBinary = adressWith64Bit.slice(64 - 12 - 9 - 9 - 9 - 9, 64 - 12 - 9 - 9 - 9);
//     // convert from Binary to Hex
//     let offset = parseInt(offsetAsBinary, 2).toString(16);
//     let level1 = parseInt(level1AsBinary, 2).toString(16);
//     let level2 = parseInt(level2AsBinary, 2).toString(16);
//     let level3 = parseInt(level3AsBinary, 2).toString(16);
//     let level4 = parseInt(level4AsBinary, 2).toString(16);
//     return {offset: offset, level1: level1, level2: level2, level3: level3, level4: level4};
//   }
//
//   fromHexToBinary(adresse: string) {
//     // parse to Number
//     // TODO PARSE NUMBER GREATER THAN number.max_safe_integer
//     let numberInDecimal = parseInt(adresse, 16);
//     // convert to binary
//     let numberToBinary = numberInDecimal.toString(2);
//     // 64Bit mit 0 auffüllen falls es kein 64 bits sind
//     let adressWith64Bit = numberToBinary.padStart(64, '0');
//     // Aufteilen
//     return adressWith64Bit;
//   }
//
//   schuffle(param: Array<any>): any {
//     // We put each element in the array in an object, and give it a random sort key
//     // We sort using the random key
//     // We unmap to get the original objects
//     let schuffeld = param.map((value) => ({value, sort: Math.random()}))
//       .sort((a, b) => a.sort - b.sort)
//       .map(({value}) => value)
//     return schuffeld;
//   }
//
//   getRandomInt(max:number, random:Rand): string {
//     return Math.floor(random.next() * max).toString(16);
//   }
//
//   CreateTable(level: string, baseAdress: string, levelFromAnohterAufteilung: string, seed:string): Table {
//     /*
//     um eine Tabelle zu erzeugen ist ein seed und die BasisAdresse von dem zu erzgeten Tabelle nötig
//     da die Werte von den beiden addiert werden fürs random genartor
//     das garantiert uns beim jedem Hochladen die gleiche werte zu kriegen
//     und das Addieren von BasisAdresse garntiert uns verschiedene Werte für jede Tabelle pro Stufe zu kriegen
//     levelFromAnohterAufteilung ist für erhöhen die Schwierigkeit gedacht, ihne den kann der User einfach die richtige
//     Index für eine Stufe herausfinden, da der richtige Index für jede Tabelle pro Stufe existieren muss
//      */
//     const rand = new Rand(seed+baseAdress);
//     let r: string = this.getRandomInt(4095,rand);
//     let entries = [
//       {index: level, value: r},
//       {index: this.getRandomInt(4095,rand), value: this.getRandomInt(4095,rand)},
//       {index: levelFromAnohterAufteilung, value: this.getRandomInt(4095,rand)},
//       {index: this.getRandomInt(4095,rand), value: this.getRandomInt(4095,rand)}
//     ]
//     /*
//     das Mischen der Einträge ist fürs Erhähen der Schwierigkeit gedacht
//     damit der erste Eintrag nicht immer den richtigen Eintrag wäre
//      */
//     let schuffeldEntries = this.schuffle(entries);
//     return {derRichtigerIndex: r, basicAdress: baseAdress, entries: schuffeldEntries};
//   }
//
//   GenerateTask(adresse: string, seed:string) {
//     let adressAsAufgeteilt: { "offset": string, "level1": string, "level2": string, "level3": string, "level4": string } = this.getAdressAsAufgeteilt(adresse);
//     this.createCompleteTask(adresse,adressAsAufgeteilt,seed);
//     let stufe4: Table = this.CreateTable(adressAsAufgeteilt.level4, '0', adressAsAufgeteilt.level3,seed);
//     this._task = {
//       adressAufteilung: adressAsAufgeteilt,
//       adresse: adresse,
//       PML4: stufe4,
//       seed: seed
//     };
//   }
//
//   private createCompleteTask(adresse:string,adressAsAufgeteilt: { offset: string; level1: string; level2: string; level3: string; level4: string }, seed: string):Task {
//
//     let stufe4: Table = this.CreateTable(adressAsAufgeteilt.level4, '0', adressAsAufgeteilt.level3,seed);
//     let stufe3 :Table = this.CreateTable(adressAsAufgeteilt.level3, stufe4.derRichtigerIndex ,adressAsAufgeteilt.level2,seed);
//     let stufe2 :Table= this.CreateTable(adressAsAufgeteilt.level2, stufe3.derRichtigerIndex,adressAsAufgeteilt.level1,seed);
//     let stufe1 :Table = this.CreateTable(adressAsAufgeteilt.level1, stufe2.derRichtigerIndex,adressAsAufgeteilt.level4,seed);
//     return  this._completeTask ={
//       adressAufteilung: adressAsAufgeteilt,
//       adresse: adresse,
//       PML4: stufe4,
//       PDPT: stufe3,
//       PDT: stufe2,
//       PT: stufe1,
//       result: adressAsAufgeteilt.offset + stufe1.derRichtigerIndex,
//       seed: seed
//     }
//   }
//
//   addTableToLevel3(idOfTable: string, row:any, stufe1: Table) {
//
//     if(!this.isRowSelected(stufe1, row)){
//       let newTable: Table = this.CreateTable(this._task.adressAufteilung.level3, idOfTable, this._task.adressAufteilung.level2,this.task.seed);
//       this._task.PDPT = newTable;
//       this._task.PDT = undefined;
//       this._task.PT = undefined;
//     }
//
//   }
//
//   addTableToLevel2(idOfTable: string, row:any, stufe1:Table) {
//     if(!this.isRowSelected(stufe1, row)){
//       let newTable: Table = this.CreateTable(this._task.adressAufteilung.level2, idOfTable, this._task.adressAufteilung.level1,this._task.seed);
//       this._task.PDT =  newTable;
//       this._task.PT =  undefined;
//     }
//   }
//
//   addTableToLevel1(idOfTable: string, row:any, stufe1: Table) {
//     if(!this.isRowSelected(stufe1, row)){
//       let newTable: Table = this.CreateTable(this._task.adressAufteilung.level1, idOfTable, this._task.adressAufteilung.level4,this.task.seed);
//       this._task.PT = newTable;
//     }
//   }
//
//   isRowSelected(stufe1: Table, row: any):boolean {
//     if (stufe1.selcted == row) {
//       return true
//     }
//     stufe1.selcted = row;
//     return false;
//   }
//
//   download() {
//     let toSaved: ToSaved={address:'',seed:""};
//     toSaved.address = this.task.adresse;
//     toSaved.seed = this.task.seed;
//     const adresse = JSON.stringify(toSaved);
//     const blob = new Blob([adresse], {type: 'application/json'});
//     // ein spezifiziertes Html-Element "hyperlink" definieren
//     const link = document.createElement('a');
//     // erzuegen einen DOMString mit URL, die das übergegebene Objekt representiert
//     link.href = URL.createObjectURL(blob);
//     // der Name der Datei, die herunterladen soll,
//     link.download = this.task.adresse;
//     link.click();
//   }
//
//   generateRandomAdressWithLength(length: number):string {
//     let result:string='';
//     for(var _i = 0; _i < length ; _i++){
//       result += Math.floor(Math.random() * 16).toString(16);
//     }
//     return result;
//   }
//
//   upload(file:any) {
//     let fileReader = new FileReader();
//     fileReader.readAsText(file);
//     fileReader.onload = (e) => {
//       let task:string = fileReader.result as unknown as string;
//       let taska:ToSaved = JSON.parse(task) as ToSaved;
//       this.GenerateTask(taska.address, taska.seed);
//       this.router.navigate(['display']);
//     }
//   }
//
//   generateTaskWithAdressthis(generatedRandom: string) {
//     let seed = Math.floor(Math.random() * 4095).toString(16);
//     this.GenerateTask(generatedRandom, seed);
//   }
//
//   /*
//   die Methode wird aufgerufen wenn der User eine Aufgabe eingibt,
//   Der Timer kann der User beim üben helfen, die Aufgabe in eine bestimmte Zeit zu lösen. da der Student
//   in der Klausur nicht lange Zeit hat.
//   Wie arbeitet die Methode?
//   Ein Timer wird hochgezält bis einer bestimmten Zahl, die der User eingibt(//TODO)
//    */
//
//   private _TIME_LIMIT:number=67;
//   timer(obj:{value:string, zeitZumAnzeigen:{min:number,sec:number} , timeleft:number}){
//
//     let timePassed = 0;
//     obj.timeleft = this._TIME_LIMIT;
//     let obsTimer: Observable<number> = timer(0,1000);
//     obsTimer.pipe(
//       takeUntil(timer(this._TIME_LIMIT * 1000 ))
//     )
//       .subscribe(currTime => {
//         {
//           timePassed = currTime +1
//           obj.timeleft = this._TIME_LIMIT - timePassed;
//           obj.zeitZumAnzeigen.min = Math.trunc(obj.timeleft / 60);
//           obj.zeitZumAnzeigen.sec = obj.timeleft % 60;
//           obj.value= this.computeValuesOfStroke_dasharray(obj.timeleft,this._TIME_LIMIT);
//         }
//       });
//   }
//
//   setTime_Limit(timeLimit:string){
//    switch (timeLimit){
//      case 'None':{
//        this._TIME_LIMIT=0
//        break;
//      }
//      case undefined:{
//        this._TIME_LIMIT=0
//        break;
//      }
//      case '30s':{
//        this._TIME_LIMIT=30;
//        break;
//      }
//      case '1m':{
//        this._TIME_LIMIT=60;
//        break;
//      }
//      case '1m:30s':{
//        this._TIME_LIMIT=90;
//        break;
//      }
//      case '2m':{
//        this._TIME_LIMIT=120;
//        break;
//      }
//      case '2m:30s':{
//        this._TIME_LIMIT=150;
//        break;
//      }
//      case '3m':{
//        this._TIME_LIMIT=180;
//        break;
//      }
//    }
//
//
//   }
//
// /*
//   Die Methode berechnet das Verhältnis von timeLeft zu Time_Limit,
//   und das Endergebnis wird als String mit 283 zurückgegeben
//   Warum 283?
//   2PIr = 283
//   r=45 definiert in solve-task.component.html zeile 4
//   Der zurückgegebene Wert bestimmt den Wert von Stroke_dasharray von dem grünen Ring
//
//  */
//   computeValuesOfStroke_dasharray (timeLeft:number,TIME_LIMIT:number):string{
//     let timeFraction = (timeLeft-1)  / TIME_LIMIT;
//     return (timeFraction * 283).toFixed(0) + ' 283';
//   }
//
// }
