import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

async function loadVideoJs() {
  const videoJs = (window.videojs = (await import('video.js')).default);
  await import('src/app/shared/rangeslider-videojs');
  return videoJs;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  player: any;
  @ViewChild('myVideoComponent') myVideoComponent!: ElementRef;

  async ngAfterViewInit() {
    const videoJS = await loadVideoJs();
    this.player = videoJS(this.myVideoComponent.nativeElement, {}, () => {
      console.log('player ready!');
    });
    this.player.rangeSlider({
      hidden: false,
      responsive: true,
      width: 1600,
      height: 900,
    });
  }
}
