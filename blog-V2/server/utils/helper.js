const fs = require('fs');
const DATABASE_FILE_PATH = '../../DB/data.json';

const fetchPost = async () => {
  try {
    const data = await fs.promises.readFile(DATABASE_FILE_PATH, 'utf8');
    if (Object.keys(data).length) {
      return JSON.parse(data);
    } else {
      return {};
    }
  } catch (error) {
    console.log('Error fetching post database error:', error.message);
    throw error;
  }
};

const createPost = async ({ id, title, comments }) => {
  try {
    const posts = await fetchPost();
    posts[id] = {
      id,
      title,
      comments,
    };
    await fs.promises.writeFile(DATABASE_FILE_PATH, JSON.stringify(posts));
    console.log('Post created successfully : ', posts);
  } catch (error) {
    console.error('Error in creating post, error: ', error.message);
    throw error;
  }
};

const updateCommentForAPost = async ({
  status,
  postId,
  content,
  commentId,
}) => {
  try {
    let postComment = null;
    const posts = await fetchPost();
    const comments = posts[postId].comments || [];

    const commentIndex = comments.findIndex(
      (comment) => comment.commentId === commentId
    );

    console.log('comments ', comments);
    console.log('commentIndex ', commentIndex);
    if (commentIndex !== -1) {
      comments[commentIndex] = {
        id: commentId,
        status: status,
        postId: postId,
        content: content,
      };
      postComment = comments[commentIndex];
    } else {
      const newComment = {
        commentId,
        status,
        postId,
        content,
      };
      postComment = newComment;
      comments.push(newComment);
      posts[postId].comments = comments;
    }

    await fs.promises.writeFile(DATABASE_FILE_PATH, JSON.stringify(posts));
    console.log('Comment added successfully, comment: ', postComment);
    return postComment;
  } catch (err) {
    console.error('Error in adding comment, err: ', err);
    throw err;
  }
};

module.exports = { fetchPost, createPost, updateCommentForAPost };
