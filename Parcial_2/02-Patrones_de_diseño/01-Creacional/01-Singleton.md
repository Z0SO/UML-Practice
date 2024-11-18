
---
# **Patrón de Diseño Singleton**

El **Singleton** es un patrón de diseño **creacional** que garantiza que una clase tenga **una única instancia** y proporciona un punto de acceso global a esta. Es especialmente útil en casos donde se debe controlar el acceso a recursos compartidos, como bases de datos o archivos.

---

## **Concepto**
El Singleton asegura que una clase:

1. **Solo tiene una instancia.**  
   Esto es útil para gestionar recursos compartidos, ya que previene la creación de múltiples instancias innecesarias o conflictivas.

2. **Ofrece un acceso global a esa instancia.**  
   Es similar a una variable global, pero más controlada y segura, ya que evita modificaciones no autorizadas desde otras partes del programa.

![Patrón Singleton](https://refactoring.guru/images/patterns/content/singleton/singleton.png)

---

## **Problemas que resuelve**

El patrón Singleton aborda dos problemas principales, aunque esto puede violar el **Principio de Responsabilidad Única (SRP)**:

### 1. **Garantizar una única instancia**
Este control es importante para manejar recursos compartidos, como:

- **Bases de datos:** Una sola conexión para evitar conflictos.
- **Archivos:** Controlando accesos múltiples.

#### Ejemplo:
Si intentas crear un segundo objeto de una clase Singleton, simplemente obtendrás la misma instancia inicial. Este comportamiento no es posible con constructores normales, ya que estos siempre crean una nueva instancia.

![El acceso global a un objeto](https://refactoring.guru/images/patterns/content/singleton/singleton-comic-1-es.png)



### 2. **Proporcionar acceso global**
El Singleton permite que cualquier parte del programa acceda a su instancia sin usar variables globales, reduciendo el riesgo de errores por sobrescritura. También centraliza el control, manteniendo el código más organizado.

---

## **Solución**

El patrón Singleton se implementa siguiendo dos pasos clave:

1. **Constructor privado:**  
   Esto evita que se creen nuevas instancias directamente usando el operador `new`.

2. **Método estático:**  
   Este método actúa como constructor. Si la instancia no existe, la crea; si ya existe, devuelve la misma instancia.

```java
class Singleton {
    private static Singleton instancia;

    private Singleton() {
        // Inicialización
    }

    public static Singleton getInstance() {
        if (instancia == null) {
            instancia = new Singleton();
        }
        return instancia;
    }
}
```

---

## **Analogía Real**

El **Gobierno** es un ejemplo perfecto de Singleton:

- Un país solo tiene un gobierno oficial.  
- Desde cualquier parte del país, se accede al gobierno como un único punto de referencia.  

---

## **Estructura del Patrón**


![[structure-singleton.png]]

1. **Clase Singleton:**  
   Declara un método estático (`obtenerInstancia`) que garantiza el acceso a una única instancia.

---

## **Aplicabilidad**

Utiliza este patrón cuando:

1. Necesites garantizar una única instancia, como:
   - Conexiones de base de datos.
   - Gestores de configuración.

2. Quieras evitar la dispersión del control de acceso, reemplazando variables globales inseguras.

3. Necesites control sobre el número de instancias creadas, permitiendo ajustes en el método `getInstance`.

---

## **Implementación**

### **Pasos:**

1. **Campo estático privado:**  
   Almacena la instancia única.

2. **Método estático público:**  
   Devuelve la instancia única, creando una nueva si no existe.

3. **Constructor privado:**  
   Restringe la creación de instancias fuera de la clase.

4. **Ajustar código cliente:**  
   Sustituir llamadas directas al constructor por el método estático.

---

## **Ejemplo en Código**

```java
class Database {
    private static Database instance;

    private Database() {
        // Inicialización, como conexión a la base de datos.
    }

    public static synchronized Database getInstance() {
        if (instance == null) {
            instance = new Database();
        }
        return instance;
    }

    public void query(String sql) {
        // Lógica para consultas.
    }
}

class Application {
    public static void main(String[] args) {
        Database db1 = Database.getInstance();
        db1.query("SELECT * FROM users");

        Database db2 = Database.getInstance();
        db2.query("SELECT * FROM orders");

        // Ambas referencias (db1 y db2) apuntan a la misma instancia.
    }
}
```

---

## **Ventajas y Desventajas**

| **Ventajas**                                                                                                       | **Desventajas**                                                                                                                                                                                                 |
|--------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| - Garantiza una única instancia.                                                                                   | - **Viola el Principio de Responsabilidad Única.** Combina múltiples responsabilidades en una sola clase.                                                              |
| - Punto de acceso global a la instancia.                                                                           | - Puede enmascarar un mal diseño al permitir dependencia excesiva entre componentes.                                                                                   |
| - Inicialización solo cuando se requiere, ahorrando recursos.                                                      | - Requiere manejo especial en aplicaciones multihilo para evitar instancias duplicadas.                                                                                |
|                                                                                                                    | - Dificulta pruebas unitarias, ya que los métodos estáticos y constructores privados son difíciles de simular en muchos lenguajes.                                      |

---
