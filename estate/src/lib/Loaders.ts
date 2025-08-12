import { LoaderFunctionArgs } from "react-router-dom";
import apiRequest from "./ApiRequest";

const handleLoaderError = (error: any, fallbackMessage: string) => {
  const status = error?.response?.status;
  const message = error?.response?.data?.message || fallbackMessage;

  console.error("Loader error:", {
    message,
    status,
    error: error?.message,
    stack: error?.stack,
  }); 

  if (status === 401) {
    throw new Response("Unauthorized", { status: 401 });
  }

  throw new Response(message, { status: status || 500 });
};

// Loader for single post page
export const singlePageLoader = async ({ params }: LoaderFunctionArgs) => {
  const { id } = params;
  if (!id) {
    throw new Response("Post ID is required", { status: 400 });
  }

  try {
    const res = await apiRequest(`/posts/${id}`);
    console.log("singlePageLoader response:", res.data);
    return res.data;
  } catch (error: any) {
    handleLoaderError(error, "Failed to fetch post");
  }
};

// Loader for list page with query params
export const listPageLoader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const query = url.searchParams.toString();
  console.log("listPageLoader query:", query);

  try {
    const res = await apiRequest(`/posts?${query}`);
    console.log("listPageLoader response:", res.data);
    return { postResponse: res.data }; 
  } catch (error: any) {
    handleLoaderError(error, "Failed to fetch posts");
  }
};

// Loader for profile page posts
export const profilePageLoader = async () => {
  try {
    const res = await apiRequest("/users/profilePosts");
    console.log("profilePageLoader response:", res.data);
    return { postResponse: res.data };
  } catch (error: any) {
    handleLoaderError(error, "Failed to fetch profile posts");
  }
};