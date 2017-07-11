from __future__ import division
from collections import OrderedDict
import numpy
from math import *

def getCons():
	#lst = OrderedDict({'sin^-1':'asin', 'cos^-1':'acos', 'tan^-1':'atan','log':'log10', 'ln':'log', '^':'**', 'sin':'sin', 'cos':'cos','tan':'tan', 'e':'e', 'pi':'pi', 'sqrt':'sqrt'})
	lst = OrderedDict()
	lst['sin^-1'] = 'asin'
	lst['cos^-1'] = 'acos'
	lst['tan^-1'] = 'atan'
	lst['log'] = 'log10'
	lst['ln'] = 'log'
	lst['^'] = '**'
	lst['sin'] = 'sin'
	lst['cos'] = 'cos'
	lst['tan'] = 'tan'
	lst['e'] = 'e'
	lst['pi'] = 'pi'
	lst['sqrt'] = 'sqrt'
	return lst

class MathFunction():
	history = []
	cons_func = getCons()

	def __init__(self, formula):
		self.setFormula(formula)

	def parse(self):
		temp = self.formula.replace(' ','')
		for key,item in MathFunction.cons_func.items():
			temp = temp.replace(key,'*'+item)
			if item == "tan" or item =="cos" or item == "sin":
				temp = temp.replace('a*'+item,'a'+item)
		for par in self.parameter:
			temp = temp.replace(par,'*'+par)
			temp = self.correct(temp,par,'*'+par,True)
		temp = temp.replace('(','*(')
		temp = self.function_correct(temp, True)
		start,end = 0,0
		index,broader = 1,len(temp)
		while index < broader:
			if '0' <= temp[index] <= '9':
				start,end = index,index+1
				while ('0' <= temp[end] <= '9') and end < broader:
					end += 1
				temp = temp[:index] + '*' + temp[index:]
				index = end
				broader += 1
			index += 1
		if temp[0] == '*':
			temp = temp[1:]
		index,broader = 1,len(temp)
		while index < broader:
			if temp[index] == '*' and not ('0' <= temp[index-1] <= '9' or 'a' <= temp[index-1] <= 'z' or 'A' <= temp[index-1] <= 'Z' or temp[index-1] == ')'):
				temp = temp[:index] + temp[index+1:]
				broader -= 1
			index += 1
		return temp

	def getPar(self):
		temp = self.formula
		for key in MathFunction.cons_func.keys():
			temp = temp.replace(key,'')
		par = []
		for s in temp:
			if ('a' <= s <= 'z' or 'A' <= s <= 'Z') and s not in par:
				par.append(s)
		return par

	def correct(self,formula, alpha, val, isPar):
		if isPar:
			for item in MathFunction.cons_func.values():
				if alpha in item:
					tst = item.replace(alpha, val)
					formula = formula.replace(tst,item)
		else:
			for key in MathFunction.cons_func.keys():
				if alpha in key:
					tst = key.replace(alpha, val)
					formula = formula.replace(tst,key)
		return formula

	def function_correct(sef, formula, isPar):
		lst = ["asin", "acos", "atan", "log", "log10", "sin", "cos", "tan", "sqrt"]
		if isPar:
			for item in MathFunction.cons_func.values():
				if item in lst:
					formula = formula.replace(item+"*(",item+"(")
		else:
			pass
		return formula


	def sub(self, variables):
		if len(variables) < len(self.parameter):
			temp = self.formula
			for key,item in variables.items():
				temp = temp.replace(key,item)
				temp = self.correct(temp,key,item,False)
		else:
			temp = self.parseForm
			for key,item in variables.items():
				temp = temp.replace(key,item)
				temp = self.correct(temp,key,item,True)
		return eval(temp)

	def setFormula(self, formula):
		self.formula = formula
		self.parameter = self.getPar()
		self.parseForm = self.parse()
		if formula not in MathFunction.history:
			MathFunction.history.append(formula)
