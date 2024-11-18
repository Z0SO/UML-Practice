




### Diagrama:

```plaintext
Creadora -------------------------------> Producto
   |                                          ^
   |                                          |
   |-------> Método Fábrica                   | (Interfaz común)
          ^                                   |
          |-----------------------------------|
      Creador Concreto         Producto Concreto
```

---

## **Pseudocódigo**

### **Clases Base**
```plaintext
// Interfaz común para productos
interface Button {
    render()
    onClick(action)
}

// Clase creadora base
abstract class Dialog {
    abstract createButton(): Button

    method render() {
        Button okButton = createButton()
        okButton.onClick(closeDialog)
        okButton.render()
    }
}
```

### **Clases Concretas**
```plaintext
// Productos concretos
class WindowsButton implements Button {
    render() { /* Renderiza un botón estilo Windows */ }
    onClick(action) { /* Vincula un evento nativo de clic */ }
}

class HTMLButton implements Button {
    render() { /* Devuelve un botón HTML */ }
    onClick(action) { /* Vincula un evento de clic del navegador */ }
}

// Creadores concretos
class WindowsDialog extends Dialog {
    createButton(): Button {
        return new WindowsButton()
    }
}

class WebDialog extends Dialog {
    createButton(): Button {
        return new HTMLButton()
    }
}
```

### **Uso**
```plaintext
class Application {
    Dialog dialog

    method initialize() {
        if (OS == "Windows") dialog = new WindowsDialog()
        else if (OS == "Web") dialog = new WebDialog()
        else throw "Error: Sistema desconocido."
    }

    method main() {
        initialize()
        dialog.render()
    }
}
```

---

## **Aplicabilidad**
### Usa el Factory Method cuando:
1. **No conoces de antemano** los tipos exactos de objetos necesarios en tu código.
2. Quieres proporcionar una forma **extensible** de construir objetos en un **framework**.
3. Deseas **reutilizar objetos existentes** (por ejemplo, usando un cache o pool).

---

---
## **Propósito**
El patrón **Factory Method** es un patrón de diseño **creacional** que:
- Proporciona una **interfaz** para crear objetos en una superclase.
- Permite a las **subclases** decidir qué tipo de objetos crear.

---

## **Problema**
Imagina que estás desarrollando una aplicación de gestión logística que inicialmente solo soporta transporte en **camión**. 

Con el tiempo, necesitas añadir soporte para transporte **marítimo**. Sin embargo:
- El código está altamente **acoplado** a la clase `Camión`.
- Modificarlo para incluir `Barco` implicaría:
  - Cambios extensivos en el código base.
  - Introducir **condicionales** que lo harían poco mantenible.

### Ejemplo:  
Si luego necesitas agregar transporte **aéreo**, tendrías que repetir este proceso, creando un código complejo y difícil de escalar.

#### Estructura (Diagrama de Clases)

---
### Aplicabilidad


#### Codigo (Esto pide GG)

```java

```


---
### Ventajas y Desventajas


## **Ventajas**
- **Desacopla** la creación de objetos de su uso.
- Facilita la **extensibilidad**.
- Mejora la **mantenibilidad** al evitar condicionales complejos.

## **Desventajas**
- Puede incrementar la **complejidad** si necesitas muchas subclases para diferentes tipos de productos.


| **VENTAJAS** | **DESVENTAJAS** |
| ------------ | --------------- |
|              |                 |

---

## **Ejemplo Práctico**
En un sistema de interfaz gráfica:
- Una clase base `Dialog` puede usar un método fábrica `createButton` para instanciar botones.
- Las subclases (`WindowsDialog`, `WebDialog`) deciden el tipo de botón (Windows o HTML).

Este patrón asegura que la lógica del diálogo no dependa de los detalles específicos del botón.
