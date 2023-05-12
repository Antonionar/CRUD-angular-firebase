import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription, observable } from 'rxjs';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.css']
})
export class ListEmpleadosComponent {
  empleados: any[] = [];
  empleadosSuscripcion: Subscription | undefined
  rutaEditar: string='/create-Empleado'

  constructor(private _empleadoService: EmpleadoService,
              private toastr: ToastrService ) {

  }
  ngOnInit(): void {
    this.getEmpleados()
  }

  getEmpleados() {
    // this._empleadoService.getEmpleados().subscribe(data => {
    //   console.log (data)
    //   this.empleados =data
    //   // this.empleados= []
    //   // data.forEach((Element: any) => {
    //   //   this.empleados.push({
    //   //     id: Element.id,
    //   //     ...Element.empleado

    //   //     // id: Element.payload.doc.id,
    //   //     // ...Element.payload.doc.data()
    //   //   })
    //   // });
    //   console.log(this.empleados);
    // });

      this.empleadosSuscripcion=  this._empleadoService.getEmpleados().subscribe({
      next: (data)=>{
        console.log(data);
        this.empleados =data

      },
      error: (error)=>console.log(error),
      complete: ()=>{
        console.log('observable finalizado');

      }

    })

  }
  eliminarEmpleado(id: string) {
    this._empleadoService.eliminarEmpleado(id).then(()=> {
      console.log('empleado eliminado con exito');
      this.toastr.error('El empleado fue borrado con exito', 'Registro eliminado',{
        positionClass :'toast-bottom-right'
      });
    }).catch(Error => {
      console.log(Error);
    })

  }
  ngOnDestroy(): void {
    if(this.empleadosSuscripcion){
      this.empleadosSuscripcion.unsubscribe()
    }

  }
}
