var api = "AIzaSyA-0VdmxIIHTxrY_gFDsNgRQEO015g-7sI";

var video = localStorage.getItem("video") || "";
var videoNameData = localStorage.getItem("videodata") || "" ;

var videoName = document.getElementById("inputSearch").setAttribute("value", videoNameData);

var onLoad = () => {
    try {
        var videoName = document.getElementById("inputSearch").value;
        fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&part=id&q=${videoName}&maxResults=20&key=${api}`)
        .then((response)=>{
            return response.json();
        })
        .then((response) => {
            var data = response.items;
            console.log(data);
            appendVideo(data);
        })
    } catch (error) {
        console.log(error);
    }
}

onLoad();

var appendVideo = (data) => {
    data.forEach(({snippet,id}) => {
        var card = document.createElement("div");
        card.setAttribute("class", "card");
        var a = document.createElement("a");
        var img = document.createElement("img");
        img.setAttribute("src", snippet.thumbnails.medium.url);
        img.setAttribute("class", "tumbnail");
        a.append(img);
        a.addEventListener("click", () => {
            localStorage.setItem("video", id.videoId);
            window.location.href = "video.html";
        });
        var flexDiv = document.createElement("div");
        flexDiv.setAttribute("class", "flexDiv");
        var img1 = document.createElement("img");
        fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet&part=id&id=${snippet.channelId}&key=${api}`)
        .then((response)=>{
            return response.json();
        })
        .then((response) => {
            var data = response.items;
            img1.setAttribute("src", data[0].snippet.thumbnails.medium.url);
        })
        var vidInfo = document.createElement("div");
        vidInfo.setAttribute("class", "vidInfo");
        var a1 = document.createElement("a");
        a1.textContent = snippet.title;
        var p = document.createElement("p");
        p.textContent = snippet.channelTitle;
        vidInfo.append(a1, p);
        flexDiv.append(img1, vidInfo);
        card.append(a, flexDiv);
        document.getElementById("display").append(card);
    });
}


