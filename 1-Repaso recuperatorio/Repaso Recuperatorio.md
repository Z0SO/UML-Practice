

# 2/4 Ejercicio 1

El Laboratorio de Análisis Clínicos CliLab” ha comenzado el desarrollo de un sistema para la registración de los análisis realizados por sus pacientes y el profesional que los solicita. Entre los datos personales deben registrarse nombre y apellido de la persona, DNI, dirección (la dirección estará formada por la calle, el número y el barrio), localidad, provincia. Es importante conocer el diagnostico presuntivo por el cual se realiza el análisis actual, además se deberá resguardar el tipo a de análisis, la fecha de realización y entrega del análisis.

Consigna Para el escenario propuesto identificar las clases, sus atributos, métodos, y asociaciones simples, representándolos en UML.

```plantuml

@startuml

skinparam linetype ortho

' paciente y medico son clases hijas de persona

persona <|-- medico
persona <|-- paciente

persona --- analisis: > realiza

medico --- analisis: > solicita


sistema "1" ---- "0..*" analisis: > registra


' relacion de composicion

analisis *-- tipoanalisis

diagnostico o-- analisis


paciente *-down- direccion


class sistema as "CliLab" {


}



class diagnostico as "Diagnostico" {


}




class persona as "Persona" {

}



class medico as "Medico" {


}


class paciente as "Paciente" {
    

} 

class direccion as "Direccion" {


} 


class analisis as "Analisis" {



}


class tipoanalisis as "Tipo_Analisis" {


} 




@enduml
```


1 asocaicion simple
2 herencia
3 agregacion
4 agregacion
5 asociacion
6 composicion
7 asociacion
8 composicion
9 herencia



La librería “Sarmiento” es una empresa familiar dedicada a la venta de toda clase
de libros, aunque se especializa en libros técnicos, actualmente posee un sistema
donde se registra información acerca de sus clientes, consistente en DNI,
nombre y apellido, dirección, teléfono, correo electrónico y edad,
además se almacenan todas las ventas que realizan y los libros involucrados en
cada una de ellas. Para competir con las grandes cadenas de librerías desean implementar
un programa de fidelización, en el que los clientes “Premium” puedan acumular o
canjear puntos en las compras que ellos realicen, a estos se les asignará una tarjeta
donde se registrarán dichos movimientos.



```plantuml

@startuml

'skinparam linetype ortho

' las clases son las siguientes
' Sarmiento
' ventas 
' clientes
' libros
' cliente Premium
' tarjeta


class sistema as "Sarmiento" {
    
    - Nombre: String
    - Direccion: String
    - Telefono: String
    - Correo: email


}

class ventas as "Ventas" {
    - Fecha: Date
    - Total: Float

}

class clientes as "Clientes" {
    - DNI: String
    - Nombre: String
    - Apellido: String
    - Direccion: String
    - Telefono: String
    - Correo: email
    - Edad: Int

}

class libros as "Libros" {
    - titulo: String
    - autor: String
    - editorial: String
    - precio_unitario: Float
    - cant_stock: Int
}


class cliente_premium as "Cliente_Premium" {
    - id_premium: Int
    - puntos: Int
    

}




class linea_de_compra as "Linea_de_Compra" {
    

}



' relaciones

'SISTEMA'
sistema "1" --- "0..*" ventas: > registra
sistema "1" --- "0..*" clientes: > tiene


'VENTAS'
ventas "1" -- "1..*" linea_de_compra: > contiene

'LINEA DE COMPRA'
linea_de_compra "1" -- "1" libros: > involucra




' RELACIONES DE CLIENTES
clientes <|-- cliente_premium




@enduml

```













Ejercicio 5

WGE es un juego de plataformas 2D en el que el jugador encarna al héroe que debe salvar al universo
a través de 10 niveles y posee solo 3 vidas. Cada nivel cuenta con varios tipos de elementos 
como los enemigos (monstruos, naves y tanques) que pueden moverse de manera autónoma, disparar,
chocar, etc. o elementos del escenario con los que no se interactúa y están fijos,
aunque pueden tener animaciones.



```plantuml
@startuml

' las clases son las siguientes

' sistema
' jugador
' enemigo 
' nivel
' elemento'



class sistema as "Juego" {



 + iniciar()
 + setMemory()
}


class jugador as "Jugador" {
    - vida: 1..3
    - nombre: string 
  
    + saltar()
    + mv_derecha() 
    + mv_izq()
    + agacharse()    
    + attack()
    + defenderse()


}


class enemigo as "Enemigo" {

- vida: int
- velocidad: float
- fuerza: float


+ atacar()
+ chocar()

'nota que son todos los metodos de movimiento'
+ mvRLUD()

}

class nivel as "Nivel" {
    - n_level: 1..10
    


    + spawnEnemigos()
    + spawnElementos()

}




class elemento as "Elemento" {
   - es_estatico: boolean
   - duracion: integer

    + setDuracion()
   + animacion()
}


class monstruo as "Monster" {
    + setVida()
    + atacar()
    + chocar()
    + mvRLUD()




}

class nave as "Nave" {
    + setVida()
    + atacar()
    + chocar()
    + mvRLUD()



}

class tanque as "Tanque" {
    + setVida()
    + atacar()
    + chocar()
    + mvRLUD()



}

'RELACIONES'

sistema *-- jugador
sistema *-- nivel




nivel *-- enemigo
nivel *-- elemento


enemigo <|-- nave
enemigo <|-- monstruo
enemigo <|-- tanque


@enduml
```





Dados los ejercicios 1 y 2 de la Guía de TP N°5, modele las siguientes interacciones:
- Búsqueda de médico por número de matrícula.
- Búsqueda de pacientes por apellido.
- Registrar un nuevo análisis.


### BUSQUEDA DE MEDICO POR NUMERO DE MATRICULA

```plantuml
@startuml

hide footbox

skinparam participant {
  RoundCorner 0
}


participant ":CliLab" as sistema
participant "LTM:Medico" as ltm

participant "med:Medico" as medico



' Parte del diagrama
' ESTO ES LA BUSQUEDA DE MANERA ELEMENTAL




sistema <-[ : buscarMedico(matricula)

loop for each m in LTM

    sistema -> ltm: getMedico()
    ltm --> sistema: med

    sistema -> medico: getMatricula()
    medico --> sistema: med_matricula

    opt if matricula == med_matricula
       'version de lautaro que lo censuraron
        ' break
        '     sistema -->[ : med 
        ' end

        ' version de mujeres opresoras
        sistema -->[ : med
    end
end


@enduml
```


# Busqueda de pacientes por apellido

- aqui se tendra que hacer un alista auxiliar por si encuentra mas de un paciente con el mismo apellido


```plantuml
@startuml


hide footbox

skinparam participant {
  RoundCorner 0
}


participant ":CliLab" as sistema

participant "[pac]LTP:Paciente" as ltp

participant "p:Paciente" as paciente





sistema <-[ : buscarPaciente(apellido)



loop for each LTP

sistema -> ltp : getPaciente()
ltp --> sistema: pac

sistema -> paciente: getApellido()

paciente --> sistema : pac.apellido


' ahora tendria que añadir ese paciente a la lista de todos los apellidos de ese paciente

create "LTA:Paciente" as lta

sistema -->  lta: create()

@enduml
```