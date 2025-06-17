import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Usuario } from '../../auth/usuario.interface';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-profile',
  imports: [NavbarComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user: Usuario | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.usuarioActualValue;
  }
}