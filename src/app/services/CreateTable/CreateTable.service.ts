import {Injectable} from "@angular/core";
import {Table} from "../../model/Table";
import Rand from "rand-seed";


@Injectable({
  providedIn: 'root'
})

/**
 * create a table for a level
 */
export class CreateTable {


  /**
   * create a table for a certain level and shuffle it's entries
   * @param {string} correctIndex: the created table have to contain the correct index of it's level
   * @param {string} basicAddress: the base address of the table is the seed for a random generator
   * @param {string} indexFromAnotherLevel: to increase the difficulty of the task
   * @return {Table}: the created table
   * @public
   */
  createTable(correctIndex: string, basicAddress: string, indexFromAnotherLevel: string): Table {

    const randomGenerator = new Rand(basicAddress);
    let r: string = this.getRandomInt(4095,randomGenerator);
    if(correctIndex == indexFromAnotherLevel){
      indexFromAnotherLevel=this.getRandomInt(4095,randomGenerator);
    }
    let entries = [
      {index: correctIndex, value: r},
      {index: this.getRandomInt(511,randomGenerator), value: this.getRandomInt(4095,randomGenerator)},
      {index: indexFromAnotherLevel, value: this.getRandomInt(4095,randomGenerator)},
      {index: this.getRandomInt(511,randomGenerator), value: this.getRandomInt(4095,randomGenerator)}
    ]
    let schuffeldEntries = this.shuffle(entries);
    return {correctIndex: r, basicAddress: basicAddress, entries: schuffeldEntries,correctEntry:{index:correctIndex,value:r}};
  }


  /**
   * generate a random number between 0 and max
   * @param {string} max: Max of generated number
   * @param {Rand} random: random generator
   * @return {string}: the generated number
   * @public
   */
  getRandomInt(max:number, random:Rand): string {
    return Math.floor(random.next() * max).toString(16);
  }


  /**
   * schuffle an Array
   * We put each element in the array in an object, and give it a random sort key
   * We unmap to get the original objects
   * We sort using the random key
   * @param {Array<any>} toBeShuffled: array has to be shuffled
   * @return {any}: the shuffled array
   * @public
   */
  shuffle(toBeShuffled: Array<{index: string, value: string}>): any {
    return toBeShuffled.sort((a,b)=>(BigInt("0x"+a.index)> BigInt("0x"+b.index)? -1 : 1));
  }
}
