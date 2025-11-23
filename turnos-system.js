class TurnosSystem {
    constructor() {
        this.fechaInicio = new Date(2000, 0, 14);
        this.cicloRotacion = 24;
        
        this.Turno = {
            MANANA: { 
                horario: "6:00-14:30", 
                nombre: "Mañana", 
                abrev: "M"
            },
            TARDE: { 
                horario: "14:30-22:30", 
                nombre: "Tarde", 
                abrev: "T"
            },
            NOCHE: { 
                horario: "22:30-6:00", 
                nombre: "Noche", 
                abrev: "N"
            },
            LIBRE: { 
                horario: "Libre", 
                nombre: "Libre", 
                abrev: "-"
            }
        };

        this.Grupo = {
            A: { 
                grupo: "A", 
                integrantes: "Juan Cachope - Tiago Santana", 
                clase: "grupo-A",
                color: "#e3f2fd"
            },
            B: { 
                grupo: "B", 
                integrantes: "Alvaro Aguilar - Arnaldo Larroza", 
                clase: "grupo-B",
                color: "#e8f5e9"
            },
            C: { 
                grupo: "C", 
                integrantes: "Lisandro Centurion - Abel Salinas", 
                clase: "grupo-C",
                color: "#fff3e0"
            },
            D: { 
                grupo: "D", 
                integrantes: "Miguel Gonzalez - Patricio Fernandez", 
                clase: "grupo-D",
                color: "#fce4ec"
            }
        };

        this.patronTurnos = this.generarPatronTurnos();
        this.inicializarInterfaz();
    }

    generarPatronTurnos() {
        const patron = {};
        
        const secuencias = {
            'A': [this.Turno.NOCHE, this.Turno.NOCHE, this.Turno.NOCHE, this.Turno.NOCHE, 
                  this.Turno.NOCHE, this.Turno.NOCHE, this.Turno.LIBRE, this.Turno.LIBRE,
                  this.Turno.TARDE, this.Turno.TARDE, this.Turno.TARDE, this.Turno.TARDE,
                  this.Turno.TARDE, this.Turno.TARDE, this.Turno.LIBRE, this.Turno.LIBRE,
                  this.Turno.MANANA, this.Turno.MANANA, this.Turno.MANANA, this.Turno.MANANA,
                  this.Turno.MANANA, this.Turno.MANANA, this.Turno.LIBRE, this.Turno.LIBRE],
            
            'B': [this.Turno.LIBRE, this.Turno.LIBRE, this.Turno.TARDE, this.Turno.TARDE,
                  this.Turno.TARDE, this.Turno.TARDE, this.Turno.TARDE, this.Turno.TARDE,
                  this.Turno.LIBRE, this.Turno.LIBRE, this.Turno.MANANA, this.Turno.MANANA,
                  this.Turno.MANANA, this.Turno.MANANA, this.Turno.MANANA, this.Turno.MANANA,
                  this.Turno.LIBRE, this.Turno.LIBRE, this.Turno.NOCHE, this.Turno.NOCHE,
                  this.Turno.NOCHE, this.Turno.NOCHE, this.Turno.NOCHE, this.Turno.NOCHE],
            
            'C': [this.Turno.TARDE, this.Turno.TARDE, this.Turno.LIBRE, this.Turno.LIBRE,
                  this.Turno.MANANA, this.Turno.MANANA, this.Turno.MANANA, this.Turno.MANANA,
                  this.Turno.MANANA, this.Turno.MANANA, this.Turno.LIBRE, this.Turno.LIBRE,
                  this.Turno.NOCHE, this.Turno.NOCHE, this.Turno.NOCHE, this.Turno.NOCHE,
                  this.Turno.NOCHE, this.Turno.NOCHE, this.Turno.LIBRE, this.Turno.LIBRE,
                  this.Turno.TARDE, this.Turno.TARDE, this.Turno.TARDE, this.Turno.TARDE],
            
            'D': [this.Turno.MANANA, this.Turno.MANANA, this.Turno.MANANA, this.Turno.MANANA,
                  this.Turno.LIBRE, this.Turno.LIBRE, this.Turno.NOCHE, this.Turno.NOCHE,
                  this.Turno.NOCHE, this.Turno.NOCHE, this.Turno.NOCHE, this.Turno.NOCHE,
                  this.Turno.LIBRE, this.Turno.LIBRE, this.Turno.TARDE, this.Turno.TARDE,
                  this.Turno.TARDE, this.Turno.TARDE, this.Turno.TARDE, this.Turno.TARDE,
                  this.Turno.LIBRE, this.Turno.LIBRE, this.Turno.MANANA, this.Turno.MANANA]
        };

        for (let dia = 0; dia < this.cicloRotacion; dia++) {
            patron[dia] = {
                'A': secuencias['A'][dia],
                'B': secuencias['B'][dia],
                'C': secuencias['C'][dia],
                'D': secuencias['D'][dia]
            };
        }

        return patron;
    }

    calcularDiasDesdeInicio(fecha) {
        const unDia = 24 * 60 * 60 * 1000;
        const diferencia = fecha.getTime() - this.fechaInicio.getTime();
        return Math.floor(diferencia / unDia);
    }

    calcularTurno(grupo, fecha) {
        const diasDesdeInicio = this.calcularDiasDesdeInicio(fecha);
        const diaCiclo = ((diasDesdeInicio % this.cicloRotacion) + this.cicloRotacion) % this.cicloRotacion;
        return this.patronTurnos[diaCiclo][grupo];
    }

    obtenerDiasEnMes(mes, anio) {
        return new Date(anio, mes, 0).getDate();
    }

    obtenerNombreMes(mes) {
        const meses = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];
        return meses[mes - 1];
    }

    obtenerGrupoPorTurno(fecha, tipoTurno) {
        for (const grupoKey of Object.keys(this.Grupo)) {
            const turno = this.calcularTurno(grupoKey, fecha);
            if (turno.nombre === this.Turno[tipoTurno].nombre) {
                return grupoKey;
            }
        }
        return null;
    }

    generarTablaConsolidada(mes, anio) {
        const diasEnMes = this.obtenerDiasEnMes(mes, anio);
        const hoy = new Date();
        
        let tablaHTML = `
            <table class="table table-bordered tabla-turnos">
            <thead class="header-fijo">
                <tr>
                    <th style="width: 120px">Turno / Día</th>
        `;

        // Encabezado de días
        for (let dia = 1; dia <= diasEnMes; dia++) {
            const esHoy = dia === hoy.getDate() && mes === hoy.getMonth() + 1 && anio === hoy.getFullYear();
            const claseDia = esHoy ? 'dia-actual' : '';
            const fecha = new Date(anio, mes - 1, dia);
            const diaSemana = fecha.toLocaleDateString('es-ES', { weekday: 'short' });
            
            tablaHTML += `<th class="${claseDia}">
                <div>${dia}</div>
                <small class="text-muted">${diaSemana}</small>
            </th>`;
        }
        tablaHTML += `</tr></thead><tbody>`;

        // Definición de las 5 filas de turnos
        const filasTurnos = [
            { tipo: 'MANANA', label: '🌅 Mañana 6:00-14:30' },
            { tipo: 'TARDE', label: '🌇 Tarde 14:30-22:30' },
            { tipo: 'NOCHE', label: '🌙 Noche 22:30-6:00' },
            { tipo: 'LIBRE', label: '✅ Libre' },
            { tipo: 'RESUMEN', label: '📊 Grupo del Día' }
        ];

        let contadores = {
            'A': { MANANA: 0, TARDE: 0, NOCHE: 0, LIBRE: 0 },
            'B': { MANANA: 0, TARDE: 0, NOCHE: 0, LIBRE: 0 },
            'C': { MANANA: 0, TARDE: 0, NOCHE: 0, LIBRE: 0 },
            'D': { MANANA: 0, TARDE: 0, NOCHE: 0, LIBRE: 0 }
        };

        // Generar las 5 filas
        filasTurnos.forEach(fila => {
            tablaHTML += `<tr class="fila-turno">`;
            tablaHTML += `<td class="fw-bold">${fila.label}</td>`;
            
            for (let dia = 1; dia <= diasEnMes; dia++) {
                const fecha = new Date(anio, mes - 1, dia);
                const esHoy = dia === hoy.getDate() && mes === hoy.getMonth() + 1 && anio === hoy.getFullYear();
                const claseCelda = esHoy ? 'dia-actual' : '';
                
                if (fila.tipo === 'RESUMEN') {
                    // Fila 5: Resumen - muestra el grupo principal del día
                    const gruposDelDia = [];
                    Object.keys(this.Grupo).forEach(grupoKey => {
                        const turno = this.calcularTurno(grupoKey, fecha);
                        if (turno.nombre !== this.Turno.LIBRE.nombre) {
                            gruposDelDia.push(grupoKey);
                        }
                    });
                    tablaHTML += `<td class="${claseCelda}"><small>${gruposDelDia.join(',')}</small></td>`;
                } else {
                    // Filas 1-4: Turnos específicos - cada celda se colorea según el GRUPO
                    const grupo = this.obtenerGrupoPorTurno(fecha, fila.tipo);
                    
                    if (grupo) {
                        const claseGrupo = this.Grupo[grupo].clase;
                        tablaHTML += `<td class="${claseGrupo} ${claseCelda}">${grupo}</td>`;
                        contadores[grupo][fila.tipo]++;
                    } else {
                        tablaHTML += `<td class="grupo-libre ${claseCelda}">-</td>`;
                    }
                }
            }
            tablaHTML += `</tr>`;
        });

        tablaHTML += `</tbody></table>`;

        // Actualizar contadores
        this.actualizarContadores(contadores);

        return tablaHTML;
    }

    generarVistaAnual(anio) {
        let vistaHTML = `<div class="vista-anual">`;
        
        for (let mes = 1; mes <= 12; mes++) {
            vistaHTML += `
                <div class="card mes-anual">
                    <div class="card-header">
                        <h5 class="mb-0">${this.obtenerNombreMes(mes)} ${anio}</h5>
                    </div>
                    <div class="card-body p-0">
                        ${this.generarTablaConsolidada(mes, anio)}
                    </div>
                </div>
            `;
        }
        
        vistaHTML += `</div>`;
        return vistaHTML;
    }

    actualizarContadores(contadores) {
        let infoHTML = '';
        Object.keys(contadores).forEach(grupo => {
            const counts = contadores[grupo];
            infoHTML += `G${grupo}: M${counts.MANANA} T${counts.TARDE} N${counts.NOCHE} L${counts.LIBRE} | `;
        });
        document.getElementById('contadorInfo').textContent = infoHTML.slice(0, -3);
    }

    inicializarInterfaz() {
        // Llenar selector de años (2020-2030)
        const anioSelect = document.getElementById('anioSeleccionado');
        const anioActual = new Date().getFullYear();
        for (let anio = 2020; anio <= 2030; anio++) {
            const option = document.createElement('option');
            option.value = anio;
            option.textContent = anio;
            option.selected = anio === anioActual;
            anioSelect.appendChild(option);
        }

        // Establecer mes actual
        const mesActual = new Date().getMonth() + 1;
        document.getElementById('mesSeleccionado').value = mesActual;

        // Generar tabla inicial
        this.generarTablaMesActual();
    }

    generarTablaMesActual() {
        const vista = document.getElementById('vistaSeleccionada').value;
        const anio = parseInt(document.getElementById('anioSeleccionado').value);
        
        if (vista === 'mes') {
            const mes = parseInt(document.getElementById('mesSeleccionado').value);
            const tablaHTML = this.generarTablaConsolidada(mes, anio);
            document.getElementById('tablaTurnosContainer').innerHTML = tablaHTML;
            
            // Actualizar título
            const nombreMes = this.obtenerNombreMes(mes);
            document.getElementById('tituloMes').innerHTML = `<i class="fas fa-calendar me-2"></i>Rotación de Turnos - ${nombreMes} ${anio}`;
        } else {
            const vistaHTML = this.generarVistaAnual(anio);
            document.getElementById('tablaTurnosContainer').innerHTML = vistaHTML;
            document.getElementById('tituloMes').innerHTML = `<i class="fas fa-calendar-alt me-2"></i>Vista Anual - ${anio}`;
            document.getElementById('contadorInfo').textContent = '';
        }
    }
}

