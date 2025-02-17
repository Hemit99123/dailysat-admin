# Hemit Patel
# 781159
# ICS3U0-4
# MR VEERA 
# Final Exam - Question 2
# 16 Jan 2025

# All the functions used in my application

# This function converts time into military based on an hour and minute segment
# There are multiple times where this logic is needed so its better to moduralze it 

def convert_to_military(hour, minute):
    return hour * 100 + minute

# This is the core of our logic
# It is the general logic needed to adjust the time based on another time zone

def adjust_time(original_hour, original_minute, difference):
    time = convert_to_military(original_hour, original_minute) + difference

    # We assume its same day but might change in our logic
    day_change = "Same day"

    # Adjust for overflow or underflow in military time

    # In this case, we have either surpassed or went behind one day 
    # Therefore we add or subtract 2400 (represents full day) and then change the day change too

    if time < 0:
        time += 2400
        day_change = "Previous day"
    elif time >= 2400:
        time -= 2400
        day_change = "Next day"

    # Ensure minutes stay within 00-59 range
    hours = time // 100
    minutes = time % 100
    if minutes >= 60:
        # swapping minutes with hours (removing 60 minutes for one hour, same thing)
        # this way we don't have irreigular times like 3 75 
        minutes -= 60
        hours += 1

    # Check if hours spilled over to the next day
    if hours >= 24:
        hours -= 24
        day_change = "Next day"
    
    military_time = convert_to_military(hours, minutes)
    return f"{day_change} {military_time}"

# All of these functions are for each of the different timezones available
# They use the adjust time function to help moduaralize common logic shared amongst all functions

def Victoria(hour, minute):
    return adjust_time(hour, minute, -300) + " in Victoria"

def Edmonton(hour, minute):
    return adjust_time(hour, minute, -200) + " in Edmonton"

def Winnipeg(hour, minute):
    return adjust_time(hour, minute, -100) + " in Winnipeg"

def Toronto(hour, minute):
    return adjust_time(hour, minute, 0) + " in Toronto"

def Halifax(hour, minute):
    return adjust_time(hour, minute, 100) + " in Halifax"

def StJohns(hour, minute):
    return adjust_time(hour, minute, 150) + " in St. John's"

hour = int(input("Hour    : "))
minute = int(input("Minute : "))

# The day input is needed by the problem statement but isn't used by the program 
# The program computes proper outputs w/o its use
day = input("Day      : ")

# Print Ottawa time first
ottawa_time = convert_to_military(hour, minute)
print(f"{ottawa_time} in Ottawa")

# Print all other time zones using separate functions
print(Victoria(hour, minute))
print(Edmonton(hour, minute))
print(Winnipeg(hour, minute))
print(Toronto(hour, minute))
print(Halifax(hour, minute))
print(StJohns(hour, minute))