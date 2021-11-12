// import { TestBed } from '@angular/core/testing';
// import { Service } from './service';
// import {Table} from "../model/Table";
//
//
// describe('ServiceService', () => {
//   let service: Service;
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(Service);
//   });
//
//   it('change to binary', () => {
//     expect(service.fromHexToBinary('0x123')).toBe('0000000000000000000000000000000000000000000000000000000100100011');
//   });
//
//   it('change to binary', () => {
//     // arrange
//     let adress ='0x123456789abcdef';
//     let offset ='';
//     let level4 ='';
//     let level3 ='';
//     let level2 ='';
//     let level1 ='';
//     let adress_aufgeteilt = {offset:offset, level4:level4, level3:level3, level2:level2, level1:level1}
//
//     // act && assert
//     expect(service.getAdressAsAufgeteilt(adress)).toBe(adress_aufgeteilt);
//   });
//
//   // it('create table', () => {
//   //   // arrange
//   //   let basicAdress ='0x1ef';
//   //   let table:Table = service.CreateTable('0x1',basicAdress,'0x2','seed');
//   //   expect(table.selcted).toBeUndefined();
//   //   expect(table.basicAdress).toBe(basicAdress);
//   //   expect(table.derRichtigerIndex).toBeDefined();
//   //   expect(table.entries).toHaveSize(4);
//   //
//   // });
//   //
//   // it('make sure that the create table methode calls schuffle methode', () => {
//   //   // arrange
//   //   let basicAdress ='0x1ef';
//   //   let table:Table = service.CreateTable('0x1',basicAdress,'0x2','seed');
//   //   let spy = spyOn(service,'schuffle');
//   //   service.CreateTable('0x1',basicAdress,'0x2','seed');
//   //
//   //   expect(spy.calls.count()).toBe(1);
//   //   expect(spy.calls.argsFor(0)[0]).toContain(table.entries[0])
//   //   expect(spy.calls.argsFor(0)[0]).toContain(table.entries[1])
//   //   expect(spy.calls.argsFor(0)[0]).toContain(table.entries[2])
//   //   expect(spy.calls.argsFor(0)[0]).toContain(table.entries[3])
//   // });
//   //
//   // it('make', () => {
//   //   // arrange
//   //   let basicAdress ='0x1ef';
//   //   let spy = spyOn(service,'getRandomInt');
//   //   service.CreateTable('0x1',basicAdress,'0x2','seed');
//   //
//   //   expect(spy.calls.count()).toBe(6);
//   // });
//   //
//   // it('make sure that getRandom is called 6 times', () => {
//   //   // arrange
//   //   let basicAdress ='0x1ef';
//   //   let spy = spyOn(service,'getRandomInt');
//   //   service.CreateTable('0x1',basicAdress,'0x2','seed');
//   //
//   //   expect(spy.calls.count()).toBe(6);
//   // });
//   //
//   //
//   // it('schuffle', () => {
//   //   // arrange
//   //   let input =[1,2,3,4,5,6,7,8,9];
//   //   let output:number[] = service.schuffle(input);
//   //   expect(output.filter(i=> input.includes(i))).toHaveSize(9);
//   // });
//
//   it('')
// });
