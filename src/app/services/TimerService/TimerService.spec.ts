import {TestBed} from "@angular/core/testing";
import {TimerService} from "./TimerService";

describe('timerService', () => {

  let timerService: TimerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: []
    });
    timerService = TestBed.inject(TimerService);
  });

  it('setTime_Limit',()=>{
    timerService.setTime_Limit('None');
    expect(timerService.TIME_LIMIT).toBe(0)
  })

  it('setTime_Limit',()=>{
    timerService.setTime_Limit('30s');
    expect(timerService.TIME_LIMIT).toBe(30)
  })

  it('setTime_Limit',()=>{
    timerService.setTime_Limit('1m');
    expect(timerService.TIME_LIMIT).toBe(60)
  })

  it('setTime_Limit',()=>{
    timerService.setTime_Limit('1m:30s');
    expect(timerService.TIME_LIMIT).toBe(90)
  })

  it('setTime_Limit',()=>{
    timerService.setTime_Limit('2m');
    expect(timerService.TIME_LIMIT).toBe(120)
  })

  it('setTime_Limit',()=>{
    timerService.setTime_Limit('2m:30s');
    expect(timerService.TIME_LIMIT).toBe(150)
  })

  it('setTime_Limit',()=>{
    timerService.setTime_Limit('3m');
    expect(timerService.TIME_LIMIT).toBe(180)
  })

  it('computeValuesOfStroke_dasharray',()=>{
    timerService.setTime_Limit('30s');
    expect(timerService.computeValuesOfStroke_dasharray(13,timerService.TIME_LIMIT)).toBe('113 283')
  })

  it('computeValuesOfStroke_dasharray 2',()=>{
    timerService.setTime_Limit('30s');
    expect(timerService.computeValuesOfStroke_dasharray(30,timerService.TIME_LIMIT)).toBe('274 283')
  })

  it('timer should work',  ()=> {
    timerService.setTime_Limit('1m:30s');
    spyOn(timerService,'computeValuesOfStroke_dasharray');
    let ob = {timeleft: 0, value: "", displayTime: {min: 0, sec: 0}};
    jasmine.clock().install();  // First install the clock
    timerService.timer(ob)
    jasmine.clock().tick(30000);
    expect(ob.timeleft).toBe(59);
  });

});
