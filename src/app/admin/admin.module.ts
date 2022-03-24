import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from './shared/guards/auth.guard';
import { SearchPostsPipe } from './shared/pipes/search-posts.pipe';
import { AlertComponent } from './shared/components/alert/alert.component';
import { FormGuard } from './shared/guards/form.guard';

const routes: Routes = [
	{
		path: '',
		component: AdminLayoutComponent,
		children: [
			{
				path: '',
				redirectTo: '/admin/login',
				pathMatch: 'full',
			},
			{
				path: 'login',
				component: LoginPageComponent,
			},
			{
				path: 'dashboard',
				component: DashboardPageComponent,
				canActivate: [AuthGuard],
			},
			{
				path: 'create',
				component: CreatePageComponent,
				canActivate: [AuthGuard],
				canDeactivate: [FormGuard],
			},
			{
				path: 'post/:id/edit',
				component: EditPageComponent,
				canActivate: [AuthGuard],
				canDeactivate: [FormGuard],
			},
		],
	},
];

@NgModule({
	imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule, FormsModule, SharedModule],
	exports: [RouterModule],
	declarations: [
		AdminLayoutComponent,
		LoginPageComponent,
		DashboardPageComponent,
		CreatePageComponent,
		EditPageComponent,
		SearchPostsPipe,
		AlertComponent,
	],
	providers: [AuthGuard],
})
export class AdminModule {}