// Instancia global del sistema
const turnosSystem = new TurnosSystem();

// Funciones globales
function generarTabla() {
    turnosSystem.generarTablaMesActual();
}

function cambiarVista() {
    const vista = document.getElementById('vistaSeleccionada').value;
    const mesSelectorContainer = document.getElementById('mesSelectorContainer');
    
    if (vista === 'mes') {
        mesSelectorContainer.style.display = 'block';
    } else {
        mesSelectorContainer.style.display = 'none';
    }
    
    generarTabla();
}

//function imprimirTabla() {
    //window.print();
//}

function imprimirTabla2() {
    // Forzar estilos de impresión antes de imprimir
    const style = document.createElement('style');
    style.innerHTML = `
        @media print {
            .grupo-A { background-color: #e3f2fd !important; }
            .grupo-B { background-color: #e8f5e9 !important; }
            .grupo-C { background-color: #fff3e0 !important; }
            .grupo-D { background-color: #fce4ec !important; }
            .grupo-libre { background-color: #f5f5f5 !important; }
            .dia-actual { background-color: #fff3cd !important; border: 2px solid #ffc107 !important; }
            .grupo-A-card { background-color: #e3f2fd !important; border-left: 4px solid #1976d2 !important; }
            .grupo-B-card { background-color: #e8f5e9 !important; border-left: 4px solid #388e3c !important; }
            .grupo-C-card { background-color: #fff3e0 !important; border-left: 4px solid #f57c00 !important; }
            .grupo-D-card { background-color: #fce4ec !important; border-left: 4px solid #c2185b !important; }
            * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
    `;
    document.head.appendChild(style);
    
    window.print();
    
    // Remover el estilo después de imprimir
    setTimeout(() => {
        document.head.removeChild(style);
    }, 100);
}

