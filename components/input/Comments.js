import { useContext, useEffect, useState } from 'react';
import CommentList from './CommentList';
import NewComment from './NewComment';
import classes from './comments.module.css';
import notificationContext from '../../context/Notification/notificationContext';

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const { showNotification } = useContext(notificationContext);

  useEffect(() => {
    if (showComments) {
      setLoading(true);
      fetch(`/api/comments/${eventId}`)
        .then((res) => res.json())
        .then((data) => {
          setComments(data.comments);
          setLoading(false);
        });
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    showNotification({
      title: 'Posting comment...',
      status: 'pending',
      message: 'Trying to post a comment',
    });
    // send data to API
    fetch(`/api/comments/${eventId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentData),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return res.json().then((data) => {
          throw new Error(data.message || 'Something went wrong!');
        });
      })
      .then((data) => {
        showNotification({
          title: 'Success!',
          status: 'success',
          message: 'Comment sent successfully!',
        });
      })
      .catch((error) => {
        showNotification({
          title: 'Error!',
          status: 'error',
          message: error.message || 'Something went wrong!',
        });
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler} style={{ background: '#fff' }}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !loading && <CommentList comments={comments} />}
      {showComments && loading && <p className='center'>Loading...</p>}
    </section>
  );
}

export default Comments;
