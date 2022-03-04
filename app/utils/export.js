export const exportToCsv = (data, { filename, withBom = true }) => {
  const blob = new Blob(
    [withBom ? new Uint8Array([0xef, 0xbb, 0xbf]) : '', data],
    {
      type: 'text/csv',
    }
  )
  exportAs(blob, filename)
}

export const exportAs = (blob, filename = document.title) => {
  const url = window.URL.createObjectURL(blob)
  const downloadLink = document.createElement('a')
  downloadLink.download = filename
  downloadLink.href = url

  downloadLink.click()

  setTimeout(() => {
    URL.revokeObjectURL(url)
  })
}
