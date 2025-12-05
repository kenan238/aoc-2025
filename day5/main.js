const fs = require('fs')
const lines = fs.readFileSync('input.txt').toString().split(/\r?\n/).map(x => x.trim())
let ranges = []
const needCheck = []

let parsingIndices = false;

for (let line of lines)
{
  if (!parsingIndices)
  {
    if (line === '')
    {
      parsingIndices = true;
      continue;
    }
    ranges.push(line.split("-").map(x => parseInt(x.trim())))
  }
  else
  {
    needCheck.push(parseInt(line))
  }
}

const inRange = n =>
{
  return ranges.some(x => 
    {
      const [a, b] = x;
      return a <= n && n <= b;
    })
}

const fresh = needCheck.reduce((accum, curv) =>
{
  return accum + inRange(curv)
}, 0)

console.log('part 1', fresh)

ranges.sort((a, b) => a[0] - b[0])

const mergedRanges = [ranges[0]];

for (let i = 1; i < ranges.length; i++)
{
  const back = mergedRanges.at(-1);
  const [cA, cB] = ranges[i];

  if (cA <= back[1])
    back[1] = Math.max(back[1], cB);
  else
    mergedRanges.push([cA, cB]);
}

const total = mergedRanges.reduce((accum, cur) => 
  accum + Math.abs(cur[1] - cur[0]) + 1
, 0)
console.log('part 2', total)