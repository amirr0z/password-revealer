import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

export default function Input(props) {
  const passwordInput = useRef(null);
  const textInput = useRef(null);
  const eyeRef = useRef(null);
  const openEyeRef = useRef(null);
  const closedEyeRef = useRef(null);
  const [visible, setVisibility] = useState(true);
  const [inputVal, setInputVal] = useState("");

  const isTouchDevice = "ontouchstart" in window;

  useEffect(() => {
    const eye = eyeRef.current;
    const openEye = openEyeRef.current;
    gsap.registerPlugin(TextPlugin);

    gsap.fromTo(
      openEye,
      { scaleY: 0 },
      {
        scaleY: 1,
        repeat: -1,
        repeatDelay: 2.5,
        duration: 0.7,
        ease: "power1.out",
      }
    );

    if (isTouchDevice || !eye) {
      return;
    }

    window.addEventListener("mousemove", (e) => {
      const { target, x, y } = e;
      gsap.to(eye, {
        xPercent:
          x - eye.getBoundingClientRect().left > 60
            ? 60
            : x - eye.getBoundingClientRect().left < -60
            ? -60
            : x - eye.getBoundingClientRect().left,
        yPercent:
          y - eye.getBoundingClientRect().top > 60
            ? 60
            : y - eye.getBoundingClientRect().top < -60
            ? -60
            : y - eye.getBoundingClientRect().top,
        duration: 0.5,
        ease: "power4",
      });
    });

    document.addEventListener("mouseleave", () => {
      gsap.to(eye, {
        xPercent: 0,
        yPercent: 0,
        duration: 0.5,
      });
    });
  }, []);

  const toggleVisibility = () => {
    openEyeRef.current.classList.toggle("hidden");
    closedEyeRef.current.classList.toggle("hidden");
    passwordInput.current.classList.toggle("hidden");
    textInput.current.classList.toggle("hidden");
    textInput.current.value = inputVal;
    passwordInput.current.value = inputVal;
    setVisibility(!visible);
  };

  const modifyInput = (e) => {
    setInputVal(e.target.value);
  };

  return (
    <div className="flex flex-row items-center justify-between border-2 border-zinc-500 rounded-xl p-1">
      <input
        type="password"
        className="ring-0 border-0 shadow-none focus:shadow-none focus:outline-none focus:ring-0 focus:border-0 text-xl tracking-wider hidden"
        onChange={modifyInput}
        ref={passwordInput}
      />
      <input
        type="text"
        className="ring-0 border-0 shadow-none focus:shadow-none focus:outline-none focus:ring-0 focus:border-0 text-xl tracking-wider"
        onChange={modifyInput}
        ref={textInput}
      />
      <div className="" onClick={toggleVisibility}>
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          height="1.7em"
          width="1.7em"
          ref={openEyeRef}
        >
          <path d="M15.5 12a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0z" ref={eyeRef} />
          <path
            fillRule="evenodd"
            d="M12 3.5c-3.432 0-6.125 1.534-8.054 3.24C2.02 8.445.814 10.352.33 11.202a1.6 1.6 0 000 1.598c.484.85 1.69 2.758 3.616 4.46C5.876 18.966 8.568 20.5 12 20.5c3.432 0 6.125-1.534 8.054-3.24 1.926-1.704 3.132-3.611 3.616-4.461a1.6 1.6 0 000-1.598c-.484-.85-1.69-2.757-3.616-4.46C18.124 5.034 15.432 3.5 12 3.5zM1.633 11.945c.441-.774 1.551-2.528 3.307-4.08C6.69 6.314 9.045 5 12 5c2.955 0 5.309 1.315 7.06 2.864 1.756 1.553 2.866 3.307 3.307 4.08a.111.111 0 01.017.056.111.111 0 01-.017.056c-.441.774-1.551 2.527-3.307 4.08C17.31 17.685 14.955 19 12 19c-2.955 0-5.309-1.315-7.06-2.864-1.756-1.553-2.866-3.306-3.307-4.08A.11.11 0 011.616 12a.11.11 0 01.017-.055z"
          />
        </svg>
        <svg
          className="hidden"
          viewBox="0 0 24 24"
          fill="currentColor"
          height="1.7em"
          width="1.7em"
          ref={closedEyeRef}
        >
          <path d="M8.052 5.837A9.715 9.715 0 0112 5c2.955 0 5.309 1.315 7.06 2.864 1.756 1.553 2.866 3.307 3.307 4.08a.11.11 0 01.016.055.122.122 0 01-.017.06 16.766 16.766 0 01-1.53 2.218.75.75 0 101.163.946 18.253 18.253 0 001.67-2.42 1.607 1.607 0 00.001-1.602c-.485-.85-1.69-2.757-3.616-4.46C18.124 5.034 15.432 3.5 12 3.5c-1.695 0-3.215.374-4.552.963a.75.75 0 00.604 1.373z" />
          <path
            fillRule="evenodd"
            d="M19.166 17.987C17.328 19.38 14.933 20.5 12 20.5c-3.432 0-6.125-1.534-8.054-3.24C2.02 15.556.814 13.648.33 12.798a1.606 1.606 0 01.001-1.6A18.305 18.305 0 013.648 7.01L1.317 5.362a.75.75 0 11.866-1.224l20.5 14.5a.75.75 0 11-.866 1.224l-2.651-1.875zM4.902 7.898c-1.73 1.541-2.828 3.273-3.268 4.044a.118.118 0 00-.017.059c0 .015.003.034.016.055.441.774 1.551 2.527 3.307 4.08C6.69 17.685 9.045 19 12 19c2.334 0 4.29-.82 5.874-1.927l-3.516-2.487a3.5 3.5 0 01-5.583-3.949L4.902 7.899z"
          />
        </svg>
      </div>
    </div>
  );
}
