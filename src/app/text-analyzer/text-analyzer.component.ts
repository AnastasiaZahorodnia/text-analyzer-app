import { Component, computed, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SynonymService } from '../synonym.service';

@Component({
  selector: 'app-text-analyzer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './text-analyzer.component.html',
  styleUrls: ['./text-analyzer.component.css'],
})
export class TextAnalyzerComponent {
  text = signal('');
  selStart = 0;
  selEnd = 0;

  synonyms: WritableSignal<string[]> = signal<string[]>([]);
  loading = signal(false);

  charCount = computed(() => this.text().length);
  wordCount = computed(
    () => this.text().trim().split(/\s+/).filter(Boolean).length,
  );

  constructor(private synonymSrv: SynonymService) {}

  updateSelection(event: Event) {
    const ta = event.target as HTMLTextAreaElement;
    this.selStart = ta.selectionStart;
    this.selEnd = ta.selectionEnd;
  }

  fetchSynonyms() {
    const selected = this.text().slice(this.selStart, this.selEnd).trim();
    if (!selected) {
      alert('Please select a word or phrase');
      return;
    }
    this.loading.set(true);
    this.synonymSrv.getSynonyms(selected).subscribe({
      next: (list) => this.synonyms.set(list),
      error: () => alert('Request error'),
      complete: () => this.loading.set(false),
    });
  }

  replace(word: string) {
    const t = this.text();
    const newText = t.slice(0, this.selStart) + word + t.slice(this.selEnd);
    this.text.set(newText);
    this.selStart = this.selEnd = this.selStart + word.length;
    this.synonyms.set([]);
  }

  copyAll() {
    navigator.clipboard.writeText(this.text()).then(() => alert('Copied'));
  }

  onInput(event: Event) {
    this.text.set((event.target as HTMLTextAreaElement).value);
  }
}