function imprimirTabla() {
    // Detectar el tipo de vista
    const esVistaAnual = document.querySelector('.vista-anual') !== null;
    const esVistaMensual = document.querySelector('.vista-mensual') !== null || 
                          document.querySelector('.calendario-mensual') !== null;

    if (esVistaAnual) {
        imprimirVistaAnualUnaHoja();
    } else if (esVistaMensual) {
        imprimirVistaMensual();
    } else {
        // Vista por defecto (mensual)
        window.print();
    }
}

function imprimirVistaMensual() {
    // Forzar estilos de impresión para vista mensual (horizontal)
    const style = document.createElement('style');
    style.innerHTML = `
        @media print {
            /* Configuración para vista mensual horizontal */
            @page {
                size: landscape;
                margin: 0.5cm;
            }
            
            .grupo-A { background-color: #e3f2fd !important; }
            .grupo-B { background-color: #e8f5e9 !important; }
            .grupo-C { background-color: #fff3e0 !important; }
            .grupo-D { background-color: #fce4ec !important; }
            .grupo-libre { background-color: #f5f5f5 !important; }
            .dia-actual { background-color: #fff3cd !important; border: 2px solid #ffc107 !important; }
			
			
			
            * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
            
            body {
                transform: scale(0.95);
                transform-origin: top left;
                width: 100vw;
            }
        }
    `;
    document.head.appendChild(style);
	
	 
    
    window.print();
    
    setTimeout(() => {
		
        document.head.removeChild(style);
    }, 100);
}

