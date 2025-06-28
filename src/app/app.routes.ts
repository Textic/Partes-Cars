import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { authGuard } from './auth/auth.guard';
import { RegisterComponent } from './components/register/register.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';

/**
 * Rutas principales de la aplicación.
 * Cada ruta define un path y el componente asociado.
 */
export const routes: Routes = [
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
	{ path: 'home', component: HomeComponent },
	{ path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'admin_dashboard', component: AdminDashboardComponent },
	{ path: 'recover-password', component: RecoverPasswordComponent },
];
