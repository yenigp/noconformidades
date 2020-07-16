import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompressImageService {

  constructor() { }

  resizedataURL(datas, maxWidth, maxHeight): Promise<any> {
    return new Promise(async function (resolve, reject) {

      // We create an image to receive the Data URI
      var img = document.createElement('img');
      img.src = datas;

      // When the event "onload" is triggered we can resize the image.
      img.onload = function () {
        // We create a canvas and get its context.
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');

        console.log(img.height);
        console.log(img.width);

        let ratio = 1;
        if (img.width > maxWidth) {
          ratio = maxWidth / img.width;
        } else if (img.height > maxHeight) {
          ratio = maxHeight / img.height;
        }

        // We set the dimensions at the wanted size.
        canvas.width = img.width * ratio;
        canvas.height = img.height * ratio;
        // console.log('ratio:', ratio);
        // console.log('width:', canvas.width);
        // console.log('heigth:', canvas.height);

        // We resize the image with the canvas method drawImage();
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        var dataURI = canvas.toDataURL();

        // This is the return of the Promise
        resolve(dataURI);
      };

      // We put the Data URI in the image's src attribute
      img.src = datas;

    });
  }

}
