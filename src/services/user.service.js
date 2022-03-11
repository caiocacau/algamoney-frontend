import api from './api';

class UserService {
  getPublicContent() {
    return api.get('/test');
  }

  getPublicContentHome() {
    return api.get('/test/all');
  }

  getUserBoard(codigo, nome, email, ativos, page, size, sort) {
    const ativosValues = ativos.map(o => o.value);
    // console.log('getUserBoard ativosValues: ', ativosValues);
    // console.log('getUserBoard sort: ', sort);
    let url = `/users/filtrarPaginado?page=${page}&size=${size}${sort ? '&sort=' + sort : ''}`;

    if (codigo && codigo !== 0) {
      // console.log('entrou aqyui com codigo:', codigo)
      return api.get(`${url}&codigo=${codigo}`);
    } else {
      return api.get(`${url}${nome !== '' ? '&nome=' + nome : ''}${email !== '' ? '&email=' + email : ''}${ativos !== '' ? '&ativos=' + ativosValues : ''}`);
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

  delete(codigo) {
    return api.delete(`/users/${codigo}`);
  }

  getModeratorBoard() {
    return api.get('/test/mod');
  }

  getAdminBoard() {
    return api.get('/test/admin');
  }
}

export default new UserService();
