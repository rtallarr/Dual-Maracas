import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetStatsService {
  constructor() { }

  private readonly _http = inject(HttpClient);

  getUserStats(username: string) {
    const req = new HttpRequest('GET', `https://sync.runescape.wiki/runelite/player/${username}/STANDARD`);
    return this._http.request(req);
  }
}
