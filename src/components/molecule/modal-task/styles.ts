import { connect, TYPOGRAPHY } from "@theme"

export default connect({
  backdrop: "absolute w/100 h/100 bg-black bg-opacity-50 top-0 left-0",
  panel: "absolute min-h-250 z-10 w/100 bottom-0 left-0 p-5 bg-white rounded-t-5xl",
  panelHeader: "w%100 row items-center justify-between mb-3",
  panelHeaderText: `${TYPOGRAPHY.extraSmallMedium} text-blue-500`,
  panelDeleteText: "text-red-500",
  panelHeaderTitle: `${TYPOGRAPHY.baseMedium} text-gray-900`,
  taskInput: `${TYPOGRAPHY.smallRegular} flex text-gray-900`,
})
