export type Owner = 'own' | 'borrowed' | 'none' | null

export function sourceBlocks(code: Array<[string, Owner]>, preamble?: number) {
  const lines = code.map(([text, owner], index) => ({ text, owner, number: index + 1 }))
  return preamble
    ? [{ lines: lines.slice(0, preamble), folded: true }, { lines: lines.slice(preamble), folded: false }]
    : [{ lines, folded: false }]
}

export function nextTab(key: string, index: number, count: number) {
  const offset = key === 'ArrowRight' ? 1 : key === 'ArrowLeft' ? -1 : 0
  return offset === 0 ? null : (index + count + offset) % count
}

export function formatCoverage(value: number) {
  return `${Number.isInteger(value) ? value : value.toFixed(2)}%`
}
