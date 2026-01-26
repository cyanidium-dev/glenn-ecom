import Container from "@/components/shared/container/Container";
import LiveList from "./LiveList";
import { event } from "@/types/events";
import MainButton from "@/components/shared/buttons/MainButton";
import Link from "next/link";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";

interface LiveProps {
  events: event[];
}
export default function Live({ events }: LiveProps) {
  return (
    <section className="pt-[100px] pb-[131px]">
      <Container className="px-[20px]">
        <motion.h2
          variants={fadeInAnimation({ y: 30, delay: 0.1 })}
          viewport={{ once: true, amount: 0.1 }}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="font-andes text-[46px] lg:text-[110px] leading-[95%] mb-5 lg:mb-10"
        >
          Live
        </motion.h2>
        <LiveList events={events} />
        {events && events.length && events.length > 0 && (
          <div className="flex flex-col items-center justify-center mt-[40px] lg:mt-[80px] xl:mt-[120px]">
            <motion.p
              variants={fadeInAnimation({ x: -20, delay: 0.1 * events.length })}
              viewport={{ once: true, amount: 0.1 }}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="text-[12px] lg:text-[18px] leading-[120%] mb-[5px]"
            >
              No events in your area?
            </motion.p>
            <motion.p
              variants={fadeInAnimation({
                x: 20,
                delay: 0.1 * events.length,
              })}
              viewport={{ once: true, amount: 0.1 }}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="text-[12px] lg:text-[18px] leading-[120%] mb-[15px] lg:mb-[30px]"
            >
              Get notified when new events are announced.
            </motion.p>
            <motion.div
              variants={fadeInAnimation({
                x: -20,
                delay: 0.1 * events.length + 0.2,
              })}
              viewport={{ once: true, amount: 0.1 }}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Link href="#journal">
                <MainButton
                  variant="outline"
                  className="w-[132px] lg:w-[180px] h-[39px] lg:h-[45px] text-[14px] lg:text-[18px] border-[3px] leading-none"
                >
                  Subscribe
                </MainButton>
              </Link>
            </motion.div>
          </div>
        )}
      </Container>
    </section>
  );
}
