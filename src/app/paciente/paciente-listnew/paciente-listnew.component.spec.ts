import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PacienteListNewComponent } from './paciente-listnew.component';


describe('PacienteDeleteComponent', () => {
  let component: PacienteListNewComponent;
  let fixture: ComponentFixture<PacienteListNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacienteListNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteListNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
