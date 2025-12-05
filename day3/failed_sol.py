from functools import lru_cache

# Extremely naive solution before realising I had to actually think.

def has_dup(lst):
  seen = set()
  for item in lst:
    if item in seen:
      return True
    seen.add(item)
  return False

@lru_cache(maxsize=None)
def search(size, bank, a = None):
  if size == len(bank):
    return int(bank)

  if a == None:
    a = tuple([*range(size)])

  a = list(a)

  banklen = len(bank) - 1
  if has_dup(a):
    return -1
  if any([x > banklen for x in a]):
    return -1

  jolt = ""

  for i in a:
    jolt += bank[i]

  jolt = int(jolt)

  pool = [jolt]
  for i in range(size):
    new_a = [x + 1 if j >= i else x for j, x in enumerate(a)]
    pool.append(search(size, bank, tuple(new_a)))

  return max(pool)
