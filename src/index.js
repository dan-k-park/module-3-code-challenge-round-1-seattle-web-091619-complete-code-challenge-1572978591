const COMMENTS = [];

document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3856 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  getPicture(imageURL, likeURL, commentsURL);

})

const getPicture = (imageURL, likeURL, commentsURL) => {
  fetch(imageURL)
  .then(res => {
    return res.json();
  })
  .then(json => {
    let image = json;
    loadImage(image);
    handleLikes(image, likeURL);
    initializeCommentsForm(image, commentsURL);
  })
}

const loadImage = (image) => {
  let img = document.getElementById('image')
  let name = document.getElementById('name')
  
  img.src = image.url
  name.textContent = image.name

}

const handleLikes = (image, url) => {
  let likeCount = image.like_count;
  let likeButton = document.getElementById('like_button')
  let likes = document.getElementById('likes')

  likes.textContent = image.like_count

  likeButton.addEventListener('click', () => {
    likeCount++;
    likes.textContent = likeCount

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json'
      },
      body: JSON.stringify({
        image_id: 3856
      })
    })
  })
}


const initializeCommentsForm = (image, url) => {

  let commentForm = document.getElementById('comment_form')
  let commentList = document.getElementById('comments')

  for (const comment of image.comments) {
    let commentItem = document.createElement('li')
    commentItem.textContent = comment.content
    commentList.append(commentItem)
  }

  commentForm.addEventListener('submit', (ev) => {
    ev.preventDefault();

    let newComment = ev.target.comment_input.value;
    let newCommentLI = document.createElement('li');
    newCommentLI.textContent = newComment;
    commentList.append(newCommentLI);

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json'
      },
      body: JSON.stringify({
        image_id: 3856,
        content: newComment
      })
    })
  })

}