import math

"""
    This program calculates the machine epsilon for a 64 bit machine
    A machine epsilon is the smallest positive number that can be added to 1 and still have the result be greater than 1
    Any postive number smaller than the machine epsilon that's added to 1 will result in the sum be treated as 1.
    This is due to the finite precision of floating point numbers in computers.
    1+number_less_than_epsilon is identical to 1 in the computer's memory and ALU.
    
"""



def main():
    espsilon = 1
    while(1+espsilon>1):
        espsilon = espsilon*0.999999
    print(espsilon)
    print(1/espsilon)
    print(math.log2(1/espsilon)) # ~53 for 64 bit machines
    return 0

if __name__ == '__main__':
    main()

