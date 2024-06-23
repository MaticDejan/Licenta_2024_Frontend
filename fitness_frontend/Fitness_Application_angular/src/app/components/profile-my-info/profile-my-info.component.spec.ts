import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileMyInfoComponent } from './profile-my-info.component';

describe('ProfileMyInfoComponent', () => {
  let component: ProfileMyInfoComponent;
  let fixture: ComponentFixture<ProfileMyInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileMyInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileMyInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
