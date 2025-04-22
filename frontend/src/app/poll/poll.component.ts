import { Component, OnInit } from '@angular/core';
import { Poll } from '../poll.models'; // Adjust the path as needed
import { PollService } from '../poll.service'; // Adjust the path as needed
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-poll',
  standalone: true,
  imports: [CommonModule, FormsModule], // Add any necessary imports here
  providers: [],
  templateUrl: './poll.component.html',
  styleUrl: './poll.component.css'
})
export class PollComponent implements OnInit {
  newPoll: Poll = { id: 0, question: '', options: [
    { optionText: '', voteCount: 0 },
    { optionText: '', voteCount: 0 }
  ] };
  polls: Poll[] = [];
  constructor(private pollService: PollService) { }
  
  ngOnInit(): void {
    this.loadPolls();
  }

  loadPolls() {
    this.pollService.getPolls().subscribe({
      next: (data) => {
        this.polls = data;
      },
      error: (error) => {
        console.error('Error fetching polls:', error);
      }
    });
  }
  createPoll() {
    if (!this.newPoll.question || !this.newPoll.options || this.newPoll.options.length === 0) {
        console.error('Poll data is incomplete:', this.newPoll);
        return;  // Do not make the request if data is invalid
    }

    console.log('Sending poll data:', JSON.stringify(this.newPoll, null, 2));
    const payload: any = {
      // id: 10, // Assuming a default value for `id` since it's required by the `Poll` type
      question: this.newPoll.question.trim(),
      options: this.newPoll.options.map(opt => ({
          optionText: opt.optionText.trim(),
          voteCount: 0
      }))
  };

    this.pollService.createPoll(payload).subscribe({
        next: (createdPoll) => {
            console.log('Poll created successfully:', createdPoll);
            this.polls.push(createdPoll);
            this.resetPoll(); // Reset the newPoll object after successful creation
            this.loadPolls(); // Refresh the list of polls
        },
        error: (error) => {
            console.error('Error creating poll:', error);
            if (error.error) {
                console.error('Server error details:', error.error);
            }
        }
    });
  }

  resetPoll() {
    this.newPoll = { id: 0, question: '', options: [
      { optionText: '', voteCount: 0 },
      { optionText: '', voteCount: 0 }
    ] };
  }

  vote(pollId: number, optionIndex: number) {
    this.pollService.vote(pollId, optionIndex).subscribe({
      next: (updatedPoll) => {
        const poll = this.polls.find(p => p.id === pollId);
        console.log('Vote registered successfully:', updatedPoll);
        if (poll) {
          poll.options[optionIndex].voteCount++;
        }
        this.loadPolls(); // Refresh the list of polls after voting
      },
      error: (error) => {
        console.error('Error voting on a poll:', error);
      }
    });
  }
  addOption(){
    this.newPoll.options.push({ optionText: '', voteCount: 0 });
  }

  trackByIndex(index: number): number {
    return index;
  }
}