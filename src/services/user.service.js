import api from './api';

class UserService {
  getPublicContent() {
    return api.get('/test');
  }

  getPublicContentHome() {
    return api.get('/test/all');
  }

  getUserBoard(codigo, nome, email, page, size, sort) {
    let url = `/users/filtrarPaginado?page=${page}&size=${size}${sort !== '' ? '&sort=' + sort : ''}`;

    if (codigo && codigo !== 0) {
      // console.log('entrou aqyui com codigo:', codigo)
      return api.get(`${url}&codigo=${codigo}`);
    } else {
      return api.get(`${url}${nome !== '' ? '&nome=' + nome : ''}${email !== '' ? '&email=' + email : ''}`);
    }
  }

  getUserById(codigo) {
    return api.get(`/users/${codigo}`);
  }

  insert(entidade) {
    return api.post(`/users`, entidade);
  }

  update(entidade) {
    return api.put(`/users/${entidade.codigo}`, entidade);
  }

  getModeratorBoard() {
    return api.get('/test/mod');
  }

  getAdminBoard() {
    return api.get('/test/admin');
  }
}

export default new UserService();
