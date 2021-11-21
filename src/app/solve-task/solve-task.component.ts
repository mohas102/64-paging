import { Component, OnInit } from '@angular/core';
import {Table} from "../model/Table";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {Task} from "../model/Task"
import {GenerateTask} from "../services/GenerateTask/generate-task.service";
import {TimerService} from "../services/TimerService/TimerService";
import {SolveTask} from "../services/SolveTask/solve-task.service";

@Component({
  selector: 'app-solve-task',
  templateUrl: './solve-task.component.html',
  styleUrls: ['./solve-task.component.css']
})

/**
 * this component represents the template in which the user can solve the task
 * navigation Link to Component "/solveTask"
 */
export class SolveTaskComponent implements OnInit {

  constructor(private router: Router, private _formBuilder: FormBuilder,
              public generatedService: GenerateTask, private timerSerive:TimerService,
              private solveTask:SolveTask) { }

  ngOnInit(): void {
    if(this.data === undefined){
      alert('You have to generate a task');
      this.router.navigate(['/add'])
    }
    this.timerSerive.timer(this.timerObject);
    this.timerDisplay=this.timerSerive.TIME_LIMIT > 0;
  }

  adreesAufteilungInBinary=this.generatedService.adressAufteilungBinary;
  timerDisplay!:boolean;
  timerObject = {value:'283 283',displayTime:{min:0,sec:0}, timeleft:0}
  data:Task = this.generatedService.task;
  displayedColumns: string[] = ['index', 'value'];
  answer = new FormControl('',[Validators.required]);
  uebungsM = false;
  answer1?:boolean;
  checkedIndex4?:boolean;
  checkedIndex3?:boolean;
  checkedIndex2?:boolean;
  checkedIndex1?:boolean;
  wrongEntryPML4?:{ index: string, value: string };
  wrongEntryPDPT?:{ index: string, value: string };
  wrongEntryPDT?:{ index: string, value: string };
  wrongEntryPT?:{ index: string, value: string };


  /**
   * download the task by clicking on download symbol in the card
   */
  download() {
    this.solveTask.download();
  }

  /**
   * check if the answer from user is correct
   * @param {string} value: the input from user
   * @public
   */
  checkAnswer(value:string) {
    this.answer1 = value.toUpperCase() == this.getAnswer().toUpperCase();
  }


  /**
   * convert from hex to binary
   * @param {string} hex: number to be converted
   * @return {number}: binary number of hex
   * @public
   */
  /*
   ich muss hier die methode nur einmal aufrufen und das Ergebnis in objekt speicheren
   das objekt enthält in binary {offset, level4, level3...., level1}
   */
  getBinary(hex:string){
    return this.generatedService.fromHexToBinary(hex);
  }

  /**
   * create a table of level 3
   * @param {any} row: the clicked table entry
   * @param {Table} table: the table which contains row
   * @public
   */
  createTableLevel3(row:any, table: Table) {
    if(row.value != this.data.PML4?.correctIndex){
      this.checkedIndex4 = false;
    }
    this.solveTask.addTableToLevel3(row.value, row, table);
  }

  /**
   * create a table of level 2
   * @param {any} row: the clicked table entry
   * @param {Table} table: the table which contains row
   * @public
   */
  createTableLevel2(row:any, table: Table) {
    if(row.value != this.data.PDPT?.correctIndex){
      this.checkedIndex3 = false;
    }
    this.solveTask.addTableToLevel2(row.value, row, table)
  }

  /**
   * create a table of level 1
   * @param {any} row: the clicked table entry
   * @param {Table} table: the table which contains row
   * @public
   */
  createTableLeve1(row:any, table: Table) {
    if(row.value != this.data.PDT?.correctIndex){
      this.checkedIndex2 = false;
    }
    this.solveTask.addTableToLevel1(row.value, row, table)
  }

  /**
   * mark the clicked entry of level 1 if the entry is not marked
   * @param {any} row: the clicked table entry
   * @param {Table} table: the table which contains row
   * @public
   */
  selecteIndexLevel1(row:any, table:Table){
    if(row.value != this.data.PT?.correctIndex){
      this.checkedIndex1 = false;
    }
    this.solveTask.isRowSelected(table,row);
  }

  /**
   * select the correct index in PML4 table
   * @param {string} correctIndex: the correct index in PML4 table
   * @param {Table} table: PML4 table
   * @public
   */
  checkIndexLevel4(correctIndex:string, table:Table) {
    // TODO die Methode getRowByIndex brauchst du nicht indem du denrichtigenIndex benutzt
    let rowByIndex = this.solveTask.getRowByIndex(correctIndex,table);
    if(rowByIndex != this.data.PML4?.selectedEntry){
      this.wrongEntryPML4=this.data.PML4?.selectedEntry;
    }else {
      this.wrongEntryPML4 = undefined;
    }
    this.checkedIndex4=true;
    this.createTableLevel3(rowByIndex,table);
  }

  /**
   * select the correct index in level 3 table
   * @param {string} correctIndex: the correct index in level 3 table
   * @param {Table} table: level 3 table
   * @public
   */
  checkIndexLevel3(correctIndex:string, table:Table) {
    let rowByIndex = this.solveTask.getRowByIndex(correctIndex,table);
    if(rowByIndex != this.data.PDPT?.selectedEntry){
      this.wrongEntryPDPT=this.data.PDPT?.selectedEntry;
    }else {
      this.wrongEntryPDPT = undefined;
    }
    this.checkedIndex3=true;
    this.createTableLevel2(rowByIndex,table);
  }

  /**
   * select the correct index in level 2 table
   * @param {string} correctIndex: the correct index in level 2 table
   * @param {Table} table: level 2 table
   * @public
   */
  checkIndexLevel2(correctIndex:string, table:Table) {
    let rowByIndex = this.solveTask.getRowByIndex(correctIndex,table);
    if(rowByIndex != this.data.PDT?.selectedEntry){
      this.wrongEntryPDT=this.data.PDT?.selectedEntry;
    }else {
      this.wrongEntryPDT = undefined;
    }
    this.checkedIndex2=true;
    this.createTableLeve1(rowByIndex,table);
  }

  /**
   * select the correct index in level 1 table
   * @param {string} correctIndex: the correct index in level 1 table
   * @param {Table} table: level 1 table
   * @public
   */
  checkIndexLevel1(correctIndex:string, table:Table) {
    let rowByIndex = this.solveTask.getRowByIndex(correctIndex,table);
    if(rowByIndex != this.data.PT?.selectedEntry){
      this.wrongEntryPT=this.data.PT?.selectedEntry;
    }else {
      this.wrongEntryPT = undefined;
    }
    this.checkedIndex1=true;
    table.selectedEntry = rowByIndex;
  }

  /**
   * display the correct answer of the task
   * @return string: the answer of the task
   * @public
   */
  getAnswer():string {
    this.answer1=true;
    return this.generatedService.computeResult().toUpperCase();
  }

  getHint():string {
    return this.solveTask.getHint();
  }

  scroll() {
    window.scroll(0,0);
  }
}
