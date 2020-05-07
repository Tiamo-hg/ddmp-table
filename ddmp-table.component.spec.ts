import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DdmpTableComponent } from './ddmp-table.component';

describe('DDmpTableComponent', () => {
  let component: DdmpTableComponent;
  let fixture: ComponentFixture<DdmpTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DdmpTableComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DdmpTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
