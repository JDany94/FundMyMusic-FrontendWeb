import { Switch } from "@headlessui/react";
import useConcerts from "../hooks/useConcerts";

export default function SwitchFrom() {
  const {enabledSwitch, handleEnabledSwitch} = useConcerts();

  const handleOnChange = () => {
    if (enabledSwitch) {
      handleEnabledSwitch(false)
    } else {
      handleEnabledSwitch(true)
    }
  }

  return (
    <div>
      <Switch
        checked={enabledSwitch}
        onChange={handleOnChange}
        className={`${enabledSwitch ? "bg-[#BA0A00]" : "bg-[#830700]"}
          relative inline-flex h-[24px] w-[52px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${enabledSwitch ? "translate-x-7" : "translate-x-0"}
            pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
    </div>
  );
}
