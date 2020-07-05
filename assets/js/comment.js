import axios from 'axios'

const commentForm = document.getElementById('addComment')
const commentList = document.getElementById('commentList')
const commentNumber = document.getElementById('commentNumber')

const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1
}

const addComment = (comment) => {
  const li = document.createElement('li')
  const span = document.createElement('span')
  span.innerHTML = comment
  li.appendChild(span)
  commentList.prepend(li)
  increaseNumber()
}

const sendComment = async (comment) => {
  const videoId = window.location.href.split('/videos/')[1]
  const response = await axios(`/api/${videoId}/comment`, {
    method: 'POST',
    data: {
      comment
    }
  })
  response.status === 200 && addComment(comment)
}

const handleSubmit = (event) => {
  event.preventDefault()
  const commentInput = commentForm.querySelector('input')
  const comment = commentInput.value
  !comment.value && sendComment(comment)
  commentInput.value = ''
}

const init = () => {
  commentForm.addEventListener('submit', handleSubmit)
}

commentForm && init()
