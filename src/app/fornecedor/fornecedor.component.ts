import { Component, OnInit } from '@angular/core';
import { fornecedor } from '../fornecedor';
import { FornecedorService } from '../fornecedor.service';
import { Form, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.css']
})
export class FornecedorComponent implements OnInit {
  fornecedores: fornecedor[] = [];
  isEditing: boolean = false;
  formGroupFornecedor: FormGroup;
  constructor(private clienteService: FornecedorService, private formBuilder: FormBuilder) {
    this.formGroupFornecedor = formBuilder.group({
      id: [''],
      name: [''],
      email: [''],
      cpf: [''],
      cnpj: [''],
      loja: ['']
    })
  }

  ngOnInit(): void {
    this.loadFornecedores();
  }
  loadFornecedores() {
    this.clienteService.getfornecedores().subscribe({
      next: data => this.fornecedores = data
    });
  }

  SalvarFornecedor() {
    console.log(this.formGroupFornecedor.value)
    if (this.isEditing) {
      this.clienteService.EditarFornecedor(this.formGroupFornecedor.value).subscribe({
        next: () => {
          this.loadFornecedores();
          this.formGroupFornecedor.reset();
          this.isEditing = false;
        }
      }
      )
    }
    else {
      this.clienteService.SalvarFornecedor(this.formGroupFornecedor.value).subscribe({
        next: data => {
          this.fornecedores.push(data);
          this.formGroupFornecedor.reset();
        }
      })
    }
  }

  EditarFornecedor(fornecedor: fornecedor) {
    this.formGroupFornecedor.setValue(fornecedor);
    this.isEditing = true;
  }

  ExcluirFornecedor(fornecedor: fornecedor) {
    this.clienteService.EditarFornecedor(fornecedor).subscribe({
      next: () => this.loadFornecedores()
    })
  }
}
