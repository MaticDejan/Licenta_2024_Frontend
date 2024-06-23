import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateMeniuComponent } from './generate-meniu.component';

describe('GenerateMeniuComponent', () => {
  let component: GenerateMeniuComponent;
  let fixture: ComponentFixture<GenerateMeniuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerateMeniuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenerateMeniuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