function imprimirVistaAnualUnaHoja() {
    // Crear estilos específicos para vista anual con márgenes correctos
    const style = document.createElement('style');
    style.innerHTML = `
        @media print {
            /* Configuración base SIN márgenes */
            body, html {
                margin: 0 !important;
                padding: 0 !important;
                width: 100% !important;
                height: 100% !important;
                background: white !important;
                font-family: Arial, sans-serif !important;
                overflow: hidden !important;
            }
            
            /* Ocultar elementos no deseados */
            .no-imprimir, button, .btn, nav, header, footer {
                display: none !important;
            }
            
            /* Contenedor principal - OCUPA TODA LA HOJA con márgenes incluidos */
            .contenedor-anual-vertical {
                display: flex !important;
                flex-direction: column !important;
                width: 100% !important;
                height: 100% !important;
                padding: 0 !important;
                box-sizing: border-box !important;
                gap: 1px !important;
                margin: 0 !important;
            }
            
            /* Cada mes - ocupa espacio proporcional */
            .mes-compacto-anual {
                width: 100% !important;
                flex: 1 !important;
                border: 1px solid #ccc !important;
                background: white !important;
                overflow: hidden !important;
                page-break-inside: avoid !important;
                font-size: 7px !important;
                min-height: 0 !important;
                margin: 0 !important;
            }
            
            /* Header del mes compacto */
            .mes-header-anual {
                background: #f8f9fa !important;
                padding: 1px !important;
                text-align: center !important;
                font-size: 7px !important;
                font-weight: bold !important;
                border-bottom: 1px solid #dee2e6 !important;
                color: #333 !important;
                height: 14px !important;
            }
            
            /* Contenedor principal del grid */
            .grid-container-anual {
                display: grid !important;
                grid-template-columns: 65px auto !important;
                width: 100% !important;
                height: calc(100% - 14px) !important;
                margin: 0 !important;
                padding: 0 !important;
            }
            
            /* Columna de turnos */
            .columna-turnos {
                display: grid !important;
                grid-template-rows: repeat(5, 1fr) !important;
                gap: 0.5px !important;
            }
            
            /* Celdas de la columna de turnos */
            .celda-turno-header {
                background: #e9ecef !important;
                border: 1px solid #dee2e6 !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                font-size: 6px !important;
                font-weight: bold !important;
                padding: 1px !important;
                text-align: center !important;
                word-break: break-word !important;
                line-height: 1 !important;
            }
            
            /* Grid de días - que use TODO el ancho disponible */
            .grid-dias-container {
                display: grid !important;
                grid-template-rows: repeat(5, 1fr) !important;
                grid-auto-columns: minmax(20px, 1fr) !important;
                grid-auto-flow: column !important;
                gap: 0.5px !important;
                overflow: hidden !important;
                height: 100% !important;
                width: 100% !important;
                margin: 0 !important;
                padding: 0 !important;
            }
            
            /* Celdas de días */
            .celda-dia-header {
                background: #1A2733 !important;
                border: 0.1px solid #1A2733 !important;
                display: flex !important;
                flex-direction: column !important;
                align-items: center !important;
                justify-content: center !important;
                font-weight: bold !important;
                padding: 0.5px !important;
                min-width: 20px !important;
				color: white !important;
            }
            
            .numero-dia {
                font-size: 7px !important;
                line-height: 1 !important;
                font-weight: bold !important;
            }
            
            .letra-dia {
                font-size: 5px !important;
                line-height: 1 !important;
                color: white !important;
            }
            
            /* Celdas de turnos */
            .celda-turno-dia {
                border: 0.1px solid #1A2733!important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                font-size: 7px !important;
                font-weight: bold !important;
                min-width: 20px !important;
				
            }
            
            /* Estilos de grupos */
            .grupo-A { background-color: #e3f2fd !important; }
            .grupo-B { background-color: #e8f5e9 !important; }
            .grupo-C { background-color: #fff3e0 !important; }
            .grupo-D { background-color: #fce4ec !important; }
            .grupo-libre { background-color: #f5f5f5 !important; }
            
            .dia-actual .celda-dia-header { 
                background-color: #fff3cd !important; 
                border: 1px solid #ffc107 !important; 
            }
            
            /* SOLO MÁRGENES EN @page - 1.5cm desde el borde de la hoja */
            @page {
                size: portrait;
                margin: 1.5cm !important;
            }
            
            * { 
                -webkit-print-color-adjust: exact !important; 
                print-color-adjust: exact !important; 
                box-sizing: border-box !important;
            }

            /* Escalado mínimo para ajuste perfecto */
            body {
                transform: scale(0.98);
                transform-origin: top left;
                width: 102%;
            }
        }

        /* Estilos para previsualización en pantalla */
        @media screen {
            .contenedor-anual-vertical {
                border: 1px solid #ddd;
                background: #f8f9fa;
                min-height: 100vh;
                margin: 20px;
            }
            
            .mes-compacto-anual {
                box-shadow: 0 1px 2px rgba(0,0,0,0.1);
            }
        }
    `;
    document.head.appendChild(style);

    // Crear contenedor para la impresión anual
    const contenedorImpresion = document.createElement('div');
    contenedorImpresion.className = 'contenedor-anual-vertical';
    
    // Obtener año actual
	const añoActual = parseInt(document.getElementById('anioSeleccionado').value);
    //const añoActual = new Date().getFullYear();
    const hoy = new Date();
    
    // Nombres de días abreviados
    const diasSemana = ['D', 'L', 'M', 'X', 'J', 'V', 'S'];
    
    // Turnos definidos
    const turnos = [
        { nombre: "Turno/Día", tipo: "header" },
        { nombre: "6:00-14:30", tipo: "turno" },
        { nombre: "14:30-22:30", tipo: "turno" },
        { nombre: "22:30-6:00", tipo: "turno" },
        { nombre: "Libre", tipo: "turno" }
    ];
    
    // Generar los 12 meses ultra compactos
    for (let mes = 0; mes < 12; mes++) {
        const mesDiv = document.createElement('div');
        mesDiv.className = 'mes-compacto-anual';
        
        // Header del mes
        const headerMes = document.createElement('div');
        headerMes.className = 'mes-header-anual';
        headerMes.textContent = new Date(añoActual, mes).toLocaleDateString('es-ES', {
            month: 'short',
            year: 'numeric'
        });
        mesDiv.appendChild(headerMes);
        
        // Contenedor principal del grid
        const gridContainer = document.createElement('div');
        gridContainer.className = 'grid-container-anual';
        
        // COLUMNA DE TURNOS (IZQUIERDA)
        const columnaTurnos = document.createElement('div');
        columnaTurnos.className = 'columna-turnos';
        
        turnos.forEach(turno => {
            const celdaTurnoHeader = document.createElement('div');
            celdaTurnoHeader.className = 'celda-turno-header';
            celdaTurnoHeader.textContent = turno.nombre;
            columnaTurnos.appendChild(celdaTurnoHeader);
        });
        
        gridContainer.appendChild(columnaTurnos);
        
        // GRID DE DÍAS (DERECHA)
        const gridDias = document.createElement('div');
        gridDias.className = 'grid-dias-container';
        
        // Obtener información del mes
        const primerDia = new Date(añoActual, mes, 1);
        const ultimoDia = new Date(añoActual, mes + 1, 0);
        const diasEnMes = ultimoDia.getDate();
        
        // Generar celdas para cada día del mes
        for (let dia = 1; dia <= diasEnMes; dia++) {
            const fecha = new Date(añoActual, mes, dia);
            const diaSemana = fecha.getDay();
            const letraDia = diasSemana[diaSemana];
            
            // Fila 1: Header del día (número y letra)
            const celdaDiaHeader = document.createElement('div');
            celdaDiaHeader.className = 'celda-dia-header';
            
            // Marcar día actual
            if (hoy.getFullYear() === añoActual && 
                hoy.getMonth() === mes && 
                hoy.getDate() === dia) {
                celdaDiaHeader.classList.add('dia-actual');
            }
            
            const numeroDiaElem = document.createElement('div');
            numeroDiaElem.className = 'numero-dia';
            numeroDiaElem.textContent = dia;
            
            const letraDiaElem = document.createElement('div');
            letraDiaElem.className = 'letra-dia';
            letraDiaElem.textContent = letraDia;
            
            celdaDiaHeader.appendChild(numeroDiaElem);
            celdaDiaHeader.appendChild(letraDiaElem);
            gridDias.appendChild(celdaDiaHeader);
            
            // Filas 2-5: Turnos para este día
            const infoTurnos = [
                { tipo: '6:00-14:30', fila: 2 },
                { tipo: '14:30-22:30', fila: 3 },
                { tipo: '22:30-6:00', fila: 4 },
                { tipo: 'Libre', fila: 5 }
            ];
            
            infoTurnos.forEach(turnoInfo => {
                const celdaTurno = document.createElement('div');
                celdaTurno.className = 'celda-turno-dia';
                
                // Obtener grupo para este día y turno
				//const grupoInfo = obtenerGrupoPorTurno(fecha, tipoTurno);
                const grupoInfo = obtenerGrupoTurno(añoActual, mes, dia, turnoInfo.tipo);
                if (grupoInfo.grupo) {
                    celdaTurno.textContent = grupoInfo.grupo;
                    celdaTurno.classList.add(`grupo-${grupoInfo.grupo}`);
                }
                
                gridDias.appendChild(celdaTurno);
            });
        }
        
        gridContainer.appendChild(gridDias);
        mesDiv.appendChild(gridContainer);
        contenedorImpresion.appendChild(mesDiv);
    }
	
    
    // Reemplazar contenido temporalmente para imprimir
    const contenidoOriginal = document.body.innerHTML;
	
    document.body.innerHTML = '';
    document.body.appendChild(contenedorImpresion);
	
	 // Etiqueta como bloque normal al final
    const etiquetaHTML = `
        <div style="width: 100%; text-align: right; color: #000; padding: 0px 0; font-family: Arial, sans-serif; font-size: 12px; border-top: 1px solid #eee; margin-top: 2px;">
            <p class="mb-0">Ing. Miguel J. Gonzalez M.</p>
        </div>
    `;
    
    contenedorImpresion.insertAdjacentHTML('beforeend', etiquetaHTML);
	
	
    
    window.print();
	
	
    
    // Restaurar contenido original
    setTimeout(() => {
		//document.body.innerHTML = '';
        //document.body.innerHTML = contenidoOriginal;
		location.reload();
        
    }, 100);
}

