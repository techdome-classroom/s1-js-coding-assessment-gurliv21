const decodeTheRing = function (s, p) {
  const m = s.length;
  const n = p.length;

  // DP table where dp[i][j] is true if p[0..i-1] matches s[0..j-1]
  const dp = Array(n + 1).fill(false).map(() => Array(m + 1).fill(false));

  // Base case: empty pattern matches empty string
  dp[0][0] = true;

  // Handle patterns that start with *
  for (let i = 1; i <= n; i++) {
    if (p[i - 1] === '*') {
      dp[i][0] = dp[i - 1][0];
    }
  }

  // Fill the DP table
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (p[i - 1] === s[j - 1] || p[i - 1] === '?') {
        // If the characters match or we have a ?, we carry over the previous result
        dp[i][j] = dp[i - 1][j - 1];
      } else if (p[i - 1] === '*') {
        // If we have a *, we can either:
        // 1. Match the * with an empty sequence (dp[i-1][j])
        // 2. Match the * with one or more characters (dp[i][j-1])
        dp[i][j] = dp[i - 1][j] || dp[i][j - 1];
      }
    }
  }

  // The result is whether the entire pattern matches the entire string
  return dp[n][m];
};

module.exports = decodeTheRing;
