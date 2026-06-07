# Manuel App

**Aplicación móvil de comunicación en tiempo real con chat y videollamadas**

Manuel App es una aplicación móvil multiplataforma (iOS y Android) que permite a los usuarios comunicarse mediante:
- 💬 Chat en tiempo real
- 📱 Mensajería instantánea
- 🎥 Videollamadas
- 👥 Gestión de contactos
- 🔐 Autenticación segura

## Características

### Chat en Tiempo Real
- Mensajes instantáneos
- Historial de conversaciones
- Notificaciones en tiempo real
- Soporte para emojis y multimedia

### Videollamadas
- Videollamadas uno a uno
- Audio y video HD
- Tecnología WebRTC
- Soporte para múltiples conexiones

### Perfil de Usuario
- Registro e inicio de sesión
- Gestión de perfil
- Estado de disponibilidad
- Foto de perfil

## Stack Tecnológico

### Frontend
- **Framework**: React Native
- **Lenguaje**: TypeScript
- **Navegación**: React Navigation
- **UI Components**: React Native

### Backend
- **Base de Datos**: Firebase Firestore
- **Autenticación**: Firebase Auth
- **Realtime**: Firebase Realtime Database
- **Mensajería**: Socket.io

### Comunicación
- **Videollamadas**: WebRTC
- **Señalización**: Socket.io
- **STUN Servers**: Google STUN

## Instalación

### Requisitos Previos
- Node.js 16+
- npm o yarn
- Expo CLI
- Android Studio (para Android)
- Xcode (para iOS)

### Pasos

1. **Clonar el repositorio**
```bash
git clone https://github.com/emmanuelvidel-netizen/manuel-app.git
cd manuel-app
```

2. **Instalar dependencias**
```bash
npm install
# o
yarn install
```

3. **Configurar Firebase**
- Crea un proyecto en [Firebase Console](https://console.firebase.google.com)
- Obtén tus credenciales
- Actualiza `src/config/firebase.ts` con tus credenciales

4. **Ejecutar la aplicación**

Para iOS:
```bash
npm run ios
```

Para Android:
```bash
npm run android
```

Para Web:
```bash
npm run web
```

## Estructura del Proyecto

```
manuel-app/
├── src/
│   ├── screens/
│   │   ├── LoginScreen.tsx
│   │   ├── RegisterScreen.tsx
│   │   ├── ChatListScreen.tsx
│   │   ├── ChatScreen.tsx
│   │   ├── VideoCallScreen.tsx
│   │   └── ProfileScreen.tsx
│   ├── services/
│   │   ├── socketService.ts
│   │   └── webrtcService.ts
│   ├── config/
│   │   └── firebase.ts
│   └── utils/
│       └── constants.ts
├── App.tsx
├── app.json
├── package.json
└── README.md
```

## Flujo de Datos

### Autenticación
1. Usuario se registra con email y contraseña
2. Firebase Auth valida y crea el usuario
3. Datos del usuario se guardan en Firestore
4. Usuario puede iniciar sesión

### Chat
1. Usuario selecciona contacto
2. Socket.io establece conexión en tiempo real
3. Mensajes se sincronizar en Firestore
4. Actualizaciones en tiempo real con listeners

### Videollamadas
1. Usuario inicia llamada a contacto
2. WebRTC establece conexión P2P
3. Socket.io maneja la señalización
4. Audio y video fluyen entre dispositivos

## Configuración de Firebase

### Firestore Database Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    match /chats/{chatId}/messages/{messageId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Enviroment Variables

Crea un archivo `.env` en la raíz del proyecto:

```
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
FIREBASE_APP_ID=your_app_id
SOCKET_SERVER_URL=your_socket_server_url
```

## Contribución

Las contribuciones son bienvenidas. Por favor:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## Soporte

Para soporte y preguntas, abre un issue en el repositorio o contacta al mantenedor.

## Roadmap

- [ ] Llamadas de grupo
- [ ] Compartir archivos y imágenes
- [ ] Grabación de videollamadas
- [ ] Filtros y efectos en video
- [ ] Integración con redes sociales
- [ ] Push notifications
- [ ] Encriptación end-to-end
- [ ] Modo oscuro
- [ ] Búsqueda avanzada
- [ ] Reportes de comportamiento inapropiado

## Autores

- **Emmanuel Videl** - Desenvolvedor Principal

## Agradecimientos

- React Native Community
- Firebase Team
- WebRTC Project
- Socket.io Team
