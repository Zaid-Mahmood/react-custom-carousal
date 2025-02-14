import React, { useState, useEffect, useRef } from 'react';
import { RiArrowLeftWideFill } from "react-icons/ri";
import { RiArrowRightWideFill } from "react-icons/ri";
const SimpleSlider = () => {
    const sliderImages = [
        { img: `${process.env.PUBLIC_URL}/assets/img-1.jpeg`, alt: "img-1" },
        { img: `${process.env.PUBLIC_URL}/assets/img-2.jpg`, alt: "img-2" },
        { img: `${process.env.PUBLIC_URL}/assets/img-3.jpg`, alt: "img-3" },
        { img: `${process.env.PUBLIC_URL}/assets/img-4.jpg`, alt: "img-4" }
    ]

    const [currentIndex, setCurrentIndex] = useState(0);
    const slideTimeout = useRef(null)
    const moveSlideRightFunc = () => {
        setCurrentIndex((prev) => prev < sliderImages.length - 1 ? prev + 1 : prev - (sliderImages.length - 1))
    }
    const moveSlideLeftFunc = () => {
        setCurrentIndex((prev) => prev === 0 ? sliderImages.length - 1 : prev - 1)
    }

    const dotSlideFunc = (id) => {
        setCurrentIndex(id)
    }

    useEffect(() => {
        const updateSlide = () => {
            setCurrentIndex((prev) => prev < sliderImages.length - 1 ? prev + 1 : prev - (sliderImages.length - 1))
        }
        slideTimeout.current = setTimeout(updateSlide, 2000)
        // eslint-disable-next-line
    }, [currentIndex])

    const mouseEnterFunction = ()=>{
        clearTimeout(slideTimeout.current)
    }
    const mouseLeaveFunction = () =>{
        slideTimeout.current = setTimeout(()=>{
            setCurrentIndex((prev) => prev < sliderImages.length - 1 ? prev + 1 : prev - (sliderImages.length - 1))
        }, 2000)
    }
    const arrowClasses = "text-5xl cursor-pointer";
    const imgClasses = "w-screen h-96";
    const commonDotClasses = "w-2 border rounded-full border-gray-400 p-2 cursor-pointer";
    return (
        <div className="h-screen grid items-center">
            <h1 className='mx-auto bg-gray-200 text-[#90a4ae] p-4 w-fit rounded-full'>Custom Image Carousal</h1>
            <div className='flex  justify-center items-center'>
                <RiArrowLeftWideFill  onClick={moveSlideLeftFunc} className={arrowClasses} />
                <div>
                    <img className={imgClasses} src={sliderImages[currentIndex].img} alt={sliderImages[currentIndex].alt} />
                </div>
                <RiArrowRightWideFill onClick={moveSlideRightFunc} className={arrowClasses} />
            </div>
            <div className='flex justify-center gap-x-4 my-4'>
                {sliderImages.map((_, id) => {
                    return (currentIndex === id ?
                        (
                            <div key={id} className={`${commonDotClasses} bg-gray-500`}></div>
                        )
                        :
                        (
                            <div onMouseLeave={()=> mouseLeaveFunction()} onMouseEnter={() => mouseEnterFunction()} onClick={() => dotSlideFunc(id)} key={id} className={commonDotClasses}></div>
                        )
                    )
                }

                )}
            </div>
        </div>
    )
}

export default SimpleSlider
