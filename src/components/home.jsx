import React, { useEffect } from "react";
import { motion, useReducedMotion, useAnimation } from "framer-motion";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  // Animation controllers for sequencing
  const headingControls = useAnimation();
  const descControls = useAnimation();
  const ctaControls = useAnimation();

  // Variants
  const headingContainer = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.35, delayChildren: 0.2 },
    },
  };

  const headingLine = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } },
  };

  const descContainer = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.28, delayChildren: 0.08 },
    },
  };

  const descLine = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const ctaVariant = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };

  useEffect(() => {
    // Remove default body margin and padding completely
    document.body.style.margin = "0";
    document.body.style.padding = "0";

    if (shouldReduceMotion) {
      headingControls.set("visible");
      descControls.set("visible");
      ctaControls.set("visible");
      return;
    }

    (async () => {
      await headingControls.start("visible");
      await descControls.start("visible");
      await ctaControls.start("visible");
    })();
  }, [headingControls, descControls, ctaControls, shouldReduceMotion]);

  return (
    <div className="relative m-0 p-0 ">
      <section className="relative bg-gray-900 m-0 p-0">
        <div className="absolute inset-0 m-0 p-0">
          <div className="absolute inset-y-0 left-0 w-1/2 bg-white m-0 p-0" />
        </div>

        <div className="relative mx-auto max-w-7xl lg:grid lg:grid-cols-2 m-0 p-0">
          {/* Left column: animated heading & description */}
          <div className="flex items-end px-4 pb-16 bg-white pt-24 sm:px-6 lg:px-8 lg:pb-24 xl:pr-12 m-0">
            <div className="max-w-lg mx-auto lg:mx-0">
              

              {/* Heading: animated line-by-line */}
              <motion.div
                className="mt-10 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
                variants={headingContainer}
                initial="hidden"
                animate={headingControls}
              >
                <motion.div variants={headingLine} className="overflow-hidden">
                  <span className="block">UniNews —</span>
                </motion.div>
                <motion.div variants={headingLine} className="overflow-hidden">
                  <span className="block">Reliable student-focused</span>
                </motion.div>
                <motion.div variants={headingLine} className="overflow-hidden">
                  <span className="block">news & credibility checks.</span>
                </motion.div>
              </motion.div>

              {/* Description */}
              <motion.div
                className="mt-6 text-base font-normal leading-7 text-gray-500 max-w-prose"
                variants={descContainer}
                initial="hidden"
                animate={descControls}
              >
                <motion.p variants={descLine} className="overflow-hidden">
                  <span className="block">UniNews verifies stories, rates source credibility,</span>
                </motion.p>
                <motion.p variants={descLine} className="overflow-hidden">
                  <span className="block">and delivers bite-sized student-friendly summaries</span>
                </motion.p>
                <motion.p variants={descLine} className="overflow-hidden">
                  <span className="block">so you can trust what you read — fast.</span>
                </motion.p>
              </motion.div>

              {/* CTA */}
              <motion.div
                className="relative inline-flex mt-10 group"
                initial="hidden"
                animate={ctaControls}
                variants={ctaVariant}
              >
                <div className="absolute transition-all duration-1000 opacity-70 inset-0 bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg filter group-hover:opacity-100 group-hover:duration-200" />
                
              </motion.div>
            </div>
          </div>

          {/* Right column: featured articles */}
          <div className="relative flex items-end px-4 py-16 bg-gray-900 sm:px-6 lg:pb-24 lg:px-8 xl:pl-12">
            <div className="absolute inset-0">
              <img
                className="object-cover w-full h-full"
                src="https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/hero/6/grid-pattern.svg"
                alt=""
              />
            </div>

            <div className="relative w-full max-w-lg mx-auto lg:max-w-none pt-20">
              <p className="text-lg font-bold text-white">Daily Verified News</p>

              <div className="mt-6 space-y-5">
                {[1, 2, 3].map((id) => (
                  <article
                    key={id}
                    className="overflow-hidden transition-all duration-200 transform bg-white border border-gray-200 rounded-2xl hover:shadow-lg hover:-translate-y-1"
                  >
                    <div className="px-4 py-5 sm:p-5">
                      <div className="flex items-start lg:items-center">
                        <a href="#" className="shrink-0">
                          <img
                            className="lg:h-24 w-14 h-14 lg:w-24 rounded-xl object-cover"
                            src={`https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/hero/6/thumbnail-${id}.png`}
                            alt=""
                          />
                        </a>
                        <div className="flex-1 ml-4 lg:ml-6">
                          <p className="text-xs font-medium text-gray-900 lg:text-sm">
                            <a href="#">Growth</a>
                          </p>
                          <p className="mt-2 text-sm font-bold text-gray-900 lg:text-lg group-hover:text-gray-600">
                            <a href="#">How a visual artist redefines success in graphic design</a>
                          </p>
                          <p className="mt-2 text-xs font-medium text-gray-500 lg:text-sm">April 09, 2022</p>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
