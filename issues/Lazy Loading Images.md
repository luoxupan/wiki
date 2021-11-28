### 核心代码

```js
document.addEventListener("DOMContentLoaded", function() {
  var lazyloadImages = Array.prototype.slice.apply(document.querySelectorAll("img.lazy"));    
  var lazyloadThrottleTimeout;
  
  function lazyload() {
    if (lazyloadThrottleTimeout) {
      clearTimeout(lazyloadThrottleTimeout);
    }    
    lazyloadThrottleTimeout = setTimeout(function() {
        var scrollTop = window.pageYOffset;
        lazyloadImages = lazyloadImages.filter(function(img) {
            if(img.offsetTop < (window.innerHeight + scrollTop)) {
              img.src = img.dataset.src;
              img.classList.remove('lazy');
              return false;
            } else {
              return true;
            }
        });
        if (lazyloadImages.length == 0) { 
          document.removeEventListener("scroll", lazyload);
          window.removeEventListener("resize", lazyload);
          window.removeEventListener("orientationChange", lazyload);
        }
    }, 20);
  }
  
  document.addEventListener("scroll", lazyload);
  window.addEventListener("resize", lazyload);
  window.addEventListener("orientationChange", lazyload);
});
```

### 升级版（使用IntersectionObserver）
```js
document.addEventListener("DOMContentLoaded", function() {
  var lazyloadImages;    

  if ("IntersectionObserver" in window) {
    lazyloadImages = document.querySelectorAll("img.lazy");
    var imageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var image = entry.target;
          image.src = image.dataset.src;
          image.classList.remove("lazy");
          imageObserver.unobserve(image);
        }
      });
    });

    lazyloadImages.forEach(function(image) {
      imageObserver.observe(image);
    });
  } else {  
    var lazyloadImages = Array.prototype.slice.apply(document.querySelectorAll("img.lazy"));    
    var lazyloadThrottleTimeout;
    
    function lazyload() {
      if (lazyloadThrottleTimeout) {
        clearTimeout(lazyloadThrottleTimeout);
      }    
      lazyloadThrottleTimeout = setTimeout(function() {
          var scrollTop = window.pageYOffset;
          lazyloadImages = lazyloadImages.filter(function(img) {
              if(img.offsetTop < (window.innerHeight + scrollTop)) {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                return false;
              } else {
                return true;
              }
          });
          if (lazyloadImages.length == 0) { 
            document.removeEventListener("scroll", lazyload);
            window.removeEventListener("resize", lazyload);
            window.removeEventListener("orientationChange", lazyload);
          }
      }, 20);
    }
    
    document.addEventListener("scroll", lazyload);
    window.addEventListener("resize", lazyload);
    window.addEventListener("orientationChange", lazyload);
  }
})
```


### 参考
- [the-complete-guide-to-lazy-loading-images](https://css-tricks.com/the-complete-guide-to-lazy-loading-images/)
- [lazy-loading-css-background-images](https://css-tricks.com/the-complete-guide-to-lazy-loading-images/#chapter-4-lazy-loading-css-background-images)




---



### 完整html代码
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title></title>
  <style>
    img {
      background: #F1F1FA;
      width: 400px;
      height: 300px;
      display: block;
      margin: 10px auto;
      border: 0;
    }
  </style>
</head>
<body>
  <img src="https://ik.imagekit.io/demo/img/image1.jpeg?tr=w-400,h-300" />
  <img src="https://ik.imagekit.io/demo/img/image2.jpeg?tr=w-400,h-300" />
  <img src="https://ik.imagekit.io/demo/img/image3.jpg?tr=w-400,h-300" />
  <img class="lazy" data-src="https://ik.imagekit.io/demo/img/image4.jpeg?tr=w-400,h-300" />
  <img class="lazy" data-src="https://ik.imagekit.io/demo/img/image5.jpeg?tr=w-400,h-300" />
  <img class="lazy" data-src="https://ik.imagekit.io/demo/img/image6.jpeg?tr=w-400,h-300" />
  <img class="lazy" data-src="https://ik.imagekit.io/demo/img/image7.jpeg?tr=w-400,h-300" />
  <img class="lazy" data-src="https://ik.imagekit.io/demo/img/image8.jpeg?tr=w-400,h-300" />
  <img class="lazy" data-src="https://ik.imagekit.io/demo/img/image9.jpeg?tr=w-400,h-300" />
  <img class="lazy" data-src="https://ik.imagekit.io/demo/img/image10.jpeg?tr=w-400,h-300" />
  <script>
  document.addEventListener("DOMContentLoaded", function() {
    var lazyloadImages = Array.prototype.slice.apply(document.querySelectorAll("img.lazy"));    
    var lazyloadThrottleTimeout;
    
    function lazyload() {
      if (lazyloadThrottleTimeout) {
        clearTimeout(lazyloadThrottleTimeout);
      }    
      lazyloadThrottleTimeout = setTimeout(function() {
          var scrollTop = window.pageYOffset;
          lazyloadImages = lazyloadImages.filter(function(img) {
              if(img.offsetTop < (window.innerHeight + scrollTop)) {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                return false;
              } else {
                return true;
              }
          });
          if (lazyloadImages.length == 0) { 
            document.removeEventListener("scroll", lazyload);
            window.removeEventListener("resize", lazyload);
            window.removeEventListener("orientationChange", lazyload);
          }
      }, 20);
    }
    
    document.addEventListener("scroll", lazyload);
    window.addEventListener("resize", lazyload);
    window.addEventListener("orientationChange", lazyload);
  });
  </script>
</body>
</html>
```

