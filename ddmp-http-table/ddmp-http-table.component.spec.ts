import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DdmpHttpTableComponent } from './ddmp-http-table.component';

describe('DdmpHttpTableComponent', () => {
  let component: DdmpHttpTableComponent;
  let fixture: ComponentFixture<DdmpHttpTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DdmpHttpTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DdmpHttpTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
