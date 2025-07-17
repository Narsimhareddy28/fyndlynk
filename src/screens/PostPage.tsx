import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import imageUrlBuilder from "@sanity/image-url";
import { SanityDocument } from "@sanity/client";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { client } from "../sanity/client";

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;
const RELATED_POSTS_QUERY = `*[_type == "post" && slug.current != $slug && category == $category]|order(publishedAt desc)[0...3]{_id, title, slug, category, publishedAt, readingTime, image}`;

// Custom components for PortableText
const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const imageUrl = urlFor(value)?.width(600).height(400).url();
      return (
        <div className="my-10 flex flex-col items-center">
          <img
            src={imageUrl}
            alt={value.alt || ''}
            className="rounded-xl shadow-2xl max-w-full h-auto"
            loading="lazy"
          />
          {value.caption && (
            <p className="text-sm text-gray-400 mt-4 text-center italic">
              {value.caption}
            </p>
          )}
        </div>
      );
    },
  },
  block: {
    h1: ({ children }) => (
      <h1 id={`heading-${children?.toString().toLowerCase().replace(/\s+/g, '-')}`} className="text-4xl font-bold text-white mt-12 mb-6 leading-tight scroll-mt-20">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 id={`heading-${children?.toString().toLowerCase().replace(/\s+/g, '-')}`} className="text-3xl font-bold text-white mt-10 mb-5 leading-tight scroll-mt-20">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 id={`heading-${children?.toString().toLowerCase().replace(/\s+/g, '-')}`} className="text-2xl font-bold text-white mt-8 mb-4 leading-tight scroll-mt-20">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 id={`heading-${children?.toString().toLowerCase().replace(/\s+/g, '-')}`} className="text-xl font-bold text-white mt-6 mb-3 leading-tight scroll-mt-20">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-6 py-4 my-8 italic text-gray-300 bg-gray-900/50 rounded-r-lg">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="text-gray-300 mb-6 leading-relaxed text-lg">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside mb-6 space-y-3 text-gray-300 ml-6">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside mb-6 space-y-3 text-gray-300 ml-6">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="mb-2 text-lg">{children}</li>,
    number: ({ children }) => <li className="mb-2 text-lg">{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-white">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-gray-200">{children}</em>
    ),
    code: ({ children }) => (
      <code className="bg-gray-800 text-primary px-2 py-1 rounded font-mono text-sm">
        {children}
      </code>
    ),
    link: ({ children, value }) => (
      <a
        href={value.href}
        className="text-primary hover:text-primary/80 underline underline-offset-2"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
};

// Reading Progress Component
const ReadingProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrolled = window.scrollY;
      const maxHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxHeight) * 100;
      setProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
      <div
        className="h-full bg-primary transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

// Share Component
const ShareButtons: React.FC<{ title: string; url: string }> = ({ title, url }) => {
  const shareLinks = [
    {
      name: 'Twitter',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195a4.92 4.92 0 0 0-8.384 4.482c-4.086-.205-7.713-2.164-10.141-5.144a4.822 4.822 0 0 0-.666 2.475c0 1.708.87 3.216 2.188 4.099a4.904 4.904 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417a9.867 9.867 0 0 1-6.102 2.104c-.396 0-.787-.023-1.175-.069a13.945 13.945 0 0 0 7.548 2.212c9.057 0 14.009-7.513 14.009-14.009 0-.213-.005-.425-.014-.636a10.012 10.012 0 0 0 2.457-2.548z"/>
        </svg>
      ),
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    },
    {
      name: 'LinkedIn',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.026-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.968v5.699h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z"/>
        </svg>
      ),
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
  ];

  return (
    <div className="flex gap-3">
      {shareLinks.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white rounded-lg transition-colors"
          title={`Share on ${link.name}`}
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
};

// Back to Top Component
const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 p-3 bg-primary text-black rounded-full shadow-lg hover:bg-primary/90 transition-all duration-300 z-40 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
};

export const PostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<SanityDocument | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<SanityDocument[]>([]);
  const [loading, setLoading] = useState(true);

  // Scroll to top when component mounts or slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      
      try {
        const fetchedPost = await client.fetch<SanityDocument>(POST_QUERY, { slug });
        setPost(fetchedPost);

        // Fetch related posts if we have a category
        if (fetchedPost?.category) {
          const related = await client.fetch<SanityDocument[]>(RELATED_POSTS_QUERY, { 
            slug, 
            category: fetchedPost.category 
          });
          setRelatedPosts(related);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading post...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-black">
        <div className="container mx-auto px-4 py-16 max-w-6xl">
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to posts
          </Link>
          <div className="text-white text-xl">Post not found</div>
        </div>
      </div>
    );
  }

  const postImageUrl = post.image
    ? urlFor(post.image)?.width(1200).height(600).url()
    : null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <div className="min-h-screen bg-black">
      <ReadingProgress />
      
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            <article>
              
              {/* Back Button */}
              <Link 
                to="/blog" 
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-12 group"
              >
                <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to posts
              </Link>

              {/* Post Header */}
              <header className="mb-12">
                
                {/* Category */}
                {post.category && (
                  <div className="mb-6">
                    <span className="inline-block bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                )}

                {/* Title */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  {post.title}
                </h1>
                
                {/* Subtitle */}
                {post.subtitle && (
                  <h2 className="text-xl md:text-2xl text-gray-300 mb-8 font-medium leading-relaxed">
                    {post.subtitle}
                  </h2>
                )}

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-6 text-gray-400 text-sm pb-8 border-b border-gray-800">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Published: {new Date(post.publishedAt).toLocaleDateString()}</span>
                  </div>
                  {post.readingTime && (
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{post.readingTime}</span>
                    </div>
                  )}
                </div>

                {/* Share Buttons */}
                <div className="mt-6">
                  <p className="text-gray-400 text-sm mb-3">Share this article:</p>
                  <ShareButtons title={post.title} url={currentUrl} />
                </div>
              </header>

              {/* Featured Image */}
              {postImageUrl && (
                <div className="mb-16">
                  <img
                    src={postImageUrl}
                    alt={post.title}
                    className="w-full rounded-xl shadow-2xl"
                    loading="eager"
                  />
                </div>
              )}

              {/* Content */}
              <div className="prose-custom max-w-none">
                {Array.isArray(post.body) && (
                  <PortableText value={post.body} components={portableTextComponents} />
                )}
              </div>

              {/* Article Footer */}
              <footer className="mt-16 pt-12 border-t border-gray-800">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div>
                    <p className="text-gray-400 text-sm mb-2">Share this article:</p>
                    <ShareButtons title={post.title} url={currentUrl} />
                  </div>
                  <Link 
                    to="/blog" 
                    className="inline-flex items-center gap-2 bg-primary text-black px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
                  >
                    Read more posts
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </footer>

            </article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-8">
              
              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-white mb-6">Related Posts</h3>
                  <div className="space-y-4">
                    {relatedPosts.map((relatedPost) => {
                      const relatedImageUrl = relatedPost.image
                        ? urlFor(relatedPost.image)?.width(200).height(120).url()
                        : null;

                      return (
                        <Link
                          key={relatedPost._id}
                          to={`/post/${relatedPost.slug.current}`}
                          className="block group"
                        >
                          <div className="flex gap-3">
                            <div className="flex-shrink-0 w-16 h-16 bg-gray-800 rounded-lg overflow-hidden">
                              {relatedImageUrl ? (
                                <img
                                  src={relatedImageUrl}
                                  alt={relatedPost.title}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-white text-sm font-medium group-hover:text-primary transition-colors line-clamp-2 mb-1">
                                {relatedPost.title}
                              </h4>
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <span>{new Date(relatedPost.publishedAt).toLocaleDateString()}</span>
                                {relatedPost.readingTime && (
                                  <>
                                    <span>•</span>
                                    <span>{relatedPost.readingTime}</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}



            </div>
          </div>

        </div>
      </div>

      <BackToTop />
    </div>
  );
}; 