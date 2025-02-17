# Hemit Patel
# 781159
# ICS3U0-4
# MR VEERA
# Final Exam - Question 1
# 16 Jan 2025

# NOTE: Due to techincal errors I had to refresh my page (internal error)
# For this reason I got a new question even though prior to that I had another one
# This is the answer for the boss statement questions 

# Get number of earnings
number_of_earnings = int(input(""))

# Initialize lists
# Lists are perfected for this because we need to keep track of different "elements" (the money count)

earnings = []
corrected_earnings = []

# Get all earnings values
for _ in range(number_of_earnings):
    earning = int(input(""))
    earnings.append(earning)

# Process the earnings list
current_index = 0

# We keep a loop on-going until we are at the end of the earnings list 
# The len() function represents the final index value and once current_index
# Surpasses said value, it means it has gone through the whole list

while current_index < len(earnings):
    if earnings[current_index] == 0 and current_index > 0:
        # If we find a zero, remove the previous non-zero number and don't add the zero to corrected_earnings

        # The .pop() method is a list manupliation method in Python
        # Without a paramater, it deletes the last item within a list
        # This is perfect for us because when a 0 is said, it means the last value was a mistake 

        corrected_earnings.pop()
    else:
        corrected_earnings.append(earnings[current_index])
    current_index += 1

# Now that we have all the correct values, we use the sum() method
# This method allows us to add up all values within an iterable data type like lists

sum_corrected_earnings = sum(corrected_earnings)

print(sum_corrected_earnings)