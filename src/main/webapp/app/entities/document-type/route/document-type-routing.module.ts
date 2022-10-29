import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { DocumentTypeComponent } from '../list/document-type.component';
import { DocumentTypeDetailComponent } from '../detail/document-type-detail.component';
import { DocumentTypeUpdateComponent } from '../update/document-type-update.component';
import { DocumentTypeRoutingResolveService } from './document-type-routing-resolve.service';

const documentTypeRoute: Routes = [
  {
    path: '',
    component: DocumentTypeComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DocumentTypeDetailComponent,
    resolve: {
      documentType: DocumentTypeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DocumentTypeUpdateComponent,
    resolve: {
      documentType: DocumentTypeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DocumentTypeUpdateComponent,
    resolve: {
      documentType: DocumentTypeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(documentTypeRoute)],
  exports: [RouterModule],
})
export class DocumentTypeRoutingModule {}
