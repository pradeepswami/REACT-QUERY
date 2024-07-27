import { useEffect, useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

import { fetchPosts, deletePost, updatePost } from "./api";
import { PostDetail } from "./PostDetail";
const maxPostPage = 10;

export function Posts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn:(id) => deletePost(id),    
  });

  const updateMutation = useMutation({
    mutationFn:(id) => updatePost(id),    
  });

  // replace with useQuery
  const {data, isError, error,isLoading} = useQuery({
    queryKey: ["posts", currentPage],
    queryFn: () => fetchPosts(currentPage),
  });
  useEffect(() => {
    const nextPage = currentPage + 1;
    queryClient.prefetchQuery({
      queryKey: ["posts", nextPage],
      queryFn: () => fetchPosts(nextPage),
    });
  }, [currentPage, queryClient]);

  if(isLoading) {
    return <h3>Loading...</h3>;
  }

  if(isError){
    return <h3>Error....<br/>Message {error.message}</h3>
  }

  return (
    <>
      <ul>
        {data.map((post) => (
          <li
            key={post.id}
            className="post-title"
            onClick={() => {
              setSelectedPost(post);
              deleteMutation.reset();
              updateMutation.reset();
            }
            }
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button disabled={currentPage <= 1} onClick={() => {setCurrentPage(currentPage - 1)}}>
          Previous page
        </button>
        <span>Page {currentPage}</span>
        <button disabled={currentPage >= maxPostPage} onClick={() => {setCurrentPage(currentPage + 1)}}>
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} deleteHandler={deleteMutation} updateMutation={updateMutation} />}
    </>
  );
}
