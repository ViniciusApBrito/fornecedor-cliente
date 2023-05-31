import { Component, OnInit } from '@angular/core';
import { fornecedor } from '../fornecedor';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.css']
})
export class FornecedorComponent implements OnInit {
  fornecedores: fornecedor[] = [];
  isEditing: boolean = false;
  formGroupFornecedor: FormGroup;
  constructor(private ClienteService: ClienteService, private formBuilder: FormBuilder) {
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
    this.ClienteService.getfornecedores().subscribe({
      next: data => this.fornecedores = data
    });
  }

  SalvarFornecedor() {
    console.log(this.formGroupFornecedor.value)
    if (this.isEditing) {
      this.ClienteService.SalvarFornecedor(this.formGroupFornecedor.value).subscribe({
        next: () => {
          this.loadFornecedores();
          this.formGroupFornecedor.reset();
          this.isEditing = false;
        }
      }
      )
    }
    else {
      this.ClienteService.SalvarFornecedor(this.formGroupFornecedor.value).subscribe({
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

  excluirFornecedor(fornecedor: fornecedor) {
    this.ClienteService.excluirFornecedor(fornecedor).subscribe({
      next: () => this.loadFornecedores()
    })
  }
}
