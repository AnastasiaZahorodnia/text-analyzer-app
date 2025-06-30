import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SynonymService {
  private readonly API_URL = 'https://api.datamuse.com/words';

  constructor(private http: HttpClient) {}

  /**
   * Returns a list of synonym words for the given term (max 20)
   */
  getSynonyms(term: string): Observable<string[]> {
    const url = `${this.API_URL}?ml=${encodeURIComponent(term)}&max=20`;
    return this.http
      .get<{ word: string }[]>(url)
      .pipe(map((res) => res.map((i) => i.word)));
  }
}
