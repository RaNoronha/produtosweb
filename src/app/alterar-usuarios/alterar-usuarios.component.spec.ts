import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterarUsuariosComponent } from './alterar-usuarios.component';

describe('AlterarUsuariosComponent', () => {
  let component: AlterarUsuariosComponent;
  let fixture: ComponentFixture<AlterarUsuariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlterarUsuariosComponent]
    });
    fixture = TestBed.createComponent(AlterarUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
