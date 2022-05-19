import { connect, TYPOGRAPHY } from "@theme"

export default connect({
  container: "flex bg-gray-100",
  heroTitle: `${TYPOGRAPHY.bigHello} text-gray-900 mt-10 ml-5 mb-5`,
  emptyState: "flex items-center justify-center",
  emptyTitle: `${TYPOGRAPHY.smallMedium} text-gray-500 text-center mt-2`,
  todayHeaderSection: "w%100 row items-center justify-between",
  titleSection: `${TYPOGRAPHY.extraSmallMedium} text-gray-400 mb-2 ml-5`,
})
