import './style.css'
import { authAPI } from './services/api.js'
import { Dashboard } from './components/Dashboard.js'
const app = document.querySelector('#app')

function showLogin() {

    app.innerHTML = `
        <h1>Mini ERP</h1>

        <div>
            <h2>Iniciar sesión</h2>

            <input
                type="email"
                id="email"
                placeholder="Email"
            >

            <input
                type="password"
                id="password"
                placeholder="Contraseña"
            >

            <button id="login">
                Iniciar sesión
            </button>

            <p id="mensaje"></p>
        </div>
    `

    const boton = document.querySelector('#login')

    boton.addEventListener('click', async () => {

        const email = document.querySelector('#email').value
        const password = document.querySelector('#password').value
        const mensaje = document.querySelector('#mensaje')

        try {

            mensaje.textContent = 'Iniciando sesión...'

            const data = await authAPI.login(email, password)

            console.log('RESPUESTA LOGIN:', data)

            // Ajustaremos esto cuando sepamos exactamente
            // cómo devuelve el token la API
            const token =
                data.token ||
                data.access ||
                data.access_token

            if (!token) {
                mensaje.textContent = 'Login correcto, pero no se encontró token'
                return
            }

            localStorage.setItem('token', token)

            if (data.user) {
                localStorage.setItem(
                    'user',
                    JSON.stringify(data.user)
                )
            }

            showDashboard()

        } catch (error) {

            console.error('ERROR LOGIN:', error)

            if (error.response) {

                mensaje.textContent =
                    `Error ${error.response.status}`

            } else {

                mensaje.textContent =
                    'No se pudo conectar con el servidor'
            }
        }
    })
}

function showDashboard() {

    const dashboard = new Dashboard(app)

    dashboard.render()
}

function init() {

    const token = localStorage.getItem('token')

    if (token) {

        showDashboard()

    } else {

        showLogin()
    }
}

init()