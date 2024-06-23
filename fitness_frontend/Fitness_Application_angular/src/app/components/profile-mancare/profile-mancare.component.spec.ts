import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileMancareComponent } from './profile-mancare.component';

describe('ProfileMancareComponent', () => {
  let component: ProfileMancareComponent;
  let fixture: ComponentFixture<ProfileMancareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileMancareComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileMancareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
