import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IDocumentType, DocumentType } from '../document-type.model';
import { DocumentTypeService } from '../service/document-type.service';
import { StateDocument } from 'app/entities/enumerations/state-document.model';

@Component({
  selector: 'marketneighbor-document-type-update',
  templateUrl: './document-type-update.component.html',
})
export class DocumentTypeUpdateComponent implements OnInit {
  isSaving = false;
  stateDocumentValues = Object.keys(StateDocument);

  editForm = this.fb.group({
    id: [],
    initials: [null, [Validators.required, Validators.maxLength(10)]],
    documentName: [null, [Validators.required, Validators.maxLength(60)]],
    status: [null, [Validators.required]],
  });

  constructor(protected documentTypeService: DocumentTypeService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ documentType }) => {
      this.updateForm(documentType);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const documentType = this.createFromForm();
    if (documentType.id !== undefined) {
      this.subscribeToSaveResponse(this.documentTypeService.update(documentType));
    } else {
      this.subscribeToSaveResponse(this.documentTypeService.create(documentType));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDocumentType>>): void {
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

  protected updateForm(documentType: IDocumentType): void {
    this.editForm.patchValue({
      id: documentType.id,
      initials: documentType.initials,
      documentName: documentType.documentName,
      status: documentType.status,
    });
  }

  protected createFromForm(): IDocumentType {
    return {
      ...new DocumentType(),
      id: this.editForm.get(['id'])!.value,
      initials: this.editForm.get(['initials'])!.value,
      documentName: this.editForm.get(['documentName'])!.value,
      status: this.editForm.get(['status'])!.value,
    };
  }
}
