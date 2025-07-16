import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-auth-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './auth-footer.component.html',
  styleUrl: './auth-footer.component.css'
})
export class AuthFooterComponent {

}
