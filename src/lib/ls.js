import { getDefaultLanguage } from './i18n';

const keys = {
  INVENTORY: '$inventory2',
  CLOUD_INVENTORY: '$cloudinventory',
  FILTERS: '$filters2',
  ACCOUNT: '$account',
  LANGUAGE: '$lang',
  AUTH: '$auth2',
  GDRIVE_FILE_ID: '$googleDriveFileId' + window.DESTINYSETS_ENV,
  GOOGLE_LOGIN_TOOLTIP: '$hideGoogleLoginTooltip',
  VISIT_COUNT: '$visitCount',
  TRACKED_ITEMS: '$trackedItems',
  UID: 'uid',
  DEBUGID: 'debugid',
  PROFILE_ERROR_REPORTED: 'profileErrorReported',

  DESTINY_PROFILE: 'd2Profile'
};

let LOCAL_STORAGE;

// Set up a default 'in memory' reimplementation of localStorage
const localStoragePolyfill = {
  _data: {},
  getItem(key) {
    return this._data.hasOwnProperty(key) ? this._data[key] : null;
  },

  setItem(key, value) {
    this._data[key] = value;
  },

  removeItem(key) {
    delete this._data[key];
  },

  clear() {
    this._data = {};
  }
};

function init() {
  const testKey = '_testKey';

  // We can't reliably feature detect for localStorage, the only
  // way is just to try to use it and see what happens
  try {
    window.localStorage.setItem(testKey, 1);
    window.localStorage.removeItem(testKey);
    LOCAL_STORAGE = window.localStorage;
  } catch (e) {
    console.log('Local storage unavailable, using fallback');
    LOCAL_STORAGE = localStoragePolyfill;
  }
}

init();

function get(key, defaultx) {
  const lsValue = LOCAL_STORAGE.getItem(key);

  if (!lsValue) {
    return defaultx;
  }

  try {
    return JSON.parse(lsValue) || defaultx;
  } catch (err) {
    console.error(`Unable to retrieve ${key} from local storage as JSON:`);
    console.error(err);

    return defaultx;
  }
}

function save(key, value) {
  const jason = JSON.stringify(value);
  LOCAL_STORAGE.setItem(key, jason);
}

export function getProfileErrorReported() {
  return get(keys.PROFILE_ERROR_REPORTED, false);
}

export function saveProfileErrorReported(value = true) {
  return save(keys.PROFILE_ERROR_REPORTED, value);
}

export function saveLanguage(langCode) {
  save(keys.LANGUAGE, langCode);
}

export function getLanguage() {
  return get(keys.LANGUAGE, getDefaultLanguage());
}

export function saveInventory(inventory) {
  save(keys.INVENTORY, inventory);
}

export function getInventory() {
  return get(keys.INVENTORY, []);
}

export function saveHideGoogleLoginTooltip(bool) {
  save(keys.GOOGLE_LOGIN_TOOLTIP, bool);
}

export function getHideGoogleLoginTooltip() {
  return get(keys.GOOGLE_LOGIN_TOOLTIP, false);
}

export function saveCloudInventory(inventory) {
  save(keys.CLOUD_INVENTORY, inventory);
}

export function getCloudInventory() {
  return get(keys.CLOUD_INVENTORY, []);
}

export function removeInventory() {
  return localStorage.removeItem(keys.INVENTORY);
}

export function saveFilters(filters) {
  save(keys.FILTERS, filters);
}

export function getFilters() {
  return get(keys.FILTERS);
}

export function savePreviousAccount(id, type) {
  save(keys.ACCOUNT, { id, type });
}

export function getPreviousAccount(id, type) {
  return get(keys.ACCOUNT, {});
}

export function saveAuth(authData) {
  save(keys.AUTH, authData);
}

export function getAuth() {
  return get(keys.AUTH);
}

export function removeAuth() {
  localStorage.removeItem(keys.AUTH);
}

export function saveVisitCount(count) {
  save(keys.VISIT_COUNT, count);
}

export function getVisitCount() {
  return parseInt(get(keys.VISIT_COUNT, 0), 10);
}

export function getGoogleDriveInventoryFileId() {
  return get(keys.GDRIVE_FILE_ID, null);
}

export function saveGoogleDriveInventoryFileId(fileId) {
  save(keys.GDRIVE_FILE_ID, fileId);
}

export function getTrackedItems() {
  return get(keys.TRACKED_ITEMS, []);
}

export function saveTrackedItems(items) {
  save(keys.TRACKED_ITEMS, items);
}

export function getUID() {
  return get(keys.UID, null);
}

export function saveUID(uid) {
  save(keys.UID, uid);
}

export function getDebugId() {
  return get(
    keys.DEBUGID,
    Math.random()
      .toString(36)
      .substr(2, 7)
  );
}

export function saveDebugId(debugID) {
  save(keys.DEBUGID, debugID);
}

export function saveProfiles(profilese) {
  save(keys.DESTINY_PROFILE, profilese);
}

export function getProfiles() {
  return get(keys.DESTINY_PROFILE);
}

export function removeProfiles() {
  return localStorage.removeItem(keys.DESTINY_PROFILE);
}

export function clearAll() {
  Object.values(keys).forEach(k => {
    localStorage.removeItem(k);
  });
}

export const localStorage = LOCAL_STORAGE;
window.__clearAllLs = clearAll;
