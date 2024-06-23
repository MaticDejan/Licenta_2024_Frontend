import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateExercitiuComponent } from './generate-exercitiu.component';

describe('GenerateExercitiuComponent', () => {
  let component: GenerateExercitiuComponent;
  let fixture: ComponentFixture<GenerateExercitiuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerateExercitiuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenerateExercitiuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
