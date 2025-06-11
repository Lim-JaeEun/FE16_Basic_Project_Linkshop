import isEmpty from './isEmpty';

function deepIsEmpty(obj) {
  if (isEmpty(obj)) return true;

  if (typeof obj === 'object' && obj !== null) {
    for (const key in obj) {
      if (key === 'webkitRelativePath') continue;
      if (deepIsEmpty(obj[key])) return true;
    }
  }

  return false;
}

export default deepIsEmpty;
