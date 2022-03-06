var video = localStorage.getItem("video");

document.getElementById("videoplayback").setAttribute("src", `https://www.youtube.com/embed/${video}`);
var api = "AIzaSyDVGxTXK7nD9rq6t3BE46WAy2U5qwLDUVU"


var url3i = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=id&id=${video}&key=${api}`
var url3 = `https://youtube.googleapis.com/youtube/v3/videos?regionCode=IN&chart=mostPopular&maxResults=5&part=snippet&key=${api}`


var video = localStorage.getItem("video") || "";

var onLoad = () => {
    try {
        fetch(url3i)
        .then((response)=>{
            return response.json();
        })
        .then((response) => {
            var data = response.items;
            console.log(data);
            document.getElementById("titleName").textContent = data[0].snippet.title;
        })
    } catch (error) {
        console.log(error);
    }
    try {
        fetch(url3)
        .then((response)=>{
            return response.json();
        })
        .then((response) => {
            var data = response.items;
            appendVideo(data);
        })
    } catch (error) {
        console.log(error);
    }
}

var videoNameData = localStorage.getItem("videodata") || ""; 

var seacrchGO = () => {
    var input = document.getElementById("inputSearch").value;
    localStorage.setItem("videodata", input);
    window.location.href = "search.html";
}
onLoad();

var appendVideo = (data) => {
    data.forEach(({snippet,id}) => {
        var card = document.createElement("div");
        card.setAttribute("class", "sideVideoList");
        var a = document.createElement("a");
        a.setAttribute("class", "smallTumbnail");
        var img = document.createElement("img");
        img.setAttribute("src", snippet.thumbnails.medium.url);
        a.append(img);
        a.addEventListener("click", () => {
            localStorage.setItem("video", id);
            window.location.href = "video.html";
        });
        var vidInfo = document.createElement("div");
        vidInfo.setAttribute("class", "vidInfo");
        var a1 = document.createElement("a");
        a1.textContent = snippet.title;
        var p = document.createElement("p");
        p.textContent = snippet.channelTitle;
        vidInfo.append(a1, p);
        card.append(a, vidInfo);
        document.getElementById("display").append(card);
    });
}

var seacrchGO = () => {
    var input = document.getElementById("inputSearch").value;
    localStorage.setItem("videodata", input);
    window.location.href = "search.html";
}