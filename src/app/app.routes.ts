import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
	{ path: 'home', component: HomeComponent },
	{ path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
	{ path: 'login', component: LoginComponent },
];
