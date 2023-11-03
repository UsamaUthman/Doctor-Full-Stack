import React from "react";
import { Pagination } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import PatientAvatar from "../../assets/images/patient-avatar.png";
import { HiStar } from "react-icons/hi";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const Testimonial = ({ reviews }) => {
  return (
    <div className="mt-[30px] lg:mt-[55px]">
      <Swiper
        modules={[Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
      >
        {reviews?.map((review, index) => (
          <SwiperSlide key={index}>
            <div className="py-[25px] px-5 rounded-[13px] w-full">
              <div className="flex items-center gap-[13px]">
                <img
                  src={review.user.photo}
                  alt={review.user.name}
                  className="w-[50px] h-[50px] rounded-full"
                />
                <div>
                  <h4 className="flex space-x-2">
                    <span className="text-[#1e56a0]">{review.user.name}</span>{" "}
                    <br />
                  </h4>
                  <div className="flex items-center gap-[2px]">
                    {/* Generate star icons based on the rating */}
                    {[...Array(review.rating)].map((_, i) => (
                      <HiStar key={i} className="text-[#f59e0b]" />
                    ))}
                  </div>
                </div>
                <div className="flex-1 text-right">
                  <p className="text-[#343537] self-start ">
                    {new Date(review.createdAt).toDateString()}
                  </p>
                </div>
              </div>
              <div className="p-6 mt-2 shadow-lg bg-gray-50 rounded-lg">
                <p className="text-[#343537]">{review.reviewText}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonial;
