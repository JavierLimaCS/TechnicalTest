from flask import Flask, request, jsonify
from flask_cors import CORS

from Gestor import Gestor
from Job import Job
app = Flask(__name__)
app.config["DEBUG"] = True

CORS(app)

#Instancia de Gestor
gestor = Gestor()

#Generacion de los endpoints

@app.route('/') 
def home():
    return "SERVER IS WORKING CORRECTLY"

#Obtener usuarios
@app.route('/users')
def obtener_usuarios():
    return gestor.get_users()    

#Login
@app.route('/login/<user>/<password>')
def login(user=None,password=None):
    res = gestor.getUser(user,password)
    if res ==None:
        return '{"data":false}'
    return '{"data":true}'

#Registro de usuarios
@app.route('/registro',methods=['POST'])
def registrar_usuario():
    dato=request.json
    gestor.createUser(dato['nombre'],dato['password'],dato['usuario'],dato['apellido'])
    return '{"Estado":"Usuario Creado"}'

#Obtener Libros
@app.route('/getJobs')
def obtenertrabajos():
    return gestor.getJobs()

#Eliminar Libro
@app.route('/jobs/<titulo>',methods=["DELETE"])
def eliminar_trabajo(titulo):
    if(gestor.deleteJob(titulo)):
        return 'Eliminado'
    return 'Error'
#Crear Libro

@app.route('/jobs',methods=['POST'])
def crear_trabajo():
    dato=request.json
    gestor.createJob(Job(dato['titulo'],dato['recruiter'],dato['image'],dato['desc']))
    return '{"Estado":"Trabajo Creado"}'

#Actualizar trabajo
@app.route('/jobs/<job>',methods=["PUT"])
def modificar_trabajo(job):
    dato=request.json
    nuevo = Job(dato['titulo'],dato['recruiter'],dato['imagen'],dato['descripcion'])
    if(gestor.updaeJob(job,nuevo)):
        return '{"Estado":"Trabajo Modificado"}'
    return '{"Estado":"No existe Trabajo"}'

#Iniciar el servidor

if __name__ == "__main__":
    app.run(port=5000,host="0.0.0.0",debug=True)




