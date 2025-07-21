import React, { useState, useEffect } from 'react';
import { SanityDocument } from "@sanity/client";
import { Link } from "react-router-dom";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "../sanity/client";

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, subtitle, category, slug, publishedAt, readingTime, image}`;

export const BlogSection: React.FC = () => {
  const [posts, setPosts] = useState<SanityDocument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await client.fetch<SanityDocument[]>(POSTS_QUERY);
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading posts...</div>
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden w-full">
      {/* Section Title */}
      <div className="flex justify-center mb-4 mt-8">
        <h2 className="section-title">Blog<span className="dot">.</span></h2>
      </div>
      <div className="min-h-screen bg-black">
        {/* Hero Section with Main Image */}
        <section className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center filter grayscale opacity-30"
            style={{
              backgroundImage: "url(/hero_background.png)",
            }}
          ></div>
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60"></div>
          
          {/* Animated Background Elements */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative w-full max-w-lg h-full flex items-center justify-center">
              <div className="absolute w-96 h-96 bg-white/5 rounded-full filter blur-3xl animate-pulse" />
              <div className="absolute w-72 h-72 bg-primary/10 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
              <div className="absolute w-48 h-48 bg-white/5 rounded-full filter blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
            </div>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 text-center px-4">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Blog
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Insights, tutorials, and thoughts on modern development, cloud technologies, and innovation.
            </p>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="container mx-auto px-4 py-16 max-w-6xl">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">No posts found. Create your first post in Sanity Studio!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => {
                const postImageUrl = post.image
                  ? urlFor(post.image)?.width(400).height(240).url()
                  : null;

                return (
                  <article key={post._id} className="group cursor-pointer">
                    <Link to={`/post/${post.slug.current}`} className="block">
                      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden h-full transition-all duration-300 hover:border-primary/50 hover:bg-gray-900/70 hover:transform hover:scale-[1.02]">
                        
                        {/* Featured Image */}
                        <div className="relative h-48 overflow-hidden">
                          {postImageUrl ? (
                            <img
                              src={postImageUrl}
                              alt={post.title}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                              <svg className="w-16 h-16 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          )}
                          
                          {/* Category Badge on Image */}
                          {post.category && (
                            <div className="absolute top-4 left-4">
                              <span className="inline-block bg-black/80 backdrop-blur-sm text-primary px-3 py-1 rounded-full text-sm font-medium">
                                {post.category}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          {/* Title */}
                          <h2 className="text-xl font-bold text-white group-hover:text-primary transition-colors mb-3 line-clamp-2">
                            {post.title}
                          </h2>

                          {/* Subtitle */}
                          {post.subtitle && (
                            <p className="text-gray-400 mb-4 line-clamp-2 leading-relaxed text-sm">
                              {post.subtitle}
                            </p>
                          )}

                          {/* Meta Info */}
                          <div className="flex items-center justify-between text-gray-500 text-sm mt-auto pt-4 border-t border-gray-800">
                            <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                            {post.readingTime && (
                              <span className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {post.readingTime}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}; 