export const VOTES_ASCENDING = 2
export const VOTES_DESCENDING = 1
export const DATE_ASCENDING = 4
export const DATE_DESCENDING = 3

export function getDate( timestamp ) {
  var date = new Date( timestamp );
  return date.toString();
}

export function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}