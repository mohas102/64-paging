import {TestBed} from "@angular/core/testing";
import {GenerateTask} from "./generate-task.service";
import {CreateTable} from "../CreateTable/CreateTable.service";
import {Table} from "../../model/Table";
import {Task} from "../../model/Task"

describe('createTable', () => {

  let gTask: GenerateTask;
  let task:Task={
    indexes: {level1: "1a1", level2: "2", level3: "3", level4: "4", offset: "5"},
    address: "222",
    seed: "12",
  }

  let table:Table={
    basicAddress: "abc",
    correctIndex: "111",
    entries: [{index: "11a", value: "abc"}, {index: "12a", value: "31a"}, {index: "13a", value: "41a"}, {index: "14a", value: "44a"}],
    correctEntry: {index: "11a", value: "abc"}
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateTable]
    });
    gTask = TestBed.inject(GenerateTask);
  });

  it('generate Task with Methode GenerateTask',()=>{
    gTask.generateTask('4BA0D41B3','123');
    expect(gTask.task.seed).toEqual('123');
    expect(gTask.task.address).toEqual('4BA0D41B3');
    expect(gTask.task.PML4).toBeDefined();
    expect(gTask.task.indexes).toBeDefined();
  })

  it('computeResult method should invoke CreateTable 4 times ', () => {

    let cTs = TestBed.get(CreateTable);
    let spy1 = spyOn(cTs,'createTable').and.returnValue(table);
    gTask.task = task;

    gTask.computeResult();

    expect(spy1.calls.count()).toBe(4)

  });

  it('computeResult method should invoke CreateTable with an Argunment Adreessaufgeteilt.level1 ', () => {

    let cTs = TestBed.get(CreateTable);
    let spy1 = spyOn(cTs,'createTable').and.returnValue(table);

    gTask.task = task;
    gTask.computeResult();

    expect(spy1.calls.argsFor(3)[0]).toBe(task.indexes.level1)

  });

  it('computeResult method should return true answer', () => {

    let cTs = TestBed.get(CreateTable);
    spyOn(cTs,'createTable').and.returnValue(table);

    gTask.task = task;

    expect(gTask.computeResult()).toBe(task.indexes.offset+ table.correctIndex)

  });

  it('test methode getIndexesOfAddress',()=>{
    let indexesOfAddress = gTask.getIndexesOfAddress('4BA0D41B3');

    // offset:'1B3',level1:'D4',level2:'1D0',level3:'12',level4:'0'

    expect(indexesOfAddress.offset).toEqual('1b3');
    expect(indexesOfAddress.level1).toEqual('d4');
    expect(indexesOfAddress.level2).toEqual('1d0');
    expect(indexesOfAddress.level3).toEqual('12');
    expect(indexesOfAddress.level4).toEqual('0');

  })

  it('test methode getIndexesOfAddress with larg number',()=>{
    let indexesOfAddress = gTask.getIndexesOfAddress('FEDCBA9876543210');

    expect(indexesOfAddress.offset).toEqual('210');
    expect(indexesOfAddress.level1).toEqual('143');
    expect(indexesOfAddress.level2).toEqual('1b2');
    expect(indexesOfAddress.level3).toEqual('61');
    expect(indexesOfAddress.level4).toEqual('175');

  })

  it('getIndexesOfAddress have to invoke method fromHexToBinary',()=>{
    let spy = spyOn(gTask,'fromHexToBinary').and.returnValue('0')
    gTask.getIndexesOfAddress('FEDCBA9876543210');

    expect(spy.calls.count()).toBe(1);
  })

  it('fromHexToBinary change to binary', () => {
    expect(gTask.fromHexToBinary('0x123'))
      .toBe('0000000000000000000000000000000000000000000000000000000100100011');
  });

  it('change to binary larg number', () => {
    expect(gTask.fromHexToBinary('FEDCBA9876543210'))
      .toBe('1111111011011100101110101001100001110110010101000011001000010000');
  });

  it('number.max_safe_integer', () => {
    expect(gTask.fromHexToBinary('1FFFFFFFFFFFFF'))
      .toBe('0000000000011111111111111111111111111111111111111111111111111111');
  });

  it('GREATER THAN number.max_safe_integer', () => {
    expect(gTask.fromHexToBinary('20000000000001'))
      .toBe('0000000000100000000000000000000000000000000000000000000000000001');
  });

});
