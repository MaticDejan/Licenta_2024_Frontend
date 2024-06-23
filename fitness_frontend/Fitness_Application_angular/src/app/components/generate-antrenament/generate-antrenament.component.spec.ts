import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateAntrenamentComponent } from './generate-antrenament.component';

describe('GenerateAntrenamentComponent', () => {
  let component: GenerateAntrenamentComponent;
  let fixture: ComponentFixture<GenerateAntrenamentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerateAntrenamentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenerateAntrenamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
