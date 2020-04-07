import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Video } from './video';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private _getUrl = "/api/videos"
  private _postUrl = "/api/video"
  private _putUrl = "/api/video/"
  private _deleteUrl = "/api/video/"
  constructor(private _http: HttpClient) { }

  getVideos(): Observable<Video[]> {
    return this._http.get<Video[]>(this._getUrl)
  }

  addVideo(video: Video): Observable<Video>{
    return this._http.post<Video>(this._postUrl, JSON.stringify(video), {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    })
  }

  updateVideo(video: Video): Observable<Video>{
    return this._http.post<Video>(this._putUrl + video._id, JSON.stringify(video), {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    })
  }

  deleteVideo(video: Video){
    return this._http.delete(this._deleteUrl + video._id)
  }
}
