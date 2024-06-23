import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercitiiComponent } from './exercitii.component';

describe('ExercitiiComponent', () => {
  let component: ExercitiiComponent;
  let fixture: ComponentFixture<ExercitiiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExercitiiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExercitiiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
