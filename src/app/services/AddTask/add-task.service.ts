import {Injectable} from "@angular/core";
import {SaveTask} from "../../model/SaveTask";
import {GenerateTask} from "../GenerateTask/generate-task.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})

/**
 * Receive input from the user and generate a task and forward the user to the next page (/solveTask)
 */
export class AddTask {

  constructor(private geneareteTaskService: GenerateTask, private router:Router) {
  }

  /**
   * generate a random seed for the task and then generate a task
   * @param {string} virtualAddress: the virtual Address of the task
   * @public
   */
  generateTaskWithUserEntry(virtualAddress: string) {
    let seed = Math.floor(Math.random() * 4095).toString(16);
    this.geneareteTaskService.generateTask(virtualAddress, seed);
  }

  /**
   * Generate a random address with a certain length
   * @param {number} length: the length of the address
   * @return {string}: an Address
   * @public
   */
  generateRandomAdress(length: number):string {
    let result:string='';
    for(var _i = 0; _i < length ; _i++){
      result += Math.floor(Math.random() * 16).toString(16);
    }
    return result;
  }

  /**
   * Read a local file and generate a task according to the contents of the file
   * @param {any} file: the file to be read
   * @public
   */
  load(file:any) {
    let fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.onload = (e) => {
      let task:string = fileReader.result as unknown as string;
      let taska:SaveTask = JSON.parse(task) as SaveTask;
      this.geneareteTaskService.generateTask(taska.address, taska.seed);
      this.router.navigate(['solveTask']);
    }
  }

}
