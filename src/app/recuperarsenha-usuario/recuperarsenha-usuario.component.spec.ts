import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperarsenhaUsuarioComponent } from './recuperarsenha-usuario.component';

describe('RecuperarsenhaUsuarioComponent', () => {
  let component: RecuperarsenhaUsuarioComponent;
  let fixture: ComponentFixture<RecuperarsenhaUsuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecuperarsenhaUsuarioComponent]
    });
    fixture = TestBed.createComponent(RecuperarsenhaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
