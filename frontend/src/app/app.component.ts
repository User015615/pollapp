import { Component } from '@angular/core';
import { PollComponent } from './poll/poll.component'; // Adjust the path as needed

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PollComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Fixed typo: styleUrl -> styleUrls
})
export class AppComponent {
  title = 'frontend';
}
