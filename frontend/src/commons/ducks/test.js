const data = { a: 'a', b: 'b', c: 'c' }
const { a, ...data } = test
const newData = { new: { a, ...data } }
console.log(newData)
