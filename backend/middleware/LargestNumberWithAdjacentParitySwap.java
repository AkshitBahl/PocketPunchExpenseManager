import java.util.*;

public class LargestNumberWithAdjacentParitySwap {

    public static String largestNumber(String num) {
        char[] digits = num.toCharArray();
        int n = digits.length;
        
        int start = 0;
        
        // Traverse the number to find blocks of same-parity digits
        while (start < n) {
            int end = start;
            
            // Find the end of the current same-parity block
            while (end + 1 < n && ((digits[end] - '0') % 2) == ((digits[end + 1] - '0') % 2)) {
                end++;
            }
            
            // Sort this block in descending order if it's more than one digit
            if (end > start) {
                sortDescending(digits, start, end);
            }
            
            // Move to the next block
            start = end + 1;
        }
        
        return new String(digits);
    }

    // Helper method to sort a section of the array in descending order
    private static void sortDescending(char[] digits, int start, int end) {
        List<Character> block = new ArrayList<>();
        
        for (int i = start; i <= end; i++) {
            block.add(digits[i]);
        }
        
        // Sort block in descending order
        block.sort(Collections.reverseOrder());
        
        // Place sorted values back into the original array
        for (int i = start; i <= end; i++) {
            digits[i] = block.get(i - start);
        }
    }

    public static void main(String[] args) {
        String num = "1806579";
        String largestNumber = largestNumber(num);
        System.out.println("Largest number possible: " + largestNumber);
    }
}