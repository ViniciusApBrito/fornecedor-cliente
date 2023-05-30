import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { cliente } from './cliente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  delete(cliente: cliente) {
    throw new Error('Method not implemented.');
  }
  url = "http://localhost:3000/clientes";

  constructor(private http: HttpClient) { }

  getClientes(): Observable<cliente[]>{
    return this.http.get<cliente[]>(this.url); 
  }
  salvarCliente(Cliente: cliente): Observable<cliente>{
    return this.http.post<cliente>(this.url, Cliente); 
  }
  ExcluirCliente(Cliente:cliente): Observable<void>{
    return this.http.delete<void>(`${this.url}/${Cliente.id}`);
  }

  EditarCliente(Cliente:cliente): Observable<cliente>{
    return this.http.put<cliente>(`${this.url}/${Cliente.id}`,Cliente)

  }



}
