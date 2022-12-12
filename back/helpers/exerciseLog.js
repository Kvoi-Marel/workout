export const reBuildTimes = (log, prevExLog = null) => {
  return log.times.map((item, index) => ({
    ...item,
    prevWeigth: prevExLog ? prevExLog.times[index].weight : 0,
    prevRepeat: prevExLog ? prevExLog.times[index].repeat : 0,
  }))
}
