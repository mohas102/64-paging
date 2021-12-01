import {Injectable} from "@angular/core";
import {Table} from "../../model/Table";
import {Task} from "../../model/Task";
import {CreateTable} from "../CreateTable/CreateTable.service";

@Injectable({
  providedIn: 'root'
})
/**
 * functions required to generate a task
 */
export class GenerateTask {
  set adressAufteilungBinary(value: { offset: string; level1: string; level2: string; level3: string; level4: string }) {
    this._adressAufteilungBinary = value;
  }
  get adressAufteilungBinary(): { offset: string; level1: string; level2: string; level3: string; level4: string } {
    return this._adressAufteilungBinary;
  }
  set task(value: Task) {
    this._task = value;
  }

  private _task!: Task;

  get task(): Task {
    return this._task;
  }

  private _adressAufteilungBinary!:{"offset":string,"level1":string,"level2":string,"level3":string,"level4":string};

  constructor(private createTableService: CreateTable) {
  }


  /**
   * the main function to generate a task
   * The generated task has only one table for level 4
   * @param {string} adresse: virtual address of the task
   * @param {string} seed: seed of the task
   * @public
   */
  generateTask(adresse: string, seed:string) {

    let indexesOfAddress: { "offset": string, "level1": string, "level2": string, "level3": string,
      "level4": string } = this.getIndexesOfAddress(adresse);
    let stufe4: Table = this.createTableService.createTable(indexesOfAddress.level4,
        seed, indexesOfAddress.level3);
    stufe4.basicAddress='0'
    this._task = {
      indexes: indexesOfAddress,
      address: adresse,
      PML4: stufe4,
      seed: seed,
    };
  }

  /**
   * compute the index for each level for a virtual address
   * @param {string} adresse: the virtual address to be divided
   * @return Object: an object with 5 String for each level and offset
   * @public
   */
  getIndexesOfAddress(adresse: string): { "offset": string, "level1": string, "level2": string, "level3": string, "level4": string } {
    let adressWith64Bit = this.fromHexToBinary(adresse);
    let offsetAsBinary = adressWith64Bit.slice(64 - 12, 64);
    let level1AsBinary = adressWith64Bit.slice(64 - 12 - 9, 64 - 12);
    let level2AsBinary = adressWith64Bit.slice(64 - 12 - 9 - 9, 64 - 12 - 9);
    let level3AsBinary = adressWith64Bit.slice(64 - 12 - 9 - 9 - 9, 64 - 12 - 9 - 9);
    let level4AsBinary = adressWith64Bit.slice(64 - 12 - 9 - 9 - 9 - 9, 64 - 12 - 9 - 9 - 9);

    // convert from Binary to Hex
    let offset = parseInt(offsetAsBinary, 2).toString(16);
    let level1 = parseInt(level1AsBinary, 2).toString(16);
    let level2 = parseInt(level2AsBinary, 2).toString(16);
    let level3 = parseInt(level3AsBinary, 2).toString(16);
    let level4 = parseInt(level4AsBinary, 2).toString(16);
    this.adressAufteilungBinary={
      offset:offsetAsBinary,
      level1:level1AsBinary,
      level2:level2AsBinary,
      level3:level3AsBinary,
      level4:level4AsBinary,
    }
    return {offset: offset, level1: level1, level2: level2, level3: level3, level4: level4};
  }

  /**
   * convert from hex to binary and fill up with 0 if the length of the address < 64
   * @param {string} hex: number to be converted
   * @return {number}: the binary address
   * @public
   */
  fromHexToBinary(hex: string):string {

    if(hex==undefined){
      hex="0"
    }
    // parse to Number
    let numberInDecimal = BigInt("0x"+hex)
    // let numberInDecimal = parseInt(hex, 16);
    // convert to binary
    let numberToBinary = numberInDecimal.toString(2);

    // 64Bit mit 0 auffüllen falls es kein 64 bits sind
    let adressWith64Bit = numberToBinary.padStart(64, '0');
    // Aufteilen
    return adressWith64Bit;
  }

  /**
   * calculate the correct end result of the task
   * @return {number}: the correct end result
   * @public
   */
  computeResult():string {
    let stufe4: Table = this.createTableService.createTable(this.task.indexes.level4, '0', this.task.indexes.level3);
    let stufe3 :Table = this.createTableService.createTable(this.task.indexes.level3, stufe4.correctIndex ,this.task.indexes.level2);
    let stufe2 :Table= this.createTableService.createTable(this.task.indexes.level2, stufe3.correctIndex,this.task.indexes.level1);
    let stufe1 :Table = this.createTableService.createTable(this.task.indexes.level1, stufe2.correctIndex,this.task.indexes.level4);
    return  stufe1.correctIndex + this.task.indexes.offset;
  }
}
