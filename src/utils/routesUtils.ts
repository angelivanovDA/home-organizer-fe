/** Resolved URL for a single post (matches `ROUTES.POST` pattern). */
export function postPath(postId: string): string {
    return `/${postId}`;
}
