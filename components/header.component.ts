export default class HeaderComponent {
  constructor() {
    const header = document.getElementById("header");

    if (header) header.innerHTML = this.render();
  }
  render() {
    return `
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
      <img src="https://static.ifood-static.com.br/image/upload/t_thumbnail/logosgde/70c3ef7c-10ce-4edc-a0bc-78ae6cd52b9d/202407281934_Ysi9_i.jpg" style="width: 80px; height: 80px; border-radius: 50%"/>
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
        <li class="nav-item">
            <a class="nav-link active" href="index.html"
              >Home</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link active" href="cadastro.html"
              >Cadastrar Novo Hambúrguer</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" href="sobre.html">Sobre nós</a>
          </li>
        </ul>
      </div>
    </div>
    </nav>
    `;
  }
}
