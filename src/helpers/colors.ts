const colorsRange = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const
type ColorsRange = typeof colorsRange[number]

type ColorsObj = {
  50: string
  100: string
  200: string
  300: string
  400: string
  500: string
  600: string
  700: string
  800: string
  900: string
}

const prim: ColorsObj = {
  50: '#fcf2e4',
  100: '#e6dac9',
  200: '#d2c2aa',
  300: '#c0aa8c',
  400: '#ac916c',
  500: '#937853',
  600: '#725d3f',
  700: '#53432c',
  800: '#332818',
  900: '#160c00'
}

const isColorsRange = (cr: any): cr is ColorsRange => colorsRange.includes(cr)

function primary(): ColorsObj
function primary(range?: ColorsRange): string
function primary(range?: any) {
  if (isColorsRange(range)) return prim[range]
  else return prim
}

export {primary}
