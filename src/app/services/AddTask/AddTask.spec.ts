import {TestBed} from "@angular/core/testing";
import {AddTask} from "./add-task.service";
import {Router} from "@angular/router";
import {GenerateTask} from "../GenerateTask/generate-task.service";
import {SaveTask} from "../../model/SaveTask";

describe('AddTask', () => {

  let addTask:AddTask;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ { provide: Router, useClass: class { navigate = jasmine.createSpy("navigate"); } },
        [GenerateTask]]
    });
    addTask = TestBed.inject(AddTask);
  });

  it('the methode generateRandomAdressWithLength should return a string with size 4', () =>{
    expect(addTask.generateRandomAdress(4)).toHaveSize(4);
  });

  it('By retrieve the methode generateTaskWithAdressthis, the methode GenerateTask of class GenerateTask should be invoked', () =>{
    let newVar = TestBed.get(GenerateTask);
    let spy = spyOn(newVar,'generateTask');
    addTask.generateTaskWithUserEntry('1234');
    expect(spy.calls.count()).toBe(1);
    expect(spy.calls.argsFor(0)[0]).toBe('1234');
    expect( (<string> spy.calls.argsFor(0)[1]).length).toBeLessThan(4);
  });

  it('upload test ', () =>{

    let toSaved: SaveTask={address:'1234',seed:"567"};
    const adresse = JSON.stringify(toSaved);
    const blob = new Blob([adresse], {type: 'application/json'});

    let newVar = TestBed.get(GenerateTask);
    let spy = spyOn(newVar,'generateTask');
    addTask.load(blob);
    expect(spy.calls.count()).toBe(1);
    // expect(spy.calls.argsFor(0)[0]).toBe('1234');
    // expect( (<string> spy.calls.argsFor(0)[1]).length).toBeLessThan(4);
  });

  it('generateRandomAdressWithLength', () =>{

    let result = addTask.generateRandomAdress(7);
    expect(result).toHaveSize(7);

  });


});
