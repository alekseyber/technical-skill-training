function setObjectLocalStorage<T>(key: string, value: T): void {
  if (value !== undefined) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

function getObjectLocalStorage<T>(key: string, defaultValue: T | null = null): T | null {
  try {
    const value: string | null = localStorage.getItem(key);
    return value !== null ? JSON.parse(value) : defaultValue;
  } catch (e) {
    return defaultValue;
  }
}

function setItemLocalStorage(key: string, value: string): void {
  localStorage.setItem(key, value);
}

function getItemLocalStorage(key: string): string | null {
  return localStorage.getItem(key);
}

function removeLocalStorage(key: string): void {
  localStorage.removeItem(key);
}

export {
  setObjectLocalStorage,
  getObjectLocalStorage,
  setItemLocalStorage,
  removeLocalStorage,
  getItemLocalStorage,
};
