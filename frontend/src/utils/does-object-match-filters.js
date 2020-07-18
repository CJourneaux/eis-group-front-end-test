/**
 *
 * @param {Object} object an object
 * @param {Array} filters an array of strings used for filtering
 * @returns {boolean} whether the object matches any of the filters
 */
export default function doesObjectMatchFilters(object, filters) {
  if (filters.length === 0) return true;
  const objectValues = Object.values(object);
  return objectValues.some((value) => {
    return filters.some((filter) => {
      const sanitisedValue = value.toString().trim().toLowerCase();
      const sanitisedFilter = filter.toString().trim().toLowerCase();
      return sanitisedValue.includes(sanitisedFilter);
    });
  });
}
