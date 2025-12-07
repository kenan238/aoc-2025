const fs = require('fs')
const data = fs.readFileSync('input.txt').toString().split(/\r?\n/).map(x => [...x]);

let splits = new Set();
let memo = {};

const beam = (x, y) =>
{
  const id = "" + [x, y]

  if (memo.hasOwnProperty(id))
    return memo[id]

  while (data[y][x] !== '^')
  {
    y++
    if (y >= data.length)
    {
      return 0;
    }
  }
  
  splits.add("" + [x, y])
  memo[id] = 1;

  memo[id] += beam(x - 1, y)
  memo[id] += beam(x + 1, y)
  return memo[id];
}

const getManifold = () =>
{
  for (let y = 0; y < data.length; y++)
  {
    const line = data[y]
    const idx = line.indexOf('S')
    if (idx !== -1)
      return [idx, y];
  }

  return -1;
}

const printGrid = () =>
{
  console.log(data.map(x => x.join('')).join('\n'))
}

const [manX, manY] = getManifold()
const t = beam(manX, manY + 1)
console.log('part 1', splits.size)
console.log('part 2', t + 1)