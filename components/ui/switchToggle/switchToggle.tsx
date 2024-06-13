"use client";

import { Switch } from "@headlessui/react";
import { useState } from "react";

export default function SwitchToggle() {
  const [enabled, setEnabled] = useState(false);
  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className={`${enabled ? "bg-accent" : "bg-[#DCDCDF]"} relative inline-flex h-[14px] w-[33px] items-center rounded-full`}
    >
      <span className="sr-only">Enable notifications</span>
      <span
        className={`absolute top-1/2 -left-1 -translate-y-1/2 ${
          enabled ? "translate-x-5 bg-accentDark border-accentDark " : "translate-x-0 bg-[#F7F7F7] border-[#DCDCDF]"
        } inline-block h-5 w-5 transform rounded-full border transition`}
      />
    </Switch>
  );
}
