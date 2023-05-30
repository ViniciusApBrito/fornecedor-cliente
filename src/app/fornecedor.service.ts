import { Injectable } from '@angular/core';
import { fornecedor } from './fornecedor';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class FornecedorService {
  url = "http://localhost:3000/fornecedore";

  constructor(private http: HttpClient) { }

  getfornecedores(): Observable<fornecedor[]>{
    return this.http.get<fornecedor[]>(this.url);
  }
  SalvarFornecedor(Fornecedor:fornecedor): Observable<fornecedor>{
    return this.http.get<fornecedor>(this.url);
  }
  ExcluirFornecedor(Fornecedor:fornecedor): Observable<void>{
    return this.http.delete<void> (`${this.url}/${Fornecedor.id}`)
  }
  EditarFornecedor(Fornecedor:fornecedor): Observable<fornecedor>{
    return this.http.put<fornecedor>(`${this.url}/${Fornecedor.id}`, Fornecedor)
  }

}
