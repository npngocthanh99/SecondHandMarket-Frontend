export function formatCash(str) {
  return str.split('').reverse().reduce((prev, next, index) => {
    return ((index % 3) ? next : (next + '.')) + prev
  })
}



export const paginate = (list, page_size, page_number) => {
  const totalNumberPage = Math.ceil(list.length / page_size);
  return {
    list: list.slice(
      (page_number - 1) * page_size,
      page_number * page_size
    ),
    totalNumberPage,
  }
};