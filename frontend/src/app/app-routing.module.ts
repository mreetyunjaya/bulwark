import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { DashboardComponent } from '../app/dashboard/dashboard.component';
import { AssessmentsComponent } from '../app/assessments/assessments.component';

import { AppService } from '../app/app.service';
import { OrganizationComponent } from './organization/organization.component';
import { VulnerabilityComponent } from './vulnerability/vulnerability.component';
import { VulnFormComponent } from './vuln-form/vuln-form.component';
import { OrgFormComponent } from './org-form/org-form.component';
import { AssetFormComponent } from './asset-form/asset-form.component';
import { Asset } from './asset-form/Asset';

@Injectable()
export class AssetsResolver implements Resolve<any> {
  constructor(private apiService: AppService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.apiService.getOrganizationAssets(route.params.id);
  }
}

@Injectable()
export class AssetResolver implements Resolve<any> {
  constructor(private apiService: AppService) {}
  resolve(route: ActivatedRouteSnapshot) {
    return this.apiService.getAsset(route.params.assetId, route.params.id);
  }
}

@Injectable()
export class AssessmentResolver implements Resolve<any> {
  constructor(private apiService: AppService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.apiService.getAssessments(route.params.id);
  }
}

@Injectable()
export class VulnerabilityResolver implements Resolve<any> {
  constructor(private apiService: AppService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.apiService.getVulnerabilities(route.params.id);
  }
}

@Injectable()
export class OrganizationResolver implements Resolve<any> {
  constructor(private apiService: AppService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.apiService.getOrganizationById(route.params.id);
  }
}

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'assessment/:id',
    component: AssessmentsComponent,
    resolve: { assessments: AssessmentResolver }
  },
  {
    path: 'organization/:id',
    component: OrganizationComponent,
    resolve: { assets: AssetsResolver }
  },
  {
    path: 'vulnerability/:id',
    component: VulnerabilityComponent,
    resolve: { vulnerabilities: VulnerabilityResolver }
  },
  {
    path: 'vulnform',
    component: VulnFormComponent
  },
  {
    path: 'organization-form',
    component: OrgFormComponent
  },
  {
    path: 'organization-form/:id',
    component: OrgFormComponent,
    resolve: { organization: OrganizationResolver }
  },
  {
    path: 'organization/:id/asset-form',
    component: AssetFormComponent
  },
  {
    path: 'organization/:id/asset-form/:assetId',
    component: AssetFormComponent,
    resolve: { asset: AssetResolver }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AssetResolver,
    AssetsResolver,
    AssessmentResolver,
    VulnerabilityResolver,
    VulnFormComponent,
    OrganizationResolver
  ]
})
export class AppRoutingModule {}