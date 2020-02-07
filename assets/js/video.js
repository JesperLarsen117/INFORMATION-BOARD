
let nextVid = 0;
const videos = [];
const request = async () => {
  const response = await fetch("/data");
  const json = await response.json();
  
  const media = json.information.media;
  

  for (let i = 0; i < media.length; i++) {
    if (media[i].reference != "") {
      videos.push(media[i].reference)
  }
}



if(media.length > 0){

  for (let i = 0; i < media.length; i++) {
    if(media[i].reference === ""){
    } else {
              // create youtube player
              var player;
              function onYouTubePlayerAPIReady() {
                  player = new YT.Player('player', {
                    width: '441.51',
                    height: '290.69',
                    // videoId: '0Bmhjf0rKe8',
                    videoId: videos[nextVid],
                    events: {
                      onReady: onPlayerReady,
                      onStateChange: onPlayerStateChange
                    }
                  });
              }
      
              // autoplay video
              function onPlayerReady(event) {
                  event.target.playVideo();
                  event.target.mute();
              }
      
              // when video ends
              function onPlayerStateChange(event) {
                  if(event.data === 0) {
                    // (nextVid >= videos.length) ? nextVid = 0 : nextVid++;
                    if(nextVid <= videos.length){
                      nextVid += 1;
                      if(nextVid >= videos.length){
                        nextVid = 0;
                      }
                    }
                    // event.target.playVideo();
                    player.loadVideoById(videoId = videos[nextVid]);
                  }
              }
    }
  }
}else{

  //  Fallback, hvis der ingen video er i array:
  var player;
  function onYouTubePlayerAPIReady() {
      player = new YT.Player('player', {
        width: '300',
        height: '200',
        videoId: 'c30DqDb4iAc',
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange
        }
      });
    }

    // autoplay video
    function onPlayerReady(event) {
      event.target.playVideo();
      event.target.mute();
      
  }
  // when video ends
function onPlayerStateChange(event) {
  if (event.data === 0) {
    event.target.playVideo();
  }
}
}
onYouTubePlayerAPIReady();
}

request();