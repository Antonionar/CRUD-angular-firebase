import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-create-empleado',
  templateUrl: './create-empleado.component.html',
  styleUrls: ['./create-empleado.component.css']
})
export class CreateEmpleadoComponent implements OnInit {
  createEmpleado: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  titulo = 'Agregar Empleado';

  constructor(private fb: FormBuilder,
    private _empleadoServe: EmpleadoService,
    private Routes: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute) {

    this.createEmpleado = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      documento: ['', Validators.required],
      salario: ['', Validators.required]

    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id)
  }
  ngOnInit(): void {
    this.esEditar();

  }

  agregarEditarEmpleado() {
    this.submitted = true;

    if (this.createEmpleado.invalid) {
      return;
    }
    if (this.id === null) {
      this.agregarEmpleado();
    } else {
      this.editarEmpleado(this.id);
    }

  }

  agregarEmpleado() {
    const empleado: any = {
      nombre: this.createEmpleado.value.nombre,
      apellido: this.createEmpleado.value.apellido,
      documento: this.createEmpleado.value.documento,
      salario: this.createEmpleado.value.salario,
      fechaCreacion: new Date(),
      fechaActualizacon: new Date()
    }
    this.loading = true;
    this._empleadoServe.agregarEmpleado(empleado).then(() => {
      this.toastr.success('El empleado fue registrado con exito!', 'Empleado registrado', {
        positionClass: 'toast-bottom-right'
      });

      this.loading = false;
      this.Routes.navigate(['/list-empleados'])
    }).catch(error => {
      console.log(error);
      this.loading = false;
    })

  }
  async editarEmpleado(id: string) {
    const empleado: any = {
      nombre: this.createEmpleado.value.nombre,
      apellido: this.createEmpleado.value.apellido,
      documento: this.createEmpleado.value.documento,
      salario: this.createEmpleado.value.salario,
      fechaActualizacon: new Date()
    }
    this.loading = true;

    // this._empleadoServe.actualizarEmpleado(id, empleado)
    //   .then(() => {
    //     this.loading = false;
    //     this.toastr.info('El empleado fue modificado con exito', 'Empleado Modificado', {
    //       positionClass: 'toast-bottom-right'
    //     })

    //   })
    // this.Routes.navigate(['/list-empleados'])

// usando async await
    await this._empleadoServe.actualizarEmpleado(id, empleado)

        this.loading = false;
        this.toastr.info('El empleado fue modificado con exito', 'Empleado Modificado', {
          positionClass: 'toast-bottom-right'
        })


    this.Routes.navigate(['/list-empleados'])

  }


  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar Empleados'
      this.loading = true;
      this._empleadoServe.getEmpleado(this.id).subscribe(data => {
        console.log(data);


        this.loading = false;
        // console.log(data.payload.data()['nombre']);
        this.createEmpleado.setValue({
          nombre: data.nombre,
          apellido: data.apellido,
          documento: data.documento,
          salario: data.salario,

        })
        // this.createEmpleado.setValue ({
        //   nombre : data.payload.data()['nombre'],
        // apellido : data.payload.data()['apellido'],
        // documento: data.payload.data()['documento'],
        // salario: data.payload.data()['salario'],

        // })

      })


    }
  }
}






