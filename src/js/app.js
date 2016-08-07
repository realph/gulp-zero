(function() {
  var $ = require('jquery-browserify');
  keyframe = require('jquerykeyframes');

  var img = $('picture > img');

  var browserWidth = $(window).width();
  var browserHeight = $(window).height();

  console.log('original image width', img.width());
  console.log('original image height', img.height());
  console.log('browserWidth', browserWidth);
  console.log('browserHeight', browserHeight);
  
  // check it does this on load
  var newImageWidth = browserHeight * img.width() / img.height();
  var translateX = browserHeight - img.width(); // what if its a thin image

  console.log('new image width', newImageWidth);
  

  console.log(browserHeight - img.width());

  var translateAcrossThisManyPixels = newImageWidth - browserHeight;

  // if(newImageWidth < (browserHeight - newImageWidth)) {
  //   console.log('this is true');
  //   // translateAcrossThisManyPixels = newImageWidth - browserWidth;
  // } else {
  //   console.log('this is false');
  // }

  // if(newImageWidth < (browserHeight - img.width())) {
  //   translateAcrossThisManyPixels = 'translateX(-' + (newImageWidth - browserWidth) + 'px)';
  //   console.log('yes');
    
  //   console.log('translate these:', translateAcrossThisManyPixels);
  // } else {
  //   translateAcrossThisManyPixels = 'translateX(-' + (browserHeight - img.width()) + 'px)';
    
  //   console.log('translate these:', translateAcrossThisManyPixels);  
  // }
  
  // console.log($.keyframe);
  var supportedFlag = $.keyframe.isSupported();
  $.keyframe.debug = true;

  $.keyframe.define([{
      name: 'pan',
      '0%': {
          'transform': 'translateX(0px)' //Note that 'transform' will be autoprefixed for you
      },
      '100%': {
          'transform': 'translateX(-' + translateAcrossThisManyPixels.toString() + 'px)' //Note that 'transform' will be autoprefixed for you
      }
  }]);


  img.css({
    'min-height': browserHeight,
    'height': browserHeight,
    'min-width': newImageWidth,
    'width': newImageWidth,
    // 'transform': str
  })

  console.log(img.playKeyframe);
  
  

  img.playKeyframe('pan 2s linear 0 infinite normal forwards', function() {
    console.log('animation has played');
  });
  
  
})();