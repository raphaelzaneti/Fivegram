
function toggleActive(e) {

    const elementId = e.id
    const activeId = elementId.slice(elementId.length - 6, elementId.length)

    if (activeId === 'active') {
        const inactiveId = elementId.slice(0, elementId.length - 7)
        $('#' + elementId).addClass('d-none')
        $('#' + inactiveId).removeClass("d-none")
    } else {
        $('#' + elementId).addClass('d-none')
        $('#' + elementId + '-active').removeClass("d-none")

        if (elementId.slice(elementId.length - 4, elementId.length) == 'save') {
            savePost(elementId)
        }
    }

}

function savePost(elementId) {
    console.log(elementId)
    const destination = document.getElementById('teste')

    const imageContainer = document.createElement('figure')
    const image = document.createElement('img')
    image.src = "./assets/images/post-1.jpg"
    image.classList.add('img-fluid')
    image.classList.add('saved-image')
    imageContainer.appendChild(image)
    destination.appendChild(imageContainer)

    setTimeout(() => {
        imageContainer.remove()
    }, 1200);
}



//show/hide description text and the comments according to the window size
if ($(document).width() > 799) {
    $('.post__description-hidden-text').removeClass('d-none')
    $('.posts__comments-mobile').addClass('d-none')
    $('.post__comments-comment').removeClass('d-none')
} else {
    $('.post__description-hidden-text').addClass('d-none')
    $('.posts__comments-mobile').removeClass('d-none')
    $('.post__comments-comment').addClass('d-none')
}

$(window).resize(
    () => {
        if ($(document).width() > 799) {
            $('.post__description-hidden-text').removeClass('d-none')
            $('.posts__comments-mobile').addClass('d-none')
            $('.post__comments-comment').removeClass('d-none')
        } else {
            $('.post__description-hidden-text').addClass('d-none')
            $('.posts__comments-mobile').removeClass('d-none')
            $('.post__comments-comment').addClass('d-none')
        }
    }
)

let likesId = 1

function getJson() {
    fetch('../../assets/json/comments.json')
        .then(res => res.json())
        .then(json => renderComments(json.comments))

}

function renderComments(arr) {
    arr.map(e => {
        $('#post-1-comments').append(getComments(e))
        $('#post-2-comments').append(getComments(e))
    })
    if ($(document).width() < 799) {
        $('.post__comments-comment').addClass('d-none')
    }
}

function getComments(e) {
    const commentArea = document.createElement('div')

    const content = document.createElement('span')
    const username = document.createElement('span')
    const comment = document.createElement('span')

    const commentLike = document.createElement('span')
    const commentLikeActive = document.createElement('span')

    const secondLine = document.createElement('span')
    const date = document.createElement('span')
    const likes = document.createElement('span')
    const reply = document.createElement('img')

    username.innerText = e.username
    username.classList.add('post__comments-user')

    content.innerText = e.comment

    comment.classList.add('post__comments-text')
    comment.appendChild(username)
    comment.appendChild(content)

    date.innerText = e.time
    date.classList.add('post__comments-info')

    likes.innerText = e.likes + " likes"
    likes.classList.add('post__comments-info')

    reply.innerText = 'Reply'
    reply.classList.add('post__comments-info')

    secondLine.classList.add('post__comments-info-area')

    secondLine.appendChild(date)
    secondLine.appendChild(likes)
    secondLine.appendChild(reply)

    commentLike.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor"
            class="bi bi-heart" viewBox="0 0 16 16">
            <path
                d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
        </svg>
    `

    commentLikeActive.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor"
            class="bi bi-heart-fill" viewBox="0 0 16 16">
        <path fill-rule="evenodd"
            d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
        </svg>
    `

    commentLike.classList.add('post__comments-like')
    commentLike.id = 'like-'+likesId

    commentLikeActive.classList.add('post__comments-like')
    commentLikeActive.classList.add('post__comments-like-active')
    commentLikeActive.classList.add('d-none')
    commentLikeActive.id = 'like-'+likesId+"-active"

    commentArea.classList.add('post__comments-comment')
    commentArea.appendChild(comment)
    commentArea.appendChild(secondLine)
    commentArea.appendChild(commentLike)
    commentArea.appendChild(commentLikeActive)

    likesId++
    
    return commentArea
}

getJson()