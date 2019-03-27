/* From Wes Bos, used to wait for data to resolve in tests */
const wait = amount =>
  new Promise(resolve => setTimeout(resolve, amount));

export { wait };