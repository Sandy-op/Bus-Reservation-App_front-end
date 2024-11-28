import Bus2 from '../../../assets/bus5.png';
import { motion } from "framer-motion";
import { useState } from 'react';

const Hero = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (event) => {
        setMousePosition({ x: event.clientX, y: event.clientY });
    };

    const imageVariants = {
        initial: { scale: 1.2, rotate: 15, y: -50 },
        animate: {
            scale: 1,
            rotate: 0,
            y: 0,
            transition: { duration: 2, ease: "easeInOut" },
        },
        hover: {
            scale: 1.1,
            rotate: -5,
            transition: { duration: 0.8, ease: "easeInOut" },
        },
    };

    const textVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                ease: "easeOut",
                delayChildren: 0.3,
                staggerChildren: 0.2,
            },
        },
    };

    const textChild = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div
            className="relative min-h-screen overflow-hidden bg-gradient-to-b from-indigo-800 to-purple-900 flex items-center justify-center mt-[8ch] sm:h-100vh"
            onMouseMove={handleMouseMove}
        >
            {/* Background Glow Circles */}
            <div className="absolute w-[800px] h-[800px] sm:w-[1000px] sm:h-[1000px] rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 blur-[300px] opacity-30 top-[-200px] left-[-400px]"></div>
            <div className="absolute w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] rounded-full bg-gradient-to-t from-cyan-400 via-green-500 to-blue-500 blur-[250px] opacity-40 bottom-[-150px] right-[-250px]"></div>

            {/* Parallax Effect */}
            <motion.div
                className="absolute w-[600px] h-[600px] bg-gradient-to-tr from-purple-500 via-blue-500 to-teal-500 rounded-full opacity-30 blur-[100px]"
                style={{
                    top: mousePosition.y * 0.02 - 200,
                    left: mousePosition.x * 0.02 - 200,
                }}
            ></motion.div>

            {/* Interactive Particle Trail */}
            <div
                className="absolute pointer-events-none"
                style={{
                    top: mousePosition.y - 15,
                    left: mousePosition.x - 15,
                    width: '30px',
                    height: '30px',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 80%)',
                    borderRadius: '50%',
                    filter: 'blur(8px)',
                    zIndex: 20,
                }}
            ></div>

            <motion.div
                className="z-10 w-full flex flex-col-reverse md:flex-row items-center justify-center gap-8 px-6 md:px-12"
                initial="hidden"
                animate="visible"
                variants={textVariants}
            >
                {/* Text Section */}
                <div className="text-center md:text-left space-y-6 md:space-y-8 w-full md:w-1/2">
                    <motion.h1
                        className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-white drop-shadow-lg"
                        variants={textChild}
                    >
                        Fast. Vibrant.{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 underline decoration-wavy decoration-yellow-500">
                            Tickets
                        </span>
                    </motion.h1>
                    <motion.p
                        className="text-lg md:text-xl lg:text-2xl text-gray-200 leading-relaxed drop-shadow"
                        variants={textChild}
                    >
                        Get your adventure started with bold colors, fast actions, and unlimited excitement. Let’s make it unforgettable!
                    </motion.p>
                    <motion.button
                        className="relative px-6 py-2 sm:px-8 sm:py-3 bg-gradient-to-r from-yellow-400 to-pink-500 text-black font-bold rounded-full hover:scale-110 hover:shadow-[0px_0px_20px_5px_rgba(255,180,0,0.8)] transform transition-all duration-300"
                        variants={textChild}
                    >
                        Reserve Now!
                        <span className="absolute w-3 h-3 bg-yellow-400 rounded-full animate-ping top-2 left-2"></span>
                    </motion.button>
                </div>

                {/* Image Section */}
                <motion.div
                    className="relative w-full md:w-1/2 flex items-center justify-center"
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                    variants={imageVariants}
                >
                    <motion.img
                        src={Bus2}
                        alt="Interactive Bus"
                        className="w-[300px] md:w-[400px] lg:w-[500px] object-contain drop-shadow-2xl"
                        drag
                        dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
                        dragElastic={0.3}
                    />
                    {/* Dynamic Glow */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 blur-3xl opacity-50"></div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Hero;