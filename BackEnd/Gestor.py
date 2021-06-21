from Job import Job
from User import User
import json

class Gestor:
    def __init__(self):
        self.users =[]
        self.jobs=[]
        self.jobs.append(Job("Java Developer","Micaela Ruiz","https://cdn.worldvectorlogo.com/logos/java.svg","Desarrollador de Software Java")) 
        self.users.append(User('admin','admin','admin','admin'))

    def get_users(self):
        return json.dumps([ob.__dict__ for ob in self.users])

    def getUser(self,user,password):
        for x in self.users:
            if x.username==user and x.password==password:
                return x
        return None

    def createUser(self,nombre,username,password,country):
        self.users.append(User(nombre,username,password, country))

    def getJobs(self):
        return json.dumps([ob.__dict__ for ob in self.jobs])
    
    def deleteJob(self,op):
        for x in self.jobs:
            if(x.title==op):
                self.jobs.remove(x)
                return True
        return False

    def createJob(self,title):
        self.jobs.append(title)

    def updaeJob(self,op,Job):
        for x in self.jobs:
            if(x.title==op):
                self.jobs[self.jobs.index(x)]=Job
                return True
        return False