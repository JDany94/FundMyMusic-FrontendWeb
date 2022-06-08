import { Switch } from "@headlessui/react";
import useConcerts from "../hooks/useConcerts";

export default function SwitchFromGift() {
  const {enabledSwitchGift, handleEnabledSwitchGift} = useConcerts();

  const handleOnChange = () => {
    if (enabledSwitchGift) {
      handleEnabledSwitchGift(false)
    } else {
      handleEnabledSwitchGift(true)
    }
  }

  return (
    <div>
      <Switch
        checked={enabledSwitchGift}
        onChange={handleOnChange}
        className={`${enabledSwitchGift ? "bg-red-800" : "bg-[#830700]"}
          relative inline-flex h-[24px] w-[52px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${enabledSwitchGift ? "translate-x-7" : "translate-x-0"}
            pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
    </div>
  );
}
