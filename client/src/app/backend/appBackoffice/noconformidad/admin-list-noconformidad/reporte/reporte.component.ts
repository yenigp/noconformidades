import { Component, OnInit, Input } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';
import { NoConformidadService } from '../../../../services/noconformidad/noconformidad.service';
import { BreadcrumbService } from '../../../../common-layout-components/breadcrumd/service/breadcrumb.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss'],
})
export class ReporteComponent implements OnInit {
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = ['Incidencia', 'Quejas', 'Reclamaciones', 'Auditoría', 'Otras'];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public allNoConformidad: any[] = [];
  public Incidencia = 0;
  public Quejas = 0;
  public Reclamaciones = 0;
  public Auditoria = 0;
  public Otras = 0;
  public chart: any = null;
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartDataSets[] = [];

  nombreMeses = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  constructor(private noconformidadService: NoConformidadService, private breadcrumbService: BreadcrumbService) {}

  ngOnInit() {
    this.breadcrumbService.clearBreadcrumd();
    this.breadcrumbService.setBreadcrumd('NoConformidad', false, '/backend/noconformidad');
    this.breadcrumbService.setBreadcrumd('Reportes', true);
    this.noconformidadService.getAllNoConformidad().subscribe((data) => {
      this.allNoConformidad = data.data;
      this.allNoConformidad.forEach((m) => {
        if (m.Tipo.codigo == 'RI') {
          this.Incidencia++;
        } else {
          if (m.Tipo.codigo == 'QR') {
            if (m.QuejasReclamacione.tipo == 'queja') {
              this.Quejas++;
            } else {
              if (m.QuejasReclamacione.tipo == 'reclamación') {
                this.Reclamaciones++;
              }
            }
          } else {
            if (m.Tipo.codigo == 'AI') {
              this.Auditoria++;
            } else {
              this.Otras++;
            }
          }
        }
      });
      this.pieChartData = [this.Incidencia, this.Quejas, this.Reclamaciones, this.Auditoria, this.Otras];
    });
    this.pieChartData = [this.Incidencia, this.Quejas, this.Reclamaciones, this.Auditoria, this.Otras];

    /*****OTRO GRÁFICO******/
    this.noconformidadService.getAllNoConformidad().subscribe((data) => {
      this.allNoConformidad = data.data;
      // Ordenar los datos por fecha
      this.allNoConformidad.sort((a, b) => {
        return Date.parse(a.FechaRegistro.toString()) - Date.parse(b.FechaRegistro.toString());
      });
      // Obtener un arreglo de años disponibles
      let anos = this.allNoConformidad.map((m) => new Date(m.FechaRegistro.toString()).getFullYear());
      // Filtrar duplicados
      anos = anos.filter((val, i) => anos.indexOf(val) === i);

      const anoActual = new Date().getFullYear();
      const anoAnterior = anoActual - 1;

      // Eliminar datos existentes en la gráfica
      this.barChartData = [
        { label: anoAnterior.toString(), data: [] },
        { label: anoActual.toString(), data: [] },
      ];
      this.barChartLabels = [];

      const mesActual = new Date().getMonth();
      let iMes = 0;

      while (iMes <= mesActual) {
        // Agregar etiquetas con los nombres de cada mes desde Enero hasta el mes actual
        this.barChartLabels.push(this.nombreMeses[iMes]);

        // Obtener promedio mensual del año actual y el anterior
        this.barChartData[0].data.push(this.getPromedioNoConformidad(anoAnterior, iMes, this.allNoConformidad));
        this.barChartData[1].data.push(this.getPromedioNoConformidad(anoActual, iMes, this.allNoConformidad));

        iMes++;
      }
    });
  }

  getPromedioNoConformidad(ano: number, mes: number, allNoConformidad) {
    let promedio = 0;
    let datosFiltrados: any[] = [];
    let cantidadNoConformidad = 0;
    let suma = 0;

    // Filtrar las mediciones del mes y año que se desea promediar
    datosFiltrados = allNoConformidad.filter(
      (f) =>
        new Date(f.FechaRegistro.toString()).getFullYear() === ano &&
        new Date(f.FechaRegistro.toString()).getMonth() === mes,
    );

    if (datosFiltrados.length > 0) {
      // Obtener la suma de los valores de las mediciones a promediar
      suma = datosFiltrados.map((m) => m.TipoId).reduce((a, b) => a + b);
      cantidadNoConformidad = datosFiltrados.length;
      promedio = suma / cantidadNoConformidad;
    }

    return promedio;
  }
}
