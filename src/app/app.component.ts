import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'PartesCars';

  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const usuario = [
        {
          name: 'Juan',
          secondName: 'Perez',
          email: 'juan.perez@example.com',
          password: '12345678',
          role: 'user'
        },
        {
          name: 'Maria',
          secondName: 'Lopez',
          email: 'maria.lopez@example.com',
          password: '87654321',
          role: 'user'
        },
        {
          name: 'Admin',
          secondName: 'User',
          email: 'admin.user@example.com',
          password: 'admin123',
          role: 'admin'
        }
      ];
      localStorage.setItem('usuario', JSON.stringify(usuario));
    }
  }
}
