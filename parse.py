import csv
import pandas as pd

# for StudentsProfiles.csv
comp_list = []
stud_list = []

with open('StudentProfiles.csv', mode='r') as stud_file:
	next(stud_file)
	csv_reader = csv.reader(stud_file)

	for lines in csv_reader:
		comp_list.append(lines[3:])
	#print(comp_list)



with open('StudentProfiles.csv', mode='r') as stud_file:

	csv_reader = csv.DictReader(stud_file)
	for lines in csv_reader:
		stud_list.append(lines['Student ID'])
	#print(stud_list)


dictionary1 = dict(zip(stud_list, comp_list))
#print(dictionary)


comp_list1 = []
stud_list1 = []
slots_list = []

# for CompanyProfiles.csv
with open('CompanyProfiles.csv', mode='r') as stud_file:
	next(stud_file)
	csv_reader = csv.reader(stud_file)

	for lines in csv_reader:
		comp_list1.append(lines[4:])
	#print(comp_list1)



with open('CompanyProfiles.csv', mode='r') as stud_file:
	csv_reader = csv.DictReader(stud_file)
	for lines in csv_reader:
		stud_list1.append(lines['PID'])
		slots_list.append(lines['Open Slots'])
	#print(slots_list)
	#print(stud_list1)


dictionary2 = dict(zip(stud_list1, comp_list1))
#print(dictionary1)

dictionary3 = dict(zip(stud_list1, slots_list))
#print(dictionary3)


