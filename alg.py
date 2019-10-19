#!/usr/bin/python

## programe-Shapley algorithm
# http://www.nrmp.org/match-process/match-algorithm/
# http://www.nber.org/papers/w6963

# From http://rosettacode.org/wiki/Stable_marriage_problem
# Uses deepcopy to make actual copy of the contents of the dictionary in a new object
# http://pymotw.com/2/copy/

import copy
import parse
import csv
from parse import dictionary1, dictionary2, dictionary3
from collections import defaultdict

#Create python dictionary with names as keys, values as list
studentprefers = dictionary1
print(studentprefers)

programprefers = dictionary2
print(programprefers)

programSlots = dictionary3
print(programSlots)
 
students = sorted(studentprefers.keys())
programs = sorted(programprefers.keys())
 
def matchmaker():
    studentsfree = students[:]
    studentslost = []
    matched = {}
    for programName in programs:
        if programName not in matched:
             matched[programName] = list()
    studentprefers2 = copy.deepcopy(studentprefers)
    programprefers2 = copy.deepcopy(programprefers)
    while studentsfree:
        student = studentsfree.pop(0)
        print("%s is on the market" % (student))
        studentslist = studentprefers2[student]
        program = studentslist.pop(0)
        print("  %s (program's #%s) is checking out %s (student's #%s)" % (student, (programprefers[program].index(student)+1), program, (studentprefers[student].index(program)+1)) )
        tempmatch = matched.get(program)
        if len(tempmatch) < programSlots.get(program):
            # Program's free
            if student not in matched[program]:
                matched[program].append(student)
                print("    There's a spot! Now matched: %s and %s" % (student.upper(), program.upper()))
        else:
            # The student proposes to an full program!
            programslist = programprefers2[program]
            for (i, matchedAlready) in enumerate(tempmatch):
                if programslist.index(matchedAlready) > programslist.index(student):
                    # Program prefers new student
                    if student not in matched[program]:
                        matched[program][i] = student
                        print("  %s dumped %s (program's #%s) for %s (program's #%s)" % (program.upper(), matchedAlready, (programprefers[program].index(matchedAlready)+1), student.upper(), (programprefers[program].index(student)+1)))
                        if studentprefers2[matchedAlready]:
                            # Ex has more programs to try
                            studentsfree.append(matchedAlready)
                        else:
                            studentslost.append(matchedAlready)
                else:
                    # Program still prefers old match
                    print("  %s would rather stay with %s (their #%s) over %s (their #%s)" % (program, matchedAlready, (programprefers[program].index(matchedAlready)+1), student, (programprefers[program].index(student)+1)))
                    if studentslist:
                        # Look again
                        studentsfree.append(student)
                    else:
                        studentslost.append(student)
    #print 
    for lostsoul in studentslost:
        print('%s did not match' % lostsoul)
    return (matched, studentslost)


def check(matched):
    inversematched = defaultdict(list)
    for programName in matched.keys():
        for studentName in matched[programName]:
            inversematched[programName].append(studentName)

    for programName in matched.keys():
        for studentName in matched[programName]:

            programNamelikes = programprefers[programName]
            programNamelikesbetter = programNamelikes[:programNamelikes.index(studentName)]
            helikes = studentprefers[studentName]
            helikesbetter = helikes[:helikes.index(programName)]
            for student in programNamelikesbetter:
                for p in inversematched.keys():
                    if student in inversematched[p]:
                        studentsprogram = p
                studentlikes = studentprefers[student]
				
				## Not sure if this is correct
                try:
                    studentlikes.index(studentsprogram)
                except ValueError:
                    continue
				
                if studentlikes.index(studentsprogram) > studentlikes.index(programName):
                    print("%s and %s like each other better than "
                          "their present match: %s and %s, respectively"
                          % (programName, student, studentName, studentsprogram))
                    return False
            for program in helikesbetter:
                programsstudents = matched[program]
                programlikes = programprefers[program]
                for programsstudent in programsstudents:
                    if programlikes.index(programsstudent) > programlikes.index(studentName):
                        print("%s and %s like each other better than "
                              "their present match: %s and %s, respectively"
                              % (studentName, program, programName, programsstudent))
                        return False
    return True
 
 
print('\nPlay-by-play:')
(matched, studentslost) = matchmaker()

print('\nMatches written to output file')
# write to csv file
with open('Matches.csv', mode='w') as ofile:
    csv_writer = csv.writer(ofile)
    for couple in sorted(matched.items()):
        csv_writer.writerow(couple) 

#print
print('Match stability check PASSED'
      if check(matched) else 'Match stability check FAILED')
 
print('\n\nSwapping two matches to introduce an error')
matched[programs[0]], matched[programs[1]] = matched[programs[1]], matched[programs[0]]
for program in programs[:2]:
    print('  %s is now matched to %s' % (program, matched[program]))
#print
print('Match stability check PASSED'
      if check(matched) else 'Match stability check FAILED')
