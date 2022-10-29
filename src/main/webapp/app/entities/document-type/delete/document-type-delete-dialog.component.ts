import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IDocumentType } from '../document-type.model';
import { DocumentTypeService } from '../service/document-type.service';

@Component({
  templateUrl: './document-type-delete-dialog.component.html',
})
export class DocumentTypeDeleteDialogComponent {
  documentType?: IDocumentType;

  constructor(protected documentTypeService: DocumentTypeService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.documentTypeService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
