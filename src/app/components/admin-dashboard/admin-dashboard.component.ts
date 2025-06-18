import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { Usuario } from '../../auth/usuario.interface';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  imports: [NavbarComponent, CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  admin: Usuario | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.admin = this.authService.usuarioActualValue;
  }
}
