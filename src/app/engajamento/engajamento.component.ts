import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { PaginaPostagem } from '../model/PaginaPostagem';
import { PostagemDestaqueComentario } from '../model/PostagemDestaqueComentario';
import { UsuarioDestaque } from '../model/UsuarioDestaque';
import { EngajamentoService } from '../service/engajamento.service';
import { PostagemService } from '../service/postagem.service';
@Component({
  selector: 'app-engajamento',
  templateUrl: './engajamento.component.html',
  styleUrls: ['./engajamento.component.css']
})
export class EngajamentoComponent implements OnInit {

  usuarioDestaque: UsuarioDestaque = new UsuarioDestaque
  destaqueComentario: PostagemDestaqueComentario = new PostagemDestaqueComentario
  paginaPostagem: PaginaPostagem

  constructor(
    private engajamentoService: EngajamentoService,
    private postagemService: PostagemService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    window.scroll(0,0)
    this.engajamentoService.refreshToken()
    this.obterUsuarioDestaque()
    this.obterPostagemDestaqueComentario()
    environment.textoPesquisaPostagem = ''
  }

  findByIdUsusarioDestaque(id: number){
    this.engajamentoService.refreshToken()
    this.engajamentoService.getById(id).subscribe((resp: UsuarioDestaque) =>{
      console.log(resp)
      this.usuarioDestaque = resp
    })
  }

  obterUsuarioDestaque(){
    this.engajamentoService.refreshToken()
    this.engajamentoService.usuarioMaisEngajado().subscribe((resp: UsuarioDestaque) => {
      this.usuarioDestaque = resp
    })

  }

  obterPostagemDestaqueComentario(){
    this.engajamentoService.postagemDestaque().subscribe((resp: PostagemDestaqueComentario) => {
      this.destaqueComentario = resp

    })

  }
  
  
  pegarId(id: any) {
    environment.idDestaqueComentario = id
    environment.textoPesquisaPostagem = ''
    environment.idUsuarioPerfil = 0
    this.router.navigate(['/pagina-inicio'])
    setTimeout(() => {
      this.router.navigate(['/feed'])
    }, 1);
  }
  

  prepararAbrirPerfil() {
    environment.idDestaqueComentario = 0
    environment.textoPesquisaPostagem = ''
  }
}
