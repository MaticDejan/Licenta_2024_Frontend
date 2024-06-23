import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdaugaAlimentComponent } from './adauga-aliment.component';

describe('AdaugaAlimentComponent', () => {
  let component: AdaugaAlimentComponent;
  let fixture: ComponentFixture<AdaugaAlimentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdaugaAlimentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdaugaAlimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
