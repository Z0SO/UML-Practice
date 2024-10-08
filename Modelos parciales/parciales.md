
## Modelo 1

----

La estética **beautiful** requiere una aplicación que le permita a sus clientes *realizar consultas en linea*, **reservar turnos** para los diferentes servicios con los que cuentan (*depilación, limpieza de cutis, perfilado, belleza de manos y pies, entre otros*). la reserva de turnos y las **consultas** podrían realizarlo aquellos **clientes** que se encuentren **registrados**.

Las consultas en linea  con los especialistas podrían realizarse en horarios de 9 a 12 y de 16 a 20.

Al iniciar, deberá seleccionar que tipo de consulta se quiere realizar, indicar la forma de pago en la que se realizara el **pago de la consulta** (transferencia, tarjeta de crédito). Una vez realizado esto, se habilitara el chatbox para iniciar la consulta

La **reserva de turnos** para los servicios de la estética se puede realizar en cualquier momento.

Para poder realizarlo debera seleccionar el servicio que se quiere tomar, completar las **observaciones** al servicio (por ejemplo, si es alérgica a algún producto, si no lo sabe también debería indicarlo), **características** solicitadas según el tipo de servicio (en caso de que sea depilacion debera indicarse la zona de cuerpo a depilar, para belleza de manos si se realiza esmaltado comun, semipermanente, kapping o esculpida, perfilado con o sin tinte). De acuerdo con el servicio seleccionado tambien debera habilitarse los turnos disponibles.
Seleccionar dia y horario. El turno quedara definitivamente reservado cuando al menos se haga el pago del 50% del servicio requerido.

El cliente **podra habilitar el servicio de aviso del turno asignado**, de esta manera recibira en su celular o correo electronico (segun haya seleccionado) la confirmacion del turno y el aviso de su proximo turno. 

Tambien, el cliente podra **consultar los servicios que se realizo** y entre los datos a mostrar debera indicarse el tiempo transcurrido de cada uno de los servicios.

Desde la aplicacion, **el administrador podra ver los turnos** y **realizar las asignaciones a los especialistas** correspondientes. 
Tambien, **podra requerir informes**: servicios realizados mensualmente por tipo de servicio, con los totales correspondientes.

1. Modelado de Casos de uso (CU)
	1. Modelar los casos de usos pertenecientes al dominio utilizando para ello un diagrama de CU
	2. Realizar descripcion de CU de "**Reservar servicio**", con camino estandar y dos caminos alternativos
2. Realizacion de caso de uso "**Reservar servicio**"
	1. Confeccionar 3 tarjetas CRC
	2. Desarrollar el diagrama de clases UML y para cada clase identificada especificar sus atributos y operaciones.
	3. Desarrollar el diagrama de secuencia UML para el camino estandar.


```plantuml

' diagrama de casos de uso


left to right direction

actor "Internauta" as internauta

actor "Cliente" as cliente

actor "Administrador" as admin

internauta <|-- cliente
internauta <|-- admin



rectangle "Beautiful" {

    ' parte del internauta
    usecase "Iniciar Sesion" as is
    internauta -- is




    ' parte Cliente
    usecase "Reservar Servicio" as reservarServicio
    cliente -- reservarServicio

    usecase "Realizar Consultas" as realizarConsultas
    cliente -- realizarConsultas

    usecase "Consultar Servicios Realizados" as consultarServicios
    cliente -- consultarServicios

    usecase "Habilitar Aviso de Turno" as habilitarAviso
    cliente -- habilitarAviso



    ' parte admin
    usecase "Ver Turnos" as verTurnos
    admin -- verTurnos

    usecase "Asignar Especialistas" as asignarEspecialistas
    admin -- asignarEspecialistas

    usecase "Solicitar Informes" as solicitarInformes
    admin -- solicitarInformes
}

```


2.2 diagrama de clases

```plantuml

' diagrama de clases pertenecientes al caso de uso "Reservar Servicio"

@startuml

left to right direction
skinparam linetype or   tho

class "Beautiful" as sistema {
    - nombre: String
    - servicios: LTS<Servicio>
    - turnos: LTT<Turno>


    + iniciarSesion()
}



class "Servicio" as servicio {
    - nombre: String
    - descripcion: String
    - precio: Real
    - duracion: Integer

    - observaciones: String
    - tipo: String

}

class "Turno" as turno {
    - fecha: Date
    - hora: Time


    - estado: String
    - aviso: Boolean
   
    + reservarTurno()
}


' relaciones con el sistema

sistema "1" - "1..*" servicio: > "ofrece"
sistema "1" --- "1..*" turno: > "genera"


' relaciones con el turno
turno "1" --- "1" servicio: > "tiene"


@enduml
```