// Función para obtener el grupo según el día y turno
// Función para obtener el grupo según el día y turno - USANDO TU FUNCIÓN EXACTA
// Función para obtener el grupo según el día y turno - USANDO TU FUNCIÓN EXACTA
// Función para obtener el grupo según el día y turno - VERSIÓN AUTOCONTENIDA
// Función para obtener el grupo según el día y turno - CON TU SECUENCIA EXACTA
function obtenerGrupoTurno(año, mes, dia, turno) {
    const fecha = new Date(año, mes, dia);
    
    // Mapeo de turnos de impresión a tus tipos de turno
    const mapeoTurnos = {
        '6:00-14:30': 'MANANA',
        '14:30-22:30': 'TARDE', 
        '22:30-6:00': 'NOCHE',
        'Libre': 'LIBRE'
    };
    
    const tipoTurno = mapeoTurnos[turno];
    if (!tipoTurno) return { grupo: '', tipo: '' };
    
    // Definir Turno como lo tienes en tu código
    const Turno = {
        'MANANA': { nombre: 'Mañana 6:00-14:30' },
        'TARDE': { nombre: 'Tarde 14:30-22:30' },
        'NOCHE': { nombre: 'Noche 22:30-6:00' },
        'LIBRE': { nombre: 'Libre' }
    };
    
    // TU SECUENCIA EXACTA
    const secuencias = {
        'A': [Turno.NOCHE, Turno.NOCHE, Turno.NOCHE, Turno.NOCHE, 
              Turno.NOCHE, Turno.NOCHE, Turno.LIBRE, Turno.LIBRE,
              Turno.TARDE, Turno.TARDE, Turno.TARDE, Turno.TARDE,
              Turno.TARDE, Turno.TARDE, Turno.LIBRE, Turno.LIBRE,
              Turno.MANANA, Turno.MANANA, Turno.MANANA, Turno.MANANA,
              Turno.MANANA, Turno.MANANA, Turno.LIBRE, Turno.LIBRE],
        
        'B': [Turno.LIBRE, Turno.LIBRE, Turno.TARDE, Turno.TARDE,
              Turno.TARDE, Turno.TARDE, Turno.TARDE, Turno.TARDE,
              Turno.LIBRE, Turno.LIBRE, Turno.MANANA, Turno.MANANA,
              Turno.MANANA, Turno.MANANA, Turno.MANANA, Turno.MANANA,
              Turno.LIBRE, Turno.LIBRE, Turno.NOCHE, Turno.NOCHE,
              Turno.NOCHE, Turno.NOCHE, Turno.NOCHE, Turno.NOCHE],
        
        'C': [Turno.TARDE, Turno.TARDE, Turno.LIBRE, Turno.LIBRE,
              Turno.MANANA, Turno.MANANA, Turno.MANANA, Turno.MANANA,
              Turno.MANANA, Turno.MANANA, Turno.LIBRE, Turno.LIBRE,
              Turno.NOCHE, Turno.NOCHE, Turno.NOCHE, Turno.NOCHE,
              Turno.NOCHE, Turno.NOCHE, Turno.LIBRE, Turno.LIBRE,
              Turno.TARDE, Turno.TARDE, Turno.TARDE, Turno.TARDE],
        
        'D': [Turno.MANANA, Turno.MANANA, Turno.MANANA, Turno.MANANA,
              Turno.LIBRE, Turno.LIBRE, Turno.NOCHE, Turno.NOCHE,
              Turno.NOCHE, Turno.NOCHE, Turno.NOCHE, Turno.NOCHE,
              Turno.LIBRE, Turno.LIBRE, Turno.TARDE, Turno.TARDE,
              Turno.TARDE, Turno.TARDE, Turno.TARDE, Turno.TARDE,
              Turno.LIBRE, Turno.LIBRE, Turno.MANANA, Turno.MANANA]
    };

    // Generar patrón de turnos
    const patronTurnos = {};
    for (let diaCiclo = 0; diaCiclo < 24; diaCiclo++) {
        patronTurnos[diaCiclo] = {
            'A': secuencias['A'][diaCiclo],
            'B': secuencias['B'][diaCiclo],
            'C': secuencias['C'][diaCiclo],
            'D': secuencias['D'][diaCiclo]
        };
    }

    // Calcular día en el ciclo
    const diasDesdeInicio = calcularDiasDesdeInicio(fecha);
    const diaCiclo = ((diasDesdeInicio % 24) + 24) % 24;

    // TU FUNCIÓN EXACTA obtenerGrupoPorTurno
    for (const grupoKey of ['A', 'B', 'C', 'D']) {
        const turnoCalculado = patronTurnos[diaCiclo][grupoKey];
        if (turnoCalculado.nombre === Turno[tipoTurno].nombre) {
            return { 
                grupo: grupoKey, 
                tipo: tipoTurno === 'LIBRE' ? 'libre' : 'turno' 
            };
        }
    }
    
    return { grupo: '', tipo: '' };
}

