function imgresize(img, maxh, maxw) {
	if(img.width < maxw && img.height < maxh){
		return
	}
	var ratio = maxh/maxw;
	if (img.height/img.width > ratio){
		// height is the problem
		if (img.height > maxh){
			img.width = Math.round(img.width*(maxh/img.height));
			img.height = maxh;
		}
	} else {
		// width is the problem
		if (img.width > maxw){
			img.height = Math.round(img.height*(maxw/img.width));
			img.width = maxw;
		}
	}
}

function akvideoviewer(elem) {
	var my = this
	this.base = elem

	this.view = $("<div />", {
		class: 'akview'
	})

	this.video = $('<video autoplay loop controls/>', {
		class: 'akvideo'
	})

	this.before = function(){}
	this.after = function(){}

	this.view.append(this.video)

	akvideoviewer.prototype.close = function() {
		my.view.remove()
		my.after()
	}

	akvideoviewer.prototype.open = function(vidsrc) {
		my.before()
		my.base.append(this.view)
		my.video.prop('src', vidsrc)

		my.view.css({
			marginLeft: window.innerWidth
		})

		my.video.on('loadeddata', function() {
			var video = $('.akvideo')[0]
			var deltatop = window.innerHeight > video.videoHeight ? window.innerHeight/2 - video.videoHeight/2 : 0
			var deltaside = window.innerWidth/2 - video.videoWidth/2

			my.video.css({
				marginTop: deltatop,
				marginLeft: deltaside,
				marginRight: deltaside})

			my.view.css({
				marginLeft: 0
			})
		})
		my.video.on('click', my.close)
		my.view.on('click', my.close)
	}
}

function akviewer(elem) {
	var my = this
	this.base = elem

	this.view = $("<div />", {
		class: 'akview'
	})

	this.image = $('<img />', {
		class: 'akimage'
	})

	this.before = function(){}
	this.after = function(){}

	this.view.append(this.image)

	akviewer.prototype.close = function() {
		my.view.remove()
		my.after()
	}

	akviewer.prototype.open = function(imgsrc) {
		my.before()
		my.base.append(this.view)
		my.image.prop('src', imgsrc)

		my.view.css({
			marginLeft: window.innerWidth
		})

		my.image.on('load', function() {
			var image = $('.akimage')[0]
			imgresize(image,10000,1400)
			var deltatop = window.innerHeight > image.height ? window.innerHeight/2 - image.height/2 : 0
			var deltaside = window.innerWidth/2 - image.width/2

			my.image.css({
				marginTop: deltatop,
				marginLeft: deltaside,
				marginRight: deltaside})

			my.view.css({
				marginLeft: 0
			})
		})
		my.image.on('click', my.close)
		my.view.on('click', my.close)
	}
}
