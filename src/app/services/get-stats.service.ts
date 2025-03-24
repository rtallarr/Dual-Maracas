import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetStatsService {
  private readonly _http = inject(HttpClient);

  getUserStats(username: string) {
    return this._http.get(`https://sync.runescape.wiki/runelite/player/${username}/STANDARD`);
  }
}
