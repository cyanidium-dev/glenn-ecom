import { event } from "@/types/events";
import SeparatorLine from "@/components/shared/icons/SeparatorLine";
import LinkButton from "@/components/shared/buttons/LinkButton";
import * as motion from "motion/react-client";
import {
  fadeInAnimation,
  listItemVariants,
  listVariants,
} from "@/utils/animationVariants";

interface LiveListProps {
  events: event[];
}
export default function LiveList({ events }: LiveListProps) {
  if (!events || !events.length)
    return (
      <motion.div
        variants={fadeInAnimation({ x: -30, delay: 0.2 })}
        viewport={{ once: true, amount: 0.1 }}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <SeparatorLine className="w-full -my-px h-[2px]" />
        <div className="md:flex md:items-center md:justify-between mb-[22px] lg:mb-0 lg:pb-5 pt-[7px] lg:pt-5">
          <div>
            <h3 className="text-[14px] lg:text-[22px] font-medium leading-[120%] mb-[5px]">
              There are no upcoming events at the moment.
            </h3>
            <p className="text-[11px] lg:text-[22px] leading-[120%]">
              Join the list to be notified when new dates are announced in your
              area.
            </p>
          </div>
          <LinkButton
            href="#journal"
            variant="outline"
            className="w-[132px] h-[39px] text-[14px] leading-none"
          >
            Join
          </LinkButton>
        </div>
        <SeparatorLine className="w-full -my-px h-[2px] hidden md:block" />
      </motion.div>
    );

  return (
    <motion.ul
      variants={listVariants({ staggerChildren: 0.2, delayChildren: 0.3 })}
      initial="hidden"
      animate="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {events.map((event, index) => (
        <motion.li key={event.id} variants={listItemVariants}>
          {index !== 0 && <SeparatorLine className="w-full -my-px h-[2px]" />}
          <div className="pt-5 pb-[27px]">
            <p className="text-[11px] lg:text-[18px] leading-[120%] hidden md:block">
              {event.date}
            </p>
            <div className="md:grid md:grid-cols-[40%_35%_auto] xl:grid-cols-[47%_40%_auto] items-center">
              <h3 className="text-[18px] lg:text-[26px] leading-[120%] font-semibold mb-2 md:mb-0">
                {event.title}
              </h3>
              <div className="flex justify-between items-center mb-2 md:mb-0">
                <p className="text-[11px] lg:text-[18px] leading-[120%] md:hidden">
                  {event.date}
                </p>
                <p className="text-[12px] lg:text-[22px] leading-[120%]">
                  {event.location}
                </p>
              </div>
              <LinkButton
                href={event.ticketLink}
                target="_blank"
                isExternal={true}
                className="justify-self-end w-[132px] lg:w-[111px] h-[39px] lg:h-[45px] text-[14px] lg:text-[18px] leading-none"
              >
                Tickets
              </LinkButton>
            </div>
          </div>
        </motion.li>
      ))}
    </motion.ul>
  );
}
