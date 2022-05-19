import { connect, TYPOGRAPHY } from "@theme"

export default connect({
  container: "py-1 px-3 rounded-lg bg-white border self-start ml-3",
  title: `${TYPOGRAPHY.smallRegular} text-gray-500`,
  containerActive: "bg-blue-500 border-blue-500",
  titleActive: "text-white",
})
