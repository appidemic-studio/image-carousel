import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import "reset-css";
import './App.css';

import image from './assets/image.jpg';
import image2 from './assets/image2.jpg';
import image3 from './assets/image3.jpg';

import leftarrow from './assets/arrow-left.svg';
import rightarrow from './assets/arrow-right.svg';


const testimonials = [
  {
    name: "Julia Cameron",
    title: "Creative Director, VISA",
    quote:
      "It's all good. I was amazed at the quality of the Design. We've seen amazing results already."
  },
  {
    name: "Mark Jacobs",
    title: "Tech Lead, Google",
    quote:
      "The rebranding has really helped our business. Definitely worth the investment."
  },
  {
    name: "Lisa Bearings",
    title: "Brand Coordinator, Facebook",
    quote:
      "The service was excellent. Absolutely wonderful! A complete redesign did it for us."
  }
];


function App() {

  let imageList = useRef(null);
  let testimonialList = useRef(null);
  const [state,setState] = useState({
    isActive1: true,
    isActive2: false,
    isActive3: false
  });

  const slideLeft = (index, duration, multiplied = 1) => {
    gsap.to(imageList.children[index], duration, {x: -340 * multiplied, ease: "Power2".easeOut})
  }

  const slideRight = (index, duration, multiplied = 1) => {
    gsap.to(imageList.children[index], duration, {x: 340 * multiplied, ease: "Power2".easeOut})
  }

  const fadeIn = (index, duration) => {
    gsap.to(testimonialList.children[index], duration, {opacity: 1, delay: 1})
  }

  const fadeOut = (index, duration) => {
    gsap.to(testimonialList.children[index], duration, {opacity: 0})
  }

  const nextSlide = () => {
    if (imageList.children[0].classList.contains("active")) {
      setState({ isActive1: false, isActive2: true });
      //Image transition
      slideLeft(0, 1);
      slideLeft(1, 1);
      slideLeft(2, 1);
      slideLeft(2, 0);
      fadeOut(0, 1);
      fadeIn(1, 1);
    } else if (imageList.children[1].classList.contains("active")) {
      setState({ isActive2: false, isActive3: true });
      //Image transition
      slideRight(0, 1);
      slideLeft(1, 1, 2);
      slideLeft(2, 1, 2);
      //content transition
      fadeOut(1, 1);
      fadeIn(2, 1);
    } else if (imageList.children[2].classList.contains("active")) {
      setState({ isActive1: true, isActive3: false });
      //Image transition
      slideLeft(2, 1, 3);
      slideLeft(0, 1, 0);
      slideLeft(1, 0, 0);
      //content transition
      fadeOut(2, 1);
      fadeIn(0, 1);
    }
  };

  const preSlide = () => {
    if (imageList.children[0].classList.contains("active")) {
      setState({ isActive1: false, isActive3: true });
      //Image transition
      slideLeft(2, 0, 3);
      slideLeft(2, 1, 2);
      slideRight(0, 1);
      slideRight(1, 1);
      //content transtion
      fadeOut(0, 1);
      fadeIn(2, 1);
    } else if (imageList.children[1].classList.contains("active")) {
      setState({ isActive2: false, isActive1: true });
      //Image transition
      slideLeft(0, 0);
      slideRight(0, 1, 0);
      slideRight(1, 1, 0);
      slideRight(2, 1, 2);
      //content transtion
      fadeOut(1, 1);
      fadeIn(0, 1);
    } else if (imageList.children[2].classList.contains("active")) {
      setState({ isActive2: true, isActive3: false });
      slideLeft(2, 1);
      slideLeft(1, 0, 2);
      slideLeft(1, 1);
      //content transtion
      fadeOut(2, 1);
      fadeIn(1, 1);
  };
}


  useEffect(() => {
    gsap.to(testimonialList.children[0], {opacity: 1, duration: 0})
  }, [])

  return (
    <div className="testimonials-section">
      <div className="testimonials-container">
        <div onClick = {preSlide} className="arrows left">
          <span>
            <img src={leftarrow} alt="left arrow" />
          </span>
        </div>

        <div className="inner">
          <div className="t-img">
            <ul ref={el => {imageList = el}}>
              <li className={state.isActive1 ? "active" : ""}>
                <img src={image2} alt={testimonials[0].name} />
              </li>
              <li className={state.isActive2 ? "active" : ""}>
                <img src={image} alt={testimonials[1].name} />
              </li>
              <li className={state.isActive3 ? "active" : ""}>
                <img src={image3} alt={testimonials[2].name} />
              </li>
            </ul>
          </div>

          <div className="t-content">
            <ul ref={el => {testimonialList = el}}>
              <li className={state.isActive1 ? "active" : ""}>
                <div className="content-inner">
                  <p className="quote">{testimonials[0].quote}</p>
                  <h3 className="name">{testimonials[0].name}</h3>
                  <h4 className="title">{testimonials[0].title}</h4>
                </div>
              </li>

              <li className={state.isActive2 ? "active" : ""}>
                <div className="content-inner">
                  <p className="quote">{testimonials[1].quote}</p>
                  <h3 className="name">{testimonials[1].name}</h3>
                  <h4 className="title">{testimonials[1].title}</h4>
                </div>
              </li>

              <li className={state.isActive3 ? "active" : ""}>
                <div className="content-inner">
                  <p className="quote">{testimonials[2].quote}</p>
                  <h3 className="name">{testimonials[2].name}</h3>
                  <h4 className="title">{testimonials[2].title}</h4>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div onClick = {nextSlide} className="arrows right">
          <span>
            <img src={rightarrow} alt="right arrow" />
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
