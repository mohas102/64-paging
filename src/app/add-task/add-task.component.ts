import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AddTask} from "../services/AddTask/add-task.service";
import {TimerService} from "../services/TimerService/TimerService";

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
/**
 * This Component react on inputs from user to create new task
 * navigation Link to Component "/add"
 */
export class AddTaskComponent implements OnInit {

  constructor(private router: Router, private addService:AddTask, private timerService:TimerService) {
  }

  ngOnInit(): void {
  }

  slots: string[]=[
    'None','30s','1m','1m:30s','2m','2m:30s','3m'
  ];
  time!: string;
  difficulty:string[] =["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16"];
  selectedDifficulty = this.difficulty[15];
  generatedRandom!:string;
  adresse = new FormControl('', [Validators.required, Validators.pattern('^[0-9A-Fa-f]+$')]);


  /**
   * display an error message when the user type invalid adress
   * @return {string}: the error message
   * @public
   */
  getErrorMessage() {
    if (this.adresse.hasError('required')) {
      return 'You must enter a value';
    }
    return this.adresse.hasError('pattern') ? 'non-hexadecimal number found in your Entry' : '';
  }

  /**
   * generate a task with an Adress entered manually
   * @public
   */
  enterAnAdress() {
    this.addService.generateTaskWithUserEntry(this.adresse.value);
    this.router.navigate(['solveTask']);
    this.timerService.setTime_Limit(this.time);
  }

  /**
   * generate a random address that has a certain length
   * @public
   */
  generateRandomTask() {
    this.generatedRandom = this.addService.generateRandomAdressWithLength(parseInt(this.selectedDifficulty));
  }

  /**
   * generate a task with a random address
   * @public
   */
  randomaccepted(){
    this.addService.generateTaskWithUserEntry(this.generatedRandom);
    this.router.navigate(['solveTask']);
    this.timerService.setTime_Limit(this.time);
  }

  /**
   * generate a task with a json file from pc
   * @param {any} event: the json file
   * @public
   */
  onFileSelected(event:any) {
    this.addService.load(event.target.files[0]);
    this.timerService.setTime_Limit(this.time);
  }

  /**
   * select the length of random generated adress
   * @param {Event} event: the value from dropdown list
   * @public
   */
  selectLengthOfAdress(event: Event) {
    this.selectedDifficulty = (event.target as HTMLSelectElement).value;
  }
}
