import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DrinksPage } from './drinks.page';

describe('DrinksPage', () => {
  let component: DrinksPage;
  let fixture: ComponentFixture<DrinksPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrinksPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DrinksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
