import { useQuery } from '@tanstack/react-query';

interface IComments {
  id: string;
  comment: string;
}

const Comment = () => {
  const {} = useQuery
  return (
    <div>
      <input type="text" />
      <button>등록</button>
    </div>
  );
};

export default Comment;
