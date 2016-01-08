'use strict';
import { React } from 'react'

class ColorThief {
	constructor(){

	}
	getColor(img){
		this.canvas = document.createElement('canvas');
		this.ctx = this.canvas.getContext('2d');
		this.ctx.width = img.width;
		this.ctx.height = img.height;
		this.canvas.width = img.width;
		this.canvas.height = img.height;
		this.ctx.drawImage(img, 0, 0);
		var imgData = this.ctx.getImageData(0, 0, img.width, img.height);
		var r = 0;
		var g = 0;
		var b = 0;
		var c = 0;

		for (var i = 0; i < imgData.data.length; i += 4){
			c += 1;
			r += imgData.data[i + 0];
			g += imgData.data[i + 1];
			b += imgData.data[i + 2];
		}
		return [
			Math.floor(r / c),
			Math.floor(g / c),
			Math.floor(b / c)
		];
	}
}
export default ColorThief