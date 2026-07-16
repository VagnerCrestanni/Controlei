# Arquitetura do Frontend

O frontend do Controlei utiliza uma arquitetura baseada em componentes.

## Camadas

UI Layer
Component Layer
State Layer
API Layer

### UI Layer

Responsável pela interface visual.

### Component Layer

Componentes reutilizáveis da aplicação.

### State Layer

Gerenciamento de estado da aplicação.

### API Layer

Comunicação com o backend via HTTP.

```mermaid
graph TD
App --> Pages
Pages --> Components
Components --> Services
Services --> API
