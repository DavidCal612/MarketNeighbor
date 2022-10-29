import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { DocumentTypeComponent } from './list/document-type.component';
import { DocumentTypeDetailComponent } from './detail/document-type-detail.component';
import { DocumentTypeUpdateComponent } from './update/document-type-update.component';
import { DocumentTypeDeleteDialogComponent } from './delete/document-type-delete-dialog.component';
import { DocumentTypeRoutingModule } from './route/document-type-routing.module';

@NgModule({
  imports: [SharedModule, DocumentTypeRoutingModule],
  declarations: [DocumentTypeComponent, DocumentTypeDetailComponent, DocumentTypeUpdateComponent, DocumentTypeDeleteDialogComponent],
  entryComponents: [DocumentTypeDeleteDialogComponent],
})
export class DocumentTypeModule {}
