const fs = require('fs')
const fileData = fs.readFileSync('input.txt').toString().split(/\r?\n/);

const printGrid = (l) =>
{
  console.log(l.map(x => x.join('')).join('\n'))
}

const parse = () =>
{
  const firstLn = [...fileData[0]];
  const sepColumns = [0]

  for (let i = 0; i < firstLn.length; i++)
  {
    if (firstLn[i] === ' ')
    {
      const linesUnder = fileData.map(x => x[i])
      if (linesUnder.every(x => x === ' '))
        sepColumns.push(i)
    }
  }

  const gridRead = (startX, endX) =>
  {
    let d = []
    for (let line of fileData)
      d.push(line.substring(startX, endX));

    return d.map(x => x)
  }

  const problems = []

  for (let i = 0; i < sepColumns.length; i++)
  {
    const startX = sepColumns[i]
    const endX = sepColumns[i + 1];
    const rRead = gridRead(startX, endX).filter(x => x !== '')
    const read = rRead.map(x => x.trim())

    if (read.length === 0)
      continue;

    const rtlNumbers = []

    for (let j = 0; j < rRead.length; j++)
    {
      const sb = rRead.map(x => x[j]).filter(x => x !== undefined)
      const num = parseInt(sb.map(x => x.trim()).join(''))
      
      rtlNumbers.push(num);
    }

    problems.push({
      rtlNumbers: rtlNumbers.filter(x => !isNaN(x)),
      numbers: read.slice(0, read.length - 1).map(x => parseInt(x.trim())),
      operation: read.at(-1)
    })
  }

  return problems;
}

const calculate = (problem, p2 = false) =>
{
  let reducer = (acc, a) => acc + a;
  let initial = 0;
  if (problem.operation === '*')
  {
    initial = 1;
    reducer = (acc, a) => acc * a;
  }

  return (p2 ? problem.rtlNumbers : problem.numbers).reduce(reducer, initial);
}

const problems = parse()
const solutionSum = problems.map(x => calculate(x, false)).reduce((acc, a) => acc + a)
const solutionSum2 = problems.map(x => calculate(x, true)).reduce((acc, a) => acc + a)

console.log('part 1', solutionSum)
console.log('part 2', solutionSum2)