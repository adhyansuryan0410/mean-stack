import { Component, OnInit } from '@angular/core';
import { Video } from '../video';
import { VideoService } from '../video.service';

@Component({
  selector: 'app-video-center',
  templateUrl: './video-center.component.html',
  styleUrls: ['./video-center.component.css']
})
export class VideoCenterComponent implements OnInit {

  public videos: Video[];
  selectedVideo: Video;
  public hideNewVideo: boolean = true;

  constructor(private _videoService: VideoService) { }

  ngOnInit(): void {
    this._videoService.getVideos().subscribe(Response => this.videos = Response)
  }

  onSelectVideo(video: any){
    this.selectedVideo = video
    this.hideNewVideo = true
    console.log(this.selectedVideo)
  }

  onSubmitAddVideo(video: Video){
    this._videoService.addVideo(video).subscribe(newVideo => {
      this.videos.push(newVideo)
      this.hideNewVideo = true
      this.selectedVideo = newVideo
    })
  }

  onUpdateVideoEvent(video: any){
    this._videoService.updateVideo(video).subscribe(updatedVideo => video = updatedVideo)
    this.selectedVideo = null
  }

  onDeleteVideoEvent(video: any){
    let videoArray = this.videos
    this._videoService.deleteVideo(video).subscribe(deletedVideo => {
      for(let i=0; i<videoArray.length; i++){
        if(videoArray[i]._id === video._id){
          videoArray.splice(i,1)
        }
      }
    })
    this.selectedVideo = null
  }

  displayNewVideo(){
    this.hideNewVideo = false;
  }

}
