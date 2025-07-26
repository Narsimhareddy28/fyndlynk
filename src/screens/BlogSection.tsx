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
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Get unique categories from posts
  const availableTags = Array.from(new Set(posts.map(post => post.category).filter(Boolean)));

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

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const filteredPosts = selectedTags.length > 0 
    ? posts.filter(post => post.category && selectedTags.includes(post.category))
    : posts;

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading posts...</div>
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden w-full bg-black min-h-screen">
      {/* Header Section with Quote and Classical Bust */}
      <section className="relative w-full bg-gradient-to-b from-gray-900 to-black py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Quote Section */}
            <div className="flex-1 text-center lg:text-left">
              <div className="w-16 h-1 bg-white mx-auto lg:mx-0 mb-6"></div>
              <blockquote className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                "The only limit to our realization of tomorrow will be our doubts of today."
              </blockquote>
            </div>
            
            {/* Classical Bust Image */}
            <div className="flex-1 flex justify-center lg:justify-end">
                              <div className="relative w-60 h-60 lg:w-96 lg:h-96 rounded-2xl overflow-hidden" style={{ transform: 'scale(1)' }}>
                  <img
                    src="/roman.png"
                    alt="Classical marble bust"
                    className="w-full h-full object-cover object-center"
                    style={{
                      objectPosition: 'center 20%', // Adjust this to crop vertically (0% = top, 100% = bottom)
                      // objectPosition: '30% center', // Adjust this to crop horizontally (0% = left, 100% = right)
                    }}
                  />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Blog Posts Column */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white mb-8">Blog Post</h2>
            
            {filteredPosts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-400 text-lg">
                  {selectedTags.length > 0 
                    ? `No posts found for selected tags: ${selectedTags.join(', ')}`
                    : 'No posts found. Create your first post in Sanity Studio!'
                  }
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map((post) => {
                  const postImageUrl = post.image
                    ? urlFor(post.image)?.width(300).height(200).url()
                    : null;

                  return (
                    <article key={post._id} className="group cursor-pointer">
                      <Link to={`/post/${post.slug.current}`} className="block">
                        <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:transform hover:scale-[1.02]">
                          
                          {/* Featured Image */}
                          <div className="relative h-40 overflow-hidden">
                            {postImageUrl ? (
                              <img
                                src={postImageUrl}
                                alt={post.title}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                            )}
                          </div>

                          {/* Content */}
                          <div className="p-4">
                            {/* Title */}
                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors mb-2 line-clamp-2">
                              {post.title}
                            </h3>

                            {/* Date */}
                            <p className="text-gray-600 text-sm mb-2">
                              {new Date(post.publishedAt).getFullYear()} {new Date(post.publishedAt).getFullYear() + 1}
                            </p>

                            {/* Category Tag */}
                            {post.category && (
                              <span className="inline-block text-primary font-medium text-sm">
                                #{post.category}
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                    </article>
                  );
                })}
              </div>
            )}
          </div>

          {/* Filter Sidebar */}
          <div className="lg:w-64">
            <h3 className="text-xl font-bold text-white mb-6">Filter by Tag</h3>
            <div className="space-y-3">
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`block w-full text-left px-3 py-2 rounded-md transition-colors duration-200 ${
                    selectedTags.includes(tag)
                      ? 'bg-gray-700 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
            
            {/* Clear Filters Button */}
            {selectedTags.length > 0 && (
              <button
                onClick={() => setSelectedTags([])}
                className="mt-6 w-full px-3 py-2 text-sm text-gray-400 hover:text-white transition-colors duration-200"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}; 