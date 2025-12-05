with open('input.txt', 'r') as f:
  ranges = [*map(lambda x: tuple([*map(int, x.split("-"))]), f.read().strip().split(","))]
  
  count = 0
  part2 = 0

  for (start, end) in ranges:
    for n in map(str, range(start, end + 1)):
      mid = len(n) // 2
      lseq = n[:mid]
      rseq = n[mid:]
      
      if lseq == rseq:
        count += int(n)
        continue

      seq = ""
      nlen = len(n)
      for ch in n:
        seq += ch
        if len(seq) == len(n):
          break
        possible_repeats = nlen / len(seq)
        if possible_repeats % 1 == 0:
          remade = seq * int(possible_repeats)
          if remade == n and possible_repeats > 2:
            part2 += int(n)
            break

  print("Part 1", count)
  print("Part 2", count + part2)