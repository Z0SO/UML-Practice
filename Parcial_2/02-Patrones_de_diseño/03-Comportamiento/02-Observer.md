Aquí tienes el resumen siguiendo la plantilla, sin hacer una reducción excesiva y procurando mantenerlo claro y estructurado:

---

## Patron: Observer (Observador) - Concepto

El patrón **Observer** es un patrón de diseño de comportamiento que permite establecer un mecanismo de suscripción para notificar a varios objetos cuando ocurre un evento en el objeto que están observando. Es útil cuando un cambio en el estado de un objeto necesita ser reflejado en otros objetos sin acoplarlos fuertemente.

![Patrón de diseño Observer](https://refactoring.guru/images/patterns/content/observer/observer.png)
### Estructura (Diagrama de Clases)

![Estructura del patrón de diseño Observer](https://refactoring.guru/images/patterns/diagrams/observer/structure-indexed.png)

El patrón se compone de las siguientes clases principales:

1. **Notificador** (Subject): Mantiene una lista de suscriptores y gestiona la notificación de eventos a los mismos.
2. **Suscriptor** (Observer): Tiene un método para recibir notificaciones del notificador.
3. **EventManager**: Un componente que gestiona los eventos y la suscripción de suscriptores a los mismos.
4. **Editor**: Una clase concreta que gestiona los archivos y notifica eventos a los suscriptores sobre cambios como abrir o guardar archivos.
5. Normalmente, los suscriptores necesitan cierta información contextual para manejar correctamente la actualización. Por este motivo, a menudo los notificadores pasan cierta información de contexto como argumentos del método de notificación. El notificador puede pasarse a sí mismo como argumento, dejando que los suscriptores extraigan la información necesaria directamente.
6. El **Cliente** crea objetos tipo notificador y suscriptor por separado y después registra a los suscriptores para las actualizaciones del notificado

---

## Problema

En muchos escenarios, como una tienda que quiere notificar a sus clientes sobre la disponibilidad de productos, hay un conflicto entre enviar notificaciones masivas a todos los clientes o hacer que los clientes verifiquen constantemente si un producto está disponible.

![Visita a la tienda vs. envío de spam](https://refactoring.guru/images/patterns/content/observer/observer-comic-1-es.png)

Visita a la tienda vs. envío de spam

Sin una solución adecuada, la tienda podría enviar correos electrónicos a todos los clientes (lo que podría considerarse spam) o los clientes tendrían que hacer visitas innecesarias a la tienda.

---

## Solución

El patrón Observer propone que el **notificador** mantenga una lista de **suscriptores**. Los suscriptores se suscriben o desuscriben a eventos específicos y el notificador les notifica cuando ocurre un evento relevante.

![Mecanismo de suscripción](https://refactoring.guru/images/patterns/diagrams/observer/solution1-es.png)

Un mecanismo de suscripción permite a los objetos individuales suscribirse a notificaciones de eventos.

1. El notificador (por ejemplo, la tienda) mantiene una lista de suscriptores (clientes).
2. Los suscriptores se registran para recibir notificaciones cuando un producto específico esté disponible.
3. Cuando el evento ocurre (por ejemplo, cuando el producto llega a la tienda), el notificador recorre la lista de suscriptores y les notifica a través de un método común.

La clave está en la **interfaz común** entre el notificador y los suscriptores, lo que permite que se comuniquen sin estar fuertemente acoplados.

![Métodos de notificación](https://refactoring.guru/images/patterns/diagrams/observer/solution2-es.png)

El notificador notifica a los suscriptores invocando el método de notificación específico de sus objetos.

### Aplicabilidad

- Utiliza este patrón cuando un objeto (notificador) necesita notificar a varios objetos (suscriptores) sobre cambios en su estado sin que el notificador sepa nada acerca de los suscriptores.
- Es ideal cuando los suscriptores pueden cambiar dinámicamente, ya que permite agregar o eliminar suscriptores en tiempo de ejecución.


## Analogía en el mundo real

![Suscripciones a revistas y periódicos](https://refactoring.guru/images/patterns/content/observer/observer-comic-2-es.png)

Suscripciones a revistas y periódicos.

Si te suscribes a un periódico o una revista, ya no necesitarás ir a la tienda a comprobar si el siguiente número está disponible. En lugar de eso, el notificador envía nuevos números directamente a tu buzón justo después de la publicación, o incluso antes.

El notificador mantiene una lista de suscriptores y sabe qué revistas les interesan. Los suscriptores pueden abandonar la lista en cualquier momento si quieren que el notificador deje de enviarles nuevos números.


---

### Código

```python
# EventManager gestiona las suscripciones y notificaciones.
class EventManager:
    def __init__(self):
        self.listeners = {}  # Diccionario de eventos y suscriptores

    def subscribe(self, eventType, listener):
        if eventType not in self.listeners:
            self.listeners[eventType] = []
        self.listeners[eventType].append(listener)

    def unsubscribe(self, eventType, listener):
        if eventType in self.listeners:
            self.listeners[eventType].remove(listener)

    def notify(self, eventType, data):
        if eventType in self.listeners:
            for listener in self.listeners[eventType]:
                listener.update(data)

# Editor es el notificador que desencadena eventos.
class Editor:
    def __init__(self):
        self.events = EventManager()
        self.file = None

    def openFile(self, path):
        self.file = path
        self.events.notify("open", self.file)

    def saveFile(self):
        if self.file:
            # Simula guardar el archivo.
            self.events.notify("save", self.file)

# Interfaz de los suscriptores.
class EventListener:
    def update(self, filename):
        pass

# Suscriptor concreto para registrar eventos.
class LoggingListener(EventListener):
    def __init__(self, log_filename, message):
        self.log_filename = log_filename
        self.message = message

    def update(self, filename):
        with open(self.log_filename, 'a') as log:
            log.write(self.message.replace('%s', filename) + "\n")

class EmailAlertsListener(EventListener):
    def __init__(self, email, message):
        self.email = email
        self.message = message

    def update(self, filename):
        # Simula enviar un correo.
        print(f"Email sent to {self.email}: {self.message.replace('%s', filename)}")

# Configuración de suscriptores en la aplicación.
class Application:
    def config(self):
        editor = Editor()
        
        logger = LoggingListener("/path/to/log.txt", "Someone has opened the file: %s")
        editor.events.subscribe("open", logger)

        email_alerts = EmailAlertsListener("admin@example.com", "Someone has changed the file: %s")
        editor.events.subscribe("save", email_alerts)

        # Simula operaciones en el editor.
        editor.openFile("document.txt")
        editor.saveFile()

# Crear la aplicación y configurar los suscriptores.
app = Application()
app.config()
```

Este ejemplo muestra cómo se configuran los **notificadores** y **suscriptores** para recibir notificaciones sobre eventos. Los suscriptores se registran para recibir notificaciones sobre eventos específicos como "open" (abrir archivo) y "save" (guardar archivo). Cuando el **Editor** realiza una operación (como abrir o guardar un archivo), notifica a los suscriptores correspondientes.

--- 

### Pros y contras

| **Pros**                                                                                                      | **Contras**                                                                                              |
| ------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| **Principio de abierto/cerrado:** Puedes agregar nuevos suscriptores sin modificar el código del notificador. | Los suscriptores son notificados en un orden aleatorio, lo que puede no ser deseable en todos los casos. |
| **Flexibilidad:** Permite la suscripción y desuscripción dinámica de suscriptores.                            |                                                                                                          |
| **Desacoplamiento:** Los suscriptores pueden funcionar sin depender directamente del notificador.             |                                                                                                          |