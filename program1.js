const getTotalIsles = function (grid) {
  // Handle edge case: empty grid
  if (!grid || grid.length === 0) return 0;

  let islandCount = 0;
  const rows = grid.length;
  const cols = grid[0].length;

  // Helper function to perform DFS
  const dfs = (i, j) => {
    // Base cases for the DFS (if it's out of bounds or water)
    if (i < 0 || j < 0 || i >= rows || j >= cols || grid[i][j] === 'W') return;

    // Mark the current land cell as visited (by converting it to water 'W')
    grid[i][j] = 'W';

    // Explore the adjacent cells (up, down, left, right)
    dfs(i + 1, j); // down
    dfs(i - 1, j); // up
    dfs(i, j + 1); // right
    dfs(i, j - 1); // left
  };

  // Iterate through every cell in the grid
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      // If a landmass ('L') is found, it's the start of a new island
      if (grid[i][j] === 'L') {
        islandCount++; // New island found
        dfs(i, j); // Perform DFS to mark the entire island
      }
    }
  }

  return islandCount; // Return the total number of islands
};

module.exports = getTotalIsles;
