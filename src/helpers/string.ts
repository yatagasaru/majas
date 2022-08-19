const countCharLength = (txt: string) => {
  return txt.replace(/[\r\n]+/g, '').length
}

export {countCharLength}
