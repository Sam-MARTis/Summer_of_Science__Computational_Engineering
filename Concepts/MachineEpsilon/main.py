import math

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

