import { NextResponse } from 'next/server';

const mockComments = [
  { id: 1, content: 'This is a comment', name_of_sender: 'User A' },
  { id: 2, content: 'Another comment here', name_of_sender: 'User B' },
  { id: 3, content: 'This is a comment too', name_of_sender: 'User C' },
  { id: 4, content: 'Nice task!', name_of_sender: 'User D' },
  { id: 5, content: 'I agree with this', name_of_sender: 'User E' },
  { id: 6, content: 'Great work!', name_of_sender: 'User F' },
  { id: 7, content: 'Interesting point', name_of_sender: 'User G' },
  { id: 8, content: 'Could improve some more', name_of_sender: 'User H' },
  { id: 9, content: 'Well done!', name_of_sender: 'User I' },
  { id: 10, content: 'This looks good', name_of_sender: 'User J' },
  { id: 10, content: 'This looks good', name_of_sender: 'User J' },
];

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const taskId = url.searchParams.get('task_id');
    const cursor = JSON.parse(url.searchParams.get('cursor') || '{}');

    if (!taskId) {
      return NextResponse.json(
        { error: 'task_id is required' },
        { status: 400 }
      );
    }

    const pageSize = cursor.page_size || 10;
    const lastCommentId = cursor.last_comment_id || null;

    const startIndex = lastCommentId
      ? mockComments.findIndex((comment) => comment.id === lastCommentId) + 1
      : 0;

    const paginatedComments = mockComments.slice(
      startIndex,
      startIndex + pageSize
    );

    const hasNextMessage = startIndex + pageSize < mockComments.length;

    const response = {
      comments: paginatedComments,
      cursor: {
        last_comment_id:
          paginatedComments.length > 0
            ? paginatedComments[paginatedComments.length - 1].id
            : null,
        page_size: pageSize,
        has_next_message: hasNextMessage,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
