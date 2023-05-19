import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';


import { Song } from './songs/songs.component';

@Injectable({
  providedIn: 'root'
})
export class MusicDataService {

  _baseUrl: string = "http://localhost:3000/api/"

  constructor(private _http: HttpClient) {}

  ngOnInit() {

  }

  public getAll(offset:number, count:number, keySearch:string):Observable<Song[]> {
    let url;
    if (keySearch) {
      url = this._baseUrl + "songs?offset=" + offset + "&count=" + count + "&keySearch=" + keySearch;
    } else {
      url = this._baseUrl + "songs?offset=" + offset + "&count=" + count;
    }
    return this._http.get<Song[]>(url);
  }

  public getOne(songId:string):Observable<Song> {
    const url = this._baseUrl + "songs/" + songId;
    return this._http.get<Song>(url);
  }

  public deleteOne(songId:string):Observable<Object> {
    const url = this._baseUrl + "songs/" + songId;
    return this._http.delete<Object>(url);
  }

  public addOne(newSong:Object):Observable<Song> {
    const url = this._baseUrl + "songs";
    return this._http.post<Song>(url, newSong);
  }

  public fullUpdateOne(songId:string, song:Object):Observable<Song> {
    const url = this._baseUrl + "songs/" + songId;
    return this._http.put<Song>(url, song);
  }

  public artistAddOne(songId:string, artist:Object):Observable<Song> {
    const url = this._baseUrl + "songs/" + songId + "/artists";
    return this._http.post<Song>(url, artist);
  }

  public artistDeleteOne(songId:string, artistId:string):Observable<Object> {
    const url = this._baseUrl + "songs/" + songId + "/artists/" + artistId;
    return this._http.delete<Object>(url);
  }

  public fullArtistUpdateOne(songId:string, artistId:string, artist:Object):Observable<Object> {
    const url = this._baseUrl + "songs/" + songId + "/artists/" + artistId;
    return this._http.put<Object>(url, artist);
  }

}
