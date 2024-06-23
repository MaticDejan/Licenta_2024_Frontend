import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AntrenamentComponent } from './antrenament.component';

describe('AntrenamentComponent', () => {
  let component: AntrenamentComponent;
  let fixture: ComponentFixture<AntrenamentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AntrenamentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AntrenamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