// Función auxiliar para calcular días desde inicio
function calcularDiasDesdeInicio(fecha) {
    // AJUSTA ESTA FECHA A TU FECHA DE INICIO REAL
	//2000, 0, 14
    const fechaInicio = new Date('2000-01-14');
    const unDia = 24 * 60 * 60 * 1000;
    const diferencia = fecha.getTime() - fechaInicio.getTime();
    return Math.floor(diferencia / unDia);
}

// NUEVA FUNCIÓN PARA EXPORTAR A EXCEL
/*function exportarAExcel() {
    // Obtener la tabla
    const tabla = document.querySelector('table'); // Ajusta el selector según tu tabla
    
    if (!tabla) {
        alert('No se encontró la tabla para exportar');
        return;
    }

    // Convertir tabla a worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.table_to_sheet(tabla);
    
    // Agregar el worksheet al workbook
    XLSX.utils.book_append_sheet(wb, ws, "Turnos");
    
    // Exportar a Excel
    XLSX.writeFile(wb, "turnos.xlsx");
}*/

function exportarAExcel() {
    const tabla = document.querySelector('table');
    
    if (!tabla) {
        alert('No se encontró la tabla para exportar');
        return;
    }

    // Crear una copia de la tabla con estilos inline para mejor compatibilidad
    const tablaClon = tabla.cloneNode(true);
    
    // Aplicar estilos inline basados en las clases
    const celdas = tablaClon.querySelectorAll('td, th');
    celdas.forEach(celda => {
        if (celda.classList.contains('grupo-A')) {
            celda.style.backgroundColor = '#e3f2fd';
        } else if (celda.classList.contains('grupo-B')) {
            celda.style.backgroundColor = '#e8f5e9';
        } else if (celda.classList.contains('grupo-C')) {
            celda.style.backgroundColor = '#fff3e0';
        } else if (celda.classList.contains('grupo-D')) {
            celda.style.backgroundColor = '#fce4ec';
        } else if (celda.classList.contains('grupo-libre')) {
            celda.style.backgroundColor = '#f5f5f5';
        } else if (celda.classList.contains('dia-actual')) {
            celda.style.backgroundColor = '#fff3cd';
            celda.style.border = '2px solid #ffc107';
        }
    });

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.table_to_sheet(tablaClon, { cellStyles: true });
    
    XLSX.utils.book_append_sheet(wb, ws, "Turnos");
    XLSX.writeFile(wb, "turnos.xlsx");
}



function toggleModoOscuro() {
    document.body.classList.toggle('dark-mode');
}

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    // Generar tabla del mes actual al cargar
    setTimeout(() => {
        generarTabla();
    }, 100);
});