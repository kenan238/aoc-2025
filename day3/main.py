def maxjolt(bank, size):
  bank = [*map(int, bank)]
  search_index = -1
  jolt = ""

  while size > 0:
    search_area = bank[search_index+1 : len(bank) - size + 1]
    j = max(search_area)
    jolt += str(j)
    search_index = bank.index(j, search_index + 1)
    size -= 1

  return int(jolt)

with open("input.txt", "r") as f:
  grid = [*map(lambda x: x.strip(), f.readlines())]

  joltsum = 0

  for bank in grid:
    a = maxjolt(bank, 2)
    joltsum += a
  
  print("part 1", joltsum)

  joltsum = 0

  for bank in grid:
    a = maxjolt(bank, 12)
    joltsum += a
  
  print("part 2", joltsum)