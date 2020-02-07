
let nextVid = 0;
const videos = [];

const rooms = document.getElementsByClassName("room");
for (let i = 0; i < rooms.length; i++) {
  rooms[i].innerHTML = <p class="classNumber">${rooms[i].dataset.room}</p>;
}
const request = async () => {
  const response = await fetch("/data");
  const json = await response.json();

  const media = json.information.media;

  for (let i = 0; i < media.length; i++) {
    if (media[i].reference != "") {
      videos.push(media[i].reference)
  }
}


  console.log(videos); // Remove

if(media.length > 0){

  for (let i = 0; i < media.length; i++) {
    if(media[i].reference === ""){
      console.log("no")

    } else {
      console.log("yes")
              // create youtube player
              var player;
              function onYouTubePlayerAPIReady() {
                  player = new YT.Player('player', {
                    width: '300',
                    height: '200',
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
                  console.log(event);
              }
      
              // when video ends
              function onPlayerStateChange(event) {
                  if(event.data === 0) {
                    console.log(videos)
                    // (nextVid >= videos.length) ? nextVid = 0 : nextVid++;
                    if(nextVid <= videos.length){
                      nextVid += 1;
                      if(nextVid >= videos.length){
                        nextVid = 0;
                      }
                    }
                    // event.target.playVideo();
                    player.loadVideoById(videoId = videos[nextVid]);
                    console.log('video done')
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
}
}
    // autoplay video
    function onPlayerReady(event) {
      event.target.playVideo();
      event.target.mute();
      console.log(event);
      
  }
  // when video ends
function onPlayerStateChange(event) {
  if (event.data === 0) {
    event.target.playVideo();
  }
}
    onYouTubePlayerAPIReady();
