import {Observable,timer} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})

 /**
  * functions required for the timer of the task
  */
export class TimerService {
  get TIME_LIMIT(): number {
    return this._TIME_LIMIT;
  }
  private _TIME_LIMIT:number=67;

  /**
   * turn on the timer and compute the radius of the timer circle
   * @param  timerProperties: needed Properties for the timer
   * @public
   */
  timer(timerProperties: { value: string, displayTime: { min: number, sec: number }, timeleft: number }) {

    let timePassed = 0;
    timerProperties.timeleft = this._TIME_LIMIT;
    let obsTimer: Observable<number> = timer(0, 1000);
    obsTimer.pipe(
      takeUntil(timer(this._TIME_LIMIT * 1000))
    )
      .subscribe(currTime => {
        {
          timePassed = currTime + 1
          timerProperties.timeleft = this._TIME_LIMIT - timePassed;
          timerProperties.displayTime.min = Math.trunc(timerProperties.timeleft / 60);
          timerProperties.displayTime.sec = timerProperties.timeleft % 60;
          timerProperties.value = this.computeValuesOfStroke_dasharray(timerProperties.timeleft, this._TIME_LIMIT);
        }
      });
  }

  /**
   * calculate the ratio of timeLeft to Time_Limit.
   * the result is concatenate with 283
   * 2PIr = 283
   * r=45 is defined in solve-task.component.html
   * @param {number} timeLeft: passed time
   * @param {number} TIME_LIMIT: the limit time of the timer
   * @return {string}: determines the value of Stroke_dasharray from the green ring
   * @public
   */
  computeValuesOfStroke_dasharray(timeLeft: number, TIME_LIMIT: number): string {
    let timeFraction = (timeLeft - 1) / TIME_LIMIT;
    return (timeFraction * 283).toFixed(0) + ' 283';
  }

  /**
   * set the timeLimit of the timer
   * @param {string} timeLimit: input from user from dropdown for timer
   * @return {number}: binary number of hex
   * @public
   */

  setTime_Limit(timeLimit:string){
    switch (timeLimit){
      case 'None':{
        this._TIME_LIMIT=0
        break;
      }
      case undefined:{
        this._TIME_LIMIT=0
        break;
      }
      case '30s':{
        this._TIME_LIMIT=30;
        break;
      }
      case '1m':{
        this._TIME_LIMIT=60;
        break;
      }
      case '1m:30s':{
        this._TIME_LIMIT=90;
        break;
      }
      case '2m':{
        this._TIME_LIMIT=120;
        break;
      }
      case '2m:30s':{
        this._TIME_LIMIT=150;
        break;
      }
      case '3m':{
        this._TIME_LIMIT=180;
        break;
      }
    }
  }

}
