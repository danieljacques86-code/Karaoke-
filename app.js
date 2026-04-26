function handleCredentialResponse(response) {
    const data = parseJwt(response.credential);

    localStorage.setItem("user", JSON.stringify(data));

    showApp(data);
}

function parseJwt(token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(c =>
        '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    ).join(''));

    return JSON.parse(jsonPayload);
}

function showApp(user) {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("app").style.display = "block";

    document.getElementById("userInfo").innerHTML = `
        <img src="${user.picture}" width="60">
        <p>${user.name}</p>
    `;
}

function logout() {
    localStorage.removeItem("user");
    location.reload();
}

// PLAYER HLS
function playVideo(url) {
    const video = document.getElementById("player");

    if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(video);
    } else {
        video.src = url;
    }
}

// manter login
window.onload = () => {
    const user = localStorage.getItem("user");

    if (user) {
        showApp(JSON.parse(user));
    }
};
