from math import floor

dial = 50
zeros = 0
clicks = 0
unbound = 50

with open("input.txt", "r") as f:
  lines = f.readlines()

  for line in lines:
    line = line.strip()
    amount = int(line[1:])
    factor = -1 if line[0] == "L" else 1
    a = factor * amount
    old_dial = dial
    dial = (dial + a) % 100

    old_ubound = unbound
    unbound += a

    prev = old_ubound // 100
    curr = unbound // 100
    diff = abs(curr - prev)
    clicks += diff

    if factor < 0:
      if unbound % 100 == 0:
        clicks += 1
      if old_ubound % 100 == 0:
        clicks -= 1

    if dial == 0:
      zeros += 1

print("part 1", zeros)
print("part 2", clicks)