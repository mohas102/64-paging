import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolveTaskComponent } from './solve-task.component';

describe('DisplayTaskComponent', () => {
  let component: SolveTaskComponent;
  let fixture: ComponentFixture<SolveTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolveTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolveTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
