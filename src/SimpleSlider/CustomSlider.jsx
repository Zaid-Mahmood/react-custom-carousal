import React, { useState, useEffect, useRef } from 'react';
import { RiArrowLeftWideFill } from "react-icons/ri";
import { RiArrowRightWideFill } from "react-icons/ri";
const CustomSlider = () => {
    const sliderImages = [
        { img: `${process.env.PUBLIC_URL}/assets/img-1.jpeg`, alt: "img-1" },
        { img: `${process.env.PUBLIC_URL}/assets/img-2.jpg`, alt: "img-2" },
        { img: `${process.env.PUBLIC_URL}/assets/img-3.jpg`, alt: "img-3" },
        { img: `${process.env.PUBLIC_URL}/assets/img-4.jpg`, alt: "img-4" }
    ]

    const [currentIndex, setCurrentIndex] = useState(0);
    const slideTimeout = useRef(null);
    const isHovered = useRef(false);
    const moveSlideRightFunc = () => {
        setCurrentIndex((prev) => prev < sliderImages.length - 1 ? prev + 1 : prev - (sliderImages.length - 1))
    }
    const moveSlideLeftFunc = () => {
        setCurrentIndex((prev) => prev === 0 ? sliderImages.length - 1 : prev - 1)
    }

    const dotSlideFunc = (id) => {
        setCurrentIndex(id)
        isHovered.current = false;
    }

    const mouseEnterFunction = () => {
        console.log("mouseEnter called")
        clearTimeout(slideTimeout.current)
        isHovered.current = true;
    }
    const mouseLeaveFunction = () => {
        console.log("mouseLeave called")

        isHovered.current = false;
        slideTimeout.current = setTimeout(() => {
            setCurrentIndex((prev) => prev < sliderImages.length - 1 ? prev + 1 : prev - (sliderImages.length - 1))
        }, 2000)

    }

    useEffect(() => {
        if (!isHovered.current) {
            const updateSlide = () => {
                setCurrentIndex((prev) => prev < sliderImages.length - 1 ? prev + 1 : prev - (sliderImages.length - 1))
            }
            slideTimeout.current = setTimeout(updateSlide, 2000)
            return () => {
                clearTimeout(slideTimeout.current)
            }
        }
        // eslint-disable-next-line
    }, [currentIndex])


    const arrowClasses = "text-5xl cursor-pointer";
    const imgClasses = "w-screen h-96";
    const commonDotClasses = "w-2 border rounded-full border-gray-400 p-2 cursor-pointer";
    return (
        <div className="h-screen grid items-center">
            <h1 className='mx-auto bg-gray-200 text-[#90a4ae] p-4 w-fit rounded-full'>Custom Image Carousal</h1>
            <div className='flex  justify-center items-center'>
                <RiArrowLeftWideFill onMouseLeave={() => mouseLeaveFunction()} onMouseEnter={() => mouseEnterFunction()} onClick={moveSlideLeftFunc} className={arrowClasses} />
                <div>
                    <img
                        onMouseLeave={() => mouseLeaveFunction()}
                        onMouseEnter={() => mouseEnterFunction()}
                        className={imgClasses} src={sliderImages[currentIndex].img} alt={sliderImages[currentIndex].alt} />
                </div>
                <RiArrowRightWideFill onMouseLeave={() => mouseLeaveFunction()} onMouseEnter={() => mouseEnterFunction()} onClick={moveSlideRightFunc} className={arrowClasses} />
            </div>
            <div className='flex justify-center gap-x-4 my-4'>
                {sliderImages.map((_, id) => {
                    return (currentIndex === id ?
                        (
                            <div key={id} className={`${commonDotClasses} bg-gray-500`}></div>
                        )
                        :
                        (
                            <div onMouseLeave={() => mouseLeaveFunction()} onMouseEnter={() => mouseEnterFunction()} onClick={() => dotSlideFunc(id)} key={id} className={commonDotClasses}></div>
                        )
                    )
                }

                )}
            </div>
        </div>
    )
}

export default CustomSlider;
