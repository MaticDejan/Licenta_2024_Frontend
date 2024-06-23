import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAntrenamentComponent } from './profile-antrenament.component';

describe('ProfileAntrenamentComponent', () => {
  let component: ProfileAntrenamentComponent;
  let fixture: ComponentFixture<ProfileAntrenamentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileAntrenamentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileAntrenamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
