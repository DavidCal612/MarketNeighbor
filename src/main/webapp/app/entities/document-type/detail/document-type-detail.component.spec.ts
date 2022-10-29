import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DocumentTypeDetailComponent } from './document-type-detail.component';

describe('DocumentType Management Detail Component', () => {
  let comp: DocumentTypeDetailComponent;
  let fixture: ComponentFixture<DocumentTypeDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentTypeDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ documentType: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(DocumentTypeDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(DocumentTypeDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load documentType on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.documentType).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
