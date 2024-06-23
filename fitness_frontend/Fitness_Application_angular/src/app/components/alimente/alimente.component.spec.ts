import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlimenteComponent } from './alimente.component';

describe('AlimenteComponent', () => {
  let component: AlimenteComponent;
  let fixture: ComponentFixture<AlimenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlimenteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlimenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
