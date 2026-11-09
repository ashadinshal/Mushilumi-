import React from 'react';
import { Instagram, Heart, Sparkles } from 'lucide-react';
import { BANNER_IMAGE_URL, MascotBunny } from './MascotBunny';

export const InstagramGrid: React.FC = () => {
  const posts = [
    {
      id: 1,
      tag: '#crochetblooms',
      likes: '1.2k',
      caption: 'Everlasting tulips waiting for their ribbon wrap 🌷',
      type: 'art',
      bg: 'from-[#FFF1E6] to-[#FCE8E2]',
      contentEmoji: '🌷'
    },
    {
      id: 2,
      tag: '#mascotlove',
      likes: '2.8k',
      caption: 'Mochi bunny taking over our studio desk today! ♡',
      type: 'banner',
      bg: 'from-[#FCE8E2] to-[#FFF5E8]'
    },
    {
      id: 3,
      tag: '#babyromper',
      likes: '980',
      caption: 'Little bunny ears for peaceful afternoon snoozes 🍼',
      type: 'baby',
      bg: 'from-[#EAF2E8] to-[#FFFDF9]',
      contentEmoji: '👶'
    },
    {
      id: 4,
      tag: '#couplegift',
      likes: '3.4k',
      caption: 'When magnetic paws snap together at the coffee shop ☕',
      type: 'couple',
      bg: 'from-[#FFF0F3] to-[#FCE8E2]',
      contentEmoji: '🧸'
    },
    {
      id: 5,
      tag: '#deskdecor',
      likes: '1.5k',
      caption: 'A marshmallow cloud mug for rainy day matcha lattes ☁️',
      type: 'mug',
      bg: 'from-[#FFF9EB] to-[#FFF5E8]',
      contentEmoji: '☁️'
    },
    {
      id: 6,
      tag: '#unboxing',
      likes: '4.1k',
      caption: 'Opening the deluxe holiday surprise trunk with golden seal ✨',
      type: 'hamper',
      bg: 'from-[#FDF2F4] to-[#FCE8E2]',
      contentEmoji: '🎀'
    }
  ];

  return (
    <section className="py-14 sm:py-20 bg-[#FAF7F2] border-t border-[#EFE7DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-[#8C6A64] mb-1.5">
              <Instagram className="w-3.5 h-3.5 text-[#C97A91]" />
              <span>@MoschiLumii on Instagram</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-medium text-[#453430] tracking-tight">
              Your Daily Dose of Cute
            </h2>
            <p className="text-xs sm:text-sm text-[#8C6A64] font-light mt-1">
              Tag us in your unboxings to get featured in our hall of happy moments.
            </p>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white hover:bg-[#FBF0EB] text-[#453430] border border-[#EFE7DE] px-4 py-2 rounded-full text-xs font-medium font-heading transition-all self-start sm:self-auto cursor-pointer"
          >
            <Instagram className="w-3.5 h-3.5 text-[#C97A91]" />
            <span>Follow @MoschiLumii</span>
          </a>
        </div>

        {/* 6-Item Aesthetic Instagram-Style Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="group relative aspect-square rounded-2xl overflow-hidden border border-[#EFE7DE] bg-white cursor-pointer"
            >
              {/* Card visual */}
              {post.type === 'banner' ? (
                <img
                  src={BANNER_IMAGE_URL}
                  alt="MoschiLumii Instagram Moment"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className={`w-full h-full bg-gradient-to-br ${post.bg} flex flex-col items-center justify-center p-3 text-center`}>
                  <span className="text-3xl sm:text-4xl mb-1 group-hover:scale-110 transition-transform duration-300">
                    {post.contentEmoji}
                  </span>
                  <p className="text-[10px] font-heading font-medium text-[#453430] mt-1">
                    {post.tag}
                  </p>
                </div>
              )}

              {/* Hover overlay with likes & caption */}
              <div className="absolute inset-0 bg-[#453430]/75 backdrop-blur-2xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 flex flex-col justify-between text-white text-left">
                <div className="flex items-center gap-1 text-[11px] font-medium font-heading">
                  <Heart className="w-3.5 h-3.5 fill-[#FFAEBC] text-[#FFAEBC]" />
                  <span>{post.likes}</span>
                </div>
                <p className="text-[10px] font-light leading-tight line-clamp-3">
                  {post.caption}
                </p>
                <span className="text-[9px] text-[#FFAEBC] font-heading font-medium">View on IG →</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
