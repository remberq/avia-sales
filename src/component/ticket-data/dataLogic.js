class DataLogic {
  endTimeCalculator(startTime, duration) {
    const date = new Date(startTime)
    const begin = {
      hours: date.getUTCHours(),
      minutes: date.getMinutes(),
    }
    const end = this.travelTime(duration)
    let { endHours, endMinutes } = {
      endHours: begin.hours + end.hours,
      endMinutes: begin.minutes + end.minutes,
    }
    if (endMinutes > 60) {
      endHours += Math.floor(endMinutes / 60)
      endMinutes = this.timeDivider(60, endMinutes)
    }
    endHours = endHours > 24 ? this.timeDivider(24, endHours) : endHours
    return this.travelFormatter(Object.values({ ...begin, endHours, endMinutes }))
  }
  travelFormatter(date) {
    const [startHours, startMinutes, endHours, endMinutes] = date.map((item) => {
      if (item < 10) {
        return `0${item}`
      }
      return `${item}`
    })
    return `${startHours}:${startMinutes} - ${endHours}:${endMinutes}`
  }
  durationFormatter(duration) {
    const { hours, minutes } = this.travelTime(duration)
    return `${hours}ч ${minutes}м`
  }
  timeDivider(format, time) {
    return time - Math.floor(time / format) * format
  }
  travelTime(duration) {
    const hours = Math.floor(duration / 60)
    const minutes = duration - hours * 60
    return { hours, minutes }
  }
  textFormatter(count) {
    if (count === 0 || count > 4) {
      return `${count} ПЕРЕСАДОК`
    } else if (count === 1) {
      return `${count} ПЕРЕСАДКА`
    } else if (count >= 2) {
      return `${count} ПЕРЕСАДКИ`
    }
  }
}

export default DataLogic
