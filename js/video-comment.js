// Add a comment when the Enter key is pressed in the comment input area
const commentInput = document.getElementById("video-comment-area");
const addCommentButton = document.getElementById("add-comment");

commentInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        // Get the input value
        const commentText = commentInput.value;
        commentInput.value = "";
        // Get the current time
        const currentTime = new Date();

        const commentTime = formatTimeDifference(currentTime);

        // Create a new comment element
        const newCommentElement = createCommentElement("오르미 ", commentText, commentTime);


    
        
    }
});

// Create a new comment element
function createCommentElement(userName, commentText, commentTime) {
    const videocomments = document.getElementById("video-comments");

    const usercommentBox = document.createElement("div");
    usercommentBox.className = "user-comment-box";
    videocomments.appendChild(usercommentBox);

    const videouserImage = document.createElement("img");
    videouserImage.className = "video-user";
    videouserImage.src = "../src/img_video/comment-profile.jpg";
    usercommentBox.appendChild(videouserImage);

    const idonknow = document.createElement("div");
    usercommentBox.appendChild(idonknow);

    const idonknowdiv = document.createElement("div");
    idonknow.appendChild(idonknowdiv);

    const videousername = document.createElement("span");
    videousername.className = "video-user-name"
    videousername.textContent = userName;
    idonknowdiv.appendChild(videousername);

    const videocommenttime = document.createElement("span");
    videocommenttime.className = "video-comment-time"
    videocommenttime.textContent = commentTime;
    idonknowdiv.appendChild(videocommenttime);

    const videocommenttext = document.createElement("p");
    videocommenttext.textContent = commentText;
    videocommenttext.className = "video-comment-text";
    idonknow.appendChild(videocommenttext)

    const videocommenttoolbar = document.createElement("div");
    videocommenttoolbar.className = "video-comment-toolbar";
    idonknow.appendChild(videocommenttoolbar);

    const videolike = document.createElement("img");
    videolike.src = "../src/img_video/Liked.svg";
    videolike.className = "video-like";
    videolike.addEventListener("click", function () {
        increaseLikes(videoliketext);
    });
    videocommenttoolbar.appendChild(videolike);

    const videoliketext = document.createElement("span");
    videoliketext.className = "video-like-text";
    videoliketext.textContent = "0";
    videocommenttoolbar.appendChild(videoliketext);
    
    const videolike2 = document.createElement("img");
    videolike2.src = "../src/img_video/DisLiked.svg";
    videolike2.className = "video-like";
    videolike2.addEventListener("click", function () {
        increaseLikes(videoliketext2);
    });
    videocommenttoolbar.appendChild(videolike2);

    const videoliketext2 = document.createElement("span");
    videoliketext2.className = "video-like-text";
    videoliketext2.textContent = "0";
    videocommenttoolbar.appendChild(videoliketext2);

    const videocommentreply = document.createElement("button");
    videocommentreply.className = "video-comment-reply";
    videocommentreply.textContent = "REPLY";
    videocommenttoolbar.appendChild(videocommentreply);

    
}


function increaseLikes(likeTextElement) {
    const currentLikes = parseInt(likeTextElement.textContent);
    if (currentLikes === 0) {
        likeTextElement.textContent = currentLikes + 1;
    }
    else if (currentLikes === 1) {
        likeTextElement.textContent = currentLikes - 1;
    }
    
}

function formatTimeDifference(timestamp) {
    const currentTime = new Date();
    const commentTime = new Date(timestamp);

    const timeDifferenceInSeconds = Math.floor((currentTime - commentTime) / 1000);

    if (timeDifferenceInSeconds < 60) {
        return `${timeDifferenceInSeconds}초 전`;
    } else if (timeDifferenceInSeconds < 3600) {
        const minutes = Math.floor(timeDifferenceInSeconds / 60);
        return `${minutes}분 전`;
    } else if (timeDifferenceInSeconds < 86400) {
        const hours = Math.floor(timeDifferenceInSeconds / 3600);
        return `${hours}시간 전`;
    } else if (timeDifferenceInSeconds < 2592000) {
        const days = Math.floor(timeDifferenceInSeconds / 86400);
        return `${days}일 전`;
    } else if (timeDifferenceInSeconds < 31536000) {
        const months = Math.floor(timeDifferenceInSeconds / 2592000);
        return `${months}달 전`;
    } else {
        const years = Math.floor(timeDifferenceInSeconds / 31536000);
        return `${years}년 전`;
    }
}