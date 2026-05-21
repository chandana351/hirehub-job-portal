const aliases = {
  bangalore: "bengaluru",
  banglore: "bengaluru",
  bnaglore: "bengaluru",
  bengalore: "bengaluru",
  developer: "developer",
  dewveloper: "developer",
  devloper: "developer",
};

const normalizeText = (value = "") =>
  value
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => aliases[word] || word)
    .join(" ");

const distance = (left, right) => {
  const matrix = Array.from({ length: left.length + 1 }, () =>
    Array(right.length + 1).fill(0),
  );

  for (let index = 0; index <= left.length; index += 1) matrix[index][0] = index;
  for (let index = 0; index <= right.length; index += 1) matrix[0][index] = index;

  for (let row = 1; row <= left.length; row += 1) {
    for (let column = 1; column <= right.length; column += 1) {
      const cost = left[row - 1] === right[column - 1] ? 0 : 1;
      matrix[row][column] = Math.min(
        matrix[row - 1][column] + 1,
        matrix[row][column - 1] + 1,
        matrix[row - 1][column - 1] + cost,
      );
    }
  }

  return matrix[left.length][right.length];
};

const tokenMatches = (term, words) =>
  words.some((word) => {
    if (word.includes(term) || term.includes(word)) return true;
    if (term.length < 4 || word.length < 4) return false;
    return distance(term, word) <= 2;
  });

export const jobSearchText = (job) =>
  normalizeText(
    [
      job.title,
      job.company,
      job.location,
      job.salary,
      job.jobType,
      job.experience,
      ...(job.skills || []),
      job.description,
    ].join(" "),
  );

export const matchesJobQuery = (job, query) => {
  const terms = normalizeText(query).split(" ").filter(Boolean);
  if (!terms.length) return true;

  const words = jobSearchText(job).split(" ").filter(Boolean);
  return terms.every((term) => tokenMatches(term, words));
};

export const fieldMatches = (value, query) => {
  if (!query.trim()) return true;
  const terms = normalizeText(query).split(" ").filter(Boolean);
  const words = normalizeText(value).split(" ").filter(Boolean);
  return terms.every((term) => tokenMatches(term, words));
};
