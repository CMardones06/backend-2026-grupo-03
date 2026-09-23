import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class PlantasService {
  private plantas: any[] = [];

  crearPlanta(datos: any) {
    const nuevaPlanta = {
      id:
        this.plantas.length > 0
          ? Math.max(...this.plantas.map((p) => p.id)) + 1
          : 1,
      ...datos,
    };

    this.plantas.push(nuevaPlanta);
    return nuevaPlanta;
  }

  obtenerTodas(
    estadoSalud?: string,
    ordenarPor: string = 'id',
    direccion: string = 'asc',
    pagina: number = 1,
    limite: number = 10,
  ) {
    let resultado = [...this.plantas];

    // 1. Filtrado
    if (estadoSalud) {
      resultado = resultado.filter(
        (planta) => planta.estado_salud === estadoSalud,
      );
    }

    // 2. Ordenamiento
    resultado.sort((a, b) => {
      if (a[ordenarPor] < b[ordenarPor]) return direccion === 'asc' ? -1 : 1;
      if (a[ordenarPor] > b[ordenarPor]) return direccion === 'asc' ? 1 : -1;
      return 0;
    });

    // 3. Paginación
    const total = resultado.length;
    const totalPaginas = Math.ceil(total / limite);
    const startIndex = (pagina - 1) * limite;
    const endIndex = startIndex + limite;

    const datosPaginados = resultado.slice(startIndex, endIndex);

    // 4. Retorno de estructura con metadatos
    return {
      data: datosPaginados,
      meta: {
        total: total,
        pagina: pagina,
        limite: limite,
        total_paginas: totalPaginas,
        filtros: { estado_salud: estadoSalud || null },
        orden: { campo: ordenarPor, direccion },
      },
    };
  }

  obtenerPorId(id: number) {
    const planta = this.plantas.find((p) => Number(p.id) === Number(id));
    if (!planta) {
      throw new NotFoundException(`Planta con ID ${id} no encontrada`);
    }
    return planta;
  }

  actualizar(id: number, datos: any) {
    const index = this.plantas.findIndex((p) => Number(p.id) === Number(id));
    if (index === -1) {
      throw new NotFoundException(`Planta con ID ${id} no encontrada`);
    }

    this.plantas[index] = { ...this.plantas[index], ...datos };
    return this.plantas[index];
  }

  eliminar(id: number) {
    const index = this.plantas.findIndex((p) => Number(p.id) === Number(id));
    if (index === -1) {
      throw new NotFoundException(`Planta con ID ${id} no encontrada`);
    }

    this.plantas.splice(index, 1);
  }
}