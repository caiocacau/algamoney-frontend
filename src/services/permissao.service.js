import api from './api';

class PermissaoService {

  getListPermissoes() {
    return api.get(`/permissoes`);
  }
}

export default new PermissaoService();
