import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfiseazaMeniuComponent } from './afiseaza-meniu.component';

describe('AfiseazaMeniuComponent', () => {
  let component: AfiseazaMeniuComponent;
  let fixture: ComponentFixture<AfiseazaMeniuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AfiseazaMeniuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AfiseazaMeniuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
