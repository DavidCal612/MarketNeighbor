import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ClientService } from '../service/client.service';
import { IClient, Client } from '../client.model';

import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';
import { IDocumentType } from 'app/entities/document-type/document-type.model';
import { DocumentTypeService } from 'app/entities/document-type/service/document-type.service';

import { ClientUpdateComponent } from './client-update.component';

describe('Client Management Update Component', () => {
  let comp: ClientUpdateComponent;
  let fixture: ComponentFixture<ClientUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let clientService: ClientService;
  let userService: UserService;
  let documentTypeService: DocumentTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ClientUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(ClientUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ClientUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    clientService = TestBed.inject(ClientService);
    userService = TestBed.inject(UserService);
    documentTypeService = TestBed.inject(DocumentTypeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call User query and add missing value', () => {
      const client: IClient = { id: 456 };
      const user: IUser = { id: 10658 };
      client.user = user;

      const userCollection: IUser[] = [{ id: 80399 }];
      jest.spyOn(userService, 'query').mockReturnValue(of(new HttpResponse({ body: userCollection })));
      const additionalUsers = [user];
      const expectedCollection: IUser[] = [...additionalUsers, ...userCollection];
      jest.spyOn(userService, 'addUserToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ client });
      comp.ngOnInit();

      expect(userService.query).toHaveBeenCalled();
      expect(userService.addUserToCollectionIfMissing).toHaveBeenCalledWith(userCollection, ...additionalUsers);
      expect(comp.usersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call DocumentType query and add missing value', () => {
      const client: IClient = { id: 456 };
      const documentType: IDocumentType = { id: 23955 };
      client.documentType = documentType;

      const documentTypeCollection: IDocumentType[] = [{ id: 92159 }];
      jest.spyOn(documentTypeService, 'query').mockReturnValue(of(new HttpResponse({ body: documentTypeCollection })));
      const additionalDocumentTypes = [documentType];
      const expectedCollection: IDocumentType[] = [...additionalDocumentTypes, ...documentTypeCollection];
      jest.spyOn(documentTypeService, 'addDocumentTypeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ client });
      comp.ngOnInit();

      expect(documentTypeService.query).toHaveBeenCalled();
      expect(documentTypeService.addDocumentTypeToCollectionIfMissing).toHaveBeenCalledWith(
        documentTypeCollection,
        ...additionalDocumentTypes
      );
      expect(comp.documentTypesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const client: IClient = { id: 456 };
      const user: IUser = { id: 38328 };
      client.user = user;
      const documentType: IDocumentType = { id: 8105 };
      client.documentType = documentType;

      activatedRoute.data = of({ client });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(client));
      expect(comp.usersSharedCollection).toContain(user);
      expect(comp.documentTypesSharedCollection).toContain(documentType);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Client>>();
      const client = { id: 123 };
      jest.spyOn(clientService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ client });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: client }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(clientService.update).toHaveBeenCalledWith(client);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Client>>();
      const client = new Client();
      jest.spyOn(clientService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ client });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: client }));
      saveSubject.complete();

      // THEN
      expect(clientService.create).toHaveBeenCalledWith(client);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Client>>();
      const client = { id: 123 };
      jest.spyOn(clientService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ client });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(clientService.update).toHaveBeenCalledWith(client);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackUserById', () => {
      it('Should return tracked User primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackUserById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackDocumentTypeById', () => {
      it('Should return tracked DocumentType primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackDocumentTypeById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
