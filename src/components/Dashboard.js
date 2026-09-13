import { productsAPI } from '../services/api.js'

export class Dashboard {

    constructor(container) {
        this.container = container
    }

    render() {
        this.container.innerHTML = `
            <div>
                <h1>Mini ERP</h1>

                <h2>Productos</h2>

                <button id="cargarProductos">
                    Cargar productos
                </button>

                <button id="logout">
                    Cerrar sesión
                </button>

                <p id="mensajeProductos"></p>

                <div id="productos"></div>
            </div>
        `

        this.attachEvents()
    }

    attachEvents() {
        document
            .querySelector('#cargarProductos')
            .addEventListener('click', () => {
                this.loadProducts()
            })

        document
            .querySelector('#logout')
            .addEventListener('click', () => {
                this.logout()
            })
    }

    async loadProducts() {
        const mensaje = document.querySelector('#mensajeProductos')
        const contenedor = document.querySelector('#productos')

        try {
            mensaje.textContent = 'Cargando productos...'

            const products = await productsAPI.getAll()

            console.log('PRODUCTOS:', products)

            mensaje.textContent = 'Productos cargados'

            contenedor.innerHTML = `
                <pre>${JSON.stringify(products, null, 2)}</pre>
            `
        } catch (error) {
            console.error('ERROR PRODUCTOS:', error)

            mensaje.textContent =
                'No se pudieron obtener los productos'
        }
    }

    logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('user')

        location.reload()
    }
}