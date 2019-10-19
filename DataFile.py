import csv
import random

filecomp = open("CompanyProfiles.csv", "w")
with open('CompanyProfiles.csv','a') as csvFile:
    header = 'Company Name', 'Position Title', 'PID', 'Open Slots', 'Rankings Left to Right by ID numbers'
    filecomp.write(','.join((header)))
    filecomp.write('\n')

for row in range (970):
    posId = random.randint(1, 971)
    openslots = random.randint(1, 5)
    row = ['Company %d' % (row),'Position Title', '%d' %posId, '%d'%openslots]
    for stud in range (36):
        studrank = random.randint(1, 37)
        studId = random.randint(1, 501)
        row.append('SID: %d'%studId)

    with open('CompanyProfiles.csv', 'a') as csvFile:
        writer = csv.writer(csvFile)
        filecomp.write((','.join(row)))
        filecomp.write('\n')
filecomp.close()

#Student Profile CSV generator
filestudent = open("StudentProfiles.csv", "w")
with open('StudentProfiles.csv','a') as csvFile:
    header = 'Student Name', 'School Name', 'Student ID', 'PID Rank 1', 'PID Rank 2','PID Rank 3','PID Rank 4','PID Rank 5'
    filestudent.write((','.join(header)))
    filestudent.write('\n')

for row in range (500):
    studId = random.randint(1, 501)
    posId = random.randint(1, 971)
    posId2 = random.randint(1,971)
    posId3 = random.randint(1, 971)
    posId4 = random.randint(1, 971)
    posId5 = random.randint(1, 971)

    row = 'Student Name','School Name ', '%d' %studId,'%d' %posId,'%d' %posId2,'%d' %posId3,'%d' %posId4,'%d' %posId5

    with open('StudentProfiles.csv', 'a') as csvFile:
        writer = csv.writer(csvFile)
        filestudent.write((','.join(row)))
        filestudent.write('\n')
filestudent.close()
