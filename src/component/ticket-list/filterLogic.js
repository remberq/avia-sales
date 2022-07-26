export const filterTickets = (status, ticks) => {
  if (status === 'cheap') {
    return [...ticks].sort((a, b) => a.price - b.price)
  } else if (status === 'fast') {
    return [...ticks].sort((a, b) => {
      const { segments: one } = a
      const { segments: two } = b
      const durationOne = one[0].duration + one[1].duration
      const durationTwo = two[0].duration + two[1].duration
      return durationOne - durationTwo
    })
  } else if (status === 'opti') {
    return [...ticks].sort((a, b) => {
      const { segments: one, price: priceOne } = a
      const { segments: two, price: priceTwo } = b
      const durationOne = one[0].duration + one[1].duration
      const durationTwo = two[0].duration + two[1].duration
      const first = durationOne + priceOne
      const second = durationTwo + priceTwo
      return first - second
    })
  }
}

export const filterStops = (checkbox, ticks) => {
  if (checkbox.length === 4) {
    return ticks
  }
  const filteredTicks = ticks.filter((item) => {
    const stopsCount = item.segments[0].stops.length
    return checkbox.includes(stopsCount)
  })
  console.log(filteredTicks)
  return filteredTicks
}
