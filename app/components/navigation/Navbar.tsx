"use client";

import { FaHouse } from "react-icons/fa6";
import { MdKeyboardArrowDown } from "react-icons/md";
import Image from "next/image";
import FunnelSVG from "../../../public/funnels.svg";
import PhoneSVG from "../../../public/phone.svg";
import HomeSVG from "../../../public/home.svg";
import BarchartSVG from "../../../public/bar-chart.svg";
import LandingPageSVG from "../../../public/landing-pages.svg";
import LightningSVG from "../../../public/lightning.svg";
import CameraSVG from "../../../public/camera.svg";
import LibrarySVG from "../../../public/library.svg";
import SettingsSVG from "../../../public/settings.svg";
import LawbrokrSVG from "../../../public/lawbrokr.svg";

import { createTheme, Avatar, ThemeProvider, Button } from "flowbite-react";

const NavigationBar = () => {
  const customTheme = createTheme({
    button: {
      base: "flex cursor-pointer justify-start gap-2",
      color: {
        primary:
          "text-my-brand-primary bg-white hover:bg-gray-200 hover:font-bold",
      },
      size: {
        lg: "w-full",
        md: "w-full",
        sm: "w-full",
      },
    },
    avatar: {
      root: {
        initials: {
          text: "dark:text-my-brand-primary",
          base: "dark:bg-my-brand-secondary",
        },
      },
    },
  });

  return (
    <ThemeProvider theme={customTheme}>
      <nav className="sticky top-0 flex h-screen w-52 max-w-52 flex-col justify-between rounded-xs bg-white px-4 pt-7 pb-10 shadow-2xl" data-testid="lawbrokr-navbar">
        <div className="flex h-full flex-col justify-between gap-4">
          <div className="flex flex-col gap-20">
            <div className="flex-start flex items-center gap-2">
              <Avatar placeholderInitials="LR" rounded />
              <span className="text-[var(--color-my-brand-primary)]">
                {" "}
                Laura Robbins{" "}
              </span>
              <MdKeyboardArrowDown />
            </div>
            <div className="flex flex-col gap-5">
              <Button size="xs" color="primary" pill>
                <Image src={HomeSVG} alt="funnel" /> Home
              </Button>
              <Button size="xs" color="primary" pill>
                <Image src={PhoneSVG} alt="responses" /> Responses
              </Button>
              <Button size="xs" color="primary" pill>
                {" "}
                <Image src={BarchartSVG} alt="funnel" />
                Analytics{" "}
              </Button>
            </div>
          </div>
          <div>
            <div className="flex flex-col gap-5">
              <Button size="xs" color="primary" pill>
                <Image
                  src={LandingPageSVG}
                  alt="landing-page for landing pages tab"
                />{" "}
                Landing Pages
              </Button>
              <Button size="xs" color="primary" pill>
                <Image src={FunnelSVG} alt="funnel for funnel tab" />
                Funnel{" "}
              </Button>
              <Button size="xs" color="primary" pill>
                {" "}
                <Image
                  src={LightningSVG}
                  alt="automations for automations tab"
                />
                Automations{" "}
              </Button>
              <Button size="xs" color="primary" pill>
                <Image src={CameraSVG} alt="clips for clips tab" />
                Clips
              </Button>
              <Button size="xs" color="primary" pill>
                <Image src={LibrarySVG} alt="library for my library tab" />
                My Library
              </Button>
              <Button size="xs" color="primary" pill>
                <Image src={SettingsSVG} width={10} alt="settings" />
                Settings
              </Button>
              <div className="w-30 pl-3">
                <Image
                  src={LawbrokrSVG}
                  alt="lawbrokr brand logo"
                  data-testid="lawbrokr-logo"
                />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </ThemeProvider>
  );
};

export default NavigationBar;
