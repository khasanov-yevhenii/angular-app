import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './shared/services/auth.service';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from './shared/guards/auth.guard';

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
			},
			{
				path: 'post/:id/edit',
				component: EditPageComponent,
				canActivate: [AuthGuard],
			},
		],
	},
];

@NgModule({
	imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule, SharedModule],
	exports: [RouterModule],
	declarations: [
		AdminLayoutComponent,
		LoginPageComponent,
		DashboardPageComponent,
		CreatePageComponent,
		EditPageComponent,
	],
	providers: [AuthService, AuthGuard],
})
export class AdminModule {}
