import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreazaCereriComponent } from './creaza-cereri.component';

describe('CreazaCereriComponent', () => {
  let component: CreazaCereriComponent;
  let fixture: ComponentFixture<CreazaCereriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreazaCereriComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreazaCereriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
