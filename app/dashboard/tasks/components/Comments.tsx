import React, { useState, useEffect } from 'react';

const Comments = ({ taskId }: { taskId?: string }) => {
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [cursor, setCursor] = useState<{
    last_comment_id: string | null;
    page_size: number;
  }>({
    last_comment_id: null,
    page_size: 5,
  });
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    if (taskId) {
      setComments([]);
      setCursor({ last_comment_id: null, page_size: 10 });
      setIsFirstLoad(true);
      fetchComments();
    }
  }, [taskId]);

  const fetchComments = async () => {
    if (!taskId || loading) return;

    setLoading(true);

    try {
      const response = await fetch(
        `/api/comments?task_id=${taskId}&cursor=${JSON.stringify(cursor)}`
      );
      const data = await response.json();

      if (data.comments) {
        setComments((prevComments) =>
          isFirstLoad
            ? data.comments.map((comment: any) => comment.content)
            : [
                ...prevComments,
                ...data.comments.map((comment: any) => comment.content),
              ]
        );
        setCursor(data.cursor);
        setHasNextPage(data.cursor.has_next_message);
        setIsFirstLoad(false);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async () => {
    if (newComment) {
      setComments((prevComments) => [...prevComments, newComment]);
      setNewComment('');
    }
  };

  const handleLoadMore = () => {
    if (hasNextPage && !loading) {
      fetchComments();
    }
  };

  return (
    <div className='min-w-[400px] w-full gap-6 p-2 '>
      <h3 className='text-2xl font-semibold my-2 text-gray-800'>Comments:</h3>
      <div className='h-fit overflow-y-auto mb-2'>
        {comments.map((comment, index) => (
          <div key={index} className='p-2  border-b border-gray-200'>
            <p className='text-gray-700'>{comment}</p>
          </div>
        ))}
      </div>

      {loading && (
        <div className='flex justify-center mb-4'>
          <span className='loader'></span>
        </div>
      )}
      {hasNextPage && !loading && (
        <button
          onClick={handleLoadMore}
          className='w-full  px-4 underline italic  text-sm py-3'
        >
          Load More...
        </button>
      )}
      <div className='flex gap-4'>
        <input
          type='text'
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className='flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          placeholder='Add a comment...'
        />
        <button
          onClick={handleAddComment}
          className='px-2 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
        >
          Add Comment
        </button>
      </div>
    </div>
  );
};

export default Comments;
