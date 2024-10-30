import { serviceApi } from "./service"
import { MinimalUser } from "../datatypes/User"

export interface Comment {
  comment_id: string
  author: MinimalUser
  content: string
  replies: Comment[]
  timestamp: number
  upvotes: number
  downvotes: number
}

// Define a service using a base URL and expected endpoints
export const commentsApi = serviceApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    commentsReply: builder.mutation<
      Comment,
      { comment_id: string; content: string; post_id?: string }
    >({
      query: ({ comment_id, content }) => ({
        url: `/api/comments/${comment_id}/reply`,
        method: "POST",
        body: { content },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "RecruitingPostComments" as const, id: arg.post_id },
      ],
    }),
    commentsDelete: builder.mutation<
      Comment,
      { comment_id: string; post_id?: string }
    >({
      query: ({ comment_id }) => ({
        url: `/api/comments/${comment_id}/delete`,
        method: "POST",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "RecruitingPostComments" as const, id: arg.post_id },
      ],
    }),
    commentsUpvote: builder.mutation<
      Comment,
      { comment_id: string; post_id?: string }
    >({
      query: ({ comment_id }) => ({
        url: `/api/comments/${comment_id}/upvote`,
        method: "POST",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "RecruitingPostComments" as const, id: arg.post_id },
      ],
    }),
    commentsDownvote: builder.mutation<
      Comment,
      { comment_id: string; post_id?: string }
    >({
      query: ({ comment_id }) => ({
        url: `/api/comments/${comment_id}/downvote`,
        method: "POST",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "RecruitingPostComments" as const, id: arg.post_id },
      ],
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useCommentsReplyMutation,
  useCommentsDeleteMutation,
  useCommentsUpvoteMutation,
  useCommentsDownvoteMutation,
} = commentsApi
