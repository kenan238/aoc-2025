const fs = require('fs')
const lines = fs.readFileSync('input.txt').toString().split(/\r?\n/).map(x => [...x]);

const width = lines[0].length;
const height = lines.length;

const isRoll = (x, y) => lines[y][x] === '@'

const canAccessPaper = (xx, yy) =>
{
  let rollCount = 0;
  for (let x = -1; x <= 1; x++)
  {
    for (let y = -1; y <= 1; y++)
    {
      const uy = y + yy;
      const ux = x + xx;

      if (x === 0 && y === 0)
        continue;
      if (uy < 0 || ux < 0)
        continue;
      if (uy >= height || ux >= width)
        continue;

      if (isRoll(ux, uy))
        rollCount++;
      
      if (rollCount >= 4)
        return false;
    }
  }

  return true;
}

const printGrid = () =>
{
  console.log(lines.map(x => x.join('')).join('\n'))
}

let accessibleRolls = 0;
for (var y = 0; y < height; y++)
{
  for (var x = 0; x < width; x++)
  {
    if (isRoll(x, y) && canAccessPaper(x, y))
      accessibleRolls++
  }
}

console.log('part 1', accessibleRolls)

const prune = () =>
{
  let accessibleRolls = 0;
  for (var y = 0; y < height; y++)
  {
    for (var x = 0; x < width; x++)
    {
      if (isRoll(x, y) && canAccessPaper(x, y))
      {
        lines[y][x] = '.'
        accessibleRolls++
      }
    }
  }
  return accessibleRolls;
}

let totalRemoves = 0;
while (true)
{
  let removed = prune();
  totalRemoves += removed;
  if (removed === 0)
    break;
}

console.log('part 2', totalRemoves)