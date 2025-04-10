import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetComponent } from './net.component';

describe('NetComponent', () => {
  let component: NetComponent;
  let fixture: ComponentFixture<NetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
