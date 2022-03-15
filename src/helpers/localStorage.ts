type Key = 'Notes' | 'RecentlyOpenedNotes'

const PREFIX = 'majas-notes-app-'

const setItem = (key: Key, value: string) =>
  localStorage.setItem(PREFIX + key, value)

const getItem = (key: Key): string => localStorage.getItem(PREFIX + key)!

const clear = () => localStorage.clear()

export {setItem, getItem, clear}
