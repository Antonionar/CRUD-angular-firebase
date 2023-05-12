
import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, CollectionReference, deleteDoc, doc, docData, updateDoc, orderBy, query } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private empleadosCollection: CollectionReference
  private firestore: Firestore = inject(Firestore)

  constructor() {
    // optenemos una referencia de la coleccion de empleados
    this.empleadosCollection = collection(this.firestore, 'empleados');




  }


  agregarEmpleado(empleado: any): Promise<any> {
    return addDoc(this.empleadosCollection, <any> empleado );
  }


  getEmpleados(): Observable<any> {
    return collectionData(query(this.empleadosCollection, orderBy('fechaCreacion', 'asc')), { idField: 'id' }) as Observable<any[]>;


  }
  eliminarEmpleado(id: string): Promise<any> {
    const ref = doc(this.firestore, `empleados/${id}`)
    return deleteDoc(ref)

  }
  getEmpleado(id: string): Observable<any> {
    const ref = doc(this.firestore, `empleados/${id}`)
    return docData(ref, { idField: 'id' })

  }

  actualizarEmpleado(id: string, data:any) {
    const ref = doc(this.firestore,'empleados/'+id)
    return updateDoc(ref,data )


  }



}













