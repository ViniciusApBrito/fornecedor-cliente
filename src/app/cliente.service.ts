import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { cliente } from './cliente';
import { Observable } from 'rxjs';
import { fornecedor } from './fornecedor';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  delete(cliente: cliente) {
    throw new Error('Method not implemented.');
  }
  url = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  getClientes(): Observable<cliente[]> {
    return this.http.get<cliente[]>(`${this.url}/clientes`);
  }
  salvarCliente(Cliente: cliente): Observable<cliente> {
    return this.http.post<cliente>(`${this.url}/clientes`, Cliente);
  }
  ExcluirCliente(Cliente: cliente): Observable<void> {
    return this.http.delete<void>(`${this.url}/clientes/${Cliente.id}`);
  }
  EditarCliente(Cliente: cliente): Observable<cliente> {
    return this.http.put<cliente>(`${this.url}/clientes/${Cliente.id}`, Cliente);
  }


  getfornecedores(): Observable<fornecedor[]> {
    return this.http.get<fornecedor[]>(`${this.url}/fornecedores`);
  }
  SalvarFornecedor(Fornecedor: fornecedor): Observable<fornecedor> {
    return this.http.get<fornecedor>(`${this.url}/fornecedores`);
  }
  excluirFornecedor(Fornecedor: fornecedor): Observable<void> {
    return this.http.delete<void>(`${this.url}/fornecedores/${Fornecedor.id}`);
  }

  EditarFornecedor(Fornecedor: fornecedor): Observable<fornecedor> {
    return this.http.put<fornecedor>(`${this.url}/fornecedores/${Fornecedor.id}`, Fornecedor);
  }
}

