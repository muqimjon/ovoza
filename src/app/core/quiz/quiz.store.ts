import { computed, Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class QuizStore {
  readonly answers = signal<string[]>([]);
  readonly summary = signal<string>('');
  readonly completed = computed(() => this.answers().length > 0);

  set(answers: string[], summary: string): void {
    this.answers.set(answers);
    this.summary.set(summary);
  }
}
