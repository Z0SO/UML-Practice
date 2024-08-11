

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


}

class ventas as "Ventas" {
}

class clientes as "Clientes" {
}

class libros as "Libros" {
}

class cliente_premium as "Cliente_Premium" {
}

class tarjeta as "Tarjeta" {
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

cliente_premium -left- tarjeta: > tiene



@enduml


```


