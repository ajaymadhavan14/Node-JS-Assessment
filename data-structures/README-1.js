function findLongestSubstring(s) {
    let maxLength = 0; 
    let longestSubstring = ""; 
  
    let start = 0; 
    let end = 0; 
  
    const visited = new Set(); 
  
    while (end < s.length) {
      const currentChar = s[end];
  
      if (!visited.has(currentChar)) {
        visited.add(currentChar);
        end++;
      } else {
        visited.delete(s[start]);
        start++;
      }
  
      if (end - start > maxLength) {
        maxLength = end - start;
        longestSubstring = s.slice(start, end);
      }
    }
  
    return [maxLength, longestSubstring]
  }
  
  const s = "abcabcbb";
 console.log( findLongestSubstring(s));
  