import {TestBed} from "@angular/core/testing";
import {SolveTask} from "./solve-task.service";
import {Table} from "../../model/Table";
import {Task} from "../../model/Task";
import {GenerateTask} from "../GenerateTask/generate-task.service";
import {CreateTable} from "../CreateTable/CreateTable.service";

describe('SolveTask', () => {

  let solveTask: SolveTask;
  let row:any;
  let table:Table;
  let task:Task;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GenerateTask, CreateTable]
    });
    solveTask = TestBed.inject(SolveTask);

    row = { index: '1', value: '12a' };

    table={
      correctIndex: '1',
      basicAddress: '1234',
      entries:
        [
          { index: '1', value: '12a' },
          { index: '2', value: '12b' },
          { index: '3', value: '12c' },
          { index: '4', value: '12d' }
        ],
      correctEntry:{ index: '1', value: '12a' }
    }

    task={
      indexes:{offset:'1B3',level1:'D4',level2:'1D0',level3:'12',level4:'0'},
      address:'4BA0D41B3',
      PML4:table,
      seed:'987'
    }

  });

  it('',()=>{
    let rowByIndex = solveTask.getRowByIndex('12a',table);
    expect(rowByIndex).toEqual({ index: '1', value: '12a' })
  })

  it('isRowSelected return flase', () => {
    expect(solveTask.isRowSelected(table,row)).toBeFalse();
  });

  it('isRowSelected return true', () => {
    table.selectedEntry = row;
    expect(solveTask.isRowSelected(table,row)).toBeTrue();
  });


  it('check wether methode isRowSelected in methode addTableToLevel3 is retreived', () => {

    let gs = TestBed.get(GenerateTask);
    spyOnProperty(gs,'task').and.returnValue(task);
    let s = spyOn(solveTask,'isRowSelected')

    solveTask.addTableToLevel3('aaa',row,table);

    expect(s.calls.count()).toBe(1)


  });

  it('if row is selected then the method CreateTable dosent have to be invoked in addTableToLevel3', () => {

    let cts = TestBed.get(CreateTable);
    let createTable = spyOn(cts,'createTable');
    spyOn(solveTask,'isRowSelected').and.returnValue(true)

    solveTask.addTableToLevel3('aaa',row,table);

    expect(createTable.calls.count()).toBe(0)

  });

  it('if row is not selected then the method CreateTable has to be invoked in addTableToLevel3 ' +
    'and PDPT hase to be defined and PDT hast to be undefined and PT has to be undefined', () => {

    let gs = TestBed.get(GenerateTask);
    spyOnProperty(gs,'task').and.returnValue(task);
    let cts = TestBed.get(CreateTable);
    let createTable = spyOn(cts,'createTable').and.returnValue(table);
    spyOn(solveTask,'isRowSelected').and.returnValue(false)

    solveTask.addTableToLevel3('aaa',row,table);

    expect(createTable.calls.count()).toBe(1)
    expect(task.PDPT).toBeDefined()
    expect(task.PDT).toBeUndefined()
    expect(task.PT).toBeUndefined()

  });


  it('if row is not selected then the method CreateTable has to be invoked in addTableToLevel3 ' +
    'and PDT hast to be undefined and PT has to be undefined', () => {

    let gs = TestBed.get(GenerateTask);
    spyOnProperty(gs,'task').and.returnValue(task);
    let cts = TestBed.get(CreateTable);
    let createTable = spyOn(cts,'createTable').and.returnValue(table);
    spyOn(solveTask,'isRowSelected').and.returnValue(false)

    solveTask.addTableToLevel2('aaa',row,table);

    expect(createTable.calls.count()).toBe(1)
    expect(task.PDT).toBeDefined()
    expect(task.PT).toBeUndefined()

  });

  it('if row is not selected then the method CreateTable has to be invoked in addTableToLevel3 ' +
    'and PT has to be undefined', () => {

    let gs = TestBed.get(GenerateTask);
    spyOnProperty(gs,'task').and.returnValue(task);
    let cts = TestBed.get(CreateTable);
    let createTable = spyOn(cts,'createTable').and.returnValue(table);
    spyOn(solveTask,'isRowSelected').and.returnValue(false)

    solveTask.addTableToLevel1('aaa',row,table);

    expect(createTable.calls.count()).toBe(1)
    expect(task.PT).toBeDefined()

  });

});
