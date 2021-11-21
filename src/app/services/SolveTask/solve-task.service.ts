import {Injectable} from "@angular/core";
import {SaveTask} from "../../model/SaveTask";
import {Table} from "../../model/Table";
import {CreateTable} from "../CreateTable/CreateTable.service";
import {GenerateTask} from "../GenerateTask/generate-task.service";

@Injectable({
  providedIn: 'root'
})

  /**
   * functions required by solve-task-component
   */
export class SolveTask {

  constructor(private createTableService:CreateTable, private generateTask:GenerateTask) {
  }

  /**
   * Download a task as Json file.
   * a Json object with the required data is generated and saved in a blob.
   * a specified hyperlink is defined with document.createElement ('a')
   * and a URL containing the blob is assigned to this hyperlink with URL.createObjectURL (blob).
   * The name of the file corresponds to the virtual address.
   * @public
   */
  download() {
    let toSaved: SaveTask={address:'',seed:""};
    toSaved.address = this.generateTask.task.address;
    toSaved.seed = this.generateTask.task.seed;
    const adresse = JSON.stringify(toSaved);
    const blob = new Blob([adresse], {type: 'application/json'});
    // ein spezifiziertes Html-Element "hyperlink" definieren
    const link = document.createElement('a');
    // erzuegen einen DOMString mit URL, die das übergegebene Objekt representiert
    link.href = URL.createObjectURL(blob);
    // der Name der Datei, die herunterladen soll,
    link.download = this.generateTask.task.address;
    link.click();
  }

  /**
   * add a table to level 3 after the clickt on an entry in level 4.
   * If the entry is already clicked, nothing happens.
   * The tables of Level 1 and Level 2 will be deleted
   * @param {string} physicalAddress: the value of the clicked entry
   * @param {any} row: the entry of the table
   * @param {Table} table: the table which contains the entry
   * @public
   */
  addTableToLevel3(physicalAddress: string, row:any, table: Table) {

    if(!this.isRowSelected(table, row)){
      this.generateTask.task.PDPT = this.createTableService.createTable(this.generateTask.task.indexes.level3, physicalAddress, this.generateTask.task.indexes.level2);
      this.generateTask.task.PDT = undefined;
      this.generateTask.task.PT = undefined;
    }
  }

  /**
   * add a table to level 2 after the clickt on an entry in level 3.
   * If the entry is already clicked, nothing happens.
   * The tables of Level 1 will be deleted
   * @param {string} physicalAddress: the value of the clicked entry
   * @param {any} row: the entry of the table
   * @param {Table} table: the table which contains the entry
   * @public
   */
  addTableToLevel2(physicalAddress: string, row:any, table:Table) {
    if(!this.isRowSelected(table, row)){
      this.generateTask.task.PDT =  this.createTableService.createTable(this.generateTask.task.indexes.level2, physicalAddress, this.generateTask.task.indexes.level1);
      this.generateTask.task.PT =  undefined;
    }
  }

  /**
   * add a table to level 1 after the clickt on an entry in level 2.
   * If the entry is already clicked, nothing happens.
   * @param {string} physicalAddress: the value of the clicked entry
   * @param {any} row: the entry of the table
   * @param {Table} table: the table which contains the entry
   * @public
   */
  addTableToLevel1(physicalAddress: string, row:any, table: Table) {
    if(!this.isRowSelected(table, row)){
      this.generateTask.task.PT = this.createTableService.createTable(this.generateTask.task.indexes.level1, physicalAddress, this.generateTask.task.indexes.level4);
    }
  }

  /**
   * checks if an entry in a table is already clicked and if not, the entry will be marked as selected
   * @param {any} row: the entry of the table
   * @param {Table} table: the table which contains the entry
   * @return {boolean}: return true if the entry is already clicked and false if it is not clicked
   * @public
   */
  isRowSelected(table: Table, row: any):boolean {
    if (table.selectedEntry == row) {
      return true
    }
    table.selectedEntry = row;
    return false;
  }

  /**
   * get an entry of a table by it's index.
   * @param {string} correctIndex: number to be converted
   * @param {Table} table: the table which contains the entry
   * @return Object: return the entry of a the table
   * @public
   */
  getRowByIndex(correctIndex: string, table: Table):{index:string, value:string} {
    return table.entries.filter(x => x.value === correctIndex)[0];
  }

  getHint():string {

    if(this.generateTask.task.PML4?.selectedEntry){
      if(this.generateTask.task.PML4?.selectedEntry?.value != this.generateTask.task.PML4?.correctEntry.value) {
        return "Level4";
      }
    }
    if(this.generateTask.task.PDPT?.selectedEntry){
      if(this.generateTask.task.PDPT?.selectedEntry?.value != this.generateTask.task.PDPT?.correctEntry.value) {
        return "Level3";
      }
    }
    if(this.generateTask.task.PDT?.selectedEntry){
      if(this.generateTask.task.PDT?.selectedEntry?.value != this.generateTask.task.PDT?.correctEntry.value) {
        return "Level2";
      }
    }
    if(this.generateTask.task.PT?.selectedEntry){
      if(this.generateTask.task.PT?.selectedEntry?.value != this.generateTask.task.PT?.correctEntry.value) {
        return "Level1";
      }
    }

    return "No ERROR :)";
  }
}
