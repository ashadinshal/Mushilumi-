import React from 'react';
import { Star, CheckCircle } from 'lucide-react';
import { REVIEWS } from '../data/reviews';

export const ReviewsSection: React.FC = () => {
  return (
    <section className="py-14 sm:py-18 bg-white border-t border-[#EFE7DE]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-[11px] font-medium tracking-wider text-[#8F7872] uppercase block mb-1">
            Community Love
          </span>
          <h2 className="text-xl sm:text-2xl font-medium font-heading text-[#4A3B36] tracking-tight">
            Notes From Happy Hearts ♡
          </h2>
          <p className="text-xs sm:text-sm text-[#76605B] mt-1 font-light">
            Real stories from lovely people who welcomed Moschi treasures into their homes.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-[#FAF7F2] rounded-2xl border border-[#EFE7DE] p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-0.5 text-[#F59E0B]">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  {review.verified && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-normal text-[#79A871]">
                      <CheckCircle className="w-3 h-3" />
                      <span>Verified</span>
                    </span>
                  )}
                </div>

                <h3 className="font-heading text-sm font-semibold text-[#453430] mb-1.5 leading-snug">
                  &ldquo;{review.title}&rdquo;
                </h3>

                <p className="text-xs text-[#735048] font-normal leading-relaxed">
                  {review.comment}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#EFE7DE] flex items-center justify-between text-xs">
                <div>
                  <p className="font-medium text-[#453430] leading-none">
                    {review.author}
                  </p>
                  <p className="text-[10px] text-[#8C6A64] mt-0.5">
                    {review.location}
                  </p>
                </div>

                <p className="text-[10px] text-[#8C6A64] truncate max-w-[45%] text-right" title={review.productName}>
                  {review.productName}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
