import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IClient, Client } from '../client.model';
import { ClientService } from '../service/client.service';
import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';
import { IDocumentType } from 'app/entities/document-type/document-type.model';
import { DocumentTypeService } from 'app/entities/document-type/service/document-type.service';
import { Sex } from 'app/entities/enumerations/sex.model';

@Component({
  selector: 'marketneighbor-client-update',
  templateUrl: './client-update.component.html',
})
export class ClientUpdateComponent implements OnInit {
  isSaving = false;
  sexValues = Object.keys(Sex);

  usersSharedCollection: IUser[] = [];
  documentTypesSharedCollection: IDocumentType[] = [];

  editForm = this.fb.group({
    id: [],
    address: [null, [Validators.required, Validators.maxLength(200)]],
    phoneNumber: [null, [Validators.required, Validators.maxLength(60)]],
    firstName: [null, [Validators.required, Validators.maxLength(60)]],
    secondName: [null, [Validators.maxLength(60)]],
    lastName: [null, [Validators.required, Validators.maxLength(60)]],
    secondLastName: [null, [Validators.maxLength(60)]],
    sexType: [null, [Validators.required]],
    email: [null, [Validators.required, Validators.maxLength(200)]],
    documentNumber: [null, [Validators.required, Validators.maxLength(100)]],
    user: [null, Validators.required],
    documentType: [null, Validators.required],
  });

  constructor(
    protected clientService: ClientService,
    protected userService: UserService,
    protected documentTypeService: DocumentTypeService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ client }) => {
      this.updateForm(client);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const client = this.createFromForm();
    if (client.id !== undefined) {
      this.subscribeToSaveResponse(this.clientService.update(client));
    } else {
      this.subscribeToSaveResponse(this.clientService.create(client));
    }
  }

  trackUserById(_index: number, item: IUser): number {
    return item.id!;
  }

  trackDocumentTypeById(_index: number, item: IDocumentType): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IClient>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(client: IClient): void {
    this.editForm.patchValue({
      id: client.id,
      address: client.address,
      phoneNumber: client.phoneNumber,
      firstName: client.firstName,
      secondName: client.secondName,
      lastName: client.lastName,
      secondLastName: client.secondLastName,
      sexType: client.sexType,
      email: client.email,
      documentNumber: client.documentNumber,
      user: client.user,
      documentType: client.documentType,
    });

    this.usersSharedCollection = this.userService.addUserToCollectionIfMissing(this.usersSharedCollection, client.user);
    this.documentTypesSharedCollection = this.documentTypeService.addDocumentTypeToCollectionIfMissing(
      this.documentTypesSharedCollection,
      client.documentType
    );
  }

  protected loadRelationshipsOptions(): void {
    this.userService
      .query()
      .pipe(map((res: HttpResponse<IUser[]>) => res.body ?? []))
      .pipe(map((users: IUser[]) => this.userService.addUserToCollectionIfMissing(users, this.editForm.get('user')!.value)))
      .subscribe((users: IUser[]) => (this.usersSharedCollection = users));

    this.documentTypeService
      .query()
      .pipe(map((res: HttpResponse<IDocumentType[]>) => res.body ?? []))
      .pipe(
        map((documentTypes: IDocumentType[]) =>
          this.documentTypeService.addDocumentTypeToCollectionIfMissing(documentTypes, this.editForm.get('documentType')!.value)
        )
      )
      .subscribe((documentTypes: IDocumentType[]) => (this.documentTypesSharedCollection = documentTypes));
  }

  protected createFromForm(): IClient {
    return {
      ...new Client(),
      id: this.editForm.get(['id'])!.value,
      address: this.editForm.get(['address'])!.value,
      phoneNumber: this.editForm.get(['phoneNumber'])!.value,
      firstName: this.editForm.get(['firstName'])!.value,
      secondName: this.editForm.get(['secondName'])!.value,
      lastName: this.editForm.get(['lastName'])!.value,
      secondLastName: this.editForm.get(['secondLastName'])!.value,
      sexType: this.editForm.get(['sexType'])!.value,
      email: this.editForm.get(['email'])!.value,
      documentNumber: this.editForm.get(['documentNumber'])!.value,
      user: this.editForm.get(['user'])!.value,
      documentType: this.editForm.get(['documentType'])!.value,
    };
  }
}
