import { connect } from "@theme"

export default connect({
  logContainer: "flex",
  logContainerHeader: "full items-center py-3",
  button:
    "absolute bottom-5 left-5 rounded-full w-60 h-60 p-2 bg-red-500 items-center justify-center z-90",
  label: "text-xxs font-roboto-medium text-white text-center",
  closeLabel: "text-base font-roboto-bold text-black",
})
