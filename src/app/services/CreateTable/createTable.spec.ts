import {TestBed} from "@angular/core/testing";
import {CreateTable} from "./CreateTable.service";
import {Table} from "../../model/Table";

describe('createTable', () => {

  let createTable: CreateTable;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: []
    });
    createTable = TestBed.inject(CreateTable);
  });

  it('create table', () => {
    // arrange
    let basicAdress ='0x1ef';
    let table:Table = createTable.createTable('0x1',basicAdress,'0x2');
    expect(table.selectedEntry).toBeUndefined();
    expect(table.basicAddress).toBe(basicAdress);
    expect(table.correctIndex).toBeDefined();
    expect(table.entries).toHaveSize(4);

  });

  it('make sure that the create table methode calls schuffle methode', () => {
    // arrange
    let basicAdress ='0x1ef';
    let table:Table = createTable.createTable('0x1',basicAdress,'0x2');
    let spy = spyOn(createTable,'schuffle');
    createTable.createTable('0x1',basicAdress,'0x2');

    expect(spy.calls.count()).toBe(1);
    expect(spy.calls.argsFor(0)[0]).toContain(table.entries[0])
    expect(spy.calls.argsFor(0)[0]).toContain(table.entries[1])
    expect(spy.calls.argsFor(0)[0]).toContain(table.entries[2])
    expect(spy.calls.argsFor(0)[0]).toContain(table.entries[3])
  });

  it('make', () => {
    // arrange
    let basicAdress ='0x1ef';
    let spy = spyOn(createTable,'getRandomInt');
    createTable.createTable('0x1',basicAdress,'0x2');

    expect(spy.calls.count()).toBe(6);
  });

  it('make sure that getRandom is called 6 times', () => {
    // arrange
    let basicAdress ='0x1ef';
    let spy = spyOn(createTable,'getRandomInt');
    createTable.createTable('0x1',basicAdress,'0x2');

    expect(spy.calls.count()).toBe(6);
  });


  it('schuffle', () => {
    // arrange
    let input =[1,2,3,4,5,6,7,8,9];
    let output:number[] = createTable.shuffle(input);
    expect(output.filter(i=> input.includes(i))).toHaveSize(9);
  });


});
