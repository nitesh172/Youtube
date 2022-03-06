var api = "AIzaSyDVGxTXK7nD9rq6t3BE46WAy2U5qwLDUVU";


var url = `https://youtube.googleapis.com/youtube/v3/search?q=weather%20website&type=video&key=AIzaSyCuiuxlWG8V41FWde12SyHUTyYihcfcSTY`;
var url2 = `"https://youtube.googleapis.com/youtube/v3/search?q=weather%20website&key=AIzaSyCuiuxlWG8V41FWde12SyHUTyYihcfcSTY"`;
var url3 = `https://youtube.googleapis.com/youtube/v3/videos?regionCode=IN&chart=mostPopular&maxResults=20&part=snippet&key=${api}`
var ccurl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&part=id&id=UC_x5XG1OV2P6uZZ5FSM9Ttw&key=AIzaSyCuiuxlWG8V41FWde12SyHUTyYihcfcSTY`;

var video = localStorage.getItem("video") || "";

var onLoad = () => {
    try {
        fetch(url3)
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
        card.setAttribute("class", "card");
        var a = document.createElement("a");
        var img = document.createElement("img");
        img.setAttribute("src", snippet.thumbnails.medium.url);
        img.setAttribute("class", "tumbnail");
        a.append(img);
        a.addEventListener("click", () => {
            localStorage.setItem("video", id);
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


