import Q from 'q';

/**
 * Get id from mongoose relation
 * @param {Object|string} object Mongoose document or id
 */
export function getDocumentId(object): string {
  return (object instanceof Object) && object._id ? String(object._id) : String(object);
}

/**
 * Check if two mongoose documents ids are equal
 * @param  {Object} doc1
 * @param  {Object} doc2
 * @return {boolean}
 */
export function checkEqualIds(doc1, doc2) {
  return getDocumentId(doc1) === getDocumentId(doc2);
}
